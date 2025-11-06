import { useEffect, useMemo, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { cn } from "@lib/utils"

import ColorThief from "colorthief"

import { parseToHsl } from "polished"

import { generateColorPalette, type Palette } from "@repo/utils"

import { getRenderableFileSrc } from "@services/storage"

import { IconButton, Marquee, Thumbnail, Typography } from "@components/ui"

import { AnimatePresence, motion } from "motion/react"

import { RepeatMode } from "react-track-player-web"

const rgbToHslString = (rgb: string): string | null => {
  try {
    const hsl = parseToHsl(rgb)
    return `${Math.round(hsl.hue || 0)} ${Math.round(hsl.saturation * 100)}% ${Math.round(hsl.lightness * 100)}%`
  } catch {
    return null
  }
}

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

  const [palette, setPalette] = useState<Palette | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

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

  useEffect(() => {
    const loadImage = async () => {
      if (!nextSong?.thumbnail) {
        setImageSrc(null)
        setPalette(null)
        return
      }

      try {
        const src = await getRenderableFileSrc(nextSong.thumbnail, "thumbnails")
        setImageSrc(src)
      } catch {
        setImageSrc(null)
        setPalette(null)
      }
    }

    if (shouldShow && nextSong) {
      loadImage()
    } else {
      setImageSrc(null)
      setPalette(null)
    }
  }, [nextSong?.thumbnail, shouldShow, nextSong])

  useEffect(() => {
    if (!imageSrc || !imageRef.current) {
      setPalette(null)
      return
    }

    const image = imageRef.current
    const colorThief = new ColorThief()

    const handleImageLoad = () => {
      try {
        const color = colorThief.getColor(image) as [number, number, number]
        const generatedPalette = generateColorPalette(color)
        setPalette(generatedPalette)
      } catch {
        setPalette(null)
      }
    }

    if (image.complete && image.naturalWidth > 0) {
      handleImageLoad()
    } else {
      image.addEventListener("load", handleImageLoad)
      return () => {
        image.removeEventListener("load", handleImageLoad)
      }
    }
  }, [imageSrc])

  const cssVariables = palette
    ? Object.fromEntries(
        Object.entries({
          "--background": palette.background ? rgbToHslString(palette.background) : null,
          "--foreground": palette.foreground ? rgbToHslString(palette.foreground) : null,
          "--muted": palette.muted ? rgbToHslString(palette.muted) : null,
          "--muted-foreground": palette.mutedForeground
            ? rgbToHslString(palette.mutedForeground)
            : null,
          "--primary": palette.primary ? rgbToHslString(palette.primary) : null,
          "--primary-foreground": palette.primaryForeground
            ? rgbToHslString(palette.primaryForeground)
            : null,
          "--accent": palette.accent ? rgbToHslString(palette.accent) : null,
          "--accent-foreground": palette.accentForeground
            ? rgbToHslString(palette.accentForeground)
            : null
        }).filter(([, value]) => value !== null)
      )
    : {}

  const handlePlayNext = async () => {
    if (!canPlayNext || isTransitioning) return
    await playNext()
  }

  const tooltipStyle = palette
    ? {
        backgroundColor: palette.primary || undefined,
        color: palette.primaryForeground || undefined
      }
    : undefined

  return (
    <AnimatePresence>
      {shouldShow && nextSong && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute bottom-[2vh] right-[2vh] z-10 flex max-w-[25vw] items-center gap-[1vh] rounded-lg border border-accent bg-background p-[1.5vh] shadow-lg backdrop-blur-md"
          style={cssVariables as React.CSSProperties}
        >
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt=""
              style={{ display: "none" }}
              crossOrigin="anonymous"
            />
          )}
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
                className="mb-[0.75vh] text-[clamp(0.5rem,1.225vh,1.225rem)] uppercase tracking-wide"
              >
                {t("common.upNext")}
              </Typography>
              <Marquee className="w-full">
                <Typography variant="h4" className="text-[clamp(1rem,2vh,1.5rem)] text-primary">
                  {nextSong.name}
                </Typography>
              </Marquee>
              <Marquee className="w-full">
                <Typography affects={["muted"]} className="text-[clamp(0.5rem,1.225vh,1.225rem)]">
                  {nextSong.artists && nextSong.artists.length > 0
                    ? nextSong.artists.map((artist) => artist.artist.name).join(", ")
                    : t("common.unknownArtist")}
                </Typography>
              </Marquee>
            </div>
            <IconButton
              name="Play"
              tooltip={{
                children: t("common.play"),
                className: tooltipStyle ? "" : undefined,
                style: tooltipStyle
              }}
              onClick={handlePlayNext}
              disabled={!canPlayNext || isTransitioning}
              className="h-[4vh] min-h-[2.5rem] w-[4vh] min-w-[2.5rem] shrink-0 rounded-full [&_svg]:size-[clamp(1.25rem,2vh,1.25rem)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { NextSongPreview }
