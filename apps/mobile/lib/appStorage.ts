import { Paths } from "expo-file-system"

/**
 * Defines the structure for application-specific storage paths.
 */
export type AppPaths = {
  songs: string
  thumbnails: string
}

/**
 * A cache for storing application-specific paths after they have been determined.
 * This prevents redundant calculations of paths.
 */
let cachedPaths: AppPaths | null = null

/**
 * Retrieves the application's specific file system paths for different data types.
 *
 * This function utilizes `expo-file-system` to determine the document directory
 * and constructs paths for songs and thumbnails. It caches the results for
 * subsequent calls to improve performance.
 *
 * @returns A Promise that resolves to an `AppPaths` object containing the directory paths.
 */
export async function getAppPaths(): Promise<AppPaths> {
  if (cachedPaths) return cachedPaths

  const appDir = Paths.document
  const baseUri = appDir.uri.endsWith("/") ? appDir.uri.slice(0, -1) : appDir.uri

  cachedPaths = {
    songs: `${baseUri}/songs`,
    thumbnails: `${baseUri}/thumbnails`
  }

  return cachedPaths
}
