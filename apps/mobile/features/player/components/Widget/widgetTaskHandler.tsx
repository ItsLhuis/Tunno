"use no memo"

import TrackPlayer, { State } from "react-native-track-player"

import { useSettingsStore } from "@stores/useSettingsStore"

import { fileToBase64DataUri } from "@services/storage"

import { extractColorFromImage } from "@utils/colors"

import { getWidgetSize } from "./widgetUtils"

import { MiniPlayerWidget, type MiniPlayerWidgetProps } from "./MiniPlayerWidget"

import { type WidgetTaskHandlerProps } from "react-native-android-widget"

/**
 * Returns empty widget data for when the player is not active.
 */
function getEmptyWidgetData(
  widgetWidth: number,
  widgetHeight: number,
  language: string
): Omit<MiniPlayerWidgetProps, "theme"> {
  const size = getWidgetSize(widgetWidth, widgetHeight)

  return {
    title: "",
    artists: "",
    thumbnailUri: null,
    dominantColor: null,
    isPlaying: false,
    canPlayPrevious: false,
    canPlayNext: false,
    language,
    size,
    isPlayerActive: false
  }
}

/**
 * Gathers all data needed to render the widget from TrackPlayer.
 */
async function getWidgetData(
  widgetWidth: number,
  widgetHeight: number
): Promise<Omit<MiniPlayerWidgetProps, "theme">> {
  const settingsState = useSettingsStore.getState()
  const { language } = settingsState

  const [playbackState, queue, activeTrack, activeTrackIndex] = await Promise.all([
    TrackPlayer.getPlaybackState(),
    TrackPlayer.getQueue(),
    TrackPlayer.getActiveTrack(),
    TrackPlayer.getActiveTrackIndex()
  ])

  const isPlaying = playbackState.state === State.Playing
  const size = getWidgetSize(widgetWidth, widgetHeight)

  if (!activeTrack) {
    return getEmptyWidgetData(widgetWidth, widgetHeight, language)
  }

  const title = activeTrack.title ?? ""
  const artists = activeTrack.artist ?? ""

  let thumbnailUri: MiniPlayerWidgetProps["thumbnailUri"] = null
  let dominantColor: string | null = null

  if (activeTrack.artwork) {
    const artworkPath = activeTrack.artwork.toString()

    try {
      const base64Uri = await fileToBase64DataUri(artworkPath)
      if (base64Uri) {
        thumbnailUri = base64Uri as `data:image${string}`
      }

      dominantColor = await extractColorFromImage(artworkPath)
    } catch {
      // Continue without artwork/color
    }
  }

  const canPlayPrevious = activeTrackIndex !== undefined && activeTrackIndex > 0
  const canPlayNext = activeTrackIndex !== undefined && activeTrackIndex < queue.length - 1

  return {
    title,
    artists,
    thumbnailUri,
    dominantColor,
    isPlaying,
    canPlayPrevious,
    canPlayNext,
    language,
    size,
    isPlayerActive: true
  }
}

/**
 * Checks if the player has an active playback session.
 */
async function isPlayerActive(): Promise<boolean> {
  try {
    const [playbackState, queue, activeTrack] = await Promise.all([
      TrackPlayer.getPlaybackState(),
      TrackPlayer.getQueue(),
      TrackPlayer.getActiveTrack()
    ])

    return playbackState.state !== State.None && queue.length > 0 && activeTrack !== null
  } catch {
    return false
  }
}

/**
 * Handles click actions from the widget using TrackPlayer directly.
 */
async function handleWidgetClick(clickAction: string): Promise<void> {
  switch (clickAction) {
    case "playPause": {
      try {
        const playbackState = await TrackPlayer.getPlaybackState()
        if (playbackState.state === State.Playing) {
          await TrackPlayer.pause()
        } else {
          await TrackPlayer.play()
        }
      } catch {
        // Player not available
      }
      break
    }
    case "skipPrevious": {
      try {
        await TrackPlayer.skipToPrevious()
      } catch {
        // Cannot skip
      }
      break
    }
    case "skipNext": {
      try {
        await TrackPlayer.skipToNext()
      } catch {
        // Cannot skip
      }
      break
    }
    default:
      break
  }
}

/**
 * Main widget task handler.
 * Handles all widget lifecycle events and user interactions.
 */
export async function widgetTaskHandler(props: WidgetTaskHandlerProps): Promise<void> {
  const { widgetInfo, widgetAction, clickAction, renderWidget } = props

  if (widgetInfo.widgetName !== "MiniPlayer") {
    return
  }

  const { width, height } = widgetInfo

  const playerActive = await isPlayerActive()
  const language = useSettingsStore.getState().language ?? "en"

  switch (widgetAction) {
    case "WIDGET_ADDED":
    case "WIDGET_UPDATE":
    case "WIDGET_RESIZED": {
      const data = playerActive
        ? await getWidgetData(width, height)
        : getEmptyWidgetData(width, height, language)

      renderWidget({
        light: <MiniPlayerWidget {...data} theme="light" />,
        dark: <MiniPlayerWidget {...data} theme="dark" />
      })
      break
    }
    case "WIDGET_CLICK": {
      if (playerActive && clickAction && clickAction !== "OPEN_APP") {
        await handleWidgetClick(clickAction)
      }

      const data = playerActive
        ? await getWidgetData(width, height)
        : getEmptyWidgetData(width, height, language)

      renderWidget({
        light: <MiniPlayerWidget {...data} theme="light" />,
        dark: <MiniPlayerWidget {...data} theme="dark" />
      })
      break
    }
    case "WIDGET_DELETED": {
      break
    }
    default:
      break
  }
}
