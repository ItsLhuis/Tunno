import { create } from "zustand"
import { persist } from "zustand/middleware"

import { getItem, setItem, removeItem, clearStorage } from "./config"

import * as FileSystem from "expo-file-system"

import { type User } from "@react-native-google-signin/google-signin"

type StorageState = {
  appDirectory: string
  backupsDirectory: string
  user: User | null | undefined
  setUser: (user: User | null | undefined) => void
  clear: () => Promise<void>
}

const initialState: Omit<StorageState, "setUser" | "clear"> = {
  appDirectory: FileSystem.documentDirectory + "app/",
  backupsDirectory: FileSystem.documentDirectory + "backups/",
  user: null
}

export const useStorage = create<StorageState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
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
