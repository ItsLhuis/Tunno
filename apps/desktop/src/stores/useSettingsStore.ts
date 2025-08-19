import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"

import { i18n, type LocaleKeys } from "@repo/i18n"

const SETTINGS_STORE_NAME = "settings"

type SettingsState = {
  theme: "dark" | "light" | "system"
  language: LocaleKeys
  hasHydrated: boolean
}

type SettingsActions = {
  setTheme: (theme: "dark" | "light" | "system") => void
  setLanguage: (code: LocaleKeys) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

type SettingsStore = SettingsState & SettingsActions

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: "system",
      language: "en" as LocaleKeys,
      hasHydrated: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (code) => {
        set({ language: code })
        i18n.changeLanguage(code)
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      }
    }),
    {
      name: SETTINGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SETTINGS_STORE_NAME}.json`),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
)
