import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { buttonVariants, Checkbox, Marquee, Thumbnail, Typography } from "@components/ui"

import { formatDuration } from "@repo/utils"

import { type PlaylistItemSelectProps } from "./types"

const PlaylistItemSelect = memo(
  ({ playlist, selected = false, onToggle }: PlaylistItemSelectProps) => {
    const { t } = useTranslation()

    return (
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "flex h-auto w-full flex-row items-center justify-between gap-3 rounded p-3 text-left transition-colors focus:ring-0 focus:outline-hidden"
        )}
      >
        <div className="flex w-full items-center gap-3">
          <div
            className="flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Checkbox tabIndex={-1} checked={selected} onCheckedChange={onToggle} />
          </div>
          <Thumbnail
            placeholderIcon="ListMusic"
            fileName={playlist.thumbnail}
            alt={playlist.name}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Marquee>
              <Typography className="truncate font-medium">{playlist.name}</Typography>
            </Marquee>
            <Marquee>
              <Typography affects={["muted", "small"]} className="truncate">
                {t("common.songsPlayed", { count: playlist.totalTracks })}
                {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
              </Typography>
            </Marquee>
          </div>
        </div>
      </button>
    )
  }
)

export { PlaylistItemSelect }
