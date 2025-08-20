import { useEffect, useState } from "react"

import { cn } from "@lib/utils"

import { getRenderableFileSrc } from "@services/storage"

import { Fade } from "@components/ui/Fade"
import { Icon } from "@components/ui/Icon"
import { Image, type ImageProps } from "@components/ui/Image"

export type ThumbnailProps = ImageProps & {
  fileName: string | undefined | null
}

const Thumbnail = ({ fileName, containerClassName, className, ...props }: ThumbnailProps) => {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!fileName) {
        setSrc(null)
        return
      }

      const url = await getRenderableFileSrc(fileName, "thumbnails")
      setSrc(url)
    }
    load()
  }, [fileName])

  if (!fileName) {
    return (
      <div
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded bg-muted transition-colors",
          containerClassName
        )}
      >
        <Fade>
          <Icon name="Music" className={cn("text-muted-foreground", className)} />
        </Fade>
      </div>
    )
  }

  return (
    <Image
      src={src ?? undefined}
      alt="thumbnail"
      className={cn("size-14", className)}
      containerClassName={cn("size-14", containerClassName)}
      {...props}
    />
  )
}

export { Thumbnail }
