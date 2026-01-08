import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByArtistIds } from "@features/songs/hooks/useFetchSongIdsByArtistIds"

import { FadingView, Header, IconButton, Text, type HeaderProps } from "@components/ui"

type ArtistsListStickyHeaderProps = {
  allArtistIds: number[]
} & HeaderProps

const ArtistsListStickyHeader = ({
  allArtistIds,
  scrollY,
  showHeader,
  ...props
}: ArtistsListStickyHeaderProps) => {
  const styles = useStyles(artistsListStickyHeaderStyles)

  const router = useRouter()

  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data: allSongIds, isLoading } = useFetchSongIdsByArtistIds(allArtistIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || isLoading || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const handleCreateArtist = () => {
    router.push("/artists/insert")
  }

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerCenter={
        <Text weight="semibold" numberOfLines={1}>
          {t("artists.title")}
        </Text>
      }
      headerLeft={
        <View style={styles.headerLeft}>
          <IconButton name="Plus" variant="ghost" onPress={handleCreateArtist} />
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

const artistsListStickyHeaderStyles = createStyleSheet(({ theme }) => ({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("sm")
  }
}))

export { ArtistsListStickyHeader }
