import { Directory, File } from "expo-file-system"

import { v4 as uuidv4 } from "uuid"

import { getAppPaths, type AppPaths } from "@lib/appStorage"

/**
 * A module-level cache for storing application-specific paths after they have been determined.
 * This prevents redundant calculations of paths.
 */
let paths: AppPaths | null = null

/**
 * Lazily retrieves and caches the application's file system paths.
 *
 * @returns A Promise that resolves to an `AppPaths` object containing the directory paths.
 */
async function getPaths() {
  if (!paths) paths = await getAppPaths()
  return paths
}

/**
 * Initializes the application's storage directories.
 *
 * This function ensures that all necessary application-specific directories (songs, thumbnails, etc.)
 * exist on the filesystem, creating them if they don't already.
 *
 * @returns A Promise that resolves when all directories have been initialized.
 */
export async function initializeStorage() {
  const dirs = await getPaths()

  for (const dir of Object.values(dirs)) {
    const directory = new Directory(dir)
    if (!directory.exists) {
      directory.create()
    }
  }
}

/**
 * Constructs a full filesystem path for a given file within a specified application directory.
 *
 * @param dir - The key of the application directory (e.g., "songs", "thumbnails").
 * @param fileName - The name of the file.
 * @returns A Promise that resolves to the absolute path of the file.
 */
export async function getFilePath(dir: keyof AppPaths, fileName: string) {
  const dirs = await getPaths()
  return `${dirs[dir]}/${fileName}`
}

/**
 * Saves content to a file at a specified path within an application directory.
 *
 * @param dir - The key of the application directory.
 * @param fileName - The name of the file to save.
 * @param content - The content to write to the file (string or Uint8Array).
 * @returns A Promise that resolves when the file has been saved.
 */
export async function saveFile(
  dir: keyof AppPaths,
  fileName: string,
  content: string | Uint8Array
) {
  const path = await getFilePath(dir, fileName)
  const file = new File(path)

  file.write(content)
}

/**
 * Copies a file from a source path to a destination within an application directory.
 *
 * @param dir - The key of the application directory where the file will be saved.
 * @param fileName - The name of the new file.
 * @param sourcePath - The absolute path of the source file.
 * @returns A Promise that resolves when the file has been copied.
 */
export async function saveFileFromPath(dir: keyof AppPaths, fileName: string, sourcePath: string) {
  const destinationPath = await getFilePath(dir, fileName)
  const sourceFile = new File(sourcePath)
  const destinationFile = new File(destinationPath)

  sourceFile.copy(destinationFile)
}

/**
 * Updates an existing file by replacing it with content from a new source path.
 *
 * The old file (if it exists) is deleted before the new one is saved.
 *
 * @param dir - The key of the application directory.
 * @param oldFileName - The name of the file to be replaced.
 * @param newFileName - The name of the new file.
 * @param sourcePath - The absolute path of the source file for the new content.
 * @returns A Promise that resolves when the file has been updated.
 */
export async function updateFileFromPath(
  dir: keyof AppPaths,
  oldFileName: string,
  newFileName: string,
  sourcePath: string
) {
  const oldPath = await getFilePath(dir, oldFileName)
  const oldFile = new File(oldPath)

  if (oldFile.exists) {
    oldFile.delete()
  }

  await saveFileFromPath(dir, newFileName, sourcePath)
}

/**
 * Deletes a file from a specified application directory.
 *
 * @param dir - The key of the application directory.
 * @param fileName - The name of the file to delete.
 * @returns A Promise that resolves when the file has been deleted, or if it didn't exist.
 */
export async function deleteFile(dir: keyof AppPaths, fileName: string) {
  const path = await getFilePath(dir, fileName)
  const file = new File(path)

  if (file.exists) {
    file.delete()
  }
}

/**
 * Generates a unique filename using a UUID and preserves the original file's extension.
 *
 * @param filePath - The original path of the file from which to extract the extension.
 * @returns A Promise that resolves to a unique filename string (e.g., "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.ext").
 */
export async function generateUniqueFileName(filePath: string): Promise<string> {
  const match = filePath.match(/\.([^.]+)$/)
  const extension = match ? match[1] : ""
  return `${uuidv4()}.${extension}`
}

/**
 * Saves a file from a source path to an application directory with a unique generated filename.
 *
 * @param dir - The key of the application directory.
 * @param sourcePath - The absolute path of the file to save.
 * @returns A Promise that resolves to the uniquely generated filename.
 */
export async function saveFileWithUniqueNameFromPath(
  dir: keyof AppPaths,
  sourcePath: string
): Promise<string> {
  const uniqueFileName = await generateUniqueFileName(sourcePath)
  await saveFileFromPath(dir, uniqueFileName, sourcePath)
  return uniqueFileName
}

/**
 * Updates a file from a source path in an application directory with a unique generated filename.
 *
 * If an `oldFileName` is provided, the existing file with that name is first deleted.
 *
 * @param dir - The key of the application directory.
 * @param oldFileName - The name of the old file to replace (can be `null` if no old file).
 * @param sourcePath - The absolute path of the new file content.
 * @returns A Promise that resolves to the uniquely generated filename.
 */
export async function updateFileWithUniqueNameFromPath(
  dir: keyof AppPaths,
  oldFileName: string | null,
  sourcePath: string
): Promise<string> {
  const newUniqueFileName = await generateUniqueFileName(sourcePath)

  if (oldFileName) {
    const oldPath = await getFilePath(dir, oldFileName)
    const oldFile = new File(oldPath)

    if (oldFile.exists) {
      oldFile.delete()
    }
  }

  await saveFileFromPath(dir, newUniqueFileName, sourcePath)
  return newUniqueFileName
}

/**
 * Converts a given filename within an application directory into a full path that can be used for rendering.
 *
 * @param fileName - The name of the file.
 * @param dir - The key of the application directory where the file is located.
 * @returns A Promise that resolves to the full file path string.
 */
export async function getRenderableFileSrc(fileName: string, dir: keyof AppPaths): Promise<string> {
  const dirs = await getPaths()
  const fullPath = `${dirs[dir]}/${fileName}`

  return fullPath
}

/**
 * Converts a local file path or URI to a base64 data URI.
 *
 * This is useful for Android widgets that only accept http/https/data URIs
 * and cannot render local file:// paths directly.
 *
 * @param fileUri - The local file path or file:// URI to convert.
 * @returns A Promise that resolves to a base64 data URI string (e.g., "data:image/jpeg;base64,..."),
 *          or `null` if the file doesn't exist or conversion fails.
 *
 * @example
 * ```ts
 * const dataUri = await fileToBase64DataUri('file:///path/to/image.jpg');
 * // Returns: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
 * ```
 */
export async function fileToBase64DataUri(fileUri: string): Promise<string | null> {
  try {
    // Ensure URI has file:// prefix for Android compatibility
    const normalizedUri = fileUri.startsWith("file://") ? fileUri : `file://${fileUri}`

    const file = new File(normalizedUri)

    if (!file.exists) {
      return null
    }

    const base64String = await file.base64()

    const extension = fileUri.split(".").pop()?.toLowerCase()
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      gif: "image/gif",
      svg: "image/svg+xml"
    }
    const mimeType = mimeTypes[extension ?? ""] ?? "image/jpeg"

    return `data:${mimeType};base64,${base64String}`
  } catch (error) {
    return null
  }
}
