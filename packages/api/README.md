<img src="../../assets/icon.png" width="100" height="100" />

# @repo/api

The `@repo/api` package serves as the **centralized data access and state management layer** for the
Tunno monorepo applications. It provides a robust, type-safe interface for interacting with the
application's data, leveraging [`@tanstack/react-query`](https://tanstack.com/query/latest) for
efficient data fetching, caching, and synchronization.

---

## About

This package is designed to abstract away the complexities of data fetching and state management. It
defines:

- **Query Keys**: A structured system for generating unique keys for all data queries, enabling
  effective caching and invalidation with React Query.
- **Type Definitions**: Comprehensive TypeScript types for all application entities (e.g., Songs,
  Albums, Artists, Playlists, Sidebar items, Home screen data), including their various relations
  and query parameters.
- **Data Invalidation Strategies**: A sophisticated mechanism to ensure data consistency across the
  application by intelligently invalidating relevant caches after data mutations.
- **Common Constants**: Shared constants for API operations like pagination limits.
- **Custom Error Handling**: A standardized way to handle and propagate domain-specific validation
  and integrity errors.

By centralizing this logic, `@repo/api` ensures a consistent and predictable data flow across all
consuming applications (e.g., `apps/desktop`, `apps/mobile`, `apps/web`).

---

## Installation

This is an internal package within the Tunno monorepo and is not intended for external installation.
It is automatically available to other packages and applications within the monorepo via
`pnpm workspace`.

---

## Usage

The `@repo/api` package primarily exports `query keys` and `type definitions` to be consumed by
applications using `@tanstack/react-query`.

### Query Keys

Each major entity type (Album, Artist, Home, Playlist, Sidebar, Song) has its own `*Keys` object,
providing functions to generate query keys for various data fetching scenarios.

**Example: Using `albumKeys` with `@tanstack/react-query`**

```typescript
import { useQuery } from '@tanstack/react-query';
import { albumKeys, type QueryAlbumParams, type Album } from '@repo/api';
// Assuming getAllAlbums is provided by an external data fetching module, e.g., from an application's api/queries file
import { getAllAlbums } from 'your-app/features/albums/api/queries';

function useAlbums(params?: QueryAlbumParams) {
  return useQuery<Album[]>({
    queryKey: albumKeys.list(params), // Using basic list key for a simpler example
    queryFn: () => getAllAlbums(params),
  });
}

// In a React component:
function AlbumList() {
  const { data: albums, isLoading, error } = useAlbums({
    limit: 10,
    orderBy: { column: 'name', direction: 'asc' },
    filters: { releaseYear: 2023 },
  });

  if (isLoading) return <div>Loading albums...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {albums?.map((album) => (
        <li key={album.id}>{album.name} ({album.releaseYear})</li>
      ))}
    </ul>
  );
}
```

### Type Definitions

The package exports numerous types for entities and their relations, ensuring type safety throughout
the application.

**Example: Importing and using `SongWithMainRelations`**

```typescript
import { type SongWithMainRelations } from "@repo/api"

function displaySong(song: SongWithMainRelations) {
  console.log(`Song: ${song.name}`)
  console.log(`Album: ${song.album?.name}`)
  song.artists?.forEach((artistRelation) => {
    console.log(`Artist: ${artistRelation.artist.name}`)
  })
  // ... other song details
}
```

### Invalidation Logic

The `invalidateQueries` function provides a centralized way to manage cache invalidation based on
entity types and their relations.

**Example: Invaliding cache after a song update**

```typescript
import { useQueryClient } from "@tanstack/react-query"
import { invalidateQueries, createInvalidationContext } from "@repo/api"

function updateSong(songId: number, newData: Partial<SongWithMainRelations>) {
  const queryClient = useQueryClient()

  // Perform mutation (e.g., API call to update song)
  // await api.songs.update(songId, newData);

  // Invalidate primary song cache and related album/artist caches
  const context = createInvalidationContext("song", ["albums", "artists"])
  invalidateQueries(queryClient, "song", context)
}
```

---

## API Reference

### Exports

- **`albumKeys`**: Query keys for album-related data.
- **`artistKeys`**: Query keys for artist-related data.
- **`homeKeys`**: Query keys for home screen data.
- **`playlistKeys`**: Query keys for playlist-related data.
- **`sidebarKeys`**: Query keys for sidebar data.
- **`songKeys`**: Query keys for song-related data.
- **`LIMIT`**: Constant for default API limit.
- **`PAGE_SIZE`**: Constant for default API page size.
- **`createInvalidationContext`**: Function to create an invalidation context for React Query.
- **`invalidateQueries`**: Function to invalidate React Query caches based on entity types and
  relations.
- **`CustomError`**: Custom error class for domain-specific errors.
- **`isCustomError`**: Type guard for `CustomError`.
- **Types**:
  - `Album`, `InsertAlbum`, `UpdateAlbum`, `QueryAlbumParams`, `AlbumWith*Relations` (various
    combinations of relations)
  - `Artist`, `InsertArtist`, `UpdateArtist`, `QueryArtistParams`, `ArtistWith*Relations` (various
    combinations of relations)
  - `Playlist`, `InsertPlaylist`, `UpdatePlaylist`, `QueryPlaylistParams`, `PlaylistWith*Relations`
    (various combinations of relations)
  - `Song`, `InsertSong`, `UpdateSong`, `QuerySongsParams`, `SongWith*Relations` (various
    combinations of relations)
  - `SidebarItem`, `InsertSidebarItem`, `UpdateSidebarItem`, `SidebarItemWithDetails`,
    `SidebarEntityType`
  - `UserStats`, `JumpBackIn`, `OnRepeat`, `YourPlaylists`, `NewReleases`, `Discover`,
    `FavoriteArtists`, `TopAlbums`, `HiddenGems`, `RecentlyAddedItem`, `RecentlyAdded` (for home
    screen data)
  - `PaginationParams`, `QueryParams`, `PaginatedResponse` (general utility types)
  - `EntityType`, `RelationsMap`, `InvalidationContext`, `ValidationErrorCode` (invalidation related
    types)

---

## Dependencies

This package depends on:

- `@repo/database`: For database schema definitions and types.
- `@tanstack/react-query`: For data fetching, caching, and state management.

---

## License

This project is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
