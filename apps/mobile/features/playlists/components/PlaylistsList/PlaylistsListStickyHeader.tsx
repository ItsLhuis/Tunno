import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { FadingView, Header, IconButton, Text, type HeaderProps } from "@components/ui"

type PlaylistsListStickyHeaderProps = {
  allPlaylistIds: number[]
  allSongIds: number[]
} & HeaderProps

const PlaylistsListStickyHeader = ({
  allPlaylistIds,
  allSongIds,
  scrollY,
  showHeader,
  ...props
}: PlaylistsListStickyHeaderProps) => {
  const styles = useStyles(playlistsListStickyHeaderStyles)

  const router = useRouter()

  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const handleCreatePlaylist = () => {
    router.push("/playlists/insert")
  }

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerCenter={
        <Text weight="semibold" numberOfLines={1}>
          {t("playlists.title")}
        </Text>
      }
      headerLeft={
        <View style={styles.headerLeft}>
          <IconButton name="Plus" variant="ghost" onPress={handleCreatePlaylist} />
          <FadingView opacity={showHeader}>
            <IconButton
              name="Shuffle"
              variant="text"
              onPress={handleShuffleAndPlay}
              isLoading={isShuffling}
              disabled={!allSongIds || allSongIds.length === 0}
            />
          </FadingView>
        </View>
      }
      {...props}
    />
  )
}

const playlistsListStickyHeaderStyles = createStyleSheet(({ theme }) => ({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("sm")
  }
}))

export { PlaylistsListStickyHeader }
