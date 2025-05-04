import { appDataDir, join } from "@tauri-apps/api/path"
import { exists, mkdir } from "@tauri-apps/plugin-fs"

export type AppPaths = {
  songsDir: string
  thumbnailsDir: string
  backupsDir: string
}

let appPaths: AppPaths | null = null

export async function getAppPaths(): Promise<AppPaths> {
  if (appPaths) return appPaths

  const localDataDir = await appDataDir()

  appPaths = {
    songsDir: await join(localDataDir, "songs"),
    thumbnailsDir: await join(localDataDir, "thumbnails"),
    backupsDir: await join(localDataDir, "backups")
  }

  return appPaths
}

export async function initializeAppStorage(): Promise<void> {
  const paths = await getAppPaths()

  for (const dir of Object.values(paths)) {
    if (!(await exists(dir))) await mkdir(dir, { recursive: true })
  }
}

export async function getFilePath(directory: keyof AppPaths, fileName: string): Promise<string> {
  const paths = await getAppPaths()
  return await join(paths[directory], fileName)
}
