import { appCacheDir, appDataDir, join } from "@tauri-apps/api/path"

/**
 * Defines the structure for application-specific storage paths on the desktop filesystem.
 */
export type AppPaths = {
  songs: string
  thumbnails: string
  fastUpload: string
}

/**
 * A cache for storing application-specific paths after they have been determined.
 * This prevents redundant calculations of paths.
 */
let cachedPaths: AppPaths | null = null

/**
 * Retrieves the application's specific file system paths for different data types.
 *
 * This function utilizes `@tauri-apps/api/path` to determine the application's
 * data and cache directories and constructs paths for songs, thumbnails, and fast uploads.
 * It caches the results for subsequent calls to improve performance.
 *
 * @returns A Promise that resolves to an `AppPaths` object containing the directory paths.
 */
export async function getAppPaths(): Promise<AppPaths> {
  if (cachedPaths) return cachedPaths

  const appDir = await appDataDir()
  const cacheDir = await appCacheDir()

  cachedPaths = {
    songs: await join(appDir, "songs"),
    thumbnails: await join(appDir, "thumbnails"),
    fastUpload: await join(cacheDir, "FastUpload")
  }

  return cachedPaths
}
