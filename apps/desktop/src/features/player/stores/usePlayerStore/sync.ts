import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { isEqual, throttle } from "lodash"

import { type StoreApi } from "zustand"

import { LRUCache } from "@repo/utils"

import { type SongWithMainRelations } from "@repo/api"

/**
 * Defines the possible labels for application windows.
 * This helps differentiate behavior between the main window and player-specific windows.
 */
export type WindowLabel = "main" | "miniPlayer" | "fullscreenPlayer"

/**
 * Retrieves the label of the current window.
 *
 * @returns The label of the current window, defaulting to "main".
 */
export function getWindowLabel(): WindowLabel {
  const label = getCurrentWindow().label
  if (label === "miniPlayer") return "miniPlayer"
  if (label === "fullscreenPlayer") return "fullscreenPlayer"
  return "main"
}

/**
 * Checks if the current window is the main application window.
 *
 * @returns `true` if the current window is the main window, `false` otherwise.
 */
export function isMainWindow(): boolean {
  return getWindowLabel() === "main"
}

/**
 * A constant object that defines the event names used for inter-window communication.
 * This ensures consistency and avoids magic strings when emitting or listening to events.
 */
const EVENTS = {
  STATE_UPDATE: "player:state-update",
  STATE_REQUEST: "player:state-request",
  STATE_RESPONSE: "player:state-response",
  ACTION_REQUEST: "player:action-request",
  ACTION_RESPONSE: "player:action-response"
} as const

/**
 * Configuration constants for the synchronization logic.
 */
export const SYNC_CONFIG = {
  THROTTLE_INTERVAL: 100,
  ACTION_TIMEOUT: 30000,
  MAX_RETRIES: 0
} as const

/**
 * A flag to ensure that the initial state hydration from the main window happens only once.
 */
let hasHydratedFromMain = false

/**
 * Resets the module-level cache for action keys and the hydration flag.
 * This is useful for testing or re-initializing the sync logic.
 */
export function resetSyncCache(): void {
  cachedActionKeys = null
  hasHydratedFromMain = false
}

/**
 * Represents the payload for an action request event.
 */
type ActionRequest<TArgs extends unknown[] = unknown[]> = {
  id: string
  action: string
  args: TArgs
}

/**
 * Represents the payload for an action response event.
 */
type ActionResponse = {
  id: string
  success: boolean
  error?: string
}

/**
 * Represents the payload for a state response event.
 */
type StateResponsePayload<T> = {
  state: T
}

/**
 * Sets up synchronization logic for the main application window.
 * This function subscribes to store changes, broadcasts them to other windows,
 * and listens for state and action requests from secondary windows.
 *
 * @param store - The Zustand store instance to be synchronized.
 * @returns A cleanup function that unsubscribes from all listeners and store changes.
 */
export function setupMainWindowSync<T extends Record<string, unknown>>(
  store: StoreApi<T>
): () => void {
  const unlisteners: UnlistenFn[] = []

  // Throttles state update emissions to prevent flooding the event bus.
  const throttledEmit = throttle(
    (state: T) => {
      const serializedState = partializeStateForSync(state)
      emit(EVENTS.STATE_UPDATE, serializedState).catch(console.error)
    },
    SYNC_CONFIG.THROTTLE_INTERVAL,
    { leading: true, trailing: true }
  )

  // Subscribes to store changes and emits an update if the synchronized part of the state has changed.
  const unsubscribe = store.subscribe((currentState, previousState) => {
    const currentSerialized = partializeStateForSync(currentState)
    const previousSerialized = partializeStateForSync(previousState)

    if (!isEqual(currentSerialized, previousSerialized)) {
      throttledEmit(currentState)
    }
  })

  // Listens for requests for the full state from secondary windows.
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

  // Listens for requests to execute an action from secondary windows.
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

  // Returns a cleanup function to be called on component unmount.
  return () => {
    unsubscribe()
    throttledEmit.cancel()
    unlisteners.forEach((unlisten) => unlisten())
  }
}

/**
 * A cached set of keys that correspond to actions (functions) in the store.
 * This avoids re-calculating the keys on every state change.
 */
let cachedActionKeys: Set<string> | null = null

/**
 * Detects and caches the keys of all functions (actions) in the store state.
 *
 * @param state - The current store state.
 * @returns A `Set` containing the names of all action functions.
 */
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

/**
 * A set of keys to exclude from state synchronization.
 * This is currently empty but can be used to prevent certain state properties from being broadcast.
 */
const NON_SERIALIZABLE_KEYS = new Set<string>([])

/**
 * Serializes an LRUCache instance into a plain object for synchronization.
 * LRUCache instances are not directly serializable over the event bus.
 *
 * @param cache - The LRUCache instance to serialize.
 * @returns A plain object representation of the cache.
 */
function serializeCachedSongs(
  cache: LRUCache<number, SongWithMainRelations>
): Record<number, SongWithMainRelations> {
  const serialized: Record<number, SongWithMainRelations> = {}
  for (const [id, song] of cache.entries()) {
    serialized[id] = song
  }
  return serialized
}

/**
 * Deserializes a plain object back into an LRUCache instance.
 *
 * @param data - The plain object to deserialize.
 * @param maxSize - The maximum size of the LRUCache.
 * @returns A new LRUCache instance populated with the deserialized data.
 */
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

/**
 * Filters the store state to include only serializable properties for synchronization.
 * It removes functions (actions) and other non-serializable keys.
 * It also handles the custom serialization of the `cachedSongs` LRUCache.
 *
 * @param state - The full store state.
 * @returns A partial state object containing only the data to be synchronized.
 */
const partializeStateForSync = <T extends Record<string, unknown>>(state: T): Partial<T> => {
  const actionKeys = detectActionKeys(state)
  const filtered: Record<string, unknown> = {}

  for (const key in state) {
    if (actionKeys.has(key) || NON_SERIALIZABLE_KEYS.has(key)) {
      continue
    }

    // Custom serialization for LRUCache instance.
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

/**
 * Sets up synchronization logic for a secondary application window (e.g., mini-player).
 * This function listens for state updates from the main window, requests the initial state upon setup,
 * and applies incoming state changes to the local store instance.
 *
 * @param store - The Zustand store instance to be synchronized.
 * @returns A cleanup function that unsubscribes from all event listeners.
 */
export function setupSecondaryWindowSync<T extends Record<string, unknown>>(
  store: StoreApi<T>
): () => void {
  const unlisteners: UnlistenFn[] = []

  let pendingUpdate: Partial<T> | null = null
  let isProcessingUpdate = false

  // Processes pending updates to avoid race conditions and ensure state is applied sequentially.
  const processPendingUpdate = () => {
    if (isProcessingUpdate || !pendingUpdate) {
      return
    }

    const newState = pendingUpdate
    pendingUpdate = null

    const currentSerializedState = partializeStateForSync(store.getState())

    // Only update state if the new state is different from the current serialized state.
    if (!isEqual(currentSerializedState, newState)) {
      isProcessingUpdate = true
      try {
        const processedState = { ...newState } as Record<string, unknown>

        // Handle custom deserialization for the `cachedSongs` LRUCache.
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
        // If another update came in while processing, handle it now.
        if (pendingUpdate) {
          processPendingUpdate()
        }
      }
    }
  }

  // Listens for throttled state updates from the main window.
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

  // Listens for the initial full state response after requesting it.
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

  // Request the initial state from the main window.
  emit(EVENTS.STATE_REQUEST).catch(console.error)

  return () => {
    unlisteners.forEach((unlisten) => unlisten())
  }
}

/**
 * Creates a function that remotely executes an action on the main window's store.
 * This simulates an RPC call over the event bus, returning a promise that resolves
 * or rejects based on the response from the main window.
 *
 * @param actionName - The name of the action function to execute in the main store.
 * @returns An async function that, when called, dispatches the action and waits for a result.
 * @template TArgs - The argument types of the target action.
 * @template TReturn - The return type of the target action (defaults to void).
 *
 * @example
 * ```ts
 * // In the main window store, you have: `play: async () => { ... }`
 * // In a secondary window, you create a remote action:
 * const remotePlay = createRemoteAction<[], void>('play');
 *
 * // And then call it:
 * await remotePlay();
 * ```
 */
export function createRemoteAction<TArgs extends unknown[], TReturn = void>(
  actionName: string
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    const id = `${actionName}-${Date.now()}-${Math.random()}`

    try {
      // Emit the action request to the main window.
      await emit<ActionRequest<TArgs>>(EVENTS.ACTION_REQUEST, {
        id,
        action: actionName,
        args
      })

      // Wait for a response, with a timeout.
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
