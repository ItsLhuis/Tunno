import * as FileSystem from "expo-file-system"

const createDirectoryIfNotExists = async (dir: string) => {
  const dirInfo = await FileSystem.getInfoAsync(dir)  
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
  }
}

export const initializeAppDirectories = async (appDirectory: string, backupsDirectory: string) => {
  await createDirectoryIfNotExists(appDirectory)
  await createDirectoryIfNotExists(backupsDirectory)
}
