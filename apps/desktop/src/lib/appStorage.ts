import { appDataDir, join } from "@tauri-apps/api/path"

export type AppPaths = {
  songs: string
  thumbnails: string
  playlists: string
  temp: string
}

let cachedPaths: AppPaths | null = null

export async function getAppPaths(): Promise<AppPaths> {
  if (cachedPaths) return cachedPaths

  const appDir = await appDataDir()
  
  cachedPaths = {
    songs: await join(appDir, "songs"),
    thumbnails: await join(appDir, "thumbnails"), 
    playlists: await join(appDir, "playlists"),
    temp: await join(appDir, "temp")
  }

  return cachedPaths
}