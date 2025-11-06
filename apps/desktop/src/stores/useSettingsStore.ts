import { create } from "zustand"
import { persist } from "zustand/middleware"

import { emit } from "@tauri-apps/api/event"

import TrackPlayer, { type EqualizerPreset } from "react-track-player-web"

import { setupAudioPlayer } from "@services/audio"

import { persistStorage } from "./config/persist"

import { i18n, type LocaleKeys } from "@repo/i18n"

const SETTINGS_STORE_NAME = "settings"

type SettingsState = {
  theme: "dark" | "light" | "system"
  language: LocaleKeys
  equalizerEnabled: boolean
  equalizerPreset: EqualizerPreset
  equalizerBandGains: number[]
  hasHydrated: boolean
}

type SettingsActions = {
  setTheme: (theme: "dark" | "light" | "system") => void
  setLanguage: (code: LocaleKeys) => void
  setEqualizerEnabled: (enabled: boolean) => Promise<void>
  setEqualizerPreset: (preset: EqualizerPreset) => Promise<void>
  setEqualizerBandGain: (bandIndex: number, gain: number) => Promise<void>
  resetEqualizer: () => Promise<void>
  setHasHydrated: (hasHydrated: boolean) => void
}

type SettingsStore = SettingsState & SettingsActions

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      language: "en" as LocaleKeys,
      hasHydrated: false,
      equalizerEnabled: false,
      equalizerPreset: "flat",
      equalizerBandGains: new Array(10).fill(0),
      setTheme: (theme) => set({ theme }),
      setLanguage: (code) => {
        set({ language: code })
        i18n.changeLanguage(code)
        emit("settings:language-changed", code)
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      },
      setEqualizerEnabled: async (enabled) => {
        set({ equalizerEnabled: enabled })

        try {
          TrackPlayer.setEqualizerEnabled(enabled)
        } catch (error) {
          console.error("SettingsStore: Error in setEqualizerEnabled:", error)
        }
      },
      setEqualizerPreset: async (preset) => {
        set({ equalizerPreset: preset })

        try {
          TrackPlayer.setEqualizerPreset(preset)

          const newGains = Array.from({ length: 10 }, (_, index) =>
            TrackPlayer.getEqualizerBandGain(index)
          )

          set({ equalizerBandGains: newGains })
        } catch (error) {
          console.error("SettingsStore: Error in setEqualizerPreset:", error)
        }
      },
      setEqualizerBandGain: async (bandIndex, gain) => {
        const newGains = [...get().equalizerBandGains]
        newGains[bandIndex] = gain

        set({ equalizerBandGains: newGains })

        try {
          TrackPlayer.setEqualizerBandGain(bandIndex, gain)
        } catch (error) {
          console.error("SettingsStore: Error in setEqualizerBandGain:", error)
        }
      },
      resetEqualizer: async () => {
        try {
          TrackPlayer.resetEqualizer()

          set({
            equalizerBandGains: new Array(10).fill(0),
            equalizerPreset: "flat"
          })
        } catch (error) {
          console.error("SettingsStore: Error in resetEqualizer:", error)
        }
      }
    }),
    {
      name: SETTINGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SETTINGS_STORE_NAME}.json`),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        equalizerEnabled: state.equalizerEnabled,
        equalizerPreset: state.equalizerPreset,
        equalizerBandGains: state.equalizerBandGains
      }),
      onRehydrateStorage: () => {
        return async (state) => {
          await setupAudioPlayer()

          if (state) {
            try {
              if (state.language) {
                await i18n.changeLanguage(state.language)
              }

              if (state.equalizerEnabled !== undefined) {
                await TrackPlayer.setEqualizerEnabled(state.equalizerEnabled)
              }

              if (state.equalizerPreset && state.equalizerPreset !== "flat") {
                await TrackPlayer.setEqualizerPreset(state.equalizerPreset)
              }

              if (state.equalizerBandGains && state.equalizerBandGains.length === 10) {
                for (let i = 0; i < 10; i++) {
                  await TrackPlayer.setEqualizerBandGain(i, state.equalizerBandGains[i])
                }
              }
            } catch (error) {
              console.error("SettingsStore: Error in onRehydrateStorage:", error)
            } finally {
              state.setHasHydrated(true)
            }
          }
        }
      }
    }
  )
)
