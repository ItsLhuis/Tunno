import { type CSSProperties, memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useImageSrc } from "@hooks/useImageSrc"
import { usePaletteCssVariables } from "@hooks/usePaletteCssVariables"

import { useAlbumPlayback } from "./hooks"

import { cn } from "@lib/utils"

import { Badge, Button, Icon, Thumbnail, Typography } from "@components/ui"

import { AnimatePresence, motion } from "motion/react"

import { formatDuration } from "@repo/utils"

import { type AlbumItemFeaturedProps } from "./types"

const AlbumItemFeatured = memo(({ album }: AlbumItemFeaturedProps) => {
  const { t } = useTranslation()

  const imageSrc = useImageSrc({ thumbnail: album.thumbnail })

  const { dominantColor, palette, imageRef } = useImageColorAndPalette({ imageSrc })

  const cssVariables = usePaletteCssVariables(palette)

  const { songIds, isShuffling, handleShuffleAndPlay } = useAlbumPlayback(album.id)

  return (
    <div className="relative" style={cssVariables as CSSProperties}>
      <AnimatePresence>
        <motion.div
          key={dominantColor}
          className={cn(
            "bg-secondary absolute inset-0 rounded-xl",
            dominantColor && "border-border border"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            backgroundColor: dominantColor || undefined
          }}
        />
      </AnimatePresence>
      {imageSrc && (
        <img ref={imageRef} src={imageSrc} style={{ display: "none" }} crossOrigin="anonymous" />
      )}
      <div className="relative flex flex-col gap-6 p-9 md:flex-row md:items-end">
        <div className="aspect-square w-full shrink-0 md:w-100">
          <motion.div
            className="flex size-full items-center justify-center overflow-hidden rounded"
            animate={{
              backgroundColor: dominantColor || undefined
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <Thumbnail
              placeholderIcon="Disc"
              fileName={album.thumbnail}
              alt={album.name}
              containerClassName={cn("size-full", album.thumbnail && "border-none")}
              className="size-full"
            />
          </motion.div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Badge variant="muted" className="w-fit">
              {t("common.featured")}
            </Badge>
            <Typography
              variant="h1"
              className={cn(
                "truncate text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl",
                dominantColor && "text-primary"
              )}
            >
              {album.name}
            </Typography>
            <Typography affects={["muted", "small"]}>
              {t("common.songsPlayed", { count: album.totalTracks })}
              {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
            </Typography>
          </div>
          <div className="flex items-center gap-3 pt-3">
            <Button
              isLoading={isShuffling}
              disabled={!songIds || songIds.length === 0}
              onClick={handleShuffleAndPlay}
            >
              <Icon name="Shuffle" />
              {t("common.shuffleAndPlay")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

export { AlbumItemFeatured }
