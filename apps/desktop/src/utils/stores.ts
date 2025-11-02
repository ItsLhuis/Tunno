import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "@features/albums/stores/useAlbumsStore"
import { useArtistsStore } from "@features/artists/stores/useArtistsStore"
import { usePlaylistsStore } from "@features/playlists/stores/usePlaylistsStore"
import { usePlayerStore } from "@features/player/stores/usePlayerStore"
import { useSongsStore } from "@features/songs/stores/useSongsStore"
import { useSettingsStore } from "@stores/useSettingsStore"

export const useAllStoresHydrated = () => {
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
