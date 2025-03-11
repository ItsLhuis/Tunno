import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"

const SETTINGS_STORE_NAME = "settings"

type SettingsProps = {
  theme: "dark" | "light" | "system"
  setTheme: (theme: "dark" | "light" | "system") => void
}

export const useSettingsStore = create<SettingsProps>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme })
    }),
    {
      name: SETTINGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SETTINGS_STORE_NAME}.json`)
    }
  )
)
