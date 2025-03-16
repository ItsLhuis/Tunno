import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"

import i18n from "@i18n/config"
import { type LocaleKeys } from "@i18n/types"

const SETTINGS_STORE_NAME = "settings"

/* import * as FileSystem from "expo-file-system"

const appDirectory = FileSystem.documentDirectory + "app/"
const backupsDirectory = FileSystem.documentDirectory + "backups/"

const createDirectoryIfNotExists = async (dir: string): Promise<void> => {
  const dirInfo = await FileSystem.getInfoAsync(dir)
  if (!dirInfo.exists) await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
} */

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
      storage: persistStorage(SETTINGS_STORE_NAME),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
)
