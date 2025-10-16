import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared"

export function getFileNameAndExtension(filePath: string) {
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

export function formatFileSize(bytes: number) {
  if (!bytes || bytes === 0) return "0 B"

  const sizes = ["B", "KB", "MB", "GB"]
  const k = 1024

  let i = Math.floor(Math.log(bytes) / Math.log(k))
  if (i >= sizes.length) i = sizes.length - 1

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function isImageExtension(extension: string) {
  if (!extension) return false
  return VALID_THUMBNAIL_FILE_EXTENSIONS.includes(extension.toLowerCase())
}
