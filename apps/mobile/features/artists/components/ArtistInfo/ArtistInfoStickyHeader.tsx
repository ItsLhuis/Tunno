import { View } from "react-native"

import { createStyleSheet, ScopedPalette, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailUri } from "@hooks/useThumbnailUri"

import { BackButton } from "@components/navigation"
import { FadingView, Header, IconButton, Text, Thumbnail, type HeaderProps } from "@components/ui"

import { type ArtistWithAllRelations } from "@repo/api"

type ArtistInfoStickyHeaderProps = {
  artist: ArtistWithAllRelations
  songIds: number[]
} & Omit<HeaderProps, "transparentBackground" | "bottomBorder" | "headerBackgroundAnimation">

const ArtistInfoStickyHeader = ({
  artist,
  songIds,
  scrollY,
  showHeader,
  ...props
}: ArtistInfoStickyHeaderProps) => {
  const styles = useStyles(artistInfoStickyHeaderStyles)

  const { t } = useTranslation()

  const thumbnailUri = useThumbnailUri({ fileName: artist.thumbnail })

  const { palette, dominantColor } = useImageColorAndPalette({ imageUri: thumbnailUri })

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || songIds.length === 0) return
    shuffleAndPlay(songIds, "artist", artist.id)
  }

  return (
    <ScopedPalette palette={palette}>
      <Header
        scrollY={scrollY}
        showHeader={showHeader}
        headerBackgroundAnimation={!artist.thumbnail}
        bottomBorder={!dominantColor}
        headerStyle={{
          backgroundColor: dominantColor || undefined
        }}
        headerLeft={
          <View style={styles.headerLeft}>
            <BackButton />
            <FadingView opacity={showHeader}>
              <IconButton
                name="Shuffle"
                isLoading={isShuffling}
                variant="text"
                onPress={handleShuffleAndPlay}
                disabled={songIds.length === 0}
              />
            </FadingView>
          </View>
        }
        headerCenter={
          <View style={styles.headerCenter}>
            <Thumbnail
              fileName={artist.thumbnail}
              placeholderIcon="User"
              containerStyle={styles.thumbnail}
            />
            <View style={styles.textContainer}>
              <Text weight="medium" numberOfLines={1}>
                {artist.name}
              </Text>
              <Text size="xs" color="mutedForeground" numberOfLines={1}>
                {t("common.songsPlayed", { count: artist.totalTracks })}
              </Text>
            </View>
          </View>
        }
        {...props}
      />
    </ScopedPalette>
  )
}

const artistInfoStickyHeaderStyles = createStyleSheet(({ theme }) => ({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("sm")
  },
  thumbnail: {
    width: theme.size(10),
    height: theme.size(10),
    borderRadius: theme.radius("full")
  },
  textContainer: {
    gap: theme.space("xs")
  }
}))

export { ArtistInfoStickyHeader }
