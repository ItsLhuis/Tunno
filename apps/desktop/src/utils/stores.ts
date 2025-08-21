import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"
import { useSongsStore } from "@features/songs/stores/useSongsStore"
import { useSettingsStore } from "@stores/useSettingsStore"

export const useAllStoresHydrated = () => {
  const { playerHydrated } = usePlayerStore(
    useShallow((state) => ({ playerHydrated: state.hasHydrated }))
  )
  const { songsHydrated } = useSongsStore(
    useShallow((state) => ({ songsHydrated: state.hasHydrated }))
  )
  const { settingsHydrated } = useSettingsStore(
    useShallow((state) => ({ settingsHydrated: state.hasHydrated }))
  )

  return playerHydrated && songsHydrated && settingsHydrated
}
