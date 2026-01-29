# API Patterns

## Package Structure

The `@repo/api` package provides:

- Query keys for React Query caching
- TypeScript types for entities and queries
- Cache invalidation utilities

It does NOT contain React hooks or query functions - those live in each app.

## Query Keys

Location: `packages/api/src/[entity]/keys.ts`

```typescript
// packages/api/src/songs/keys.ts
export const songKeys = {
  all: ["songs"] as const,
  withAlbum: ["withAlbum"] as const,
  withArtists: ["withArtists"] as const,
  // ... more relation keys

  list: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list"]
    return params ? [...key, params] : key
  },
  listWithMainRelations: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listInfiniteWithMainRelations: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", "infinite", ...songKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  details: (id: number) => [...songKeys.all, "details", id] as const,
  detailsWithMainRelations: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withMainRelations] as const
  // ... more key builders
}
```

Reference: `packages/api/src/songs/keys.ts`

## Hook Pattern (in apps)

Hooks are defined in each app, NOT in @repo/api:

```typescript
// apps/desktop/src/features/songs/hooks/useFetchSongsInfiniteWithMainRelations.ts
import { useInfiniteQuery } from "@tanstack/react-query"
import { songKeys, type QuerySongsParams } from "@repo/api"
import { getSongsWithMainRelationsPaginated } from "../api/queries"

export function useFetchSongsInfiniteWithMainRelations(params?: QuerySongsParams) {
  return useInfiniteQuery({
    queryKey: songKeys.listInfiniteWithMainRelations(params),
    queryFn: async ({ pageParam }) => {
      return getSongsWithMainRelationsPaginated({ ...params, cursor: pageParam })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : undefined)
  })
}
```

Reference: `apps/desktop/src/features/songs/hooks/useFetchSongsInfiniteWithMainRelations.ts`

## Cache Invalidation

Location: `packages/api/src/invalidation.ts`

```typescript
import { invalidateQueries, createInvalidationContext } from "@repo/api"

// After mutation, invalidate related queries
invalidateQueries(queryClient, "song")

// Invalidate with specific relations
const ctx = createInvalidationContext<"song">(["albums", "artists"])
invalidateQueries(queryClient, "song", ctx)

// Invalidate all relations
const ctxAll = createInvalidationContext<"song">(undefined, true)
invalidateQueries(queryClient, "song", ctxAll)
```

The `STRATEGIES` object in `invalidation.ts` defines which query keys to invalidate for each entity
type and its relations.

## Types

Location: `packages/api/src/types.ts` and `packages/api/src/[entity]/types.ts`

```typescript
// Pagination types
export type PaginationParams = { limit?: number; cursor?: string }
export type QueryParams<TOrderByColumn, TFilters> = {
  orderBy?: { column: TOrderByColumn; direction: "asc" | "desc" }
  filters?: TFilters
} & PaginationParams

export type PaginatedResponse<T> = {
  items: T[]
  nextCursor?: string
  prevCursor?: string
  hasNextPage: boolean
  hasPrevPage: boolean
}

// Entity types
export type EntityType = "song" | "artist" | "album" | "playlist" | "sidebar"
```

## Creating New Queries

1. Add keys to `packages/api/src/[entity]/keys.ts`
2. Add types to `packages/api/src/[entity]/types.ts`
3. Export from `packages/api/src/[entity]/index.ts`
4. Create query function in app: `features/[entity]/api/queries.ts`
5. Create hook in app: `features/[entity]/hooks/useFetch[Name].ts`

## Reference Files

- Keys: `packages/api/src/songs/keys.ts`
- Types: `packages/api/src/songs/types.ts`, `packages/api/src/types.ts`
- Invalidation: `packages/api/src/invalidation.ts`
- Query functions: `apps/desktop/src/features/songs/api/queries.ts`
- Hooks: `apps/desktop/src/features/songs/hooks/`
