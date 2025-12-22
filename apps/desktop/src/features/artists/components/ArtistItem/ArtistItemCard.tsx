import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useArtistPlayback } from "./hooks"

import { IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { ArtistActions } from "../ArtistActions"

import { formatDuration } from "@repo/utils"

import { type ArtistItemCardProps } from "./types"

const ArtistItemCard = memo(({ artist }: ArtistItemCardProps) => {
  const { t } = useTranslation()

  const { isLoading, isTrackLoading, handlePlayArtist } = useArtistPlayback(artist.id)

  const canPlay = artist.totalTracks > 0

  return (
    <ArtistActions variant="context" artistId={artist.id}>
      <div className="group focus-within:bg-accent hover:bg-accent relative flex size-full flex-col items-start rounded p-2 transition-colors">
        <div className="mb-2 size-full">
          <Thumbnail
            placeholderIcon="User"
            fileName={artist.thumbnail}
            alt={artist.name}
            containerClassName="size-full rounded-full"
            className="size-full"
          />
        </div>
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Marquee>
              <SafeLink to="/artists/$id" params={{ id: artist.id.toString() }}>
                <Typography className="w-full truncate">{artist.name}</Typography>
              </SafeLink>
            </Marquee>
            <Marquee>
              <Typography affects={["muted", "small"]}>
                {t("common.songsPlayed", { count: artist.totalTracks })}
                {artist.totalDuration > 0 && ` • ${formatDuration(artist.totalDuration, t)}`}
              </Typography>
            </Marquee>
          </div>
          <div className="shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
            <ArtistActions artistId={artist.id}>
              <IconButton name="MoreHorizontal" variant="secondary" tooltip={t("common.more")} />
            </ArtistActions>
          </div>
        </div>
        <div className="absolute right-2 bottom-13 z-10 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
          {canPlay && (
            <IconButton
              name="Play"
              tooltip={t("common.play")}
              onClick={handlePlayArtist}
              isLoading={isTrackLoading || isLoading}
              disabled={!canPlay}
            />
          )}
        </div>
      </div>
    </ArtistActions>
  )
})

export { ArtistItemCard }
