import * as FileSystem from "expo-file-system"

export type AppPaths = {
  songsDir: string
  thumbnailsDir: string
  backupsDir: string
}

let appPaths: AppPaths | null = null

export async function getAppPaths(): Promise<AppPaths> {
  if (appPaths) return appPaths

  appPaths = {
    songsDir: FileSystem.documentDirectory + "songs",
    thumbnailsDir: FileSystem.documentDirectory + "thumbnails",
    backupsDir: FileSystem.documentDirectory + "backups"
  }

  return appPaths
}

export async function initializeAppStorage(): Promise<void> {
  const paths = await getAppPaths()

  for (const dir of Object.values(paths)) {
    const info = await FileSystem.getInfoAsync(dir)
    if (!info.exists) await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
  }
}

export async function getFilePath(directory: keyof AppPaths, fileName: string): Promise<string> {
  const paths = await getAppPaths()
  return paths[directory] + "/" + fileName
}
