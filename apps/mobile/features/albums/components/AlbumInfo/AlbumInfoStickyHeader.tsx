import { View } from "react-native"

import { createStyleSheet, ScopedPalette, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailUri } from "@hooks/useThumbnailUri"

import { BackButton } from "@components/navigation"
import {
  FadingView,
  Header,
  IconButton,
  Pressable,
  Text,
  Thumbnail,
  type HeaderProps
} from "@components/ui"

import { type AlbumWithAllRelations } from "@repo/api"

type AlbumInfoStickyHeaderProps = {
  album: AlbumWithAllRelations
  songIds: number[]
} & Omit<HeaderProps, "transparentBackground" | "bottomBorder" | "headerBackgroundAnimation">

const AlbumInfoStickyHeader = ({
  album,
  songIds,
  scrollY,
  showHeader,
  ...props
}: AlbumInfoStickyHeaderProps) => {
  const styles = useStyles(albumInfoStickyHeaderStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const thumbnailUri = useThumbnailUri({ fileName: album.thumbnail })

  const { palette, dominantColor } = useImageColorAndPalette({ imageUri: thumbnailUri })

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || songIds.length === 0) return
    shuffleAndPlay(songIds, "album", album.id)
  }

  const handleArtistPress = (artistId: number) => {
    router.push(`/artists/${artistId}`)
  }

  const artistsText =
    album.artists.length > 0
      ? album.artists.map((a) => a.artist.name).join(", ")
      : t("common.unknownArtist")

  return (
    <ScopedPalette palette={palette}>
      <Header
        scrollY={scrollY}
        showHeader={showHeader}
        headerBackgroundAnimation={!album.thumbnail}
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
              fileName={album.thumbnail}
              placeholderIcon="Disc"
              containerStyle={styles.thumbnail}
            />
            <View style={styles.textContainer}>
              <Text weight="medium" numberOfLines={1}>
                {album.name}
              </Text>
              {album.artists.length > 0 ? (
                <Pressable onPress={() => handleArtistPress(album.artists[0].artistId)}>
                  <Text size="xs" color="mutedForeground" numberOfLines={1}>
                    {artistsText}
                  </Text>
                </Pressable>
              ) : (
                <Text size="xs" color="mutedForeground" numberOfLines={1}>
                  {artistsText}
                </Text>
              )}
            </View>
          </View>
        }
        {...props}
      />
    </ScopedPalette>
  )
}

const albumInfoStickyHeaderStyles = createStyleSheet(({ theme }) => ({
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
    borderRadius: theme.radius("sm")
  },
  textContainer: {
    gap: theme.space("xs")
  }
}))

export { AlbumInfoStickyHeader }
