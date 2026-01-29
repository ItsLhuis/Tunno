import { Fragment, memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedRender } from "@hooks/useDelayedRender"

import { useAlbumPlayback } from "./hooks"

import {
  IconButton,
  Marquee,
  SafeLink,
  ScopedTheme,
  Skeleton,
  Thumbnail,
  Typography
} from "@components/ui"

import { AlbumActions } from "../AlbumActions"

import { formatDuration } from "@repo/utils"

import { type AlbumItemCompactProps } from "./types"

const AlbumItemCompactPlaceholder = () => (
  <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded p-2">
    <Skeleton className="size-14 rounded" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-32 rounded" />
      <Skeleton className="h-3.25 w-24 rounded" />
    </div>
  </div>
)

const AlbumItemCompact = memo(function AlbumItemCompact({
  album,
  index = 0
}: AlbumItemCompactProps) {
  const { t } = useTranslation()

  const { shouldRender } = useDelayedRender({ index })

  const { isLoading, isTrackLoading, handlePlayAlbum } = useAlbumPlayback(album.id)

  const canPlay = album.totalTracks > 0

  if (!shouldRender) {
    return <AlbumItemCompactPlaceholder />
  }

  return (
    <AlbumActions variant="context" albumId={album.id}>
      <div className="group focus-within:bg-accent hover:bg-accent grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded p-2 transition-colors">
        <div className="relative overflow-hidden rounded">
          <Thumbnail placeholderIcon="Disc" fileName={album.thumbnail} alt={album.name} />
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
                  onClick={handlePlayAlbum}
                  isLoading={isTrackLoading || isLoading}
                />
              </ScopedTheme>
            </Fragment>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <Marquee>
            <SafeLink to="/albums/$id" params={{ id: album.id.toString() }}>
              <Typography className="truncate">{album.name}</Typography>
            </SafeLink>
          </Marquee>
          <Marquee>
            <Typography affects={["muted", "small"]}>
              {t("common.songsPlayed", { count: album.totalTracks })}
              {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
            </Typography>
          </Marquee>
        </div>
        <div className="shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <AlbumActions albumId={album.id} />
        </div>
      </div>
    </AlbumActions>
  )
})

export { AlbumItemCompact }
