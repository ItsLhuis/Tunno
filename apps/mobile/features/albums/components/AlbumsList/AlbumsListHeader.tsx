import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useAlbumsStore } from "../../stores/useAlbumsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

import { IconButton, LargeHeader, Tabs, TabsList, TabsTrigger, Text } from "@components/ui"

type AlbumsListHeaderProps = {
  allAlbumIds: number[]
}

const AlbumsListHeader = ({ allAlbumIds }: AlbumsListHeaderProps) => {
  const styles = useStyles(albumsListHeaderStyles)

  const { t } = useTranslation()

  const viewMode = useAlbumsStore((state) => state.viewMode)
  const setViewMode = useAlbumsStore((state) => state.setViewMode)

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const { data: allSongIds, isLoading } = useFetchSongIdsByAlbumIds(allAlbumIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || isLoading || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  return (
    <LargeHeader>
      <View style={styles.leftSection}>
        <IconButton
          name="Shuffle"
          style={styles.shuffleButton}
          iconSize="3xl"
          onPress={handleShuffleAndPlay}
          isLoading={isShuffling || isLoading}
          disabled={!allSongIds || allSongIds.length === 0}
        />
        <Text variant="h1" numberOfLines={1} style={styles.title}>
          {t("albums.title")}
        </Text>
      </View>
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
        <TabsList>
          <TabsTrigger value="grid" icon="Grid3x3" />
          <TabsTrigger value="list" icon="List" />
        </TabsList>
      </Tabs>
    </LargeHeader>
  )
}

const albumsListHeaderStyles = createStyleSheet(({ theme }) => ({
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  shuffleButton: {
    width: theme.size(14),
    height: theme.size(14),
    borderRadius: theme.radius("full")
  },
  title: {
    flex: 1
  }
}))

export { AlbumsListHeader }
