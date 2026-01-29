import { useAlbumsStore } from "@features/albums/stores/useAlbumsStore"
import { useArtistsStore } from "@features/artists/stores/useArtistsStore"
import { usePlayerStore } from "@features/player/stores/usePlayerStore"
import { usePlaylistsStore } from "@features/playlists/stores/usePlaylistsStore"
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
  const albumsHydrated = useAlbumsStore((state) => state.hasHydrated)
  const artistsHydrated = useArtistsStore((state) => state.hasHydrated)
  const playlistsHydrated = usePlaylistsStore((state) => state.hasHydrated)
  const playerHydrated = usePlayerStore((state) => state.hasHydrated)
  const songsHydrated = useSongsStore((state) => state.hasHydrated)
  const settingsHydrated = useSettingsStore((state) => state.hasHydrated)

  return (
    albumsHydrated &&
    artistsHydrated &&
    playlistsHydrated &&
    playerHydrated &&
    songsHydrated &&
    settingsHydrated
  )
}
