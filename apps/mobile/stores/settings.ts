import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import * as FileSystem from "expo-file-system"

import { type User } from "@react-native-google-signin/google-signin"

const SETTINGS_STORE_NAME = "wave-settings-store"

type SettingsProps = {
  appDirectory: string
  backupsDirectory: string
  user: User | null | undefined
  setUser: (user: User | null | undefined) => void
  clear: () => Promise<void>
}

const initialState: Omit<SettingsProps, "setUser" | "clear"> = {
  appDirectory: FileSystem.documentDirectory + "app/",
  backupsDirectory: FileSystem.documentDirectory + "backups/",
  user: null
}

export const useSettings = create<SettingsProps>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
      clear: async () => {
        await persistStorage(SETTINGS_STORE_NAME).clearAll()
        set(initialState)
      }
    }),
    {
      name: SETTINGS_STORE_NAME,
      storage: persistStorage(SETTINGS_STORE_NAME)
    }
  )
)
