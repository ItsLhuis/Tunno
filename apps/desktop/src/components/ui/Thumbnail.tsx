import { useEffect, useState } from "react"

import { cn } from "@lib/utils"

import { getRenderableFileSrc } from "@services/storage"

import { Icon } from "@components/ui/Icon"
import { Image, type ImageProps } from "@components/ui/Image"

export type ThumbnailProps = ImageProps & {
  fileName: string | null
}

const Thumbnail = ({ fileName, containerClassName, className, ...props }: ThumbnailProps) => {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
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
      <div className="flex size-14 items-center justify-center rounded bg-muted">
        <Icon name="Music" className="text-muted-foreground" />
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
