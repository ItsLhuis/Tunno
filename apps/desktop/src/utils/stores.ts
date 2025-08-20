import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"
import { useSongsSettingsStore } from "@features/songs/stores/useSongsSettingsStore"
import { useSettingsStore } from "@stores/useSettingsStore"

export const useAllStoresHydrated = () => {
  const { playerHydrated } = usePlayerStore(
    useShallow((state) => ({ playerHydrated: state.hasHydrated }))
  )
  const { settingsHydrated } = useSettingsStore(
    useShallow((state) => ({ settingsHydrated: state.hasHydrated }))
  )
  const { songsSettingsHydrated } = useSongsSettingsStore(
    useShallow((state) => ({ songsSettingsHydrated: state.hasHydrated }))
  )

  return playerHydrated && settingsHydrated && songsSettingsHydrated
}
