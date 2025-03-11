import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"

import * as FileSystem from "expo-file-system"

const SETTINGS_STORE_NAME = "settings"

type SettingsProps = {
  appDirectory: string
  backupsDirectory: string
  clear: () => Promise<void>
  initializeDirectories: () => Promise<void>
}

const appDirectory = FileSystem.documentDirectory + "app/"
const backupsDirectory = FileSystem.documentDirectory + "backups/"

const createDirectoryIfNotExists = async (dir: string): Promise<void> => {
  const dirInfo = await FileSystem.getInfoAsync(dir)
  if (!dirInfo.exists) await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
}

export const useSettingsStore = create<SettingsProps>()(
  persist(
    (set) => ({
      appDirectory,
      backupsDirectory,
      clear: async () => await persistStorage(SETTINGS_STORE_NAME).clearAll(),
      initializeDirectories: async () => {
        await createDirectoryIfNotExists(appDirectory)
        await createDirectoryIfNotExists(backupsDirectory)
      }
    }),
    {
      name: SETTINGS_STORE_NAME,
      version: 1,
      storage: persistStorage(SETTINGS_STORE_NAME)
    }
  )
)

useSettingsStore.getState().initializeDirectories()
