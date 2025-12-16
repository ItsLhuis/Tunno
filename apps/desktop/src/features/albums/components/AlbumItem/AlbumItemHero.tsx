import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useAlbumPlayback } from "./hooks"

import { Badge, IconButton, SafeLink, Thumbnail, Typography } from "@components/ui"

import { AlbumActions } from "../AlbumActions"

import { formatDuration } from "@repo/utils"

import { type AlbumItemHeroProps } from "./types"

const AlbumItemHero = memo(({ album, heroLabel }: AlbumItemHeroProps) => {
  const { t } = useTranslation()

  const { songIds, isShuffling, handleShuffleAndPlay } = useAlbumPlayback(album.id)

  return (
    <div className="flex flex-1 items-end gap-6">
      <div
        className="shrink-0"
        style={{
          width: "clamp(20rem, 20vw, 35rem)",
          height: "clamp(20rem, 20vw, 35rem)"
        }}
      >
        <Thumbnail
          placeholderIcon="Disc"
          fileName={album.thumbnail}
          alt={album.name}
          className={album.thumbnail ? "h-full w-full" : "size-24"}
          containerClassName="h-full w-full rounded"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-1 flex-col gap-2">
          {heroLabel && (
            <Badge variant="muted" className="w-fit">
              {heroLabel}
            </Badge>
          )}
          <SafeLink to="/albums/$id" params={{ id: album.id.toString() }}>
            <Typography
              variant="h1"
              className="line-clamp-1 text-4xl break-all md:text-6xl lg:text-7xl xl:text-8xl"
            >
              {album.name}
            </Typography>
          </SafeLink>
          <Typography affects={["muted", "small"]}>
            {t("common.songsPlayed", { count: album.totalTracks })}
            {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
          </Typography>
        </div>
        <div className="flex items-center gap-3 pt-3">
          <IconButton
            name="Shuffle"
            className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
            isLoading={isShuffling}
            disabled={!songIds || songIds.length === 0}
            tooltip={t("common.shuffleAndPlay")}
            onClick={handleShuffleAndPlay}
          />
          <AlbumActions albumId={album.id} />
        </div>
      </div>
    </div>
  )
})

export { AlbumItemHero }
