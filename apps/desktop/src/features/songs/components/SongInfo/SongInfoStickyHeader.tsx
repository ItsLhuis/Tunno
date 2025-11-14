import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { IconButton, Marquee, SafeLink, StickyHeader, Thumbnail, Typography } from "@components/ui"

import { State } from "react-track-player-web"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoStickyHeaderProps = {
  song: SongWithAllRelations
}

const SongInfoStickyHeader = ({ song }: SongInfoStickyHeaderProps) => {
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

  const canPlay = currentTrackId !== null && !isTrackLoading

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

  return (
    <StickyHeader className="flex items-center gap-3 pb-9">
      <IconButton
        name={isCurrentlyPlaying ? "Pause" : "Play"}
        isLoading={isTrackLoading}
        variant="text"
        className="size-11 [&_svg]:size-5"
        tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
        onClick={handlePlayPause}
        disabled={!canPlay}
      />
      <div className="flex flex-1 items-center gap-3 truncate">
        <Thumbnail placeholderIcon="Music" fileName={song.thumbnail} alt={song.name} />
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography className="truncate">{song.name}</Typography>
          </Marquee>
          <Marquee>
            {song.artists.length > 0 ? (
              song.artists.map((artist, index) => (
                <span key={artist.artistId}>
                  <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                    <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                  </SafeLink>
                  {index < song.artists.length - 1 && (
                    <Typography affects={["muted", "small"]}>, </Typography>
                  )}
                </span>
              ))
            ) : (
              <Typography affects={["muted", "small"]}>{t("common.unknownArtist")}</Typography>
            )}
          </Marquee>
        </div>
      </div>
    </StickyHeader>
  )
}

export { SongInfoStickyHeader }
