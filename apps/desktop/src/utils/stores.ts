import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "@features/albums/stores/useAlbumsStore"
import { useArtistsStore } from "@features/artists/stores/useArtistsStore"
import { usePlaylistsStore } from "@features/playlists/stores/usePlaylistsStore"
import { usePlayerStore } from "@features/player/stores/usePlayerStore"
import { useSongsStore } from "@features/songs/stores/useSongsStore"
import { useSettingsStore } from "@stores/useSettingsStore"

/**
 * Custom hook that checks if all essential Zustand stores have been rehydrated from persistence.
 *
 * This hook is crucial for ensuring that the application's state, especially
 * player and settings data, is fully loaded and ready for use after app startup or refresh.
 * It leverages the `hasHydrated` state from individual stores.
 *
 * @returns `true` if all monitored stores have completed rehydration,
 *          `false` otherwise.
 */
export function useAllStoresHydrated() {
  const { albumsHydrated } = useAlbumsStore(
    useShallow((state) => ({ albumsHydrated: state.hasHydrated }))
  )
  const { artistsHydrated } = useArtistsStore(
    useShallow((state) => ({ artistsHydrated: state.hasHydrated }))
  )
  const { playlistsHydrated } = usePlaylistsStore(
    useShallow((state) => ({ playlistsHydrated: state.hasHydrated }))
  )
  const { playerHydrated } = usePlayerStore(
    useShallow((state) => ({ playerHydrated: state.hasHydrated }))
  )
  const { songsHydrated } = useSongsStore(
    useShallow((state) => ({ songsHydrated: state.hasHydrated }))
  )
  const { settingsHydrated } = useSettingsStore(
    useShallow((state) => ({ settingsHydrated: state.hasHydrated }))
  )

  return (
    albumsHydrated &&
    artistsHydrated &&
    playlistsHydrated &&
    playerHydrated &&
    songsHydrated &&
    settingsHydrated
  )
}
