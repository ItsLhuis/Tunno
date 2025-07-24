"use client"

import { Fragment, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { convertFileSrc } from "@tauri-apps/api/core"
import { open } from "@tauri-apps/plugin-dialog"
import { stat } from "@tauri-apps/plugin-fs"

import { Badge } from "@components/ui/Badge"
import { Button } from "@components/ui/Button"
import { Card, CardContent } from "@components/ui/Card"
import { Icon } from "@components/ui/Icon"
import { IconButton } from "@components/ui/IconButton"
import { Image } from "@components/ui/Image"
import { Typography } from "@components/ui/Typography"

import { VALID_SONG_FILE_EXTENSIONS, VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared/constants"

type FileItem = {
  name: string
  extension: string
  size: number
  path: string
}

type FolderItem = {
  name: string
  path: string
}

export type UploadPickerProps = {
  mode?: "file" | "folder"
  onBeforeSelect?: (path: string) => Promise<boolean> | boolean
  onChange?: (value: string | null) => void
  onError?: (error: string) => void
  hasError?: boolean
  accept?: string[]
  maxSize?: number
  className?: string
  disabled?: boolean
  title?: string
  description?: string
}

const UploadPicker = ({
  mode = "file",
  onBeforeSelect,
  onChange,
  onError,
  hasError = false,
  accept = [],
  maxSize = Number.POSITIVE_INFINITY,
  className,
  disabled = false,
  title,
  description
}: UploadPickerProps) => {
  const { t } = useTranslation()

  const [item, setItem] = useState<FileItem | FolderItem | null>(null)

  const getFileNameAndExtension = (filePath: string) => {
    const fileName = filePath.split(/[\\/]/).pop() || ""
    const lastDotIndex = fileName.lastIndexOf(".")
    if (lastDotIndex === -1) {
      return { name: fileName, extension: "" }
    }
    return {
      name: fileName.substring(0, lastDotIndex),
      extension: fileName.substring(lastDotIndex + 1).toLowerCase()
    }
  }

  const isImageExtension = (extension: string) => {
    return VALID_THUMBNAIL_FILE_EXTENSIONS.includes(extension.toLowerCase())
  }

  const getItemIcon = (item: FileItem | FolderItem) => {
    if ("extension" in item) {
      if (isImageExtension(item.extension) && item.path) {
        return (
          <Image
            src={convertFileSrc(item.path)}
            alt={item.name}
            className="h-12 w-12 rounded border object-cover"
          />
        )
      }
      if (VALID_SONG_FILE_EXTENSIONS.includes(item.extension)) return <Icon name="Music" />
      return <Icon name="File" />
    } else {
      return <Icon name="Folder" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const sizes = ["B", "KB", "MB", "GB"]
    const k = 1024
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    if (i >= sizes.length) i = sizes.length - 1
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const validateFile = (file: { name: string; size: number }) => {
    if (mode === "file" && file.size > maxSize) {
      return t("validation.file.max", { maxSize: formatFileSize(maxSize) })
    }
    return null
  }

  const removeItem = () => {
    setItem(null)
    onChange?.(null)
  }

  const handleSelectItem = async () => {
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

      const continueSelection = await onBeforeSelect?.(selected)
      if (!continueSelection) {
        setItem(null)
        return
      }

      const metadata = await stat(selected)

      if (mode === "folder") {
        const folderName = selected.split(/[\\/]/).pop() || ""
        const folderItem: FolderItem = {
          name: folderName,
          path: selected
        }

        setItem(folderItem)
        onChange?.(folderItem.path)
      } else {
        const { name, extension } = getFileNameAndExtension(selected)

        const fileItem: FileItem = {
          name: `${name}.${extension}`,
          extension,
          size: metadata.size,
          path: selected
        }

        const error = validateFile(fileItem)
        if (error) {
          onError?.(error)
          return
        }

        setItem(fileItem)
        onChange?.(fileItem.path)
      }
    } catch (error) {
      onError?.(String(error))
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
      desc += desc ? ` • Máx: ${formatFileSize(maxSize)}` : `Máx: ${formatFileSize(maxSize)}`
    }
    return desc
  }

  return (
    <div className={cn("w-full max-w-full space-y-3 overflow-hidden", className)}>
      <Card
        className={cn(
          "rounded-md border-2 border-dashed",
          hasError && "border-destructive text-destructive",
          className
        )}
      >
        <Button
          variant="ghost"
          className="h-auto hover:text-current"
          onClick={!disabled ? handleSelectItem : undefined}
          asChild
        >
          <CardContent
            className={cn(
              "flex flex-col items-center justify-center p-8 text-center",
              disabled && "opacity-50 hover:bg-inherit"
            )}
          >
            <Icon
              name={mode === "folder" ? "FolderOpen" : "Upload"}
              className="!size-10 text-muted-foreground"
            />
            <div className="space-y-2">
              <Typography variant="h4">{getDisplayText()}</Typography>
              <Typography affects={["muted", "small"]}>{getDescriptionText()}</Typography>
            </div>
          </CardContent>
        </Button>
      </Card>
      {item && (
        <div className="space-y-3">
          <Card className="w-full overflow-hidden p-3">
            <div className="flex w-full items-center gap-3">
              <div className="flex-shrink-0">{getItemIcon(item)}</div>
              <div className="flex-1 overflow-hidden">
                <Typography affects="bold" className="whitespace-break-spaces break-all">
                  {item.name}
                </Typography>
                <div className="mt-1 flex items-center gap-2">
                  {"extension" in item ? (
                    <Fragment>
                      <Badge variant="muted" className="whitespace-nowrap text-xs">
                        {formatFileSize(item.size)}
                      </Badge>
                      {item.extension && (
                        <Badge variant="outline" className="whitespace-nowrap text-xs">
                          .{item.extension}
                        </Badge>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Badge variant="muted" className="whitespace-nowrap text-xs">
                        {item.path}
                      </Badge>
                      <Badge variant="outline" className="whitespace-nowrap text-xs">
                        {t("form.labels.folder")}
                      </Badge>
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
        </div>
      )}
    </div>
  )
}

export { UploadPicker }
