"use client"

import { Fragment, useEffect, useState } from "react"

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

import { formatFileSize, getFileNameAndExtension, isImageExtension } from "@repo/utils"

import { VALID_SONG_FILE_EXTENSIONS } from "@repo/shared/constants"

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
  defaultValue?: string
  onBeforeSelect?: (path: string) => Promise<boolean> | boolean
  onChange?: (value: string) => void
  onError?: (error: string) => void
  accept?: string[]
  maxSize?: number
  className?: string
  disabled?: boolean
  title?: string
  description?: string
}

const UploadPicker = ({
  mode = "file",
  defaultValue,
  onBeforeSelect,
  onChange,
  onError,
  accept = [],
  maxSize = Number.POSITIVE_INFINITY,
  className,
  disabled = false,
  title,
  description
}: UploadPickerProps) => {
  const { t } = useTranslation()

  const [item, setItem] = useState<FileItem | FolderItem | null>(null)

  useEffect(() => {
    if (defaultValue) {
      if (mode === "folder") {
        setItem({ name: defaultValue.split(/[\\/]/).pop() || "", path: defaultValue })
      } else {
        const { name, extension } = getFileNameAndExtension(defaultValue)
        setItem({
          name,
          extension,
          size: 0,
          path: defaultValue
        })
      }
    }
  }, [defaultValue, mode])

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

      const metadata = await stat(selected)

      if (mode === "folder") {
        const folderName = selected.split(/[\\/]/).pop() || ""
        const folderItem: FolderItem = { name: folderName, path: selected }

        setItem(folderItem)
        onChange?.(folderItem.path)
      } else {
        const { name, extension } = getFileNameAndExtension(selected)
        const fileItem: FileItem = {
          name,
          extension,
          size: metadata.size,
          path: selected
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
      <Card className={cn("rounded-md border", className)}>
        <Button
          variant="ghost"
          className="h-auto hover:text-current"
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
              className="!size-10 text-muted-foreground"
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
      {item && (
        <div className="space-y-3">
          <Card className="w-full overflow-hidden p-3">
            <div className="flex w-full items-center gap-3">
              <div className="flex-shrink-0">{getItemIcon(item)}</div>
              <div className="flex-1 overflow-hidden">
                {item.name && (
                  <Typography affects="bold" className="whitespace-break-spaces break-all">
                    {item.name}
                  </Typography>
                )}
                <div className="mt-1 flex items-center gap-2">
                  {"extension" in item ? (
                    <Fragment>
                      {item.size > 0 && <Badge variant="muted">{formatFileSize(item.size)}</Badge>}
                      {item.extension && <Badge variant="outline">.{item.extension}</Badge>}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Badge variant="muted">{item.path}</Badge>
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
        </div>
      )}
    </div>
  )
}

export { UploadPicker }
