import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { join } from "@tauri-apps/api/path"

import {
  Badge,
  Icon,
  Marquee,
  Spinner,
  Thumbnail,
  Typography,
  type IconProps
} from "@components/ui"

import type { ProcessingTrack, TrackStatus } from "../types"

type TrackItemProps = {
  track: ProcessingTrack
  processId: string | null
}

type StatusConfig = {
  [K in TrackStatus]: {
    label: string
    icon: IconProps["name"]
    variant:
      | "default"
      | "secondary"
      | "muted"
      | "destructive"
      | "outline"
      | "info"
      | "warning"
      | "error"
      | "success"
    animate?: boolean
  }
}

const TrackItem = memo(({ track, processId }: TrackItemProps) => {
  const { t } = useTranslation()

  const getThumbnailPath = (dirName: string, thumbnailName: string): Promise<string> => {
    return join(processId!, "tracks", dirName, thumbnailName)
  }

  const statusConfig: StatusConfig = {
    pending: {
      label: t("fastUpload.status.pending"),
      icon: "Clock",
      variant: "muted"
    },
    processing: {
      label: t("fastUpload.status.processing"),
      icon: "Loader",
      variant: "info",
      animate: true
    },
    success: {
      label: t("fastUpload.status.success"),
      icon: "Check",
      variant: "success"
    },
    error: {
      label: t("fastUpload.status.error"),
      icon: "X",
      variant: "error"
    },
    skipped: {
      label: t("fastUpload.status.skipped"),
      icon: "AlertCircle",
      variant: "warning"
    }
  }

  const config = statusConfig[track.status]

  return (
    <div
      className="group grid w-full items-center gap-3 rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent"
      style={{ gridTemplateColumns: "auto 1fr 1fr minmax(140px, auto)" }}
    >
      <div className="relative flex items-center justify-center">
        <Thumbnail
          placeholderIcon="Music"
          fileName={
            track.thumbnail && processId ? getThumbnailPath(track.dirName, track.thumbnail) : null
          }
          sourceDir="fastUpload"
          alt={track.title}
        />
      </div>
      <div className="flex flex-1 items-center gap-3 truncate">
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography className="truncate">{track.title}</Typography>
          </Marquee>
          <Marquee>
            {track.artists.length > 0 ? (
              track.artists.map((artist, index) => (
                <span key={index}>
                  <Typography affects={["muted", "small"]}>{artist}</Typography>
                  {index < track.artists.length - 1 && (
                    <Typography affects={["muted", "small"]}>, </Typography>
                  )}
                </span>
              ))
            ) : (
              <Typography affects={["muted", "small"]}>{t("common.unknownArtist")}</Typography>
            )}
          </Marquee>
        </div>
      </div>
      <div className="min-w-0">
        <Marquee>
          {track.album ? (
            <Typography className="truncate">{track.album}</Typography>
          ) : (
            <Typography affects={["muted"]}>{t("common.unknownAlbum")}</Typography>
          )}
        </Marquee>
      </div>
      <div className="flex items-center justify-center">
        <Badge variant={config.variant} className="flex w-max items-center gap-1.5 px-2 py-1">
          {config.animate ? (
            <Spinner variant="default" className="size-4 text-current" />
          ) : (
            <Icon name={config.icon} />
          )}
          <span className="whitespace-nowrap">{config.label}</span>
        </Badge>
      </div>
    </div>
  )
})

export { TrackItem }
