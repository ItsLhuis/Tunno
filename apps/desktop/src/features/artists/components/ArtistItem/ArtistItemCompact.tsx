import { Fragment, memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedRender } from "@hooks/useDelayedRender"

import { useArtistPlayback } from "./hooks"

import {
  IconButton,
  Marquee,
  SafeLink,
  ScopedTheme,
  Skeleton,
  Thumbnail,
  Typography
} from "@components/ui"

import { ArtistActions } from "../ArtistActions"

import { formatDuration } from "@repo/utils"

import { type ArtistItemCompactProps } from "./types"

const ArtistItemCompactPlaceholder = () => (
  <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded p-2">
    <Skeleton className="size-14 rounded-full" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-32 rounded" />
      <Skeleton className="h-3.25 w-24 rounded" />
    </div>
  </div>
)

const ArtistItemCompact = memo(function ArtistItemCompact({
  artist,
  index = 0
}: ArtistItemCompactProps) {
  const { t } = useTranslation()

  const { shouldRender } = useDelayedRender({ index })

  const { isLoading, isTrackLoading, handlePlayArtist } = useArtistPlayback(artist.id)

  const canPlay = artist.totalTracks > 0

  if (!shouldRender) {
    return <ArtistItemCompactPlaceholder />
  }

  return (
    <ArtistActions variant="context" artistId={artist.id}>
      <div className="group focus-within:bg-accent hover:bg-accent grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded p-2 transition-colors">
        <div className="relative overflow-hidden rounded-full">
          <Thumbnail
            placeholderIcon="User"
            fileName={artist.thumbnail}
            alt={artist.name}
            containerClassName="rounded-full"
          />
          {canPlay && (
            <Fragment>
              <div className="absolute inset-0 w-full bg-black/50 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100" />
              <ScopedTheme
                theme="dark"
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
              >
                <IconButton
                  name="Play"
                  variant="ghost"
                  tooltip={t("common.play")}
                  onClick={handlePlayArtist}
                  isLoading={isTrackLoading || isLoading}
                />
              </ScopedTheme>
            </Fragment>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <Marquee>
            <SafeLink to="/artists/$id" params={{ id: artist.id.toString() }}>
              <Typography className="truncate">{artist.name}</Typography>
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
          <ArtistActions artistId={artist.id} />
        </div>
      </div>
    </ArtistActions>
  )
})

export { ArtistItemCompact }
