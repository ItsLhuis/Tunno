import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

import { FadingView, Header, IconButton, Text, type HeaderProps } from "@components/ui"

type AlbumsListStickyHeaderProps = {
  allAlbumIds: number[]
} & HeaderProps

const AlbumsListStickyHeader = ({
  allAlbumIds,
  scrollY,
  showHeader,
  ...props
}: AlbumsListStickyHeaderProps) => {
  const styles = useStyles(albumsListStickyHeaderStyles)

  const router = useRouter()

  const { t } = useTranslation()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const { data: allSongIds, isLoading } = useFetchSongIdsByAlbumIds(allAlbumIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || isLoading || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const handleCreateAlbum = () => {
    router.push("/albums/insert")
  }

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerCenter={
        <Text weight="semibold" numberOfLines={1}>
          {t("albums.title")}
        </Text>
      }
      headerLeft={
        <View style={styles.headerLeft}>
          <IconButton name="Plus" variant="ghost" onPress={handleCreateAlbum} />
          <FadingView opacity={showHeader}>
            <IconButton
              name="Shuffle"
              variant="text"
              onPress={handleShuffleAndPlay}
              isLoading={isShuffling || isLoading}
              disabled={!allSongIds || allSongIds.length === 0}
            />
          </FadingView>
        </View>
      }
      {...props}
    />
  )
}

const albumsListStickyHeaderStyles = createStyleSheet(({ theme }) => ({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("sm")
  }
}))

export { AlbumsListStickyHeader }
