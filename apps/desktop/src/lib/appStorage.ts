import { appCacheDir, appDataDir, join } from "@tauri-apps/api/path"

export type AppPaths = {
  songs: string
  thumbnails: string
  fastUpload: string
}

let cachedPaths: AppPaths | null = null

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
