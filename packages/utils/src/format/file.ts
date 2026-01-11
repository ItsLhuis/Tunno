import { VALID_THUMBNAIL_FILE_EXTENSIONS } from "@repo/shared"

/**
 * Extracts the file name and extension from a given file path.
 *
 * @param filePath - The full path to the file.
 * @returns An object containing the `name` (without extension) and `extension` (lowercase) of the file.
 *          If no extension is found, `extension` will be an empty string.
 *
 * @example
 * ```ts
 * getFileNameAndExtension("C:/Users/file.txt") // { name: "file", extension: "txt" }
 * getFileNameAndExtension("/home/user/document") // { name: "document", extension: "" }
 * ```
 */
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

/**
 * Formats a file size in bytes into a human-readable string (e.g., "1.23 MB").
 *
 * @param bytes - The file size in bytes.
 * @returns A string representing the formatted file size.
 *
 * @example
 * ```ts
 * formatFileSize(1024)      // "1.00 KB"
 * formatFileSize(1234567)   // "1.18 MB"
 * formatFileSize(0)         // "0 B"
 * ```
 */
export function formatFileSize(bytes: number) {
  if (!bytes || bytes === 0) return "0 B"

  const sizes = ["B", "KB", "MB", "GB"]
  const k = 1024

  let i = Math.floor(Math.log(bytes) / Math.log(k))
  if (i >= sizes.length) i = sizes.length - 1

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Checks if a given file extension corresponds to a supported image format.
 *
 * @param extension - The file extension (e.g., "png", "jpg").
 * @returns `true` if the extension is a valid image extension, `false` otherwise.
 *
 * @example
 * ```ts
 * isImageExtension("png")   // true
 * isImageExtension("mp3")   // false
 * isImageExtension("")      // false
 * ```
 */
export function isImageExtension(extension: string) {
  if (!extension) return false
  return VALID_THUMBNAIL_FILE_EXTENSIONS.includes(extension.toLowerCase())
}
