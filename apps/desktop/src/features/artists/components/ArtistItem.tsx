import { MouseEvent, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { useFetchSongIdsByArtistId } from "../hooks/useFetchSongIdsByArtistId"

import { Button, IconButton, SafeLink, Thumbnail, Typography } from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistItemProps = {
  artist: Artist
}

const ArtistItem = ({ artist }: ArtistItemProps) => {
  const { t } = useTranslation()

  const { loadTracks, play, isTrackLoading } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading
    }))
  )

  const { data } = useFetchSongIdsByArtistId(artist.id)

  const songIds = useMemo(() => {
    if (!data) return []
    return data
  }, [data])

  const handlePlayArtist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (songIds.length === 0) return

    await loadTracks(songIds, 0, "artist", artist.id)
    await play()
  }

  return (
    <Button variant="ghost" asChild className="group relative h-auto w-fit p-3">
      <SafeLink to="/artists" params={{ id: artist.id.toString() }}>
        <div className="relative flex flex-col items-start">
          <div className="mb-3">
            <Thumbnail
              fileName={artist.thumbnail}
              alt={artist.name}
              containerClassName="size-24 rounded-full"
              className={artist.thumbnail ? "size-24" : "size-8"}
            />
          </div>
          <Typography>{artist.name}</Typography>
          {songIds.length > 0 && (
            <div className="absolute bottom-7 right-0 z-10 opacity-0 transition-all group-hover:opacity-100">
              <IconButton
                name="Play"
                tooltip={t("common.play")}
                onClick={handlePlayArtist}
                isLoading={isTrackLoading}
              />
            </div>
          )}
        </div>
      </SafeLink>
    </Button>
  )
}

export { ArtistItem }
