import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"


import { i18n, type LocaleKeys } from "@repo/i18n"

const SETTINGS_STORE_NAME = "settings"

type SettingsState = {
  language: LocaleKeys
  setLanguage: (code: LocaleKeys) => void
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
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
