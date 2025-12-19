import { memo, useEffect, useState } from "react"

import { cn } from "@lib/utils"

import { getRenderableFileSrc } from "@services/storage"

import { Fade } from "@components/ui/Fade"
import { Icon, type IconProps } from "@components/ui/Icon"
import { Image, type ImageProps } from "@components/ui/Image"

import { LRUCache } from "@repo/utils"

import { type AppPaths } from "@lib/appStorage"

export type ThumbnailProps = ImageProps & {
  placeholderIcon: IconProps["name"]
  fileName: string | Promise<string> | undefined | null
  sourceDir?: keyof Omit<AppPaths, "songs">
}

const thumbnailCache = new LRUCache<string, string>(1000)

const getCacheKey = (sourceDir: string, fileName: string) => `${sourceDir}:${fileName}`

const Thumbnail = memo(
  ({
    fileName,
    sourceDir = "thumbnails",
    placeholderIcon,
    containerClassName,
    className,
    ...props
  }: ThumbnailProps) => {
    const [src, setSrc] = useState<string | null>(() => {
      if (typeof fileName === "string") {
        return thumbnailCache.get(getCacheKey(sourceDir, fileName)) ?? null
      }
      return null
    })

    useEffect(() => {
      if (!fileName) {
        setSrc(null)
        return
      }

      let cancelled = false

      const load = async () => {
        const resolvedFileName = typeof fileName === "string" ? fileName : await fileName

        if (cancelled) return

        const cacheKey = getCacheKey(sourceDir, resolvedFileName)
        const cached = thumbnailCache.get(cacheKey)

        if (cached) {
          setSrc(cached)
          return
        }

        const url = await getRenderableFileSrc(resolvedFileName, sourceDir)

        if (cancelled) return

        thumbnailCache.set(cacheKey, url)
        setSrc(url)
      }

      load()

      return () => {
        cancelled = true
      }
    }, [fileName, sourceDir])

    if (!fileName) {
      return (
        <Fade
          className={cn(
            "border-border bg-secondary flex aspect-square size-14 shrink-0 items-center justify-center rounded border transition-colors",
            containerClassName
          )}
        >
          <Icon
            name={placeholderIcon}
            className={cn("text-secondary-foreground", className, "size-1/4")}
          />
        </Fade>
      )
    }

    return (
      <Image
        src={src ?? undefined}
        alt="thumbnail"
        className={cn("size-14", className)}
        containerClassName={cn("size-14 aspect-square", containerClassName)}
        {...props}
      />
    )
  }
)

export { Thumbnail }
