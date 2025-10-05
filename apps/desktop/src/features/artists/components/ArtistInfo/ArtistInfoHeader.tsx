import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useToggleArtistFavorite } from "../../hooks/useToggleArtistFavorite"

import { ArtistActions } from "../ArtistActions"

import { Badge, Header, IconButton, Thumbnail, Typography } from "@components/ui"

import { formatDuration } from "@repo/utils"

import { type ArtistWithAllRelations } from "@repo/api"

type ArtistInfoHeaderProps = {
  artist: ArtistWithAllRelations
}

const ArtistInfoHeader = ({ artist }: ArtistInfoHeaderProps) => {
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
    <Header className="flex flex-col gap-6">
      <div className="flex flex-1 items-end gap-6">
        <div className="h-60 w-60">
          <Thumbnail
            placeholderIcon="User"
            fileName={artist.thumbnail}
            alt={artist.name}
            className={artist.thumbnail ? "h-full w-full" : "size-20"}
            containerClassName="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t("common.artist")}
          </Badge>
          <Typography
            variant="h1"
            affects={["bold"]}
            className="line-clamp-2 text-4xl leading-tight md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {artist.name}
          </Typography>
          <Typography affects={["small", "muted"]}>
            {formatDuration(artist.totalDuration, t)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-3">
        <IconButton
          name="Shuffle"
          className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
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
    </Header>
  )
}

export { ArtistInfoHeader }
