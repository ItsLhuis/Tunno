import { Fragment, useCallback, useEffect, useState, type ReactNode } from "react"

import { View, type GestureResponderEvent, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { File } from "expo-file-system"

import * as DocumentPicker from "expo-document-picker"

import { formatFileSize, getFileNameAndExtension, isImageExtension } from "@repo/utils"

import { VALID_SONG_FILE_EXTENSIONS } from "@repo/shared/constants"

import { getFilePath } from "@services/storage"

import { type AppPaths } from "@lib/appStorage"

import { AsyncState } from "@components/ui/AsyncState"
import { Badge } from "@components/ui/Badge"
import { Card, CardContent } from "@components/ui/Card"
import { Icon } from "@components/ui/Icon"
import { IconButton } from "@components/ui/IconButton"
import { Image } from "@components/ui/Image"
import { Pressable } from "@components/ui/Pressable"
import { Text } from "@components/ui/Text"

type FileItem = {
  name: string
  extension: string
  size: number
  path: string
  displayName?: string
}

type FolderItem = {
  name: string
  path: string
}

export type UploadPickerTriggerProps = {
  onPress: (e: GestureResponderEvent) => void
  disabled: boolean
  isLoading: boolean
}

export type UploadPickerProps = {
  mode?: "file" | "folder"
  defaultValue?: string
  value?: string
  onBeforeSelect?: (path: string) => Promise<boolean> | boolean
  onChange?: (value: string) => void
  onError?: (error: string) => void
  accept?: string[]
  maxSize?: number
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  title?: string
  description?: string
  storageDir?: keyof AppPaths
  displayName?: string
  trigger?: (props: UploadPickerTriggerProps) => ReactNode
  hideDefaultTrigger?: boolean
  showPreview?: boolean
}

const UploadPicker = ({
  mode = "file",
  defaultValue,
  value,
  onBeforeSelect,
  onChange,
  onError,
  accept = [],
  maxSize = Number.POSITIVE_INFINITY,
  style,
  disabled = false,
  title,
  description,
  storageDir,
  displayName,
  trigger,
  hideDefaultTrigger = false,
  showPreview = true
}: UploadPickerProps) => {
  const styles = useStyles(uploadPickerStyles)

  const { t } = useTranslation()

  const [item, setItem] = useState<FileItem | FolderItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const isControlled = value !== undefined

  const isFileName = (pathOrName: string): boolean => {
    if (pathOrName.includes("/") || pathOrName.includes("\\")) {
      return false
    }
    const { extension } = getFileNameAndExtension(pathOrName)
    return !!extension
  }

  const createItemFromPathOrName = useCallback(
    async (pathOrName: string): Promise<FileItem | FolderItem> => {
      if (mode === "folder") {
        return { name: pathOrName.split(/[\\/]/).pop() || "", path: pathOrName }
      } else {
        let actualPath = pathOrName
        let itemDisplayName = displayName

        if (isFileName(pathOrName) && storageDir) {
          actualPath = await getFilePath(storageDir, pathOrName)

          if (!itemDisplayName) {
            itemDisplayName = pathOrName
          }
        }

        const { name, extension } = getFileNameAndExtension(actualPath)

        let size = 0

        try {
          const file = new File(actualPath)
          if (file.exists) {
            size = file.size ?? 0
          }
        } catch {}

        return {
          name: itemDisplayName || name,
          extension,
          size,
          path: actualPath,
          displayName: itemDisplayName
        }
      }
    },
    [mode, displayName, storageDir]
  )

  useEffect(() => {
    if (isControlled) {
      if (value) {
        setIsLoading(true)
        createItemFromPathOrName(value)
          .then(setItem)
          .finally(() => setIsLoading(false))
      } else {
        setItem(null)
        setIsLoading(false)
      }
    } else if (defaultValue && !item) {
      setIsLoading(true)
      createItemFromPathOrName(defaultValue)
        .then(setItem)
        .finally(() => setIsLoading(false))
    }
  }, [value, isControlled, defaultValue, createItemFromPathOrName, item])

  const validateFile = (file: { name: string; size: number }) => {
    if (mode === "file" && file.size > maxSize) {
      return t("validation.file.max", { maxSize: formatFileSize(maxSize) })
    }
    return null
  }

  const removeItem = useCallback(() => {
    setItem(null)
    onChange?.("")
  }, [onChange])

  const handleSelectItem = useCallback(async () => {
    if (disabled) return

    if (mode === "folder") {
      return
    }

    try {
      const mimeTypes =
        accept.length > 0 ? accept.map((ext) => getMimeTypeFromExtension(ext)) : undefined

      const result = await DocumentPicker.getDocumentAsync({
        type: mimeTypes,
        copyToCacheDirectory: true,
        multiple: false
      })

      if (result.canceled || !result.assets || result.assets.length === 0) return

      const asset = result.assets[0]
      const selected = asset.uri

      if (onBeforeSelect) {
        const continueSelection = await onBeforeSelect(selected)
        if (!continueSelection) {
          setItem(null)
          return
        }
      }

      setIsLoading(true)

      const { name, extension } = getFileNameAndExtension(asset.name || selected)
      const fileItem: FileItem = {
        name: displayName || name,
        extension,
        size: asset.size ?? 0,
        path: selected,
        displayName
      }

      const error = validateFile({ name: fileItem.name, size: fileItem.size })
      if (error) {
        onError?.(error)
        setIsLoading(false)
        return
      }

      setItem(fileItem)
      onChange?.(fileItem.path)
    } catch (error) {
      onError?.(String(error))
    } finally {
      setIsLoading(false)
    }
  }, [disabled, mode, accept, onBeforeSelect, displayName, onChange, onError])

  const getItemIcon = (loadedItem: FileItem | FolderItem) => {
    if ("extension" in loadedItem) {
      if (isImageExtension(loadedItem.extension) && loadedItem.path) {
        return <Image source={{ uri: loadedItem.path }} style={styles.thumbnail} />
      }
      if (loadedItem.extension && VALID_SONG_FILE_EXTENSIONS.includes(loadedItem.extension)) {
        return <Icon name="Music" size="lg" color="mutedForeground" />
      }
      return <Icon name="File" size="lg" color="mutedForeground" />
    } else {
      return <Icon name="Folder" size="lg" color="mutedForeground" />
    }
  }

  const getDisplayText = () => {
    if (title) return title
    if (mode === "folder") return `${t("common.select")} ${t("form.labels.folder")}`
    return `${t("common.select")} ${t("form.labels.file")}`
  }

  const getDescriptionText = () => {
    if (description) return description

    let desc = ""
    if (accept.length > 0) {
      desc = t("form.descriptions.supportedFormats", { formats: accept.join(", ") })
    }
    if (isFinite(maxSize)) {
      desc += desc
        ? ` • ${t("form.descriptions.fileSize", { size: formatFileSize(maxSize) })}`
        : t("form.descriptions.fileSize", { size: formatFileSize(maxSize) })
    }
    return desc
  }

  return (
    <View style={[styles.container, style]}>
      {trigger?.({
        onPress: handleSelectItem,
        disabled,
        isLoading
      })}
      {!hideDefaultTrigger && (
        <Card style={styles.triggerCard}>
          <Pressable style={styles.trigger} onPress={handleSelectItem} disabled={disabled}>
            <CardContent style={styles.triggerContent}>
              <Icon
                name={mode === "folder" ? "FolderOpen" : "Upload"}
                size="4xl"
                color="mutedForeground"
              />
              <View style={styles.triggerTextContainer}>
                <Text variant="h4">{getDisplayText()}</Text>
                {getDescriptionText() && (
                  <Text size="sm" color="mutedForeground" style={styles.triggerDescription}>
                    {getDescriptionText()}
                  </Text>
                )}
              </View>
            </CardContent>
          </Pressable>
        </Card>
      )}
      {showPreview && (item !== null || isLoading) && (
        <AsyncState data={item} isLoading={isLoading} emptyComponent={null}>
          {(loadedItem) => (
            <Card style={styles.preview}>
              <View style={styles.previewContent}>
                <View style={styles.previewIconContainer}>{getItemIcon(loadedItem)}</View>
                <View style={styles.previewInfo}>
                  {loadedItem.name && (
                    <Text weight="medium" numberOfLines={2} style={styles.previewName}>
                      {loadedItem.name}
                    </Text>
                  )}
                  <View style={styles.previewBadges}>
                    {"extension" in loadedItem ? (
                      <Fragment>
                        {loadedItem.size > 0 && (
                          <Badge variant="muted" title={formatFileSize(loadedItem.size)} />
                        )}
                        {loadedItem.extension && (
                          <Badge variant="outline" title={`.${loadedItem.extension}`} />
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Badge variant="muted" title={loadedItem.path} />
                        <Badge variant="outline" title={t("form.labels.folder")} />
                      </Fragment>
                    )}
                  </View>
                </View>
                <IconButton name="X" variant="ghost" onPress={removeItem} disabled={disabled} />
              </View>
            </Card>
          )}
        </AsyncState>
      )}
    </View>
  )
}

const getMimeTypeFromExtension = (ext: string): string => {
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp3: "audio/mpeg",
    m4a: "audio/mp4",
    aac: "audio/aac",
    wav: "audio/wav",
    flac: "audio/flac",
    ogg: "audio/ogg",
    opus: "audio/opus",
    mp4: "video/mp4",
    webm: "video/webm",
    pdf: "application/pdf",
    json: "application/json",
    txt: "text/plain"
  }

  return mimeTypes[ext.toLowerCase()] || "*/*"
}

const uploadPickerStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    gap: theme.space(3)
  },
  triggerCard: {
    padding: 0,
    borderWidth: 0,
    overflow: "hidden"
  },
  trigger: {
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.input,
    borderRadius: theme.radius(),
    backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75))
  },
  triggerContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(8),
    gap: theme.space(2)
  },
  triggerTextContainer: {
    alignItems: "center",
    gap: theme.space(1)
  },
  triggerDescription: {
    textAlign: "center"
  },
  preview: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden"
  },
  previewContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(3),
    width: "100%"
  },
  previewIconContainer: {
    flexShrink: 0
  },
  previewInfo: {
    flex: 1,
    gap: theme.space(1)
  },
  previewName: {
    flexWrap: "wrap"
  },
  previewBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.space(2)
  },
  thumbnail: {
    width: theme.size(14),
    height: theme.size(14),
    borderRadius: theme.radius()
  }
}))

export { UploadPicker }
