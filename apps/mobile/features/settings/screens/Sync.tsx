import { useEffect, useState } from "react"

import { Appearance, View } from "react-native"

import { useShallow } from "zustand/shallow"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton } from "@components/navigation"
import { Header, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

import { WidgetPreview } from "react-native-android-widget"

import { fileToBase64DataUri } from "@services/storage"
import { extractColorFromImage } from "@utils/colors"

import {
  MiniPlayerWidget,
  type MiniPlayerWidgetProps,
  type WidgetTheme
} from "@features/player/components/Widget"
import { usePlayerStore } from "@features/player/stores/usePlayerStore"
import { useSettingsStore } from "@stores/useSettingsStore"

function resolveTheme(theme: "dark" | "light" | "system"): WidgetTheme {
  if (theme === "system") {
    const colorScheme = Appearance.getColorScheme()
    return colorScheme === "dark" ? "dark" : "light"
  }
  return theme
}

const Sync = () => {
  const styles = useStyles(syncStyles)

  const [clickedAction, setClickedAction] = useState<string>("")
  const [thumbnailUri, setThumbnailUri] = useState<MiniPlayerWidgetProps["thumbnailUri"]>(null)
  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const { currentTrack, playbackState, canPlayPrevious, canPlayNext } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack,
      playbackState: state.playbackState,
      canPlayPrevious: state.canPlayPrevious,
      canPlayNext: state.canPlayNext
    }))
  )

  const { theme, language } = useSettingsStore(
    useShallow((state) => ({
      theme: state.theme,
      language: state.language
    }))
  )

  const title = currentTrack?.title ?? currentTrack?.name ?? "No song playing"
  const artists =
    currentTrack?.artists && currentTrack.artists.length > 0
      ? currentTrack.artists.map((a) => a.artist.name).join(", ")
      : "Open Tunno to start"
  const isPlaying = playbackState === "playing"

  const resolvedTheme = resolveTheme(theme)

  useEffect(() => {
    const loadThumbnail = async () => {
      if (currentTrack?.artwork && typeof currentTrack.artwork === "string") {
        const base64Uri = await fileToBase64DataUri(currentTrack.artwork)

        if (base64Uri) {
          setThumbnailUri(base64Uri as `data:image${string}`)
        } else {
          setThumbnailUri(null)
        }

        try {
          const color = await extractColorFromImage(currentTrack.artwork)
          setDominantColor(color)
        } catch {
          setDominantColor(null)
        }
      } else {
        setThumbnailUri(null)
        setDominantColor(null)
      }
    }

    loadThumbnail()
  }, [currentTrack?.artwork])

  return (
    <View style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                Widget Preview
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              Widget Preview
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.previewContainer}>
          <Text size="sm" color="mutedForeground" style={styles.label}>
            Mini Player Widget
          </Text>
          <View>
            <View>
              <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Tiny (2x1)</Text>
              <WidgetPreview
                renderWidget={() => (
                  <MiniPlayerWidget
                    title={title}
                    artists={artists}
                    thumbnailUri={thumbnailUri}
                    dominantColor={dominantColor}
                    isPlaying={isPlaying}
                    canPlayPrevious={canPlayPrevious}
                    canPlayNext={canPlayNext}
                    theme={resolvedTheme}
                    language={language}
                    size="tiny"
                    isPlayerActive
                  />
                )}
                onClick={({ clickAction }) => {
                  setClickedAction(clickAction ?? "unknown")
                }}
                height={70}
                width={160}
              />
            </View>
            <View>
              <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Small (4x1)</Text>
              <WidgetPreview
                renderWidget={() => (
                  <MiniPlayerWidget
                    title={title}
                    artists={artists}
                    thumbnailUri={thumbnailUri}
                    dominantColor={dominantColor}
                    isPlaying={isPlaying}
                    canPlayPrevious={canPlayPrevious}
                    canPlayNext={canPlayNext}
                    theme={resolvedTheme}
                    language={language}
                    size="small"
                    isPlayerActive
                  />
                )}
                onClick={({ clickAction }) => {
                  setClickedAction(clickAction ?? "unknown")
                }}
                height={70}
                width={360}
              />
            </View>
            <View>
              <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Medium (2x2)</Text>
              <WidgetPreview
                renderWidget={() => (
                  <MiniPlayerWidget
                    title={title}
                    artists={artists}
                    thumbnailUri={thumbnailUri}
                    dominantColor={dominantColor}
                    isPlaying={isPlaying}
                    canPlayPrevious={canPlayPrevious}
                    canPlayNext={canPlayNext}
                    theme={resolvedTheme}
                    language={language}
                    size="medium"
                    isPlayerActive
                  />
                )}
                onClick={({ clickAction }) => {
                  setClickedAction(clickAction ?? "unknown")
                }}
                height={170}
                width={170}
              />
            </View>
            <View>
              <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Large (4x2)</Text>
              <WidgetPreview
                renderWidget={() => (
                  <MiniPlayerWidget
                    title={title}
                    artists={artists}
                    thumbnailUri={thumbnailUri}
                    dominantColor={dominantColor}
                    isPlaying={isPlaying}
                    canPlayPrevious={canPlayPrevious}
                    canPlayNext={canPlayNext}
                    theme={resolvedTheme}
                    language={language}
                    size="large"
                    isPlayerActive
                  />
                )}
                onClick={({ clickAction }) => {
                  setClickedAction(clickAction ?? "unknown")
                }}
                height={180}
                width={360}
              />
            </View>
          </View>
          {clickedAction ? (
            <Text size="sm" color="mutedForeground" style={styles.clickInfo}>
              Last click: {clickedAction}
            </Text>
          ) : null}
        </View>
        <View style={styles.infoContainer}>
          <Text size="sm" color="mutedForeground">
            This preview shows how the widget will appear on your home screen. The actual widget
            updates automatically when the track changes.
          </Text>
        </View>
      </ScrollViewWithHeaders>
    </View>
  )
}

const syncStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    padding: theme.space("lg"),
    paddingBottom: runtime.insets.bottom + theme.space("lg")
  },
  previewContainer: {
    alignItems: "center",
    gap: theme.space("md")
  },
  label: {
    alignSelf: "flex-start"
  },
  clickInfo: {
    marginTop: theme.space("sm")
  },
  refreshButton: {
    marginTop: theme.space("md")
  },
  infoContainer: {
    marginTop: theme.space("xl"),
    padding: theme.space("md"),
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radius()
  }
}))

export { Sync }
