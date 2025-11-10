import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { isEqual, throttle } from "lodash"

import { type StoreApi } from "zustand"

import { LRUCache } from "@repo/utils"

import { type SongWithMainRelations } from "@repo/api"

export type WindowLabel = "main" | "miniPlayer" | "fullscreenPlayer"

export function getWindowLabel(): WindowLabel {
  const label = getCurrentWindow().label
  if (label === "miniPlayer") return "miniPlayer"
  if (label === "fullscreenPlayer") return "fullscreenPlayer"
  return "main"
}

export function isMainWindow(): boolean {
  return getWindowLabel() === "main"
}

const EVENTS = {
  STATE_UPDATE: "player:state-update",
  STATE_REQUEST: "player:state-request",
  STATE_RESPONSE: "player:state-response",
  ACTION_REQUEST: "player:action-request",
  ACTION_RESPONSE: "player:action-response"
} as const

export const SYNC_CONFIG = {
  THROTTLE_INTERVAL: 100,
  ACTION_TIMEOUT: 30000,
  MAX_RETRIES: 0
} as const

let hasHydratedFromMain = false

export function resetSyncCache(): void {
  cachedActionKeys = null
  hasHydratedFromMain = false
}

type ActionRequest<TArgs extends unknown[] = unknown[]> = {
  id: string
  action: string
  args: TArgs
}

type ActionResponse = {
  id: string
  success: boolean
  error?: string
}

type StateResponsePayload<T> = {
  state: T
}

export function setupMainWindowSync<T extends Record<string, unknown>>(
  store: StoreApi<T>
): () => void {
  const unlisteners: UnlistenFn[] = []

  const throttledEmit = throttle(
    (state: T) => {
      const serializedState = partializeStateForSync(state)
      emit(EVENTS.STATE_UPDATE, serializedState).catch(console.error)
    },
    SYNC_CONFIG.THROTTLE_INTERVAL,
    { leading: true, trailing: true }
  )

  const unsubscribe = store.subscribe((currentState, previousState) => {
    const currentSerialized = partializeStateForSync(currentState)
    const previousSerialized = partializeStateForSync(previousState)

    if (!isEqual(currentSerialized, previousSerialized)) {
      throttledEmit(currentState)
    }
  })

  const stateRequestPromise = listen(EVENTS.STATE_REQUEST, async () => {
    try {
      const serializedState = partializeStateForSync(store.getState())
      await emit<StateResponsePayload<Partial<T>>>(EVENTS.STATE_RESPONSE, {
        state: serializedState
      })
    } catch (error) {
      console.error("PlayerStore: Error responding to state request:", error)
    }
  })

  stateRequestPromise.then((unlisten) => unlisteners.push(unlisten))

  const actionRequestPromise = listen<ActionRequest>(EVENTS.ACTION_REQUEST, async (event) => {
    const { id, action, args } = event.payload

    try {
      const state = store.getState()
      const actionFn = state[action as keyof T]

      if (typeof actionFn !== "function") {
        throw new Error(`PlayerStore: Action ${action} not found in store`)
      }

      await (actionFn as (...args: unknown[]) => Promise<void>)(...args)

      await emit<ActionResponse>(EVENTS.ACTION_RESPONSE, {
        id,
        success: true
      })
    } catch (error) {
      console.error(`PlayerStore: Error executing action ${action}:`, error)

      await emit<ActionResponse>(EVENTS.ACTION_RESPONSE, {
        id,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  })

  actionRequestPromise.then((unlisten) => unlisteners.push(unlisten))

  return () => {
    unsubscribe()
    throttledEmit.cancel()
    unlisteners.forEach((unlisten) => unlisten())
  }
}

let cachedActionKeys: Set<string> | null = null

const detectActionKeys = <T extends Record<string, unknown>>(state: T): Set<string> => {
  if (cachedActionKeys) {
    return cachedActionKeys
  }

  const actionKeys = new Set<string>()
  for (const key in state) {
    if (typeof state[key] === "function") {
      actionKeys.add(key)
    }
  }

  cachedActionKeys = actionKeys
  return actionKeys
}

const NON_SERIALIZABLE_KEYS = new Set<string>([])

function serializeCachedSongs(
  cache: LRUCache<number, SongWithMainRelations>
): Record<number, SongWithMainRelations> {
  const serialized: Record<number, SongWithMainRelations> = {}
  for (const [id, song] of cache.entries()) {
    serialized[id] = song
  }
  return serialized
}

function deserializeCachedSongs(
  data: Record<number, SongWithMainRelations> | undefined,
  maxSize: number
): LRUCache<number, SongWithMainRelations> {
  const cache = new LRUCache<number, SongWithMainRelations>(maxSize)
  if (data) {
    for (const [id, song] of Object.entries(data)) {
      cache.set(Number(id), song)
    }
  }
  return cache
}

const partializeStateForSync = <T extends Record<string, unknown>>(state: T): Partial<T> => {
  const actionKeys = detectActionKeys(state)
  const filtered: Record<string, unknown> = {}

  for (const key in state) {
    if (actionKeys.has(key) || NON_SERIALIZABLE_KEYS.has(key)) {
      continue
    }

    if (key === "cachedSongs") {
      const cache = state[key] as LRUCache<number, SongWithMainRelations> | undefined
      if (cache) {
        filtered[key] = serializeCachedSongs(cache)
      }
    } else {
      filtered[key] = state[key]
    }
  }

  return filtered as Partial<T>
}

export function setupSecondaryWindowSync<T extends Record<string, unknown>>(
  store: StoreApi<T>
): () => void {
  const unlisteners: UnlistenFn[] = []

  let pendingUpdate: Partial<T> | null = null
  let isProcessingUpdate = false

  const processPendingUpdate = () => {
    if (isProcessingUpdate || !pendingUpdate) {
      return
    }

    const newState = pendingUpdate
    pendingUpdate = null

    const currentSerializedState = partializeStateForSync(store.getState())

    if (!isEqual(currentSerializedState, newState)) {
      isProcessingUpdate = true
      try {
        const processedState = { ...newState } as Record<string, unknown>

        if ("cachedSongs" in processedState && processedState.cachedSongs) {
          const currentState = store.getState()
          const windowSize =
            (processedState.windowSize as number | undefined) ||
            (currentState.windowSize as number | undefined) ||
            100

          processedState.cachedSongs = deserializeCachedSongs(
            processedState.cachedSongs as Record<number, SongWithMainRelations> | undefined,
            windowSize
          )
        }

        store.setState(processedState as T, false)
      } finally {
        isProcessingUpdate = false
        if (pendingUpdate) {
          processPendingUpdate()
        }
      }
    }
  }

  const stateUpdatePromise = listen<Partial<T>>(EVENTS.STATE_UPDATE, (event) => {
    const newState = event.payload

    if (isProcessingUpdate) {
      pendingUpdate = newState
      return
    }

    pendingUpdate = newState
    processPendingUpdate()
  })

  stateUpdatePromise.then((unlisten) => unlisteners.push(unlisten))

  const stateResponsePromise = listen<StateResponsePayload<Partial<T>>>(
    EVENTS.STATE_RESPONSE,
    (event) => {
      if (!hasHydratedFromMain) {
        const newState = event.payload.state

        if (isProcessingUpdate) {
          pendingUpdate = newState
          return
        }

        isProcessingUpdate = true
        try {
          const processedState = { ...newState } as Record<string, unknown>

          if ("cachedSongs" in processedState && processedState.cachedSongs) {
            const windowSize =
              (processedState.windowSize as number | undefined) ||
              (newState as { windowSize?: number }).windowSize ||
              100

            processedState.cachedSongs = deserializeCachedSongs(
              processedState.cachedSongs as Record<number, SongWithMainRelations> | undefined,
              windowSize
            )
          }

          store.setState(processedState as T, false)
        } finally {
          isProcessingUpdate = false
          hasHydratedFromMain = true
          if (pendingUpdate) {
            processPendingUpdate()
          }
        }
      }
    }
  )

  stateResponsePromise.then((unlisten) => unlisteners.push(unlisten))

  emit(EVENTS.STATE_REQUEST).catch(console.error)

  return () => {
    unlisteners.forEach((unlisten) => unlisten())
  }
}

export function createRemoteAction<TArgs extends unknown[], TReturn = void>(
  actionName: string
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    const id = `${actionName}-${Date.now()}-${Math.random()}`

    try {
      await emit<ActionRequest<TArgs>>(EVENTS.ACTION_REQUEST, {
        id,
        action: actionName,
        args
      })

      return await new Promise<TReturn>((resolve, reject) => {
        let cleanup: (() => void) | undefined

        const timeout = setTimeout(() => {
          cleanup?.()
          reject(
            new Error(
              `PlayerStore: Action ${actionName} timed out after ${SYNC_CONFIG.ACTION_TIMEOUT}ms`
            )
          )
        }, SYNC_CONFIG.ACTION_TIMEOUT)

        listen<ActionResponse>(EVENTS.ACTION_RESPONSE, (event) => {
          const response = event.payload

          if (response.id === id) {
            clearTimeout(timeout)
            cleanup?.()

            if (response.success) {
              resolve(undefined as TReturn)
            } else {
              reject(new Error(`PlayerStore: ${response.error || "Unknown error"}`))
            }
          }
        }).then((unlisten) => {
          cleanup = unlisten
        })
      })
    } catch (error) {
      console.error(`PlayerStore: Error sending remote action ${actionName}:`, error)
      throw error
    }
  }
}
