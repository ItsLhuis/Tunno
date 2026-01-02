import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useSongPlayback } from "./hooks"

import PlayingLottie from "@assets/lotties/Playing.json"
import LottieView from "lottie-react-native"

import { Fade, Pressable, Text, Thumbnail } from "@components/ui"

import { SongActions } from "../SongActions"

import { type SongItemListProps } from "./types"

const SongItemList = memo(
  ({
    song,
    allSongIds,
    playSource = "songs",
    sourceContextId,
    queueIndex,
    playlistId,
    queuePlayback = false
  }: SongItemListProps) => {
    const styles = useStyles(songItemListStyles)

    const { t } = useTranslation()

    const { isCurrentlyPlaying, isTrackLoading, handlePlaySong } = useSongPlayback(
      song.id,
      allSongIds,
      playSource,
      sourceContextId,
      { queuePlayback, queueIndex }
    )

    const handlePress = async () => {
      if (isTrackLoading) return

      await handlePlaySong()
    }

    const artistsText =
      song.artists.length > 0
        ? song.artists.map((a) => a.artist.name).join(", ")
        : t("common.unknownArtist")

    return (
      <SongActions
        variant="context"
        songId={song.id}
        queueIndex={queueIndex}
        playlistId={playlistId}
      >
        {({ onLongPress }) => (
          <Pressable style={styles.container} onPress={handlePress} onLongPress={onLongPress}>
            <Thumbnail fileName={song.thumbnail} placeholderIcon="Music" />
            <View style={styles.infoContainer}>
              <Text weight="medium" numberOfLines={1}>
                {song.name}
              </Text>
              <Text size="xs" color="mutedForeground" numberOfLines={1}>
                {artistsText}
              </Text>
            </View>
            <Fade show={isCurrentlyPlaying}>
              <LottieView source={PlayingLottie} autoPlay loop style={styles.lottie} />
            </Fade>
            <SongActions songId={song.id} queueIndex={queueIndex} playlistId={playlistId} />
          </Pressable>
        )}
      </SongActions>
    )
  }
)

const songItemListStyles = createStyleSheet(({ theme }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  indexText: {
    textAlign: "center"
  },
  lottie: {
    width: theme.size(5),
    height: theme.size(5)
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { SongItemList }
