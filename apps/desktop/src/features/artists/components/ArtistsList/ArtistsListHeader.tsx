import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchSongsByArtistIds } from "@features/songs/hooks/useFetchSongsByArtistIds"

import { ArtistForm } from "../../forms/ArtistForm"

import { Header, IconButton, Typography, type VirtualizedListController } from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistsListHeaderProps = {
  list: VirtualizedListController<Artist>
  allArtistIds: number[]
}

const ArtistsListHeader = ({ list, allArtistIds }: ArtistsListHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data: allSongs, isLoading } = useFetchSongsByArtistIds(allArtistIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongs || allSongs.length === 0) return
    const songIds = allSongs.map((song) => song.id)
    shuffleAndPlay(songIds, "queue")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex items-center gap-3">
      <ArtistForm
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={t("form.titles.createArtist")}
          />
        }
      />
      <IconButton
        name="Shuffle"
        className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
        isLoading={isShuffling || isLoading}
        disabled={hasSelectedRows || !allSongs || allSongs.length === 0}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h1" className="truncate">
        {t("artists.title")}
      </Typography>
    </Header>
  )
}

export { ArtistsListHeader }
