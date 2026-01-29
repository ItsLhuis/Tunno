import { View } from "react-native"

import { createStyleSheet, ScopedPalette, useStyles } from "@styles"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailUri } from "@hooks/useThumbnailUri"

import { BackButton } from "@components/navigation"
import { FadingView, Header, IconButton, Text, Thumbnail, type HeaderProps } from "@components/ui"

import { type PlaylistWithAllRelations } from "@repo/api"

type PlaylistInfoStickyHeaderProps = {
  playlist: PlaylistWithAllRelations
  songIds: number[]
} & Omit<HeaderProps, "transparentBackground" | "bottomBorder" | "headerBackgroundAnimation">

const PlaylistInfoStickyHeader = ({
  playlist,
  songIds,
  scrollY,
  showHeader,
  ...props
}: PlaylistInfoStickyHeaderProps) => {
  const styles = useStyles(playlistInfoStickyHeaderStyles)

  const thumbnailUri = useThumbnailUri({ fileName: playlist.thumbnail })

  const { palette, dominantColor } = useImageColorAndPalette({ imageUri: thumbnailUri })

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || songIds.length === 0) return
    shuffleAndPlay(songIds, "playlist", playlist.id)
  }

  return (
    <ScopedPalette palette={palette}>
      <Header
        scrollY={scrollY}
        showHeader={showHeader}
        headerBackgroundAnimation={!playlist.thumbnail}
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
              fileName={playlist.thumbnail}
              placeholderIcon="ListMusic"
              containerStyle={styles.thumbnail}
            />
            <View style={styles.textContainer}>
              <Text weight="medium" numberOfLines={1}>
                {playlist.name}
              </Text>
            </View>
          </View>
        }
        {...props}
      />
    </ScopedPalette>
  )
}

const playlistInfoStickyHeaderStyles = createStyleSheet(({ theme }) => ({
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

export { PlaylistInfoStickyHeader }
