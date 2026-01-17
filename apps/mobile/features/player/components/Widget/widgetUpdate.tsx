"use no memo"

import { Platform } from "react-native"

import { requestWidgetUpdate, type WidgetInfo } from "react-native-android-widget"

import { useSettingsStore } from "@stores/useSettingsStore"

import TrackPlayer, { State } from "react-native-track-player"

import { fileToBase64DataUri } from "@services/storage"

import { extractColorFromImage } from "@utils/colors"

import { getWidgetSize } from "./widgetUtils"

import { MiniPlayerWidget, type MiniPlayerWidgetProps } from "./MiniPlayerWidget"

/**
 * Cached dominant color to avoid repeated extraction for the same artwork.
 */
let cachedDominantColor: { artworkPath: string; color: string | null } | null = null

/**
 * Gathers widget data from TrackPlayer state.
 */
async function getWidgetData(
  widgetWidth: number,
  widgetHeight: number
): Promise<Omit<MiniPlayerWidgetProps, "theme">> {
  const settingsState = useSettingsStore.getState()
  const { language } = settingsState

  const size = getWidgetSize(widgetWidth, widgetHeight)

  const [playbackState, queue, activeTrack, activeTrackIndex] = await Promise.all([
    TrackPlayer.getPlaybackState(),
    TrackPlayer.getQueue(),
    TrackPlayer.getActiveTrack(),
    TrackPlayer.getActiveTrackIndex()
  ])

  const isPlaying = playbackState.state === State.Playing

  if (!activeTrack) {
    cachedDominantColor = null
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
 * Triggers a widget update with current player state.
 * Call this when playback state or track changes.
 */
export async function triggerWidgetUpdate(): Promise<void> {
  if (Platform.OS !== "android") return

  try {
    await requestWidgetUpdate({
      widgetName: "MiniPlayer",
      renderWidget: async (widgetInfo: WidgetInfo) => {
        const data = await getWidgetData(widgetInfo.width, widgetInfo.height)
        return {
          light: <MiniPlayerWidget {...data} theme="light" />,
          dark: <MiniPlayerWidget {...data} theme="dark" />
        }
      }
    })
  } catch {
    // Widget update failed
  }
}

/**
 * Clears the cached dominant color.
 * Call this when tracks change.
 */
export function clearWidgetColorCache(): void {
  cachedDominantColor = null
}
