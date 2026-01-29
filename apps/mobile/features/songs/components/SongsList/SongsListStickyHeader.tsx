import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { FadingView, Header, IconButton, Text, type HeaderProps } from "@components/ui"

type SongsListStickyHeaderProps = {
  allSongIds: number[]
} & HeaderProps

const SongsListStickyHeader = ({
  allSongIds,
  scrollY,
  showHeader,
  ...props
}: SongsListStickyHeaderProps) => {
  const styles = useStyles(songsListStickyHeaderStyles)

  const router = useRouter()

  const { t } = useTranslation()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const handleCreateSong = () => {
    router.push("/songs/insert")
  }

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerCenter={
        <Text weight="semibold" numberOfLines={1}>
          {t("songs.title")}
        </Text>
      }
      headerLeft={
        <View style={styles.headerLeft}>
          <IconButton name="Plus" variant="ghost" onPress={handleCreateSong} />
          <FadingView opacity={showHeader}>
            <IconButton
              name="Shuffle"
              variant="text"
              onPress={handleShuffleAndPlay}
              isLoading={isShuffling}
              disabled={allSongIds.length === 0}
            />
          </FadingView>
        </View>
      }
      {...props}
    />
  )
}

const songsListStickyHeaderStyles = createStyleSheet(({ theme }) => ({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("sm")
  }
}))

export { SongsListStickyHeader }
