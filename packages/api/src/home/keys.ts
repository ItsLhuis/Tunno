/**
 * Query keys for home screen related data.
 *
 * Provides a structured way to generate unique keys for React Query,
 * enabling efficient caching and invalidation of home screen data.
 *
 * Base keys:
 * - `all`: all home screen data
 * - `jumpBackIn`: "Jump Back In" section
 * - `onRepeat`: "On Repeat" section
 * - `yourPlaylists`: "Your Playlists" section
 * - `newReleases`: "New Releases" section
 * - `discover`: "Discover" section
 * - `favoriteArtists`: "Favorite Artists" section
 *
 * Methods:
 * - `listJumpBackIn(filters?)`: list "Jump Back In" items
 * - `listOnRepeat(filters?)`: list "On Repeat" items
 * - `listYourPlaylists(filters?)`: list "Your Playlists" items
 * - `listNewReleases(filters?)`: list "New Releases" items
 * - `listDiscover(filters?)`: list "Discover" items
 * - `listFavoriteArtists(filters?)`: list "Favorite Artists" items
 */
export const homeKeys = {
  all: ["home"] as const,
  jumpBackIn: ["jumpBackIn"] as const,
  onRepeat: ["onRepeat"] as const,
  yourPlaylists: ["yourPlaylists"] as const,
  newReleases: ["newReleases"] as const,
  discover: ["discover"] as const,
  favoriteArtists: ["favoriteArtists"] as const,
  listJumpBackIn: (filters?: { limit?: number; hours?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.jumpBackIn]
    return filters ? [...key, filters] : key
  },
  listOnRepeat: (filters?: { days?: number; limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.onRepeat]
    return filters ? [...key, filters] : key
  },
  listYourPlaylists: (filters?: { limit?: number; favorites?: boolean }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.yourPlaylists]
    return filters ? [...key, filters] : key
  },
  listNewReleases: (filters?: { limit?: number; days?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.newReleases]
    return filters ? [...key, filters] : key
  },
  listDiscover: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.discover]
    return filters ? [...key, filters] : key
  },
  listFavoriteArtists: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.favoriteArtists]
    return filters ? [...key, filters] : key
  }
}
