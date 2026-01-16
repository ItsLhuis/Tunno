"use no memo"

import { Platform } from "react-native"

import { requestWidgetUpdate } from "react-native-android-widget"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useSettingsStore } from "@stores/useSettingsStore"

import TrackPlayer, { RepeatMode, State } from "react-native-track-player"

import { fileToBase64DataUri } from "@services/storage"

import { extractColorFromImage } from "@utils/colors"

import { MiniPlayerWidget, type MiniPlayerWidgetProps, type WidgetSize } from "./MiniPlayerWidget"

/**
 * Default widget size for updates.
 * The actual size will be determined by the task handler on resize events.
 */
const DEFAULT_WIDGET_SIZE: WidgetSize = "medium"

/**
 * Cached dominant color to avoid repeated extraction for the same artwork.
 */
let cachedDominantColor: { artworkPath: string; color: string | null } | null = null

/**
 * Gathers widget data from current app state.
 */
async function getWidgetData(): Promise<Omit<MiniPlayerWidgetProps, "theme">> {
  const playerState = usePlayerStore.getState()
  const settingsState = useSettingsStore.getState()

  const { currentTrack, canPlayPrevious, canPlayNext, isShuffleEnabled, repeatMode } = playerState
  const { language } = settingsState

  let isPlaying = false
  try {
    const playbackState = await TrackPlayer.getPlaybackState()
    isPlaying = playbackState.state === State.Playing
  } catch {
    // TrackPlayer might not be initialized
  }

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
      size: DEFAULT_WIDGET_SIZE
    }
  }

  const title = currentTrack.title ?? currentTrack.name ?? ""
  const artists =
    currentTrack.artists && currentTrack.artists.length > 0
      ? currentTrack.artists.map((a) => a.artist.name).join(", ")
      : ""

  let thumbnailUri: MiniPlayerWidgetProps["thumbnailUri"] = null
  let dominantColor: string | null = null

  if (currentTrack.artwork) {
    const artworkPath = currentTrack.artwork.toString()

    try {
      const base64Uri = await fileToBase64DataUri(artworkPath)
      if (base64Uri) {
        thumbnailUri = base64Uri as `data:image${string}`
      }

      // Use cached color if same artwork
      if (cachedDominantColor?.artworkPath === artworkPath) {
        dominantColor = cachedDominantColor.color
      } else {
        dominantColor = await extractColorFromImage(artworkPath)
        cachedDominantColor = { artworkPath, color: dominantColor }
      }
    } catch {
      // Continue without color
    }
  } else {
    cachedDominantColor = null
  }

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
    size: DEFAULT_WIDGET_SIZE
  }
}

/**
 * Triggers a widget update with current player state.
 * Call this when playback state or track changes.
 */
export async function triggerWidgetUpdate(): Promise<void> {
  if (Platform.OS !== "android") return

  try {
    const data = await getWidgetData()

    await requestWidgetUpdate({
      widgetName: "MiniPlayer",
      renderWidget: () => ({
        light: <MiniPlayerWidget {...data} theme="light" />,
        dark: <MiniPlayerWidget {...data} theme="dark" />
      })
    })
  } catch {}
}

/**
 * Clears the cached dominant color.
 * Call this when tracks change.
 */
export function clearWidgetColorCache(): void {
  cachedDominantColor = null
}
