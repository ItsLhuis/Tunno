import { create } from "zustand"
import { persist } from "zustand/middleware"

import { getItem, setItem, removeItem } from "./config"

type StorageState = {
  username: string
  isLoggedIn: boolean
  setUsername: (username: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const useStorage = create<StorageState>()(
  persist(
    (set) => ({
      username: "",
      isLoggedIn: false,
      setUsername: (username: string) => set({ username }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn })
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
