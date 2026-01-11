import { type QueryClient } from "@tanstack/react-query"

import { albumKeys, artistKeys, homeKeys, playlistKeys, sidebarKeys, songKeys } from "./"

import { type EntityType, type InvalidationContext, type RelationsMap } from "./types"

type InvalidationStrategy = {
  primary: readonly (readonly string[])[]
  relations: Record<string, readonly (readonly string[])[]>
}

/**
 * Defines the invalidation strategy for each entity type.
 *
 * For each entity, it specifies the primary query keys to invalidate and
 * a map of related entity types to their corresponding query keys for invalidation.
 * This is used by `invalidateQueries` to maintain cache consistency across the application.
 */
const STRATEGIES: Record<EntityType, InvalidationStrategy> = {
  song: {
    primary: [songKeys.all],
    relations: {
      home: [homeKeys.all],
      artists: [artistKeys.all],
      albums: [albumKeys.all],
      playlists: [playlistKeys.all]
    }
  },
  artist: {
    primary: [artistKeys.all],
    relations: {
      home: [homeKeys.all],
      songs: [songKeys.all],
      albums: [albumKeys.all],
      sidebar: [sidebarKeys.all]
    }
  },
  album: {
    primary: [albumKeys.all],
    relations: {
      home: [homeKeys.all],
      songs: [songKeys.all],
      artists: [artistKeys.all],
      sidebar: [sidebarKeys.all]
    }
  },
  playlist: {
    primary: [playlistKeys.all],
    relations: {
      home: [homeKeys.all],
      songs: [songKeys.all],
      sidebar: [sidebarKeys.all]
    }
  },
  sidebar: {
    primary: [sidebarKeys.all],
    relations: {
      albums: [albumKeys.all],
      artists: [artistKeys.all],
      playlists: [playlistKeys.all]
    }
  }
} as const

/**
 * Creates an invalidation context to control which related queries are invalidated
 *
 * Use this to selectively invalidate related caches after mutations. By default,
 * only the primary entity cache is invalidated. Provide `relations` to also invalidate
 * specific related caches, or set `forceAll` to invalidate all relations.
 *
 * @param relations - Array of relation types to invalidate (e.g., ['songs', 'albums'])
 * @param forceAll - When true, invalidates all related caches regardless of relations param
 * @returns Invalidation context object for use with invalidateQueries
 *
 * @example
 * ```ts
 * // Invalidate only primary entity cache
 * invalidateQueries(queryClient, 'song')
 *
 * // Invalidate primary + specific relations
 * const ctx = createInvalidationContext('song', ['albums', 'artists'])
 * invalidateQueries(queryClient, 'song', ctx)
 *
 * // Invalidate primary + all relations
 * const ctxAll = createInvalidationContext('song', undefined, true)
 * invalidateQueries(queryClient, 'song', ctxAll)
 * ```
 */
export function createInvalidationContext<T extends EntityType>(
  relations?: RelationsMap[T][],
  forceAll?: boolean
): InvalidationContext<T> {
  return {
    relations,
    forceAll
  } as InvalidationContext<T>
}

/**
 * Invalidates React Query caches for an entity type and its relations
 *
 * Automatically invalidates the primary cache for the given entity type and
 * optionally invalidates related caches based on the context. This ensures UI
 * stays consistent after mutations.
 *
 * @param queryClient - TanStack Query client instance
 * @param entityType - Type of entity that was mutated
 * @param context - Optional context controlling which relations to invalidate
 *
 * @example
 * ```ts
 * // After creating a song
 * invalidateQueries(queryClient, 'song')
 *
 * // After updating a song, also refresh album view
 * const ctx = createInvalidationContext('song', ['albums'])
 * invalidateQueries(queryClient, 'song', ctx)
 *
 * // After deleting an artist, refresh everything
 * const ctx = createInvalidationContext('artist', undefined, true)
 * invalidateQueries(queryClient, 'artist', ctx)
 * ```
 */
export function invalidateQueries<T extends EntityType>(
  queryClient: QueryClient,
  entityType: T,
  context?: InvalidationContext<T>
): void {
  const strategy = STRATEGIES[entityType]

  if (!strategy) {
    return
  }

  strategy.primary.forEach((key) => {
    queryClient.invalidateQueries({
      queryKey: key,
      refetchType: "all"
    })
  })

  if (!context) {
    return
  }

  if (context.forceAll) {
    Object.values(strategy.relations).forEach((keys) => {
      keys.forEach((key) => {
        queryClient.invalidateQueries({
          queryKey: key,
          refetchType: "all"
        })
      })
    })
    return
  }

  if (context.relations && context.relations.length > 0) {
    context.relations.forEach((relationKey) => {
      const keys = strategy.relations[relationKey]
      if (keys) {
        keys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: key,
            refetchType: "all"
          })
        })
      }
    })
  }
}
