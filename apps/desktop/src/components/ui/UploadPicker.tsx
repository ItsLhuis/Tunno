"use client"

import { Fragment, useEffect, useState, type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { getFilePath } from "@services/storage"

import { convertFileSrc } from "@tauri-apps/api/core"
import { open } from "@tauri-apps/plugin-dialog"
import { stat } from "@tauri-apps/plugin-fs"

import { formatFileSize, getFileNameAndExtension, isImageExtension } from "@repo/utils"

import { AsyncState } from "@components/ui/AsyncState"
import { Badge } from "@components/ui/Badge"
import { Button } from "@components/ui/Button"
import { Card, CardContent } from "@components/ui/Card"
import { Icon } from "@components/ui/Icon"
import { IconButton } from "@components/ui/IconButton"
import { Image } from "@components/ui/Image"
import { Typography } from "@components/ui/Typography"

import { type AppPaths } from "@lib/appStorage"

import { VALID_SONG_FILE_EXTENSIONS } from "@repo/shared/constants"

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

export type UploadPickerProps = {
  mode?: "file" | "folder"
  defaultValue?: string
  value?: string
  onBeforeSelect?: (path: string) => Promise<boolean> | boolean
  onChange?: (value: string) => void
  onError?: (error: string) => void
  accept?: string[]
  maxSize?: number
  className?: string
  disabled?: boolean
  title?: string
  description?: string
  storageDir?: keyof AppPaths
  displayName?: string
  trigger?: ReactNode
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
  className,
  disabled = false,
  title,
  description,
  storageDir,
  displayName,
  trigger,
  hideDefaultTrigger = false,
  showPreview = true
}: UploadPickerProps) => {
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

  const createItemFromPathOrName = async (pathOrName: string): Promise<FileItem | FolderItem> => {
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
        const metadata = await stat(actualPath)
        size = metadata.size
      } catch {}

      return {
        name: itemDisplayName || name,
        extension,
        size,
        path: actualPath,
        displayName: itemDisplayName
      }
    }
  }

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
  }, [value, mode, isControlled, defaultValue, storageDir, displayName])

  const validateFile = (file: { name: string; size: number }) => {
    if (mode === "file" && file.size > maxSize) {
      return t("validation.file.max", { maxSize: formatFileSize(maxSize) })
    }
    return null
  }

  const removeItem = () => {
    setItem(null)
    onChange?.("")
  }

  const handleSelectItem = async () => {
    if (disabled) return

    try {
      const selected = await open({
        multiple: false,
        directory: mode === "folder",
        filters:
          mode === "file" && accept.length > 0
            ? [
                {
                  name: t("form.descriptions.supportedFormats", { formats: accept.join(", ") }),
                  extensions: accept
                }
              ]
            : undefined
      })

      if (!selected || typeof selected !== "string") return

      if (onBeforeSelect) {
        const continueSelection = await onBeforeSelect(selected)
        if (!continueSelection) {
          setItem(null)
          return
        }
      }

      setIsLoading(true)
      const metadata = await stat(selected)

      if (mode === "folder") {
        const folderName = selected.split(/[\\/]/).pop() || ""
        const folderItem: FolderItem = { name: folderName, path: selected }

        setItem(folderItem)
        onChange?.(folderItem.path)
      } else {
        const { name, extension } = getFileNameAndExtension(selected)
        const fileItem: FileItem = {
          name: displayName || name,
          extension,
          size: metadata.size,
          path: selected,
          displayName
        }

        const error = validateFile({ name: fileItem.name, size: fileItem.size })
        if (error) {
          onError?.(error)
          return
        }

        setItem(fileItem)

        onChange?.(fileItem.path)
      }
    } catch (error) {
      onError?.(String(error))
    } finally {
      setIsLoading(false)
    }
  }

  const getItemIcon = (item: FileItem | FolderItem) => {
    if ("extension" in item) {
      if (isImageExtension(item.extension) && item.path) {
        return <Image src={convertFileSrc(item.path)} alt={item.name ?? "thumbnail"} />
      }
      if (item.extension && VALID_SONG_FILE_EXTENSIONS.includes(item.extension))
        return <Icon name="Music" />
      return <Icon name="File" />
    } else {
      return <Icon name="Folder" />
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
    <div className={cn("w-full max-w-full space-y-3 overflow-hidden", className)}>
      {trigger && (
        <div
          onClick={handleSelectItem}
          className={disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
        >
          {trigger}
        </div>
      )}
      {!hideDefaultTrigger && (
        <Card className={cn("block rounded border-none p-0", className)}>
          <Button
            variant="outline"
            className="h-full hover:text-current"
            onClick={handleSelectItem}
            asChild
            disabled={disabled}
          >
            <CardContent
              className={cn(
                "flex flex-col items-center justify-center p-8 text-center",
                disabled && "opacity-50 hover:bg-inherit"
              )}
            >
              <Icon
                name={mode === "folder" ? "FolderOpen" : "Upload"}
                className="text-muted-foreground size-10!"
              />
              <div className="space-y-2">
                <Typography variant="h4">{getDisplayText()}</Typography>
                <Typography affects={["muted", "small"]} className="whitespace-break-spaces">
                  {getDescriptionText()}
                </Typography>
              </div>
            </CardContent>
          </Button>
        </Card>
      )}
      {showPreview && (item !== null || isLoading) && (
        <AsyncState data={item} isLoading={isLoading} emptyComponent={null}>
          {(loadedItem) => (
            <Card className="w-full overflow-hidden p-3">
              <div className="flex w-full items-center gap-3">
                <div className="shrink-0">{getItemIcon(loadedItem)}</div>
                <div className="flex-1 overflow-hidden">
                  {loadedItem.name && (
                    <Typography affects="bold" className="break-all whitespace-break-spaces">
                      {loadedItem.name}
                    </Typography>
                  )}
                  <div className="mt-1 flex items-center gap-2">
                    {"extension" in loadedItem ? (
                      <Fragment>
                        {loadedItem.size > 0 && (
                          <Badge variant="muted">{formatFileSize(loadedItem.size)}</Badge>
                        )}
                        {loadedItem.extension && (
                          <Badge variant="outline">.{loadedItem.extension}</Badge>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Badge variant="muted">{loadedItem.path}</Badge>
                        <Badge variant="outline">{t("form.labels.folder")}</Badge>
                      </Fragment>
                    )}
                  </div>
                </div>
                <IconButton
                  tooltip={t("common.clear")}
                  variant="ghost"
                  name="X"
                  className="shrink-0"
                  onClick={removeItem}
                  disabled={disabled}
                />
              </div>
            </Card>
          )}
        </AsyncState>
      )}
    </div>
  )
}

export { UploadPicker }
