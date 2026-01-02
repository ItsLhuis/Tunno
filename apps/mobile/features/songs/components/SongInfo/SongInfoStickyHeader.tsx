import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

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

import { State } from "react-native-track-player"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoStickyHeaderProps = {
  song: SongWithAllRelations
} & HeaderProps

const SongInfoStickyHeader = ({
  song,
  scrollY,
  showHeader,
  ...props
}: SongInfoStickyHeaderProps) => {
  const styles = useStyles(songInfoStickyHeaderStyles)

  const { t } = useTranslation()

  const { play, pause, playbackState, isTrackLoading, currentTrackId, loadTracks } = usePlayerStore(
    useShallow((state) => ({
      play: state.play,
      pause: state.pause,
      playbackState: state.playbackState,
      isTrackLoading: state.isTrackLoading,
      currentTrackId: state.currentTrackId,
      loadTracks: state.loadTracks
    }))
  )

  const isCurrentSong = currentTrackId === song.id
  const isCurrentlyPlaying = playbackState === State.Playing && isCurrentSong

  const canPlay = !isTrackLoading

  const handlePlayPause = async () => {
    if (!canPlay) return

    if (isCurrentSong) {
      if (isCurrentlyPlaying) {
        await pause()
      } else {
        await play()
      }
    } else {
      await loadTracks([song.id], 0, "songs")
      await play()
    }
  }

  const handleArtistPress = (artistId: number) => {
    console.log(artistId)
    // router.push(`/artists/${artistId}`)
  }

  const artistsText =
    song.artists.length > 0
      ? song.artists.map((a) => a.artist.name).join(", ")
      : t("common.unknownArtist")

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerLeft={
        <View style={styles.headerLeft}>
          <BackButton />
          <FadingView opacity={showHeader}>
            <IconButton
              name={isCurrentlyPlaying ? "Pause" : "Play"}
              isLoading={isTrackLoading}
              variant="text"
              onPress={handlePlayPause}
              disabled={!canPlay}
            />
          </FadingView>
        </View>
      }
      headerCenter={
        <View style={styles.headerCenter}>
          <Thumbnail
            fileName={song.thumbnail}
            placeholderIcon="Music"
            containerStyle={styles.thumbnail}
          />
          <View style={styles.textContainer}>
            <Text weight="medium" numberOfLines={1}>
              {song.name}
            </Text>
            {song.artists.length > 0 ? (
              <Pressable onPress={() => handleArtistPress(song.artists[0].artistId)}>
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
  )
}

const songInfoStickyHeaderStyles = createStyleSheet(({ theme }) => ({
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

export { SongInfoStickyHeader }
