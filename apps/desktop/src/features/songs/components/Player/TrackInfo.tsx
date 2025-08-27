import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { cn } from "@lib/utils"

import { Fade, IconButton, Marquee, Thumbnail, Typography } from "@components/ui"

const TrackInfo = () => {
  const { t } = useTranslation()

  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  return (
    <div className="flex h-full items-center gap-3 truncate">
      {currentTrack ? (
        <Fade>
          <Thumbnail
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName="size-24 border border-muted rounded-md"
            className={cn("object-cover", currentTrack?.thumbnail ? "size-24" : "size-8")}
          />
        </Fade>
      ) : (
        <div className="size-24" />
      )}
      <Fade show={!!currentTrack} className="w-full truncate">
        <IconButton
          name="Heart"
          isFilled
          tooltip={t("common.favorite")}
          variant="text"
          className="shrink-0"
          disabled={!currentTrack}
        />
        <Marquee>
          <Typography variant="h6">{currentTrack?.title}</Typography>
        </Marquee>
        <Marquee>
          {currentTrack?.artist ? (
            <Typography affects={["muted"]}>{currentTrack?.artist}</Typography>
          ) : (
            <Typography affects={["muted"]}>Unkown artist</Typography>
          )}
        </Marquee>
      </Fade>
    </div>
  )
}

export { TrackInfo }
