import { Paths } from "expo-file-system"

export type AppPaths = {
  songs: string
  thumbnails: string
}

let cachedPaths: AppPaths | null = null

export async function getAppPaths(): Promise<AppPaths> {
  if (cachedPaths) return cachedPaths

  const appDir = Paths.document

  cachedPaths = {
    songs: `${appDir.uri}/songs`,
    thumbnails: `${appDir.uri}/thumbnails`
  }

  return cachedPaths
}
