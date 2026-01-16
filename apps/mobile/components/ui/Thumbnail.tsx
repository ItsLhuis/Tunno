import { memo, useEffect, useState } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

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

    const [srcState, setSrcState] = useState<{ src: string | null; fileName: string | null }>(
      () => {
        if (typeof fileName === "string") {
          const cached = thumbnailCache.get(getCacheKey(sourceDir, fileName))
          return { src: cached ?? null, fileName: cached ? fileName : null }
        }
        return { src: null, fileName: null }
      }
    )

    const currentFileName = typeof fileName === "string" ? fileName : null
    const src = srcState.fileName === currentFileName ? srcState.src : null

    useEffect(() => {
      if (!fileName) {
        setSrcState({ src: null, fileName: null })
        return
      }

      if (typeof fileName === "string") {
        const cacheKey = getCacheKey(sourceDir, fileName)
        const cached = thumbnailCache.get(cacheKey)
        if (cached) {
          setSrcState({ src: cached, fileName })
          return
        }
      }

      setSrcState({ src: null, fileName: null })

      let cancelled = false

      const load = async () => {
        const resolvedFileName = typeof fileName === "string" ? fileName : await fileName

        if (cancelled) return

        const cacheKey = getCacheKey(sourceDir, resolvedFileName)
        const cached = thumbnailCache.get(cacheKey)

        if (cached) {
          setSrcState({ src: cached, fileName: resolvedFileName })
          return
        }

        const url = await getRenderableFileSrc(resolvedFileName, sourceDir)

        if (cancelled) return

        thumbnailCache.set(cacheKey, url)
        setSrcState({ src: url, fileName: resolvedFileName })
      }

      load()

      return () => {
        cancelled = true
      }
    }, [fileName, sourceDir])

    if (!fileName) {
      return (
        <View style={[styles.container, containerStyle]}>
          <Fade style={[styles.placeholder, containerStyle]}>
            <Icon name={placeholderIcon} size={placeholderIconSize} />
          </Fade>
        </View>
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
  container: {
    backgroundColor: theme.colors.secondary,
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.border,
    borderRadius: theme.radius()
  },
  placeholder: {
    aspectRatio: 1,
    width: theme.size(14),
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    backgroundColor: theme.colors.secondary,
    aspectRatio: 1,
    width: theme.size(14)
  }
}))

export { Thumbnail }
