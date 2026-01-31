import { create, type StoreApi } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import {
  registerPlaybackListeners,
  setupAudioPlayer,
  unregisterPlaybackListeners
} from "@services/audio"

import TrackPlayer, { RepeatMode, State } from "react-native-track-player"

import {
  clearTrackCaches,
  resolveTrack,
  getSongFromCacheOrFetch,
  prefetchSongs
} from "../utils/player"

import { LRUCache, shuffleArray } from "@repo/utils"

import { type BottomSheetRef } from "@components/ui"

import { type Track } from "../types/player"

import { type PlaySource } from "../types/playSource"

import { type SongWithMainRelations } from "@repo/api"

const PLAYER_STORE_NAME = "player"

const DEFAULT_WINDOW_SIZE = 100

/**
 * Represents the state structure of the {@link usePlayerStore}.
 */
type PlayerState = {
  trackIds: number[]
  queueIds: number[]
  currentTrackIndex: number | null
  currentTrackId: number | null
  currentTrack: Track | null
  volume: number
  isMuted: boolean
  repeatMode: RepeatMode
  isShuffleEnabled: boolean
  isShuffling: boolean
  windowStartIndex: number
  windowSize: number
  canPlayNext: boolean
  canPlayPrevious: boolean
  playbackState: State
  position: number
  duration: number
  buffered: number
  isTrackLoading: boolean
  isQueueLoading: boolean
  isTransitioning: boolean
  playSource: PlaySource
  sourceContextId: number | null
  cachedSongs: LRUCache<number, SongWithMainRelations>
  isRehydrating: boolean
  playerSheetRef: BottomSheetRef | null
  hasHydrated: boolean
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link usePlayerStore}.
 */
type PlayerActions = {
  setVolume: (volume: number) => Promise<void>
  setIsMuted: (isMuted: boolean) => Promise<void>
  setRepeatMode: (mode: RepeatMode) => Promise<void>
  setShuffleEnabled: (enabled: boolean) => Promise<void>
  toggleShuffle: () => Promise<void>
  loadTracks: (
    songIds: number[],
    startIndex?: number,
    source?: PlaySource,
    sourceContextId?: number,
    forceShuf‌fle?: boolean
  ) => Promise<void>
  shuffleAndPlay: (
    songIds: number[],
    source?: PlaySource,
    sourceContextId?: number
  ) => Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  stop: () => Promise<void>
  retry: () => Promise<void>
  playNext: () => Promise<void>
  playPrevious: () => Promise<void>
  skipToTrack: (index: number) => Promise<void>
  seekTo: (position: number) => Promise<void>
  seekBy: (seconds: number) => Promise<void>
  addToQueue: (songIds: number | number[], position?: "next" | "end") => Promise<void>
  addAfterCurrent: (songIds: number | number[]) => Promise<void>
  removeFromQueue: (index: number) => Promise<void>
  removeSongById: (id: number) => Promise<void>
  moveInQueue: (fromIndex: number, toIndex: number) => Promise<void>
  ensureWindowForIndex: (index: number) => Promise<void>
  updateNavigationStates: () => void
  clearQueue: () => Promise<void>
  destroyPlayer: () => Promise<void>
  syncStateWithPlayer: () => Promise<void>
  reconcileQueue: (newQueueIds: number[], newCurrentIndex: number) => Promise<void>
  validateAndUpdateState: () => Promise<void>
  setPlaySource: (source: PlaySource) => void
  updateTrackMetadata: (song: SongWithMainRelations) => Promise<void>
  setPlayerSheetRef: (ref: BottomSheetRef | null) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Combines the state and actions interfaces for the {@link usePlayerStore}.
 */
type PlayerStore = PlayerState & PlayerActions

/**
 * Checks if a given index is valid for an array of a specific length.
 * A valid index must be a non-negative integer and less than the array's length.
 *
 * @param index - The index to validate.
 * @param arrayLength - The length of the array.
 * @returns `true` if the index is valid, `false` otherwise.
 */
function isValidIndex(index: number, arrayLength: number): boolean {
  return index >= 0 && index < arrayLength && Number.isInteger(index)
}

/**
 * Calculates an optimal window (start and end indices) within a queue based on the current index and a desired window size.
 * This is used to manage which tracks are loaded into `react-native-track-player` to optimize memory and performance.
 * The window attempts to center around the `currentIndex` but respects queue boundaries.
 *
 * @param currentIndex - The index of the currently playing track.
 * @param queueLength - The total number of tracks in the queue.
 * @param windowSize - The desired maximum size of the window.
 * @returns An object containing the `start` and `end` indices of the optimal window.
 */
function calculateOptimalWindow(
  currentIndex: number,
  queueLength: number,
  windowSize: number
): { start: number; end: number } {
  if (queueLength === 0) return { start: 0, end: 0 }

  // Ensure window size does not exceed queue length
  const clampedWindowSize = Math.min(windowSize, queueLength)
  const halfWindow = Math.floor(clampedWindowSize / 2)

  // Calculate a tentative start index, trying to center the window around currentIndex
  let start = Math.max(0, currentIndex - halfWindow)
  // Calculate the end index based on the tentative start and clamped window size
  const end = Math.min(queueLength, start + clampedWindowSize)

  // Adjust start index if the end index hit the queue boundary but there's still room to shift left
  if (end === queueLength && queueLength > clampedWindowSize) {
    start = queueLength - clampedWindowSize
  }

  return { start, end }
}

/**
 * Validates the integrity of the player's queue state.
 * Checks if `queueIds` and `currentTrackIndex` are consistent with `trackIds`.
 *
 * @param trackIds - The master list of all track IDs available for playback.
 * @param queueIds - The currently active queue of track IDs.
 * @param currentIndex - The index of the currently playing track within `queueIds`.
 * @returns `true` if the queue state is consistent, `false` otherwise.
 */
function validateQueueIntegrity(
  trackIds: number[],
  queueIds: number[],
  currentIndex: number | null
): boolean {
  // If no master tracks, then queue and current index must also be empty/null
  if (trackIds.length === 0) return queueIds.length === 0 && currentIndex === null
  // If there are master tracks but no queue, current index must be null
  if (queueIds.length === 0) return currentIndex === null

  // Ensure all IDs in the queue are present in the master track IDs
  const validQueueIds = queueIds.every((id) => trackIds.includes(id))
  if (!validQueueIds) return false

  // If a current track index is set, validate its position within the queue
  if (currentIndex !== null) {
    return isValidIndex(currentIndex, queueIds.length)
  }

  return true
}

/**
 * Updates a single song in the LRU cache. If the cache is full, the least recently used item will be removed.
 *
 * @param set - Zustand `set` function for updating store state.
 * @param get - Zustand `get` function for accessing current store state.
 * @param id - The ID of the song to update.
 * @param song - The `SongWithMainRelations` object to cache.
 */
function updateCachedSong(
  set: StoreApi<PlayerStore>["setState"],
  get: StoreApi<PlayerStore>["getState"],
  id: number,
  song: SongWithMainRelations
) {
  const oldCache = get().cachedSongs
  const maxSize = oldCache.getMaxSize()

  const newCache = new LRUCache<number, SongWithMainRelations>(maxSize)

  // Copy existing entries to preserve order and access times in LRU
  for (const [key, value] of oldCache.entries()) {
    newCache.set(key, value)
  }

  // Set the new song, updating if it exists or adding if it's new
  newCache.set(id, song)

  set({ cachedSongs: newCache })
}

/**
 * Updates multiple songs in the LRU cache. This function ensures that songs relevant to the current window
 * or explicitly prioritized remain in the cache, adjusting its size if necessary for priority items.
 *
 * @param set - Zustand `set` function for updating store state.
 * @param get - Zustand `get` function for accessing current store state.
 * @param songs - An array of `SongWithMainRelations` objects to add or update in the cache.
 * @param priorityIds - Optional: An array of song IDs that should be prioritized and kept in cache,
 *                      potentially expanding the cache size temporarily to accommodate them.
 */
function updateCachedSongs(
  set: StoreApi<PlayerStore>["setState"],
  get: StoreApi<PlayerStore>["getState"],
  songs: SongWithMainRelations[],
  priorityIds?: number[]
) {
  const oldCache = get().cachedSongs
  let maxSize = oldCache.getMaxSize()
  const prioritySet = priorityIds ? new Set(priorityIds) : null

  // Adjust max size if priority IDs exceed current max size
  if (prioritySet && prioritySet.size > maxSize) {
    maxSize = prioritySet.size
  }

  const newCache = new LRUCache<number, SongWithMainRelations>(maxSize)

  // Add new songs or update existing ones
  for (const song of songs) {
    newCache.set(song.id, song)
  }

  // Preserve priority items from the old cache that are not in the new batch of songs
  if (prioritySet) {
    for (const [key, value] of oldCache.entries()) {
      if (!newCache.has(key) && prioritySet.has(key)) {
        newCache.set(key, value)
      }
    }
  }

  // Fill up the rest of the new cache with items from the old cache, maintaining LRU order
  for (const [key, value] of oldCache.entries()) {
    if (!newCache.has(key) && newCache.size < maxSize) {
      newCache.set(key, value)
    }
  }

  set({ cachedSongs: newCache })
}

/**
 * Clears all cached songs and resets the LRU cache to its default window size.
 * This is typically called when loading a new set of tracks to prevent stale data.
 *
 * @param set - Zustand `set` function for updating store state.
 * @param get - Zustand `get` function for accessing current store state.
 */
function clearCachedSongs(
  set: StoreApi<PlayerStore>["setState"],
  get: StoreApi<PlayerStore>["getState"]
) {
  const windowSize = get().windowSize || DEFAULT_WINDOW_SIZE
  set({ cachedSongs: new LRUCache(windowSize) })
}

/**
 * Zustand store for managing audio playback.
 *
 * This store handles the entire audio playback lifecycle, including:
 * - Managing the playback queue (`trackIds`, `queueIds`)
 * - Controlling playback state (play, pause, stop, seek, skip)
 * - Handling shuffle and repeat modes
 * - Managing volume and mute state
 * - Integrating with `react-native-track-player` for native audio control
 * - Persisting playback state across app sessions
 * - Caching song metadata using an LRU cache (`cachedSongs`)
 * - Managing the active window of tracks loaded into `TrackPlayer` to optimize performance.
 *
 * The store uses middleware for persistence and handles rehydration logic to restore
 * the player state after the app restarts. It also includes utility functions for
 * maintaining queue integrity, calculating optimal track windows, and prefetching songs.
 *
 * @returns A Zustand store instance with player state and actions.
 */
export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      trackIds: [],
      queueIds: [],
      currentTrackIndex: null,
      currentTrackId: null,
      currentTrack: null,
      volume: 1,
      isMuted: false,
      repeatMode: RepeatMode.Off,
      isShuffleEnabled: false,
      isShuffling: false,
      windowStartIndex: 0,
      windowSize: DEFAULT_WINDOW_SIZE,
      canPlayNext: false,
      canPlayPrevious: false,
      playbackState: State.None,
      position: 0,
      duration: 0,
      buffered: 0,
      isTrackLoading: false,
      isQueueLoading: false,
      isTransitioning: false,
      playSource: "unknown",
      sourceContextId: null,
      cachedSongs: new LRUCache<number, SongWithMainRelations>(DEFAULT_WINDOW_SIZE),
      isRehydrating: false,
      playerSheetRef: null,
      hasHydrated: false,
      validateAndUpdateState: async () => {
        const { trackIds, queueIds, currentTrackIndex } = get()

        if (!validateQueueIntegrity(trackIds, queueIds, currentTrackIndex)) {
          await get().clearQueue()

          return
        }
      },
      reconcileQueue: async (newQueueIds: number[], newCurrentIndex: number) => {
        const { windowSize } = get()

        if (!isValidIndex(newCurrentIndex, newQueueIds.length)) {
          throw new Error("PlayerStore: Invalid current index for new queue")
        }

        // Calculate the optimal window of tracks to load into the native player based on the new queue and current index.
        const { start: newStart, end: newEnd } = calculateOptimalWindow(
          newCurrentIndex,
          newQueueIds.length,
          windowSize
        )

        const newWindowIds = newQueueIds.slice(newStart, newEnd)

        // Identify any songs within the new window that are not yet in the cache.
        const missingSongs = newWindowIds.filter((id) => !get().cachedSongs.has(id))

        if (missingSongs.length > 0) {
          // Prefetch missing songs to ensure they are available before loading into TrackPlayer.
          await prefetchSongs(missingSongs)

          const fetchedSongs: SongWithMainRelations[] = []
          for (const id of missingSongs) {
            const song = await getSongFromCacheOrFetch(id)
            if (song) {
              fetchedSongs.push(song)
            }
          }

          // Update the cache with the newly fetched songs. Prioritize songs in the new window.
          updateCachedSongs(set, get, fetchedSongs, newWindowIds)

          // Verify that all songs in the new window are now in the cache.
          const stillMissing = newWindowIds.filter((id) => !get().cachedSongs.has(id))
          if (stillMissing.length > 0) {
            throw new Error("PlayerStore: Failed to load missing songs")
          }
        }

        // Resolve tracks from the cache for the new window and add them to TrackPlayer.
        const tracks = await Promise.all(
          newWindowIds.map((id) => resolveTrack(get().cachedSongs.get(id)!))
        )

        // Reset TrackPlayer to clear its current queue.
        await TrackPlayer.reset()
        await TrackPlayer.add(tracks)

        // Calculate the player's internal index relative to the new window start.
        const playerIndex = newCurrentIndex - newStart

        // Skip to the correct track in the native player.
        if (isValidIndex(playerIndex, tracks.length)) {
          await TrackPlayer.skip(playerIndex)
        }

        const currentTrackId = newQueueIds[newCurrentIndex]
        const currentTrack = tracks[playerIndex] || null

        set({
          queueIds: newQueueIds,
          currentTrackIndex: newCurrentIndex,
          currentTrackId,
          currentTrack,
          windowStartIndex: newStart,
          duration: currentTrack?.duration || 0,
          isQueueLoading: false
        })

        get().updateNavigationStates()
      },
      setVolume: async (volume) => {
        const clampedVolume = Math.max(0, Math.min(1, volume))

        set({ volume: clampedVolume })

        try {
          await TrackPlayer.setVolume(clampedVolume)
        } catch (error) {
          console.error("PlayerStore: Error in setVolume:", error)
        }
      },
      setIsMuted: async (isMuted) => {
        set({ isMuted })

        try {
          const { volume } = get()

          const targetVolume = isMuted ? 0 : volume

          await TrackPlayer.setVolume(targetVolume)
        } catch (error) {
          console.error("PlayerStore: Error in setIsMuted:", error)
        }
      },
      setRepeatMode: async (mode) => {
        set({ repeatMode: mode })

        try {
          await TrackPlayer.setRepeatMode(mode)

          get().updateNavigationStates()
        } catch (error) {
          console.error("PlayerStore: Error in setRepeatMode:", error)
        }
      },
      setShuffleEnabled: async (enabled) => {
        const { trackIds, currentTrackId, currentTrackIndex, windowSize } = get()

        set({ isShuffleEnabled: enabled, isQueueLoading: true })

        // If no tracks or no current track, there's nothing to shuffle.
        if (trackIds.length === 0 || currentTrackId === null || currentTrackIndex === null) {
          set({ isQueueLoading: false })
          return
        }

        let newQueueIds: number[]
        let newCurrentIndex: number

        if (enabled) {
          // When enabling shuffle, remove the current track from the list, shuffle the rest, and then put the current track at the beginning.
          const remainingIds = trackIds.filter((id) => id !== currentTrackId)

          newQueueIds = [currentTrackId, ...shuffleArray(remainingIds)]
          newCurrentIndex = 0 // Current track is now at index 0 in the shuffled queue.
        } else {
          // When disabling shuffle, revert to the original track order and find the index of the current track.
          newQueueIds = [...trackIds]
          newCurrentIndex = trackIds.indexOf(currentTrackId)
        }

        // Calculate the new window for the native player after shuffling/unshuffling.
        const half = Math.floor(windowSize / 2)
        const newStart = Math.max(
          0,
          Math.min(newCurrentIndex - half, Math.max(0, newQueueIds.length - windowSize))
        )
        const newWindowIds = newQueueIds.slice(newStart, newStart + windowSize)

        // Check for missing songs in the new window and prefetch them.
        const missingSongs = newWindowIds.filter((id) => !get().cachedSongs.has(id))
        if (missingSongs.length > 0) {
          await prefetchSongs(missingSongs)

          const fetchedSongs: SongWithMainRelations[] = []
          const failedIds: number[] = []

          for (const id of missingSongs) {
            const song = await getSongFromCacheOrFetch(id)
            if (song) {
              fetchedSongs.push(song)
            } else {
              failedIds.push(id)
            }
          }

          if (failedIds.length > 0) {
            throw new Error(
              `PlayerStore: Failed to load ${failedIds.length} songs for shuffle: ${failedIds.join(", ")}`
            )
          }

          if (fetchedSongs.length !== missingSongs.length) {
            throw new Error(
              `PlayerStore: Expected ${missingSongs.length} songs but only fetched ${fetchedSongs.length}`
            )
            // CRITICAL: This is a defensive check; if prefetchSongs and getSongFromCacheOrFetch fail to load all songs,
            // it indicates a deeper issue with song data availability or fetching mechanism.
          }

          updateCachedSongs(set, get, fetchedSongs, newWindowIds)

          // Double-check if any songs are still missing after prefetching and cache update.
          const updatedCache = get().cachedSongs
          const stillMissing = newWindowIds.filter((id) => !updatedCache.has(id))

          if (stillMissing.length > 0) {
            const missingDetails = stillMissing.map((id) => {
              const song = updatedCache.get(id)
              return {
                id,
                inCache: !!song,
                cacheSize: updatedCache.size,
                maxSize: updatedCache.getMaxSize()
              }
            })

            console.error("PlayerStore: Cache state after update:", {
              missingCount: stillMissing.length,
              missingIds: stillMissing,
              cacheSize: updatedCache.size,
              maxSize: updatedCache.getMaxSize(),
              fetchedCount: fetchedSongs.length,
              missingDetails
            })

            throw new Error(
              `PlayerStore: Songs still missing in cache after update: ${stillMissing.join(", ")}. ` +
                `Cache has ${updatedCache.size}/${updatedCache.getMaxSize()} songs. ` +
                `Fetched ${fetchedSongs.length} songs but ${stillMissing.length} are still missing.`
            )
          }
        }

        const currentPlayerQueue = await TrackPlayer.getQueue()
        const currentActiveIndex = await TrackPlayer.getActiveTrackIndex()
        const currentTrackNewIndex = newWindowIds.findIndex((id) => id === currentTrackId)

        // Scenario 1: Current track is not in the new window (should not happen if logic is correct, but defensive check).
        if (currentTrackNewIndex < 0) {
          const cachedSongs = get().cachedSongs
          const missingInCache = newWindowIds.filter((id) => !cachedSongs.has(id))

          if (missingInCache.length > 0) {
            throw new Error(
              `PlayerStore: Missing ${missingInCache.length} songs in cache after prefetch: ${missingInCache.join(", ")}`
            )
          }

          const tracks = await Promise.all(
            newWindowIds.map(async (id) => {
              const song = get().cachedSongs.get(id)
              if (!song) {
                throw new Error(`PlayerStore: Song ${id} not found in cache`)
              }
              return resolveTrack(song)
            })
          )

          // Clear TrackPlayer's queue and add new tracks.
          if (currentPlayerQueue.length > 0) {
            // Remove all tracks from TrackPlayer except the one at currentActiveIndex
            const indicesToRemove: number[] = []

            for (let i = 0; i < currentPlayerQueue.length; i++) {
              if (i !== currentActiveIndex) {
                indicesToRemove.push(i)
              }
            }

            // Remove in reverse order to avoid index shifting issues
            for (let i = indicesToRemove.length - 1; i >= 0; i--) {
              await TrackPlayer.remove(indicesToRemove[i])
            }

            // After removing all others, if there's still one track left (the current one), remove it as well.
            const remainingQueue = await TrackPlayer.getQueue()
            if (remainingQueue.length > 0) {
              await TrackPlayer.remove(0) // Remove the single remaining track
            }
          }

          await TrackPlayer.add(tracks)

          const currentSong = get().cachedSongs.get(currentTrackId)

          if (!currentSong) {
            throw new Error(`PlayerStore: Current song ${currentTrackId} not found in cache`)
          }

          const currentTrack = await resolveTrack(currentSong)

          set({
            queueIds: newQueueIds,
            currentTrackIndex: newCurrentIndex,
            currentTrackId,
            currentTrack,
            windowStartIndex: newStart,
            duration: currentTrack?.duration || 0,
            isQueueLoading: false
          })

          get().updateNavigationStates()

          return
        }

        // Scenario 2: Current track is in the new window. Update TrackPlayer queue by selectively adding/removing tracks.
        if (currentPlayerQueue.length > 0) {
          // Remove all tracks from TrackPlayer except the currently playing one.
          const indicesToRemove: number[] = []

          for (let i = 0; i < currentPlayerQueue.length; i++) {
            if (i !== currentActiveIndex) {
              indicesToRemove.push(i)
            }
          }

          // Remove in reverse order to avoid index shifting issues
          for (let i = indicesToRemove.length - 1; i >= 0; i--) {
            await TrackPlayer.remove(indicesToRemove[i])
          }
        }

        // Prepare tracks to add before and after the current track in TrackPlayer.
        const beforeCurrentIds = newWindowIds.slice(0, currentTrackNewIndex)
        const afterCurrentIds = newWindowIds.slice(currentTrackNewIndex + 1)

        const cachedSongs = get().cachedSongs
        const missingBefore = beforeCurrentIds.filter((id) => !cachedSongs.has(id))
        const missingAfter = afterCurrentIds.filter((id) => !cachedSongs.has(id))

        if (missingBefore.length > 0 || missingAfter.length > 0) {
          throw new Error(
            `PlayerStore: Missing songs in cache: before=${missingBefore.join(", ")}, after=${missingAfter.join(", ")}`
          )
        }

        const tracksBeforeCurrent = await Promise.all(
          beforeCurrentIds.map(async (id) => {
            const song = get().cachedSongs.get(id)
            if (!song) {
              throw new Error(`PlayerStore: Song ${id} not found in cache`)
            }
            return resolveTrack(song)
          })
        )
        const tracksAfterCurrent = await Promise.all(
          afterCurrentIds.map(async (id) => {
            const song = get().cachedSongs.get(id)
            if (!song) {
              throw new Error(`PlayerStore: Song ${id} not found in cache`)
            }
            return resolveTrack(song)
          })
        )

        // Add tracks to TrackPlayer at the correct positions.
        if (tracksBeforeCurrent.length > 0) {
          await TrackPlayer.add(tracksBeforeCurrent, 0)
        }
        if (tracksAfterCurrent.length > 0) {
          await TrackPlayer.add(tracksAfterCurrent)
        }

        // Ensure TrackPlayer is pointing to the correct index.
        const finalCurrentIndex = tracksBeforeCurrent.length
        const actualCurrentIndex = await TrackPlayer.getActiveTrackIndex()

        if (actualCurrentIndex !== finalCurrentIndex) {
          await TrackPlayer.skip(finalCurrentIndex)
        }

        const currentSong = get().cachedSongs.get(currentTrackId)
        if (!currentSong) {
          throw new Error(`PlayerStore: Current song ${currentTrackId} not found in cache`)
        }
        const newCurrentTrack = await resolveTrack(currentSong)

        set({
          queueIds: newQueueIds,
          currentTrackIndex: newCurrentIndex,
          windowStartIndex: newStart,
          currentTrack: newCurrentTrack,
          currentTrackId,
          duration: newCurrentTrack?.duration || 0,
          isQueueLoading: false
        })

        get().updateNavigationStates()
      },
      toggleShuffle: async () => {
        const { isShuffleEnabled } = get()

        await get().setShuffleEnabled(!isShuffleEnabled)
      },
      loadTracks: async (
        songIds,
        startIndex = 0,
        source,
        sourceContextId,
        forceShuf‌fle = false
      ) => {
        if (!songIds || !Array.isArray(songIds) || songIds.length === 0) {
          throw new Error("PlayerStore: No song IDs provided or invalid song IDs array")
        }

        if (!isValidIndex(startIndex, songIds.length)) {
          throw new Error(
            `PlayerStore: Invalid start index: ${startIndex} for ${songIds.length} songs`
          )
        }

        const { playSource, isQueueLoading } = get()

        if (isQueueLoading) {
          // Prevent multiple concurrent queue loading operations.
          throw new Error("PlayerStore: Queue is already loading")
        }

        set({
          isQueueLoading: true,
          playSource: source ?? playSource,
          sourceContextId: sourceContextId ?? null
        })

        try {
          // Clear any existing cached song data to ensure a fresh start for the new queue.
          clearCachedSongs(set, get)

          // Filter out any non-numeric IDs to ensure data integrity.
          const allIds = songIds.filter((id) => typeof id === "number")
          if (allIds.length !== songIds.length) {
            throw new Error("PlayerStore: Some songs have invalid IDs")
          }

          const { windowSize, isShuffleEnabled } = get()

          let queueIds: number[]
          let currentIndex: number
          const currentId = allIds[startIndex]

          // Determine if shuffling should be applied, either forced or based on current state.
          const shouldShuf‌fle = forceShuf‌fle ? forceShuf‌fle : isShuffleEnabled

          if (shouldShuf‌fle) {
            // When shuffling, ensure the starting track is the first in the queue, then shuffle the rest.
            const otherIds = allIds.filter((_, i) => i !== startIndex)
            const shuf‌fledOthers = shuffleArray(otherIds)

            queueIds = [currentId, ...shuf‌fledOthers]
            currentIndex = 0 // The current track is now at index 0 in the shuffled queue.
          } else {
            // If not shuffling, the queue remains in the provided order.
            queueIds = [...allIds]
            currentIndex = startIndex
          }

          // Calculate the optimal window of tracks to load into the native TrackPlayer.
          const { start, end } = calculateOptimalWindow(currentIndex, queueIds.length, windowSize)
          const windowIds = queueIds.slice(start, end)

          if (windowIds.length === 0) {
            throw new Error("PlayerStore: Empty window calculated")
          }

          if (!windowIds.includes(currentId)) {
            // This is a critical check to ensure the currently playing track is always within the active TrackPlayer window.
            throw new Error(`PlayerStore: Current track ${currentId} not in calculated window`)
          }

          let tracks: Track[]
          let playerIndex: number

          try {
            // Prefetch all songs within the calculated window to ensure they are available.
            await prefetchSongs(windowIds)

            const windowSongs: SongWithMainRelations[] = []
            for (const id of windowIds) {
              const song = await getSongFromCacheOrFetch(id)
              if (song) {
                windowSongs.push(song)
              }
            }

            if (windowSongs.length !== windowIds.length) {
              // If not all window songs could be loaded, it indicates a data fetching issue.
              throw new Error("PlayerStore: Some window songs could not be loaded")
            }

            // Update the cache with the fetched window songs.
            updateCachedSongs(set, get, windowSongs, windowIds)

            // Resolve the fetched song data into TrackPlayer compatible Track objects.
            tracks = await Promise.all(windowSongs.map((song) => resolveTrack(song)))

            // Reset the native TrackPlayer to clear any previous queue.
            await TrackPlayer.reset()

            if (tracks.length === 0) {
              throw new Error("PlayerStore: No tracks to add to player")
            }

            // Add the resolved tracks to the native TrackPlayer.
            await TrackPlayer.add(tracks)

            // Determine the index for TrackPlayer to skip to, relative to the window start.
            playerIndex = currentIndex - start
            if (!isValidIndex(playerIndex, tracks.length)) {
              throw new Error(
                `PlayerStore: Invalid player index: ${playerIndex} for ${tracks.length} tracks`
              )
            }

            // Skip to the correct track in the native TrackPlayer.
            await TrackPlayer.skip(playerIndex)
          } catch (error) {
            throw new Error(`PlayerStore: Failed to prepare tracks: ${error}`)
          }

          // State integrity checks after TrackPlayer updates.
          if (currentIndex >= queueIds.length) {
            throw new Error(
              `PlayerStore: Invalid state: currentIndex ${currentIndex} >= queueIds.length ${queueIds.length}`
            )
          }

          if (queueIds[currentIndex] !== currentId) {
            throw new Error(
              `PlayerStore: Invalid state: queueIds[${currentIndex}] = ${queueIds[currentIndex]} !== currentId ${currentId}`
            )
          }

          if (!windowIds.includes(currentId)) {
            throw new Error(`PlayerStore: Current track ${currentId} not found in window`)
          }

          // Update the store's state with the new queue information.
          set({
            trackIds: allIds, // The original, unshuffled list of track IDs
            queueIds, // The potentially shuffled queue
            currentTrackIndex: currentIndex,
            currentTrackId: currentId,
            currentTrack: tracks[playerIndex] || null,
            windowStartIndex: start,
            position: 0,
            duration: tracks[playerIndex]?.duration || 0,
            buffered: 0,
            isQueueLoading: false
          })

          // Update navigation states (e.g., canPlayNext, canPlayPrevious) based on the new queue.
          get().updateNavigationStates()
        } catch (error) {
          set({ isQueueLoading: false })
          throw error
        }
      },
      shuffleAndPlay: async (songIds, source, sourceContextId) => {
        const { isShuffling, loadTracks, play } = get()

        if (!songIds || songIds.length === 0 || isShuffling) return

        set({ isShuffling: true })

        try {
          const randomStartIndex = Math.floor(Math.random() * songIds.length)

          await loadTracks(songIds, randomStartIndex, source, sourceContextId, true)
          await play()
        } catch (error) {
          console.error("PlayerStore: Error in shuffleAndPlay:", error)
        } finally {
          set({ isShuffling: false })
        }
      },
      play: async () => {
        try {
          const { currentTrack } = get()

          if (!currentTrack) {
            throw new Error("PlayerStore: No track loaded")
          }

          await TrackPlayer.play()
        } catch (error) {
          throw error
        }
      },
      pause: async () => {
        try {
          await TrackPlayer.pause()
        } catch (error) {
          console.error("PlayerStore: Error in pause:", error)
        }
      },
      stop: async () => {
        try {
          await TrackPlayer.stop()
        } catch (error) {
          console.error("PlayerStore: Error in stop:", error)
        }
      },
      retry: async () => {
        try {
          await TrackPlayer.retry()
        } catch (error) {
          console.error("PlayerStore: Error in retry:", error)
        }
      },
      playNext: async () => {
        const { currentTrackIndex, queueIds, repeatMode, skipToTrack, play } = get()

        if (currentTrackIndex === null || queueIds.length === 0) {
          return
        }

        const nextIndex = currentTrackIndex + 1

        if (isValidIndex(nextIndex, queueIds.length)) {
          await skipToTrack(nextIndex)
          await play()
          return
        }

        if (repeatMode === RepeatMode.Queue && queueIds.length > 0) {
          await skipToTrack(0)
          await play()
        }
      },
      playPrevious: async () => {
        const { currentTrackIndex, queueIds, repeatMode, skipToTrack, play } = get()

        if (currentTrackIndex === null || queueIds.length === 0) {
          return
        }

        const previousIndex = currentTrackIndex - 1

        if (isValidIndex(previousIndex, queueIds.length)) {
          await skipToTrack(previousIndex)
          await play()
          return
        }

        if (repeatMode === RepeatMode.Queue && queueIds.length > 0) {
          await skipToTrack(queueIds.length - 1)
          await play()
        }
      },
      skipToTrack: async (index) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (!isValidIndex(index, queueIds.length)) {
          throw new Error("PlayerStore: Invalid track index")
        }

        const windowEndIndex = windowStartIndex + windowSize
        const isInCurrentWindow = index >= windowStartIndex && index < windowEndIndex

        if (isInCurrentWindow) {
          // If the target track is already within the current TrackPlayer window, a simple skip is sufficient.
          const playerIndex = index - windowStartIndex
          await TrackPlayer.skip(playerIndex)

          const currentTrackId = queueIds[index]
          const cachedSong = get().cachedSongs.get(currentTrackId)

          if (!cachedSong) {
            // If the song is unexpectedly not in cache, re-ensure the window and try again.
            // This can happen if the cache was aggressively pruned or due to race conditions.
            await get().ensureWindowForIndex(index)
            const expandedCachedSong = get().cachedSongs.get(currentTrackId)
            if (!expandedCachedSong) {
              throw new Error(`PlayerStore: Failed to load song ${currentTrackId}`)
            }
            const currentTrack = await resolveTrack(expandedCachedSong)
            set({
              currentTrackIndex: index,
              currentTrackId,
              currentTrack,
              duration: currentTrack?.duration || 0
            })
          } else {
            const currentTrack = await resolveTrack(cachedSong)
            set({
              currentTrackIndex: index,
              currentTrackId,
              currentTrack,
              duration: currentTrack?.duration || 0
            })
          }

          get().updateNavigationStates()
        } else {
          // If the target track is outside the current window, we need to load a new window into TrackPlayer.
          // `ensureWindowForIndex` will handle resetting TrackPlayer and adding new tracks.
          await get().ensureWindowForIndex(index)

          const { windowStartIndex: newStart } = get()

          const playerIndex = index - newStart
          const playerQueue = await TrackPlayer.getQueue()

          if (isValidIndex(playerIndex, playerQueue.length)) {
            await TrackPlayer.skip(playerIndex)

            const currentTrackId = queueIds[index]
            const cachedSong = get().cachedSongs.get(currentTrackId)

            if (!cachedSong) {
              throw new Error(
                `PlayerStore: Song ${currentTrackId} not in cache after ensureWindowForIndex`
              )
            }

            const currentTrack = await resolveTrack(cachedSong)

            set({
              currentTrackIndex: index,
              currentTrackId,
              currentTrack,
              duration: currentTrack?.duration || 0
            })

            get().updateNavigationStates()
          }
        }
      },
      seekTo: async (position) => {
        try {
          const { duration } = get()

          const clampedPosition = Math.max(0, Math.min(duration, position))

          await TrackPlayer.seekTo(clampedPosition)
        } catch (error) {
          console.error("PlayerStore: Error in seekTo:", error)
        }
      },
      seekBy: async (seconds) => {
        try {
          await TrackPlayer.seekBy(seconds)
        } catch (error) {
          console.error("PlayerStore: Error in seekBy:", error)
        }
      },
      addToQueue: async (songIds, position = "end") => {
        const { queueIds, currentTrackIndex, windowStartIndex, windowSize } = get()

        set({ isQueueLoading: true })

        const idsToInsert = Array.isArray(songIds) ? songIds : [songIds]

        await prefetchSongs(idsToInsert)

        const songs: SongWithMainRelations[] = []
        for (const id of idsToInsert) {
          const song = await getSongFromCacheOrFetch(id)
          if (song) {
            songs.push(song)
          }
        }

        if (songs.length !== idsToInsert.length) {
          throw new Error("PlayerStore: Some songs could not be loaded")
        }

        const validSongs = songs.filter((song) => song && typeof song.id === "number")
        updateCachedSongs(set, get, validSongs)

        const insertIndex =
          position === "next" && currentTrackIndex !== null
            ? currentTrackIndex + 1
            : queueIds.length

        const newQueueIds = [...queueIds]
        newQueueIds.splice(insertIndex, 0, ...idsToInsert)

        const start = windowStartIndex
        const end = Math.min(start + windowSize, newQueueIds.length)

        if (insertIndex >= start && insertIndex < end) {
          const insertBeforePlayerIndex = insertIndex - start
          const tracks = await Promise.all(
            idsToInsert.map((id) => resolveTrack(get().cachedSongs.get(id)!))
          )

          await TrackPlayer.add(tracks, insertBeforePlayerIndex)
        }

        set({
          queueIds: newQueueIds,
          isQueueLoading: false
        })

        get().updateNavigationStates()
      },
      addAfterCurrent: async (songIds) => {
        const { queueIds, currentTrackIndex, windowStartIndex, windowSize } = get()

        set({ isQueueLoading: true })

        const idsToInsert = Array.isArray(songIds) ? songIds : [songIds]

        await prefetchSongs(idsToInsert)

        const songs: SongWithMainRelations[] = []
        for (const id of idsToInsert) {
          const song = await getSongFromCacheOrFetch(id)
          if (song) {
            songs.push(song)
          }
        }

        if (songs.length !== idsToInsert.length) {
          throw new Error("PlayerStore: Some songs could not be loaded")
        }

        const validSongs = songs.filter((song) => song && typeof song.id === "number")
        updateCachedSongs(set, get, validSongs)

        const insertIndex = currentTrackIndex !== null ? currentTrackIndex + 1 : queueIds.length

        const newQueueIds = [...queueIds]
        newQueueIds.splice(insertIndex, 0, ...idsToInsert)

        const start = windowStartIndex
        const end = Math.min(start + windowSize, newQueueIds.length)

        if (insertIndex >= start && insertIndex < end) {
          const insertBeforePlayerIndex = insertIndex - start
          const tracks = await Promise.all(
            idsToInsert.map((id) => resolveTrack(get().cachedSongs.get(id)!))
          )

          await TrackPlayer.add(tracks, insertBeforePlayerIndex)
        }

        set({
          queueIds: newQueueIds,
          isQueueLoading: false
        })

        get().updateNavigationStates()
      },
      removeFromQueue: async (index) => {
        const { queueIds, windowStartIndex, windowSize, currentTrackIndex } = get()

        if (!isValidIndex(index, queueIds.length)) {
          throw new Error("PlayerStore: Invalid index to remove")
        }

        set({ isQueueLoading: true })

        const newQueueIds = queueIds.filter((_, i) => i !== index)

        const start = windowStartIndex
        const end = Math.min(start + windowSize, queueIds.length)

        if (index >= start && index < end) {
          await TrackPlayer.remove(index - start)
        }

        let nextCurrentIndex = currentTrackIndex

        if (currentTrackIndex !== null) {
          if (index < currentTrackIndex) {
            nextCurrentIndex = currentTrackIndex - 1
          } else if (index === currentTrackIndex) {
            if (newQueueIds.length === 0) {
              nextCurrentIndex = null
            } else {
              nextCurrentIndex = Math.min(currentTrackIndex, newQueueIds.length - 1)

              if (isValidIndex(nextCurrentIndex, newQueueIds.length)) {
                const newCurrentTrackId = newQueueIds[nextCurrentIndex]
                const cachedSong = get().cachedSongs.get(newCurrentTrackId)

                if (cachedSong) {
                  const newCurrentTrack = await resolveTrack(cachedSong)

                  set({
                    currentTrack: newCurrentTrack,
                    currentTrackId: newCurrentTrackId,
                    duration: newCurrentTrack?.duration || 0
                  })
                } else {
                  set({
                    currentTrack: null,
                    currentTrackId: newCurrentTrackId,
                    duration: 0
                  })
                }
              }
            }
          }
        }

        set({
          queueIds: newQueueIds,
          currentTrackIndex: nextCurrentIndex,
          isQueueLoading: false
        })

        get().updateNavigationStates()
      },
      removeSongById: async (id) => {
        const {
          trackIds,
          queueIds,
          currentTrackId,
          currentTrackIndex,
          windowStartIndex,
          windowSize
        } = get()

        const queueIndex = queueIds.findIndex((queueId) => queueId === id)
        if (queueIndex === -1) {
          return
        }

        set({ isQueueLoading: true })

        try {
          const newTrackIds = trackIds.filter((trackId) => trackId !== id)
          const newQueueIds = queueIds.filter((queueId) => queueId !== id)

          if (currentTrackId === id) {
            await TrackPlayer.reset()

            set({
              trackIds: newTrackIds,
              queueIds: newQueueIds,
              currentTrack: null,
              currentTrackId: null,
              currentTrackIndex: null,
              canPlayNext: false,
              canPlayPrevious: false,
              windowStartIndex: 0,
              windowSize: DEFAULT_WINDOW_SIZE,
              position: 0,
              duration: 0,
              buffered: 0,
              playbackState: State.None,
              isQueueLoading: false
            })
            return
          }

          const start = windowStartIndex
          const end = Math.min(start + windowSize, queueIds.length)

          if (queueIndex >= start && queueIndex < end) {
            await TrackPlayer.remove(queueIndex - start)
          }

          let nextCurrentIndex = currentTrackIndex
          if (currentTrackIndex !== null && queueIndex < currentTrackIndex) {
            nextCurrentIndex = currentTrackIndex - 1
          }

          set({
            trackIds: newTrackIds,
            queueIds: newQueueIds,
            currentTrackIndex: nextCurrentIndex,
            isQueueLoading: false
          })

          get().updateNavigationStates()
        } catch (error) {
          console.error("PlayerStore: Error in removeSongById:", error)
          set({ isQueueLoading: false })
          throw error
        }
      },
      moveInQueue: async (fromIndex, toIndex) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (!isValidIndex(fromIndex, queueIds.length) || !isValidIndex(toIndex, queueIds.length)) {
          throw new Error("PlayerStore: Invalid move indices")
        }

        set({ isQueueLoading: true })

        const newQueue = [...queueIds]
        const [moved] = newQueue.splice(fromIndex, 1)

        newQueue.splice(toIndex, 0, moved)

        const start = windowStartIndex
        const end = Math.min(start + windowSize, queueIds.length)

        if (fromIndex >= start && fromIndex < end && toIndex >= start && toIndex < end) {
          await TrackPlayer.move(fromIndex - start, toIndex - start)
        }

        set({ queueIds: newQueue, isQueueLoading: false })

        get().updateNavigationStates()
      },
      clearQueue: async () => {
        set({ isQueueLoading: true })

        try {
          await TrackPlayer.reset()
        } catch (error) {
          console.error("PlayerStore: Error in clearQueue (reset):", error)
        }

        set({
          trackIds: [],
          queueIds: [],
          currentTrack: null,
          currentTrackId: null,
          currentTrackIndex: null,
          canPlayNext: false,
          canPlayPrevious: false,
          windowStartIndex: 0,
          windowSize: DEFAULT_WINDOW_SIZE,
          position: 0,
          duration: 0,
          buffered: 0,
          playbackState: State.None,
          isQueueLoading: false,
          sourceContextId: null
        })
      },
      ensureWindowForIndex: async (index) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (!queueIds.length) return

        const start = windowStartIndex
        const end = Math.min(start + windowSize, queueIds.length)

        // Check if the target index is outside the current window.
        if (index < start || index >= end) {
          // If outside, calculate a new optimal window centered around the target index.
          const { start: newStart, end: newEnd } = calculateOptimalWindow(
            index,
            queueIds.length,
            windowSize
          )
          const windowIds = queueIds.slice(newStart, newEnd)

          // Identify and prefetch any missing songs in the new window.
          const missingSongs = windowIds.filter((id) => !get().cachedSongs.has(id))

          if (missingSongs.length > 0) {
            await prefetchSongs(missingSongs)

            const fetchedSongs: SongWithMainRelations[] = []
            for (const id of missingSongs) {
              const song = await getSongFromCacheOrFetch(id)
              if (song) {
                fetchedSongs.push(song as SongWithMainRelations)
              }
            }

            // Update the cache with newly fetched songs, prioritizing those in the new window.
            updateCachedSongs(set, get, fetchedSongs, windowIds)

            const stillMissing = windowIds.filter((id) => !get().cachedSongs.has(id))
            if (stillMissing.length > 0) {
              throw new Error("PlayerStore: Failed to load missing songs for window")
            }
          }

          // Resolve tracks for the new window and reset TrackPlayer.
          const tracks = await Promise.all(
            windowIds.map((id) => {
              const song = get().cachedSongs.get(id)
              if (!song) {
                throw new Error(
                  `PlayerStore: Song ${id} not found in cache after ensureWindowForIndex`
                )
              }
              return resolveTrack(song)
            })
          )

          await TrackPlayer.reset() // Clear the current native queue
          await TrackPlayer.add(tracks) // Add the new window of tracks

          // Update store state to reflect the new window and current track.
          const newCurrentTrackIndex = index
          const newCurrentTrackId = queueIds[index]
          const newCurrentTrack = tracks[index - newStart] || null

          set({
            windowStartIndex: newStart,
            currentTrackIndex: newCurrentTrackIndex,
            currentTrackId: newCurrentTrackId,
            currentTrack: newCurrentTrack,
            duration: newCurrentTrack?.duration || 0
          })

          return
        }

        // Optimized prefetching: If close to the end of the current window, prefetch the next batch of songs.
        // This is a proactive measure to ensure smooth playback transitions.
        // It fetches a small buffer (e.g., 10 tracks) ahead of the current position.
        if (index >= end - 5 && end < queueIds.length) {
          const toAddIds = queueIds.slice(end, Math.min(end + 10, queueIds.length))

          const missingSongs = toAddIds.filter((id) => !get().cachedSongs.has(id))

          if (missingSongs.length > 0) {
            await prefetchSongs(missingSongs)

            const fetchedSongs: SongWithMainRelations[] = []
            for (const id of missingSongs) {
              const song = await getSongFromCacheOrFetch(id)
              if (song) {
                fetchedSongs.push(song as SongWithMainRelations)
              }
            }

            // Update cache with newly fetched songs, ensuring current window items are still prioritized.
            const currentWindowIds = queueIds.slice(start, end)
            const priorityIds = [...currentWindowIds, ...toAddIds]
            updateCachedSongs(set, get, fetchedSongs, priorityIds)

            const stillMissing = missingSongs.filter((id) => !get().cachedSongs.has(id))
            if (stillMissing.length === missingSongs.length) {
              // If no new songs were actually cached, there's no need to try adding them to TrackPlayer.
              return
            }
          }

          // Resolve tracks for the prefetched IDs and add them to TrackPlayer's existing queue.
          const toAddTracks = await Promise.all(
            toAddIds.map((id) => resolveTrack(get().cachedSongs.get(id)!))
          )

          if (toAddTracks.length) {
            await TrackPlayer.add(toAddTracks)

            // Update windowSize to reflect the newly added tracks.
            set({ windowSize: Math.min(windowSize + toAddTracks.length, queueIds.length) })
          }
        }
      },
      updateNavigationStates: () => {
        const { currentTrackIndex, queueIds, repeatMode } = get()

        let canPlayNext = false
        let canPlayPrevious = false

        if (currentTrackIndex !== null && queueIds.length > 0) {
          if (queueIds.length === 1) {
            // If only one track, can play next/previous only if repeat mode is Queue (loops back to itself).
            canPlayNext = canPlayPrevious = repeatMode === RepeatMode.Queue
          } else {
            switch (repeatMode) {
              case RepeatMode.Queue:
                // In Queue repeat mode, can always play next/previous as the queue loops.
                canPlayNext = canPlayPrevious = true
                break
              case RepeatMode.Track:
              case RepeatMode.Off:
              default:
                // In Track repeat or Off mode, can play next/previous only if there are actual tracks in that direction.
                canPlayNext = currentTrackIndex < queueIds.length - 1
                canPlayPrevious = currentTrackIndex > 0
                break
            }
          }
        }

        set({ canPlayNext, canPlayPrevious })
      },
      syncStateWithPlayer: async () => {
        const { queueIds, currentTrackIndex } = get()

        if (queueIds.length === 0) return

        try {
          const playerQueue = await TrackPlayer.getQueue()
          const activePlayerIndex = await TrackPlayer.getActiveTrackIndex()

          // If no active index from TrackPlayer or it's invalid, skip synchronization.
          if (
            activePlayerIndex === undefined ||
            !isValidIndex(activePlayerIndex, playerQueue.length)
          ) {
            return
          }

          const activeTrack = playerQueue[activePlayerIndex]
          if (!activeTrack) return // No active track in native player to sync with.

          const cachedSongs = get().cachedSongs
          // Find the actual index of the currently active TrackPlayer track within the store's queue.
          // This handles cases where TrackPlayer might advance to the next track automatically.
          const actualQueueIndex = queueIds.findIndex(
            (id) => cachedSongs.get(id)?.id === activeTrack.id
          )

          // If the actual queue index is valid and different from the store's current index, update the store.
          if (actualQueueIndex >= 0 && actualQueueIndex !== currentTrackIndex) {
            const currentTrackId = queueIds[actualQueueIndex]
            const currentTrack = await resolveTrack(cachedSongs.get(currentTrackId)!)

            set({
              currentTrackIndex: actualQueueIndex,
              currentTrackId,
              currentTrack,
              duration: Math.round(currentTrack?.duration || 0)
            })

            get().updateNavigationStates()
          }
        } catch (error) {
          console.error("PlayerStore: Error in syncStateWithPlayer:", error)
        }
      },
      destroyPlayer: async () => {
        try {
          await TrackPlayer.reset()
        } catch (error) {
          console.error("PlayerStore: Error in destroyPlayer:", error)
        }

        set({
          trackIds: [],
          queueIds: [],
          currentTrack: null,
          currentTrackId: null,
          currentTrackIndex: null,
          windowStartIndex: 0,
          windowSize: DEFAULT_WINDOW_SIZE,
          playbackState: State.None,
          position: 0,
          duration: 0,
          buffered: 0,
          isTrackLoading: false,
          isQueueLoading: false,
          canPlayNext: false,
          canPlayPrevious: false,
          playSource: "unknown",
          sourceContextId: null
        })

        unregisterPlaybackListeners()
      },
      setPlaySource: (source: PlaySource) => {
        set({ playSource: source })
      },
      updateTrackMetadata: async (song) => {
        const { currentTrackId, currentTrackIndex, windowStartIndex, queueIds } = get()

        clearTrackCaches(song)
        updateCachedSong(set, get, song.id, song)

        const queueIndex = queueIds.findIndex((id) => id === song.id)
        if (queueIndex === -1) return

        try {
          const updatedTrack = await resolveTrack(song)

          if (currentTrackId === song.id && currentTrackIndex !== null) {
            set({
              currentTrack: updatedTrack,
              duration: updatedTrack.duration
            })
          }

          const windowEndIndex = windowStartIndex + get().windowSize
          const isInCurrentWindow = queueIndex >= windowStartIndex && queueIndex < windowEndIndex

          if (isInCurrentWindow) {
            const playerIndex = queueIndex - windowStartIndex

            await TrackPlayer.updateMetadataForTrack(playerIndex, {
              title: updatedTrack.title,
              artist: updatedTrack.artist,
              album: updatedTrack.album,
              artwork: updatedTrack.artwork,
              duration: updatedTrack.duration
            })
          }
        } catch (error) {
          console.error("PlayerStore: Error updating track metadata:", error)
        }
      },
      setPlayerSheetRef: (ref) => {
        set({ playerSheetRef: ref })
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      }
    }),
    {
      name: PLAYER_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${PLAYER_STORE_NAME}.json`),
      partialize: (state) => ({
        trackIds: state.trackIds,
        queueIds: state.queueIds,
        currentTrackIndex: state.currentTrackIndex,
        currentTrackId: state.currentTrackId,
        volume: state.volume,
        isMuted: state.isMuted,
        repeatMode: state.repeatMode,
        isShuffleEnabled: state.isShuffleEnabled,
        position: state.position,
        windowSize: state.windowSize,
        playSource: state.playSource,
        sourceContextId: state.sourceContextId
      }),
      onRehydrateStorage: () => {
        return async (state) => {
          usePlayerStore.setState({ isRehydrating: true })

          // Setup audio player and register playback listeners. This must happen before any TrackPlayer operations.
          await setupAudioPlayer()
          TrackPlayer.registerPlaybackService(() => registerPlaybackListeners)

          if (state) {
            try {
              // Set volume to 0 initially during rehydration to avoid unexpected audio playback at app startup.
              await TrackPlayer.setVolume(0)

              if (state.repeatMode !== undefined) {
                await TrackPlayer.setRepeatMode(state.repeatMode)
              }

              // Only attempt to restore player state if a valid queue and current track were previously persisted.
              if (
                state.trackIds &&
                state.trackIds.length > 0 &&
                state.queueIds &&
                state.queueIds.length > 0 &&
                state.currentTrackIndex !== null &&
                state.currentTrackId !== null
              ) {
                const { trackIds, queueIds, currentTrackIndex, currentTrackId } = state

                // Validate the integrity of the rehydrated queue data to prevent restoring a corrupted state.
                if (!validateQueueIntegrity(trackIds, queueIds, currentTrackIndex)) {
                  // If corrupted, clear the player state and mark as hydrated to allow normal app flow.
                  usePlayerStore.setState({
                    trackIds: [],
                    queueIds: [],
                    currentTrack: null,
                    currentTrackId: null,
                    currentTrackIndex: null,
                    windowStartIndex: 0,
                    windowSize: DEFAULT_WINDOW_SIZE,
                    isRehydrating: false,
                    hasHydrated: true
                  })
                  return
                }

                const windowSize = state.windowSize ?? DEFAULT_WINDOW_SIZE
                // Calculate the optimal window of tracks for the rehydrated state to load into TrackPlayer.
                const { start, end } = calculateOptimalWindow(
                  currentTrackIndex,
                  queueIds.length,
                  windowSize
                )
                const windowIds = queueIds.slice(start, end)

                try {
                  // Prefetch songs for the rehydrated window to ensure they are available.
                  await prefetchSongs(windowIds)

                  const windowSongs: SongWithMainRelations[] = []
                  for (const id of windowIds) {
                    const song = await getSongFromCacheOrFetch(id)
                    if (song) {
                      windowSongs.push(song)
                    }
                  }

                  if (windowSongs.length !== windowIds.length) {
                    // If not all songs in the window could be re-fetched, reset player state as data is incomplete.
                    usePlayerStore.setState({
                      trackIds: [],
                      queueIds: [],
                      currentTrack: null,
                      currentTrackId: null,
                      currentTrackIndex: null,
                      windowStartIndex: 0,
                      windowSize: DEFAULT_WINDOW_SIZE,
                      isRehydrating: false,
                      hasHydrated: true
                    })
                    return
                  }

                  // Restore the cached songs map with the re-fetched window songs.
                  const cachedSongsMap = new LRUCache<number, SongWithMainRelations>(windowSize)
                  windowSongs.forEach((s) => cachedSongsMap.set(s.id, s))

                  usePlayerStore.setState({ cachedSongs: cachedSongsMap })

                  // Resolve TrackPlayer-compatible tracks and add them to the native player.
                  const tracks = await Promise.all(
                    windowIds.map((id) => resolveTrack(cachedSongsMap.get(id)!))
                  )

                  await TrackPlayer.reset() // Clear any residual native queue.
                  await TrackPlayer.add(tracks)

                  // Skip to the correct track in the native player based on the rehydrated state.
                  const playerIndex = currentTrackIndex - start

                  if (isValidIndex(playerIndex, tracks.length)) {
                    await TrackPlayer.skip(playerIndex)
                  }

                  // Restore the playback position if it was saved and is a valid number.
                  if (typeof state.position === "number" && state.position > 0) {
                    await TrackPlayer.seekTo(state.position)
                  }

                  // Update the store's state with the fully rehydrated data.
                  usePlayerStore.setState({
                    trackIds,
                    queueIds,
                    currentTrackIndex,
                    currentTrackId,
                    currentTrack: tracks[playerIndex] || null,
                    windowStartIndex: start,
                    windowSize,
                    duration: tracks[playerIndex]?.duration || 0,
                    isRehydrating: false,
                    hasHydrated: true
                  })

                  // Update navigation states to reflect the restored queue.
                  usePlayerStore.getState().updateNavigationStates()
                } catch (error) {
                  // Log any errors during the rehydration process and reset to a clean state.
                  console.error("PlayerStore: Error in onRehydrateStorage:", error)
                  usePlayerStore.setState({
                    trackIds: [],
                    queueIds: [],
                    currentTrack: null,
                    currentTrackId: null,
                    currentTrackIndex: null,
                    windowStartIndex: 0,
                    windowSize: DEFAULT_WINDOW_SIZE,
                    isRehydrating: false,
                    hasHydrated: true
                  })
                }
              } else {
                // If no valid player state was found in storage (e.g., first launch), ensure hasHydrated is true.
                usePlayerStore.setState({
                  isRehydrating: false,
                  hasHydrated: true
                })
              }

              // Restore the volume based on persisted state, respecting the mute setting.
              if (state.volume !== undefined) {
                await TrackPlayer.setVolume(state.isMuted ? 0 : state.volume)
              } else {
                await TrackPlayer.setVolume(1) // Default volume if not persisted.
              }
            } finally {
              // Ensure `hasHydrated` is always set to true after the rehydration attempt, regardless of success or failure.
              state.setHasHydrated(true)
              const currentState = usePlayerStore.getState()

              if (currentState.isRehydrating) {
                usePlayerStore.setState({ isRehydrating: false })
              }
            }
          } else {
            // If no persisted state exists at all (e.g., fresh install), ensure hasHydrated is true.
            usePlayerStore.setState({
              isRehydrating: false,
              hasHydrated: true
            })
          }
        }
      }
    }
  )
)
