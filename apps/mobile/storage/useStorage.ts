import { create } from "zustand"
import { persist } from "zustand/middleware"

import { getItem, setItem, removeItem, clearStorage } from "./config"

import * as FileSystem from "expo-file-system"

type StorageState = {
  appDirectory: string
  backupsDirectory: string
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  clear: () => Promise<void>
}

const initialState: Omit<StorageState, "setIsLoggedIn" | "clear"> = {
  appDirectory: FileSystem.documentDirectory + "app/",
  backupsDirectory: FileSystem.documentDirectory + "backups/",
  isLoggedIn: false
}

export const useStorage = create<StorageState>()(
  persist(
    (set) => ({
      ...initialState,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      clear: async () => {
        await clearStorage()
        set(initialState)
      }
    }),
    {
      name: "wave-storage",
      storage: {
        getItem: (name: string) => getItem<any>(name),
        setItem: (name: string, value: unknown) => setItem(name, value),
        removeItem: (name: string) => removeItem(name)
      }
    }
  )
)
