import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import * as FileSystem from "expo-file-system"

import { type User } from "@react-native-google-signin/google-signin"

const APP_STORE_NAME = "wave-app-store"

type AppState = {
  appDirectory: string
  backupsDirectory: string
  user: User | null | undefined
  setUser: (user: User | null | undefined) => void
  clear: () => Promise<void>
}

const initialState: Omit<AppState, "setUser" | "clear"> = {
  appDirectory: FileSystem.documentDirectory + "app/",
  backupsDirectory: FileSystem.documentDirectory + "backups/",
  user: null
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
      clear: async () => {
        await persistStorage(APP_STORE_NAME).clearAll()
        set(initialState)
      }
    }),
    {
      name: "wave-app-store",
      storage: persistStorage(APP_STORE_NAME)
    }
  )
)
