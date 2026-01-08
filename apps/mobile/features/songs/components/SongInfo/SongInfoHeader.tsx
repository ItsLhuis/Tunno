import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleSongFavorite } from "../../hooks/useToggleSongFavorite"

import { calculateStreak, formatTime } from "@repo/utils"

import StreakLottie from "@assets/lotties/Streak.json"
import LottieView from "lottie-react-native"

import {
  Badge,
  DominantColorGradient,
  IconButton,
  LargeHeader,
  Pressable,
  Text,
  Thumbnail
} from "@components/ui"

import { SongActions } from "../SongActions"
import { SongStatsSheet } from "./SongStatsSheet"

import { State } from "react-native-track-player"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoHeaderProps = {
  song: SongWithAllRelations
}

const SongInfoHeader = ({ song }: SongInfoHeaderProps) => {
  const styles = useStyles(songInfoHeaderStyles)

  const { t } = useTranslation()

  const router = useRouter()

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

  const toggleFavoriteMutation = useToggleSongFavorite()

  const playHistory = song.playHistory ?? []
  const streak = calculateStreak(playHistory)

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: song.id })
  }

  const handleArtistPress = (artistId: number) => {
    router.push(`/artists/${artistId}`)
  }

  const handleAlbumPress = (albumId: number) => {
    router.push(`/albums/${albumId}`)
  }

  return (
    <LargeHeader style={styles.container}>
      <DominantColorGradient thumbnail={song.thumbnail} />
      <View style={styles.content}>
        <Thumbnail
          fileName={song.thumbnail}
          placeholderIcon="Music"
          containerStyle={styles.thumbnail}
        />
        <View style={styles.infoContainer}>
          <Badge variant="muted" title={t("common.song")} style={styles.badge} />
          <Text variant="h1" numberOfLines={2}>
            {song.name}
          </Text>
          <View style={styles.metaContainer}>
            {song.artists.length > 0 ? (
              <Pressable onPress={() => handleArtistPress(song.artists[0].artistId)}>
                <Text size="sm" numberOfLines={1}>
                  {song.artists[0].artist.name}
                </Text>
              </Pressable>
            ) : (
              <Text size="sm" color="mutedForeground" numberOfLines={1}>
                {t("common.unknownArtist")}
              </Text>
            )}
            {song.album ? (
              <Pressable onPress={() => handleAlbumPress(song.album!.id)}>
                <Text size="sm" color="mutedForeground" numberOfLines={1}>
                  {song.album.name}
                </Text>
              </Pressable>
            ) : (
              <Text size="sm" color="mutedForeground" numberOfLines={1}>
                {t("common.unknownAlbum")}
              </Text>
            )}
            <Text size="sm" color="mutedForeground">
              {song.releaseYear && `${song.releaseYear} • `}
              {formatTime(song.duration)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <IconButton
          name={isCurrentlyPlaying ? "Pause" : "Play"}
          isLoading={isTrackLoading}
          style={styles.playButton}
          iconSize="2xl"
          onPress={handlePlayPause}
          disabled={!canPlay}
        />
        <IconButton
          name="Heart"
          isFilled={song.isFavorite}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onPress={handleToggleFavorite}
        />
        <SongStatsSheet song={song} />
        <SongActions songId={song.id} />
        {streak >= 2 && (
          <LottieView source={StreakLottie} autoPlay loop style={styles.streakLottie} />
        )}
      </View>
    </LargeHeader>
  )
}

const songInfoHeaderStyles = createStyleSheet(({ theme }) => ({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.space("lg"),
    paddingHorizontal: theme.space("lg")
  },
  content: {
    flexDirection: "column",
    gap: theme.space("lg")
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: theme.radius("lg")
  },
  infoContainer: {
    gap: theme.space("sm")
  },
  badge: {
    alignSelf: "flex-start"
  },
  metaContainer: {
    gap: theme.space("xs")
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.space()
  },
  playButton: {
    width: theme.size(14),
    height: theme.size(14),
    borderRadius: theme.radius("full")
  },
  streakLottie: {
    width: theme.size(8),
    height: theme.size(8)
  }
}))

export { SongInfoHeader }
