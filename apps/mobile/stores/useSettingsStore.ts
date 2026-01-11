import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "./config/persist"

import { i18n, type LocaleKeys } from "@repo/i18n"

const SETTINGS_STORE_NAME = "settings"

/**
 * Represents the state structure of the {@link useSettingsStore}.
 */
type SettingsState = {
  /**
   * The currently selected application theme ("dark", "light", or "system").
   */
  theme: "dark" | "light" | "system"
  /**
   * The currently selected language/locale for the application.
   */
  language: LocaleKeys
  /**
   * Indicates whether the store has been rehydrated from persistent storage.
   */
  hasHydrated: boolean
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useSettingsStore}.
 */
type SettingsActions = {
  /**
   * Sets the application theme.
   * @param theme - The new theme ("dark", "light", or "system").
   */
  setTheme: (theme: "dark" | "light" | "system") => void
  /**
   * Sets the application language/locale and dynamically changes the i18n language.
   * @param code - The new language code (e.g., "en", "es").
   */
  setLanguage: (code: LocaleKeys) => void
  /**
   * Sets the hydration status of the store, typically used after rehydration from persistence.
   * @param hasHydrated - `true` if the store has been hydrated, `false` otherwise.
   */
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
