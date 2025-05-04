import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"

import i18n from "@i18n/config"
import { type LocaleKeys } from "@i18n/types"

const SETTINGS_STORE_NAME = "settings"

type SettingsState = {
  theme: "dark" | "light" | "system"
  setTheme: (theme: "dark" | "light" | "system") => void
  language: LocaleKeys
  setLanguage: (code: LocaleKeys) => void
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
      language: "en" as LocaleKeys,
      setLanguage: (code) => {
        set({ language: code })
        i18n.changeLanguage(code)
      },
      hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          hasHydrated: state
        })
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
