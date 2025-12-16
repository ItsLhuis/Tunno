import { Fragment, memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useArtistPlayback } from "./hooks"

import { Badge, IconButton, SafeLink, Thumbnail, Typography } from "@components/ui"

import { ArtistActions } from "../ArtistActions"

import { formatDuration } from "@repo/utils"

import { type ArtistItemHeroProps } from "./types"

const ArtistItemHero = memo(({ artist, heroLabel }: ArtistItemHeroProps) => {
  const { t } = useTranslation()

  const { songIds, isShuffling, handleShuffleAndPlay } = useArtistPlayback(artist.id)

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
          placeholderIcon="User"
          fileName={artist.thumbnail}
          alt={artist.name}
          className={artist.thumbnail ? "h-full w-full" : "size-24"}
          containerClassName="h-full w-full rounded-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-1 flex-col gap-2">
          {heroLabel && (
            <Badge variant="muted" className="w-fit">
              {heroLabel}
            </Badge>
          )}
          <SafeLink to="/artists/$id" params={{ id: artist.id.toString() }}>
            <Typography
              variant="h1"
              className="line-clamp-1 text-4xl break-all md:text-6xl lg:text-7xl xl:text-8xl"
            >
              {artist.name}
            </Typography>
          </SafeLink>
          <Typography affects={["muted", "small"]}>
            {t("common.songsPlayed", { count: artist.totalTracks })}
            {artist.totalDuration > 0 && (
              <Fragment> • {formatDuration(artist.totalDuration, t)}</Fragment>
            )}
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
          <ArtistActions artistId={artist.id} />
        </div>
      </div>
    </div>
  )
})

export { ArtistItemHero }
