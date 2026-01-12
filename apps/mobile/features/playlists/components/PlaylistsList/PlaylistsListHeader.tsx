import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlaylistsStore } from "../../stores/usePlaylistsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { IconButton, LargeHeader, Tabs, TabsList, TabsTrigger, Text } from "@components/ui"

type PlaylistsListHeaderProps = {
  allSongIds: number[]
}

const PlaylistsListHeader = ({ allSongIds }: PlaylistsListHeaderProps) => {
  const styles = useStyles(playlistsListHeaderStyles)

  const { t } = useTranslation()

  const { viewMode, setViewMode } = usePlaylistsStore(
    useShallow((state) => ({
      viewMode: state.viewMode,
      setViewMode: state.setViewMode
    }))
  )

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

  return (
    <LargeHeader>
      <View style={styles.leftSection}>
        <IconButton
          name="Shuffle"
          style={styles.shuffleButton}
          iconSize="3xl"
          onPress={handleShuffleAndPlay}
          isLoading={isShuffling}
          disabled={!allSongIds || allSongIds.length === 0}
        />
        <Text variant="h1" numberOfLines={1} style={styles.title}>
          {t("playlists.title")}
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

const playlistsListHeaderStyles = createStyleSheet(({ theme }) => ({
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

export { PlaylistsListHeader }
