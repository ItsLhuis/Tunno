import { memo, useEffect, useState } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { getRenderableFileSrc } from "@services/storage"

import { Fade } from "@components/ui/Fade"
import { Icon, type IconProps } from "@components/ui/Icon"
import { Image, type ImageProps } from "@components/ui/Image"

import { LRUCache } from "@repo/utils"

import { type AppPaths } from "@lib/appStorage"

export type ThumbnailProps = Omit<ImageProps, "source"> & {
  placeholderIcon: IconProps["name"]
  fileName: string | Promise<string> | undefined | null
  sourceDir?: keyof Omit<AppPaths, "songs">
  containerStyle?: StyleProp<ViewStyle>
  placeholderIconSize?: IconProps["size"]
}

const thumbnailCache = new LRUCache<string, string>(1000)

const getCacheKey = (sourceDir: string, fileName: string) => `${sourceDir}:${fileName}`

const Thumbnail = memo(
  ({
    fileName,
    sourceDir = "thumbnails",
    placeholderIcon,
    placeholderIconSize = "25%",
    containerStyle,
    style,
    ...props
  }: ThumbnailProps) => {
    const styles = useStyles(thumbnailStyles)

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
        <Fade style={[styles.placeholder, containerStyle]}>
          <Icon name={placeholderIcon} size={placeholderIconSize} color="mutedForeground" />
        </Fade>
      )
    }

    return (
      <Image
        source={src ? { uri: src } : undefined}
        style={[styles.image, containerStyle, style]}
        {...props}
      />
    )
  }
)

const thumbnailStyles = createStyleSheet(({ theme }) => ({
  placeholder: {
    aspectRatio: 1,
    width: theme.size(14),
    backgroundColor: theme.colors.secondary,
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.border,
    borderRadius: theme.radius(),
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    aspectRatio: 1,
    width: theme.size(14)
  }
}))

export { Thumbnail }
