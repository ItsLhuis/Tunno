import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { useDelayedRender } from "@hooks/useDelayedRender"

import { join } from "@tauri-apps/api/path"

import {
  Badge,
  Icon,
  Marquee,
  Skeleton,
  Spinner,
  Thumbnail,
  Typography,
  type IconProps
} from "@components/ui"

import { type ProcessingTrack, type TrackStatus } from "../types"

type TrackItemProps = {
  index?: number
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

const TrackItemPlaceholder = ({
  gridTemplateColumns,
  showAlbumColumn
}: {
  gridTemplateColumns: string
  showAlbumColumn: boolean
}) => (
  <div className="grid w-full items-center gap-3 rounded p-2" style={{ gridTemplateColumns }}>
    <div className="flex items-center justify-center">
      <Skeleton className="aspect-square size-14 rounded" />
    </div>
    <div className="flex flex-1 items-center gap-3">
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-3.25 w-24 rounded" />
      </div>
    </div>
    {showAlbumColumn && <Skeleton className="h-3.5 w-32 rounded" />}
    <div className="flex items-center justify-center">
      <Skeleton className="h-5 w-24 rounded-full" />
    </div>
  </div>
)

const TrackItem = memo(({ index = 0, track, processId }: TrackItemProps) => {
  const { t } = useTranslation()

  const { isBelow } = useBreakpoint()

  const getThumbnailPath = (dirName: string, thumbnailName: string): Promise<string> => {
    return join(processId!, "tracks", dirName, thumbnailName)
  }

  const showAlbumColumn = !isBelow("md")

  const gridTemplateColumns = useMemo(() => {
    const cols: string[] = ["auto", "1fr"]

    if (showAlbumColumn) cols.push("1fr")
    cols.push("minmax(140px, auto)")

    return cols.join(" ")
  }, [showAlbumColumn])

  const { shouldRender } = useDelayedRender({ index })

  if (!shouldRender) {
    return (
      <TrackItemPlaceholder
        gridTemplateColumns={gridTemplateColumns}
        showAlbumColumn={showAlbumColumn}
      />
    )
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
      className="group focus-within:bg-accent hover:bg-accent grid w-full items-center gap-3 rounded p-2 transition-colors"
      style={{ gridTemplateColumns }}
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
      {showAlbumColumn && (
        <div className="min-w-0">
          <Marquee>
            {track.album ? (
              <Typography className="truncate">{track.album}</Typography>
            ) : (
              <Typography affects={["muted"]}>{t("common.unknownAlbum")}</Typography>
            )}
          </Marquee>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Badge variant={config.variant} className="flex w-max items-center gap-1.5">
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
