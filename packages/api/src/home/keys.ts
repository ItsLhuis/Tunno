/**
 * Query keys for home screen related data.
 *
 * Provides a structured way to generate unique keys for React Query,
 * enabling efficient caching and invalidation of home screen data.
 *
 * Base keys (ordered by section):
 * - `all`: all home screen data
 * - `quickAccess`: "Quick Access" section (1)
 * - `jumpBackIn`: "Jump Back In" section (2)
 * - `newReleases`: "New Releases" section (3)
 * - `onRepeat`: "On Repeat" section (4)
 * - `discover`: "Discover" section (5)
 * - `favoriteArtists`: "Favorite Artists" section (6)
 * - `yourPlaylists`: "Your Playlists" section (7)
 * - `topAlbums`: "Top Albums" section (8)
 * - `recentlyAdded`: "Recently Added" section (9)
 *
 * Methods (ordered by section):
 * - `listQuickAccess(filters?)`: list "Quick Access" items (1)
 * - `listJumpBackIn(filters?)`: list "Jump Back In" items (2)
 * - `listNewReleases(filters?)`: list "New Releases" items (3)
 * - `listOnRepeat(filters?)`: list "On Repeat" items (4)
 * - `listDiscover(filters?)`: list "Discover" items (5)
 * - `listFavoriteArtists(filters?)`: list "Favorite Artists" items (6)
 * - `listYourPlaylists(filters?)`: list "Your Playlists" items (7)
 * - `listTopAlbums(filters?)`: list "Top Albums" items (8)
 * - `listRecentlyAdded(filters?)`: list "Recently Added" items (9)
 */
export const homeKeys = {
  all: ["home"] as const,
  quickAccess: ["quickAccess"] as const,
  jumpBackIn: ["jumpBackIn"] as const,
  newReleases: ["newReleases"] as const,
  onRepeat: ["onRepeat"] as const,
  discover: ["discover"] as const,
  favoriteArtists: ["favoriteArtists"] as const,
  yourPlaylists: ["yourPlaylists"] as const,
  topAlbums: ["topAlbums"] as const,
  recentlyAdded: ["recentlyAdded"] as const,
  listQuickAccess: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.quickAccess]
    return filters ? [...key, filters] : key
  },
  listJumpBackIn: (filters?: { limit?: number; hours?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.jumpBackIn]
    return filters ? [...key, filters] : key
  },
  listNewReleases: (filters?: { limit?: number; days?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.newReleases]
    return filters ? [...key, filters] : key
  },
  listOnRepeat: (filters?: { days?: number; limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.onRepeat]
    return filters ? [...key, filters] : key
  },
  listDiscover: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.discover]
    return filters ? [...key, filters] : key
  },
  listFavoriteArtists: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.favoriteArtists]
    return filters ? [...key, filters] : key
  },
  listYourPlaylists: (filters?: { limit?: number; favorites?: boolean }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.yourPlaylists]
    return filters ? [...key, filters] : key
  },
  listTopAlbums: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.topAlbums]
    return filters ? [...key, filters] : key
  },
  listRecentlyAdded: (filters?: { limit?: number; days?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.recentlyAdded]
    return filters ? [...key, filters] : key
  }
}
