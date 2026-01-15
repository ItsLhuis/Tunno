import { type CSSProperties, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailSrc } from "@hooks/useThumbnailSrc"
import { usePaletteCssVariables } from "@hooks/usePaletteCssVariables"

import { cn } from "@lib/utils"

import { IconButton, Marquee, Thumbnail, Typography } from "@components/ui"

import { AnimatePresence, motion } from "motion/react"

import { RepeatMode } from "@track-player/web"

const NextSongPreview = () => {
  const { t } = useTranslation()

  const {
    queueIds,
    currentTrackIndex,
    cachedSongs,
    duration,
    position,
    repeatMode,
    playNext,
    canPlayNext,
    isTransitioning
  } = usePlayerStore(
    useShallow((state) => ({
      queueIds: state.queueIds,
      currentTrackIndex: state.currentTrackIndex,
      cachedSongs: state.cachedSongs,
      duration: state.duration,
      position: state.position,
      repeatMode: state.repeatMode,
      playNext: state.playNext,
      canPlayNext: state.canPlayNext,
      isTransitioning: state.isTransitioning
    }))
  )

  const { nextSong, shouldShow } = useMemo(() => {
    if (currentTrackIndex === null || queueIds.length === 0 || duration === 0) {
      return { nextSong: null, shouldShow: false }
    }

    const remainingTime = duration - position
    const shouldShowPreview = remainingTime <= 10 && remainingTime > 0

    if (!shouldShowPreview) {
      return { nextSong: null, shouldShow: false }
    }

    let nextIndex: number | null = null

    if (repeatMode === RepeatMode.Track) {
      return { nextSong: null, shouldShow: false }
    }

    if (repeatMode === RepeatMode.Queue) {
      nextIndex = currentTrackIndex + 1 >= queueIds.length ? 0 : currentTrackIndex + 1
    } else {
      nextIndex = currentTrackIndex + 1 < queueIds.length ? currentTrackIndex + 1 : null
    }

    if (nextIndex === null) {
      return { nextSong: null, shouldShow: false }
    }

    const nextSongId = queueIds[nextIndex]
    const nextSongData = cachedSongs.get(nextSongId)

    if (!nextSongData) {
      return { nextSong: null, shouldShow: false }
    }

    return {
      nextSong: nextSongData,
      shouldShow: true
    }
  }, [queueIds, currentTrackIndex, cachedSongs, duration, position, repeatMode])

  const thumbnailSrc = useThumbnailSrc({ fileName: nextSong?.thumbnail })

  const { palette } = useImageColorAndPalette({
    imageSrc: thumbnailSrc,
    enabled: shouldShow && !!nextSong
  })

  const cssVariables = usePaletteCssVariables(palette)

  const handlePlayNext = async () => {
    if (!canPlayNext || isTransitioning) return
    await playNext()
  }

  return (
    <AnimatePresence>
      {shouldShow && nextSong && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-background absolute right-[2vh] bottom-[2vh] z-10 flex max-w-[25vw] items-center gap-[1vh] rounded p-[1.5vh] shadow-lg backdrop-blur-md"
          style={cssVariables as CSSProperties}
        >
          <div className="shrink-0">
            <Thumbnail
              placeholderIcon="Music"
              fileName={nextSong.thumbnail}
              alt={nextSong.name}
              containerClassName={cn("size-[7vh]", nextSong.thumbnail && "border-none")}
              className={nextSong.thumbnail ? "size-[7vh]" : "size-[3vh]"}
            />
          </div>
          <div className="flex w-full min-w-0 flex-1 items-center gap-[1vh]">
            <div className="flex w-full min-w-0 flex-col gap-[0.25vh] truncate">
              <Typography
                affects={["small", "muted"]}
                className="mb-[0.75vh] text-[1.25vh] tracking-wide uppercase"
              >
                {t("common.upNext")}
              </Typography>
              <Marquee className="w-full">
                <Typography variant="h4" className="text-primary text-[2vh]">
                  {nextSong.name}
                </Typography>
              </Marquee>
              <Marquee className="w-full">
                <Typography affects={["muted"]} className="text-[1.25vh]">
                  {nextSong.artists && nextSong.artists.length > 0
                    ? nextSong.artists.map((artist) => artist.artist.name).join(", ")
                    : t("common.unknownArtist")}
                </Typography>
              </Marquee>
            </div>
            <IconButton
              name="Play"
              onClick={handlePlayNext}
              disabled={!canPlayNext || isTransitioning}
              className="size-[4vh] shrink-0 rounded-full [&_svg]:size-[2vh]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { NextSongPreview }
