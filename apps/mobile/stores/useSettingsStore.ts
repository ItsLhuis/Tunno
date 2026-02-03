import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"

import { i18n, type LocaleKeys } from "@repo/i18n"

import { triggerWidgetUpdate } from "@features/player/components/Widget/widgetUpdate"

const SETTINGS_STORE_NAME = "settings"

/**
 * Represents the state structure of the {@link useSettingsStore}.
 */
type SettingsState = {
  theme: "dark" | "light" | "system"
  language: LocaleKeys
  hasHydrated: boolean
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useSettingsStore}.
 */
type SettingsActions = {
  setTheme: (theme: "dark" | "light" | "system") => void
  setLanguage: (code: LocaleKeys) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Combines the state and actions interfaces for the {@link useSettingsStore}.
 */
type SettingsStore = SettingsState & SettingsActions

/**
 * Zustand store for managing user settings and preferences.
 *
 * This store handles:
 * - `theme`: The selected application theme ("dark", "light", or "system").
 * - `language`: The selected language/locale for the application.
 * - Persistence of these settings across app sessions.
 *
 * It integrates with the `i18n` library to change the application's language dynamically.
 *
 * @returns A Zustand store instance with settings state and actions.
 */
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: "system",
      language: "en" as LocaleKeys,
      hasHydrated: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (code) => {
        set({ language: code })
        // Dynamically change the i18n language when the setting is updated.
        i18n.changeLanguage(code)
        // Update widget with new language
        triggerWidgetUpdate()
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      }
    }),
    {
      name: SETTINGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SETTINGS_STORE_NAME}.json`),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language
      }),
      onRehydrateStorage: () => {
        return async (state) => {
          if (state) {
            try {
              if (state.language) {
                // Change i18n language after rehydration to ensure UI reflects the persisted language.
                await i18n.changeLanguage(state.language)
              }
            } catch (error) {
              console.error("SettingsStore: Error in onRehydrateStorage:", error)
            } finally {
              // Mark the store as hydrated even if language change fails, to prevent blocking the app.
              state.setHasHydrated(true)
            }
          }
        }
      }
    }
  )
)
