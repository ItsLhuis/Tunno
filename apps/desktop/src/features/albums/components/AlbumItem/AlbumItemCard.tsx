import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useAlbumPlayback } from "./hooks"

import { cn } from "@lib/utils"

import { IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { AlbumActions } from "../AlbumActions"

import { formatDuration } from "@repo/utils"

import { type AlbumItemCardProps } from "./types"

const AlbumItemCard = memo(({ album }: AlbumItemCardProps) => {
  const { t } = useTranslation()

  const { isLoading, isTrackLoading, handlePlayAlbum } = useAlbumPlayback(album.id)

  const canPlay = album.totalTracks > 0

  return (
    <AlbumActions variant="context" albumId={album.id}>
      <div className="group focus-within:bg-accent hover:bg-accent relative flex h-full w-full flex-col items-start rounded p-2 transition-colors">
        <div className="mb-2 h-full w-full">
          <Thumbnail
            placeholderIcon="Disc"
            fileName={album.thumbnail}
            alt={album.name}
            containerClassName="h-full w-full rounded"
            className={cn("h-full w-full", !album.thumbnail && "p-[25%]")}
          />
        </div>
        <div className="flex w-full items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Marquee>
              <SafeLink to="/albums/$id" params={{ id: album.id.toString() }}>
                <Typography className="w-full truncate">{album.name}</Typography>
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
            <AlbumActions albumId={album.id}>
              <IconButton name="MoreHorizontal" variant="secondary" tooltip={t("common.more")} />
            </AlbumActions>
          </div>
        </div>
        <div className="absolute right-2 bottom-13 z-10 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
          {canPlay && (
            <IconButton
              name="Play"
              tooltip={t("common.play")}
              onClick={handlePlayAlbum}
              isLoading={isTrackLoading || isLoading}
              disabled={!canPlay}
            />
          )}
        </div>
      </div>
    </AlbumActions>
  )
})

export { AlbumItemCard }
