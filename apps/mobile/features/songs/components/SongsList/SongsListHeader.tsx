import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useSongsStore } from "../../stores/useSongsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { IconButton, LargeHeader, Tabs, TabsList, TabsTrigger, Text } from "@components/ui"

type SongsListHeaderProps = {
  allSongIds: number[]
}

const SongsListHeader = ({ allSongIds }: SongsListHeaderProps) => {
  const styles = useStyles(songsListHeaderStyles)

  const { t } = useTranslation()

  const viewMode = useSongsStore((state) => state.viewMode)
  const setViewMode = useSongsStore((state) => state.setViewMode)

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || allSongIds.length === 0) return
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
          disabled={allSongIds.length === 0}
        />
        <Text variant="h1" numberOfLines={1} style={styles.title}>
          {t("songs.title")}
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

const songsListHeaderStyles = createStyleSheet(({ theme }) => ({
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

export { SongsListHeader }
