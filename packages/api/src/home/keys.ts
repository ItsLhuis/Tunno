export const homeKeys = {
  all: ["home"] as const,
  jumpBackIn: ["jumpBackIn"] as const,
  yourPlaylists: ["yourPlaylists"] as const,
  onRepeat: ["onRepeat"] as const,
  newReleases: ["newReleases"] as const,
  favoriteArtists: ["favoriteArtists"] as const,
  topAlbums: ["topAlbums"] as const,
  recentlyAdded: ["recentlyAdded"] as const,
  hiddenGems: ["hiddenGems"] as const,
  discover: ["discover"] as const,
  stats: ["stats"] as const,
  listJumpBackIn: (filters?: { limit?: number; hours?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.jumpBackIn]
    return filters ? [...key, filters] : key
  },
  listYourPlaylists: (filters?: { limit?: number; favorites?: boolean }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.yourPlaylists]
    return filters ? [...key, filters] : key
  },
  listOnRepeat: (filters?: { days?: number; limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.onRepeat]
    return filters ? [...key, filters] : key
  },
  listNewReleases: (filters?: { limit?: number; days?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.newReleases]
    return filters ? [...key, filters] : key
  },
  listFavoriteArtists: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.favoriteArtists]
    return filters ? [...key, filters] : key
  },
  listTopAlbums: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.topAlbums]
    return filters ? [...key, filters] : key
  },
  listRecentlyAdded: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.recentlyAdded]
    return filters ? [...key, filters] : key
  },
  listHiddenGems: (filters?: { limit?: number; minYearsOld?: number; maxPlayCount?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.hiddenGems]
    return filters ? [...key, filters] : key
  },
  listDiscover: (filters?: { limit?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.discover]
    return filters ? [...key, filters] : key
  },
  listStats: (filters?: { days?: number }) => {
    const key = [...homeKeys.all, "list", ...homeKeys.stats]
    return filters ? [...key, filters] : key
  }
}
