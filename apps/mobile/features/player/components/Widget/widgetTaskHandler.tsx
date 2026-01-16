"use no memo"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useSettingsStore } from "@stores/useSettingsStore"

import TrackPlayer, { RepeatMode, State } from "react-native-track-player"

import { fileToBase64DataUri } from "@services/storage"

import { extractColorFromImage } from "@utils/colors"

import { MiniPlayerWidget, type MiniPlayerWidgetProps, type WidgetSize } from "./MiniPlayerWidget"

import { type WidgetTaskHandlerProps } from "react-native-android-widget"

/**
 * Determines the widget size based on its dimensions.
 *
 * Based on real device measurements:
 * - 2 cols ≈ 162dp, 3 cols ≈ 257dp, 4 cols ≈ 352dp
 * - 1 row ≈ 80dp, 2 rows ≈ 174dp
 *
 * Small: 1 row (any columns)
 * Medium: 2 rows with up to 3 columns (2x2, 2x3)
 * Large: 2 rows with 4+ columns (2x4+)
 */
function getWidgetSize(width: number, height: number): WidgetSize {
  const isOneRow = height < 120
  const hasFourOrMoreColumns = width >= 300

  // Small: single row widget
  if (isOneRow) return "small"

  // Large: 2 rows with 4+ columns
  if (hasFourOrMoreColumns) return "large"

  // Medium: 2 rows with up to 3 columns
  return "medium"
}

/**
 * Gathers all data needed to render the widget.
 * This function accesses stores directly since widgets cannot use React hooks.
 */
async function getWidgetData(
  widgetWidth: number,
  widgetHeight: number
): Promise<Omit<MiniPlayerWidgetProps, "theme">> {
  const playerState = usePlayerStore.getState()
  const settingsState = useSettingsStore.getState()

  const { currentTrack, canPlayPrevious, canPlayNext, isShuffleEnabled, repeatMode } = playerState
  const { language } = settingsState

  // Get playback state - only if player is active
  let isPlaying = false
  const playerActive = await isPlayerActive()
  if (playerActive) {
    try {
      const playbackState = await TrackPlayer.getPlaybackState()
      isPlaying = playbackState.state === State.Playing
    } catch {
      // TrackPlayer might not be initialized in some contexts
    }
  }

  // Calculate widget size based on dimensions
  const size = getWidgetSize(widgetWidth, widgetHeight)

  // No current track - return empty state
  if (!currentTrack) {
    return {
      title: "",
      artists: "",
      thumbnailUri: null,
      dominantColor: null,
      isPlaying: false,
      canPlayPrevious: false,
      canPlayNext: false,
      isShuffleEnabled: false,
      repeatMode: 0,
      language,
      size
    }
  }

  // Get track info
  const title = currentTrack.title ?? currentTrack.name ?? ""
  const artists =
    currentTrack.artists && currentTrack.artists.length > 0
      ? currentTrack.artists.map((a) => a.artist.name).join(", ")
      : ""

  // Convert artwork to base64 data URI for widget
  let thumbnailUri: MiniPlayerWidgetProps["thumbnailUri"] = null
  let dominantColor: string | null = null

  if (currentTrack.artwork) {
    const artworkPath = currentTrack.artwork.toString()

    try {
      const base64Uri = await fileToBase64DataUri(artworkPath)
      if (base64Uri) {
        thumbnailUri = base64Uri as `data:image${string}`
      }

      // Extract dominant color using Skia
      // This may fail in background context, so we handle it gracefully
      dominantColor = await extractColorFromImage(artworkPath)
    } catch {
      // Color extraction failed - continue without it
    }
  }

  // Convert RepeatMode enum to number for widget
  const repeatModeNum = repeatMode === RepeatMode.Off ? 0 : repeatMode === RepeatMode.Queue ? 1 : 2

  return {
    title,
    artists,
    thumbnailUri,
    dominantColor,
    isPlaying,
    canPlayPrevious,
    canPlayNext,
    isShuffleEnabled,
    repeatMode: repeatModeNum,
    language,
    size
  }
}

/**
 * Checks if the TrackPlayer service is active and ready.
 * Returns false if the app was killed and the player is not initialized.
 */
async function isPlayerActive(): Promise<boolean> {
  try {
    const playbackState = await TrackPlayer.getPlaybackState()
    // If we can get the state and it's not "none", the player is active
    return playbackState.state !== State.None
  } catch {
    return false
  }
}

/**
 * Handles click actions from the widget.
 * Only executes if the player is active.
 */
async function handleWidgetClick(clickAction: string): Promise<void> {
  // Check if player is active before trying to control it
  const playerActive = await isPlayerActive()
  if (!playerActive) {
    // Player not active (app was killed) - don't try to control
    return
  }

  const playerState = usePlayerStore.getState()

  switch (clickAction) {
    case "playPause": {
      try {
        const playbackState = await TrackPlayer.getPlaybackState()
        if (playbackState.state === State.Playing) {
          await playerState.pause()
        } else {
          await playerState.play()
        }
      } catch (error) {
        console.error("Widget: Error handling playPause:", error)
      }
      break
    }
    case "skipPrevious": {
      if (playerState.canPlayPrevious) {
        try {
          await playerState.playPrevious()
        } catch (error) {
          console.error("Widget: Error handling skipPrevious:", error)
        }
      }
      break
    }
    case "skipNext": {
      if (playerState.canPlayNext) {
        try {
          await playerState.playNext()
        } catch (error) {
          console.error("Widget: Error handling skipNext:", error)
        }
      }
      break
    }
    case "toggleShuffle": {
      try {
        await playerState.toggleShuffle()
      } catch (error) {
        console.error("Widget: Error handling toggleShuffle:", error)
      }
      break
    }
    case "toggleRepeat": {
      try {
        const currentMode = playerState.repeatMode
        // Cycle: Off -> Queue -> Track -> Off
        const nextMode =
          currentMode === RepeatMode.Off
            ? RepeatMode.Queue
            : currentMode === RepeatMode.Queue
              ? RepeatMode.Track
              : RepeatMode.Off

        await playerState.setRepeatMode(nextMode)
      } catch (error) {
        console.error("Widget: Error handling toggleRepeat:", error)
      }
      break
    }
    default:
      // Unknown action - ignore
      break
  }
}

/**
 * Main widget task handler.
 * Handles all widget lifecycle events and user interactions.
 */
export async function widgetTaskHandler(props: WidgetTaskHandlerProps): Promise<void> {
  const { widgetInfo, widgetAction, clickAction, renderWidget } = props

  // Only handle MiniPlayer widget
  if (widgetInfo.widgetName !== "MiniPlayer") {
    return
  }

  const { width, height } = widgetInfo

  switch (widgetAction) {
    case "WIDGET_ADDED":
    case "WIDGET_UPDATE":
    case "WIDGET_RESIZED": {
      const data = await getWidgetData(width, height)

      // Render both light and dark variants for system theme support
      renderWidget({
        light: <MiniPlayerWidget {...data} theme="light" />,
        dark: <MiniPlayerWidget {...data} theme="dark" />
      })
      break
    }
    case "WIDGET_CLICK": {
      // Handle the click action
      if (clickAction && clickAction !== "OPEN_APP") {
        await handleWidgetClick(clickAction)
      }

      // Re-fetch data and re-render after action
      const data = await getWidgetData(width, height)

      renderWidget({
        light: <MiniPlayerWidget {...data} theme="light" />,
        dark: <MiniPlayerWidget {...data} theme="dark" />
      })
      break
    }
    case "WIDGET_DELETED": {
      // Cleanup if needed - currently no cleanup required
      break
    }
    default:
      break
  }
}
