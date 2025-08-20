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
      <Thumbnail
        fileName={currentTrack?.thumbnail}
        alt={currentTrack?.title}
        containerClassName="size-24 border border-muted rounded-md"
        className={cn("object-cover", currentTrack?.thumbnail ? "size-24" : "size-8")}
      />
      <div className="h-full w-full truncate">
        <IconButton
          name="Heart"
          isFilled
          tooltip={t("common.favorite")}
          variant="text"
          className="shrink-0"
          disabled={!currentTrack}
        />
        {currentTrack && (
          <Fade key={currentTrack.title}>
            <Marquee>
              <Typography variant="h6">{currentTrack.title}</Typography>
            </Marquee>
            <Marquee>
              <Typography affects={["muted"]}>{currentTrack.artist}</Typography>
            </Marquee>
          </Fade>
        )}
      </div>
    </div>
  )
}

export { TrackInfo }
