import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useToggleArtistFavorite } from "../../hooks/useToggleArtistFavorite"

import { ArtistActions } from "../ArtistActions"

import { Badge, IconButton, Typography } from "@components/ui"

import { formatDuration } from "@repo/utils"

import { type ArtistWithAllRelations } from "@repo/api"

type ArtistInfoStickyHeaderProps = {
  artist: ArtistWithAllRelations
}

const ArtistInfoStickyHeader = ({ artist }: ArtistInfoStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || !artist.songs || artist.songs.length === 0) return
    const songIds = artist.songs.map((song) => song.songId)
    shuffleAndPlay(songIds, "artist", artist.id)
  }

  const toggleFavoriteMutation = useToggleArtistFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: artist.id })
  }

  return (
    <div className="flex w-full items-center gap-4 border-b bg-background/95 px-9 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            {artist.thumbnail ? (
              <img
                src={artist.thumbnail}
                alt={artist.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold">{artist.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="muted" className="text-xs">
              {t("common.artist")}
            </Badge>
            <Typography variant="h3" affects={["bold"]} className="truncate">
              {artist.name}
            </Typography>
          </div>
          <Typography affects={["small", "muted"]} className="truncate">
            {t("common.song")} ({artist.totalTracks}) • {formatDuration(artist.totalDuration, t)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          name="Shuffle"
          className="h-10 w-10 shrink-0 rounded-full [&_svg]:size-5"
          isLoading={isShuffling}
          disabled={!artist.songs || artist.songs.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <IconButton
          name="Heart"
          isFilled={artist.isFavorite}
          tooltip={artist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <ArtistActions artist={artist} />
      </div>
    </div>
  )
}

export { ArtistInfoStickyHeader }
