import { type QueryClient } from "@tanstack/react-query"

import { albumKeys, artistKeys, playlistKeys, songKeys } from "./"

import { type EntityType, type InvalidationContext, type RelationsMap } from "./types"

type InvalidationStrategy = {
  primary: readonly (readonly string[])[]
  relations: Record<string, readonly (readonly string[])[]>
}

const STRATEGIES: Record<EntityType, InvalidationStrategy> = {
  song: {
    primary: [songKeys.all],
    relations: {
      artists: [artistKeys.all],
      albums: [albumKeys.all],
      playlists: [playlistKeys.all]
    }
  },
  artist: {
    primary: [artistKeys.all],
    relations: {
      songs: [songKeys.all],
      albums: [albumKeys.all]
    }
  },
  album: {
    primary: [albumKeys.all],
    relations: {
      songs: [songKeys.all],
      artists: [artistKeys.all]
    }
  },
  playlist: {
    primary: [playlistKeys.all],
    relations: {
      songs: [songKeys.all]
    }
  }
} as const

export function createInvalidationContext<T extends EntityType>(
  relations?: RelationsMap[T][],
  forceAll?: boolean
): InvalidationContext<T> {
  return {
    relations,
    forceAll
  } as InvalidationContext<T>
}

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
