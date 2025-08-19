import { useSongsSettingsStore } from "@features/songs/stores/useSongsSettingsStore"
import { useSettingsStore } from "@stores/useSettingsStore"

export const useAllStoresHydrated = () => {
  const settingsHydrated = useSettingsStore((state) => state.hasHydrated)
  const songsHydrated = useSongsSettingsStore((state) => state.hasHydrated)

  return settingsHydrated && songsHydrated
}
