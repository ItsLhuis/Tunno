import { useEffect, useState } from "react"

import { cn } from "@lib/utils"

import { getRenderableFileSrc } from "@services/storage"

import type { AppPaths } from "@lib/appStorage"

import { Fade } from "@components/ui/Fade"
import { Icon, type IconProps } from "@components/ui/Icon"
import { Image, type ImageProps } from "@components/ui/Image"

export type ThumbnailProps = ImageProps & {
  placeholderIcon: IconProps["name"]
  fileName: string | Promise<string> | undefined | null
  sourceDir?: keyof Omit<AppPaths, "songs">
}

const Thumbnail = ({
  fileName,
  sourceDir = "thumbnails",
  placeholderIcon,
  containerClassName,
  className,
  ...props
}: ThumbnailProps) => {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!fileName) {
        setSrc(null)
        return
      }

      const resolvedFileName = await Promise.resolve(fileName)

      const url = await getRenderableFileSrc(resolvedFileName, sourceDir)
      setSrc(url)
    }
    load()
  }, [fileName, sourceDir])

  if (!fileName) {
    return (
      <Fade
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded border border-border bg-secondary transition-colors",
          containerClassName
        )}
      >
        <Icon name={placeholderIcon} className={cn("text-secondary-foreground", className)} />
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

export { Thumbnail }
