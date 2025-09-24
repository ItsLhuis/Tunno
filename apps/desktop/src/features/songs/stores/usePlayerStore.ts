import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import {
  registerPlaybackListeners,
  setupAudioPlayer,
  unregisterPlaybackListeners
} from "@services/audio"

import TrackPlayer, { RepeatMode, State } from "react-track-player-web"

import { resolveTrack } from "../utils/player"

import { shuffleArray } from "@repo/utils"

import { getSongsByIdsWithMainRelations } from "../api/queries"

import { type Track } from "../types/player"

import { type PlaySource } from "../types/playSource"

import { type SongWithMainRelations } from "@repo/api"

const PLAYER_STORE_NAME = "player"

const DEFAULT_WINDOW_SIZE = 100

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
  isRehydrating: boolean
  hasHydrated: boolean
}

type PlayerActions = {
  setVolume: (volume: number) => Promise<void>
  setIsMuted: (isMuted: boolean) => Promise<void>
  setRepeatMode: (mode: RepeatMode) => Promise<void>
  setShuffleEnabled: (enabled: boolean) => Promise<void>
  toggleShuffle: () => Promise<void>
  loadTracks: (
    songs: SongWithMainRelations[],
    startIndex?: number,
    source?: PlaySource,
    forceShuf‌fle?: boolean
  ) => Promise<void>
  shuffleAndPlay: (songs: SongWithMainRelations[], source?: PlaySource) => Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  stop: () => Promise<void>
  retry: () => Promise<void>
  playNext: () => Promise<void>
  playPrevious: () => Promise<void>
  skipToTrack: (index: number) => Promise<void>
  seekTo: (position: number) => Promise<void>
  seekBy: (seconds: number) => Promise<void>
  addToQueue: (
    track: SongWithMainRelations | SongWithMainRelations[],
    position?: "next" | "end"
  ) => Promise<void>
  addAfterCurrent: (track: SongWithMainRelations | SongWithMainRelations[]) => Promise<void>
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
  setHasHydrated: (hasHydrated: boolean) => void
}

type PlayerStore = PlayerState & PlayerActions

const songsCacheById = new Map<number, SongWithMainRelations>()

const isValidIndex = (index: number, arrayLength: number): boolean => {
  return index >= 0 && index < arrayLength && Number.isInteger(index)
}

const calculateOptimalWindow = (
  currentIndex: number,
  queueLength: number,
  windowSize: number
): { start: number; end: number } => {
  if (queueLength === 0) return { start: 0, end: 0 }

  const clampedWindowSize = Math.min(windowSize, queueLength)
  const halfWindow = Math.floor(clampedWindowSize / 2)

  let start = Math.max(0, currentIndex - halfWindow)
  let end = Math.min(queueLength, start + clampedWindowSize)

  if (end === queueLength && queueLength > clampedWindowSize) {
    start = queueLength - clampedWindowSize
  }

  return { start, end }
}

const validateQueueIntegrity = (
  trackIds: number[],
  queueIds: number[],
  currentIndex: number | null
): boolean => {
  if (trackIds.length === 0) return queueIds.length === 0 && currentIndex === null
  if (queueIds.length === 0) return currentIndex === null

  const validQueueIds = queueIds.every((id) => trackIds.includes(id))
  if (!validQueueIds) return false

  if (currentIndex !== null) {
    return isValidIndex(currentIndex, queueIds.length)
  }

  return true
}

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
      isRehydrating: false,
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
          throw new Error("Invalid current index for new queue")
        }

        const { start: newStart, end: newEnd } = calculateOptimalWindow(
          newCurrentIndex,
          newQueueIds.length,
          windowSize
        )

        const newWindowIds = newQueueIds.slice(newStart, newEnd)

        const missingSongs = newWindowIds.filter((id) => !songsCacheById.has(id))

        if (missingSongs.length > 0) {
          const missingSongsData = await getSongsByIdsWithMainRelations(missingSongs)

          if (missingSongsData.length !== missingSongs.length) {
            throw new Error("Failed to load missing songs")
          }

          missingSongsData.forEach((s) => songsCacheById.set(s.id, s))
        }

        const tracks = await Promise.all(
          newWindowIds.map((id) => resolveTrack(songsCacheById.get(id)!))
        )

        await TrackPlayer.reset()
        await TrackPlayer.add(tracks)

        const playerIndex = newCurrentIndex - newStart

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
          console.error("Error in setVolume:", error)
        }
      },
      setIsMuted: async (isMuted) => {
        set({ isMuted })

        try {
          const { volume } = get()

          const targetVolume = isMuted ? 0 : volume

          await TrackPlayer.setVolume(targetVolume)
        } catch (error) {
          console.error("Error in setIsMuted:", error)
        }
      },
      setRepeatMode: async (mode) => {
        set({ repeatMode: mode })

        try {
          await TrackPlayer.setRepeatMode(mode)

          get().updateNavigationStates()
        } catch (error) {
          console.error("Error in setRepeatMode:", error)
        }
      },
      setShuffleEnabled: async (enabled) => {
        const { trackIds, currentTrackId, currentTrackIndex, windowSize } = get()

        set({ isShuffleEnabled: enabled, isQueueLoading: true })

        if (trackIds.length === 0 || currentTrackId === null || currentTrackIndex === null) {
          set({ isQueueLoading: false })
          return
        }

        let newQueueIds: number[]
        let newCurrentIndex: number

        if (enabled) {
          const remainingIds = trackIds.filter((id) => id !== currentTrackId)

          newQueueIds = [currentTrackId, ...shuffleArray(remainingIds)]
          newCurrentIndex = 0
        } else {
          newQueueIds = [...trackIds]
          newCurrentIndex = trackIds.indexOf(currentTrackId)
        }

        const half = Math.floor(windowSize / 2)
        const newStart = Math.max(
          0,
          Math.min(newCurrentIndex - half, Math.max(0, newQueueIds.length - windowSize))
        )
        const newWindowIds = newQueueIds.slice(newStart, newStart + windowSize)

        const currentPlayerQueue = TrackPlayer.getQueue()
        const currentActiveIndex = TrackPlayer.getActiveTrackIndex()
        const currentTrackNewIndex = newWindowIds.findIndex((id) => id === currentTrackId)

        if (currentTrackNewIndex < 0) {
          const tracks = await Promise.all(
            newWindowIds.map((id) => resolveTrack(songsCacheById.get(id)!))
          )
          if (currentPlayerQueue.length > 0) {
            const indicesToRemove: number[] = []

            for (let i = 0; i < currentPlayerQueue.length; i++) {
              if (i !== currentActiveIndex) {
                indicesToRemove.push(i)
              }
            }

            for (let i = indicesToRemove.length - 1; i >= 0; i--) {
              await TrackPlayer.remove(indicesToRemove[i])
            }

            if (TrackPlayer.getQueue().length > 0) {
              await TrackPlayer.remove(0)
            }
          }

          await TrackPlayer.add(tracks)

          set({
            queueIds: newQueueIds,
            currentTrackIndex: newCurrentIndex,
            windowStartIndex: newStart,
            isQueueLoading: false
          })

          get().updateNavigationStates()

          return
        }

        if (currentPlayerQueue.length > 0) {
          const indicesToRemove: number[] = []

          for (let i = 0; i < currentPlayerQueue.length; i++) {
            if (i !== currentActiveIndex) {
              indicesToRemove.push(i)
            }
          }

          for (let i = indicesToRemove.length - 1; i >= 0; i--) {
            await TrackPlayer.remove(indicesToRemove[i])
          }
        }

        const beforeCurrentIds = newWindowIds.slice(0, currentTrackNewIndex)
        const afterCurrentIds = newWindowIds.slice(currentTrackNewIndex + 1)
        const tracksBeforeCurrent = await Promise.all(
          beforeCurrentIds.map((id) => resolveTrack(songsCacheById.get(id)!))
        )
        const tracksAfterCurrent = await Promise.all(
          afterCurrentIds.map((id) => resolveTrack(songsCacheById.get(id)!))
        )

        if (tracksBeforeCurrent.length > 0) {
          await TrackPlayer.add(tracksBeforeCurrent, 0)
        }
        if (tracksAfterCurrent.length > 0) {
          await TrackPlayer.add(tracksAfterCurrent)
        }

        const finalCurrentIndex = tracksBeforeCurrent.length
        const actualCurrentIndex = TrackPlayer.getActiveTrackIndex()
        if (actualCurrentIndex !== finalCurrentIndex) {
          await TrackPlayer.skip(finalCurrentIndex)
        }

        const newCurrentTrack = await resolveTrack(songsCacheById.get(currentTrackId)!)

        set({
          queueIds: newQueueIds,
          currentTrackIndex: newCurrentIndex,
          windowStartIndex: newStart,
          currentTrack: newCurrentTrack,
          currentTrackId: currentTrackId,
          duration: newCurrentTrack?.duration || 0,
          isQueueLoading: false
        })

        get().updateNavigationStates()
      },
      toggleShuffle: async () => {
        const { isShuffleEnabled } = get()

        await get().setShuffleEnabled(!isShuffleEnabled)
      },
      loadTracks: async (songs, startIndex = 0, source, forceShuf‌fle = false) => {
        if (!songs || !Array.isArray(songs) || songs.length === 0) {
          throw new Error("No songs provided or invalid songs array")
        }

        if (!isValidIndex(startIndex, songs.length)) {
          throw new Error(`Invalid start index: ${startIndex} for ${songs.length} songs`)
        }

        const { playSource, isQueueLoading } = get()

        if (isQueueLoading) {
          throw new Error("Queue is already loading")
        }

        set({
          isQueueLoading: true,
          playSource: source ?? playSource
        })

        try {
          songsCacheById.clear()

          songs.forEach((song) => {
            if (song && typeof song.id === "number") {
              songsCacheById.set(song.id, song)
            }
          })

          const allIds = songs.map((s) => s.id).filter((id) => typeof id === "number")
          if (allIds.length !== songs.length) {
            throw new Error("Some songs have invalid IDs")
          }

          const { windowSize, isShuffleEnabled } = get()

          let queueIds: number[]
          let currentIndex: number
          const currentId = allIds[startIndex]

          const shouldShuf‌fle = forceShuf‌fle ? forceShuf‌fle : isShuffleEnabled

          if (shouldShuf‌fle) {
            const otherIds = allIds.filter((_, i) => i !== startIndex)
            const shuf‌fledOthers = shuffleArray(otherIds)

            queueIds = [currentId, ...shuf‌fledOthers]
            currentIndex = 0
          } else {
            queueIds = [...allIds]
            currentIndex = startIndex
          }

          const { start, end } = calculateOptimalWindow(currentIndex, queueIds.length, windowSize)
          const windowIds = queueIds.slice(start, end)

          if (windowIds.length === 0) {
            throw new Error("Empty window calculated")
          }

          if (!windowIds.includes(currentId)) {
            throw new Error(`Current track ${currentId} not in calculated window`)
          }

          let tracks: Track[]
          let playerIndex: number

          try {
            const missingSongs = windowIds.filter((id) => !songsCacheById.has(id))

            if (missingSongs.length > 0) {
              throw new Error(`Songs not found in cache: ${missingSongs.join(", ")}`)
            }

            tracks = await Promise.all(
              windowIds.map((id) => {
                const song = songsCacheById.get(id)

                if (!song) {
                  throw new Error(`Song with id ${id} not found in cache`)
                }

                return resolveTrack(song)
              })
            )

            await TrackPlayer.reset()

            if (tracks.length === 0) {
              throw new Error("No tracks to add to player")
            }

            await TrackPlayer.add(tracks)

            playerIndex = currentIndex - start
            if (!isValidIndex(playerIndex, tracks.length)) {
              throw new Error(`Invalid player index: ${playerIndex} for ${tracks.length} tracks`)
            }

            await TrackPlayer.skip(playerIndex)
          } catch (error) {
            throw new Error(`Failed to prepare tracks: ${error}`)
          }

          if (currentIndex >= queueIds.length) {
            throw new Error(
              `Invalid state: currentIndex ${currentIndex} >= queueIds.length ${queueIds.length}`
            )
          }

          if (queueIds[currentIndex] !== currentId) {
            throw new Error(
              `Invalid state: queueIds[${currentIndex}] = ${queueIds[currentIndex]} !== currentId ${currentId}`
            )
          }

          if (!windowIds.includes(currentId)) {
            throw new Error(`Current track ${currentId} not found in window`)
          }

          set({
            trackIds: allIds,
            queueIds,
            currentTrackIndex: currentIndex,
            currentTrackId: currentId,
            currentTrack: tracks[playerIndex] || null,
            windowStartIndex: start,
            position: 0,
            duration: tracks[playerIndex]?.duration || 0,
            buffered: 0,
            isQueueLoading: false
          })

          get().updateNavigationStates()
        } catch (error) {
          set({ isQueueLoading: false })
          throw error
        }
      },
      shuffleAndPlay: async (songs, source) => {
        const { isShuffling, loadTracks, play } = get()

        if (!songs || songs.length === 0 || isShuffling) return

        set({ isShuffling: true })

        try {
          const randomStartIndex = Math.floor(Math.random() * songs.length)

          await loadTracks(songs, randomStartIndex, source, true)
          await play()
        } catch (error) {
          console.error("Error in shuffleAndPlay:", error)
        } finally {
          set({ isShuffling: false })
        }
      },
      play: async () => {
        try {
          const { currentTrack } = get()

          if (!currentTrack) {
            throw new Error("No track loaded")
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
          console.error("Error in pause:", error)
        }
      },
      stop: async () => {
        try {
          await TrackPlayer.stop()
        } catch (error) {
          console.error("Error in stop:", error)
        }
      },
      retry: async () => {
        try {
          await TrackPlayer.retry()
        } catch (error) {
          console.error("Error in retry:", error)
        }
      },
      playNext: async () => {
        const { currentTrackIndex, queueIds, repeatMode, skipToTrack, play } = get()

        if (currentTrackIndex === null || queueIds.length === 0) {
          return
        }

        if (repeatMode === RepeatMode.Track) {
          try {
            await TrackPlayer.seekTo(0)
            await TrackPlayer.play()
          } catch (error) {
            console.error("Error in playNext (repeat track):", error)
          }
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

        if (repeatMode === RepeatMode.Track) {
          try {
            await TrackPlayer.seekTo(0)
            await TrackPlayer.play()
          } catch (error) {
            console.error("Error in playPrevious (repeat track):", error)
          }
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
          throw new Error("Invalid track index")
        }

        const windowEndIndex = windowStartIndex + windowSize
        const isInCurrentWindow = index >= windowStartIndex && index < windowEndIndex

        if (isInCurrentWindow) {
          const playerIndex = index - windowStartIndex
          await TrackPlayer.skip(playerIndex)

          const currentTrackId = queueIds[index]
          const currentTrack = await resolveTrack(songsCacheById.get(currentTrackId)!)

          set({
            currentTrackIndex: index,
            currentTrackId,
            currentTrack,
            duration: currentTrack?.duration || 0
          })

          get().updateNavigationStates()
        } else {
          await get().ensureWindowForIndex(index)

          const { windowStartIndex: newStart } = get()
          const playerIndex = index - newStart

          if (isValidIndex(playerIndex, TrackPlayer.getQueue().length)) {
            await TrackPlayer.skip(playerIndex)

            const currentTrackId = queueIds[index]
            const currentTrack = await resolveTrack(songsCacheById.get(currentTrackId)!)

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
          console.error("Error in seekTo:", error)
        }
      },
      seekBy: async (seconds) => {
        try {
          await TrackPlayer.seekBy(seconds)
        } catch (error) {
          console.error("Error in seekBy:", error)
        }
      },
      addToQueue: async (newTracks, position = "end") => {
        const { queueIds, currentTrackIndex, windowStartIndex, windowSize } = get()

        set({ isQueueLoading: true })

        const songsArray = Array.isArray(newTracks) ? newTracks : [newTracks]
        songsArray.forEach((s) => songsCacheById.set(s.id, s))

        const idsToInsert = songsArray.map((s) => s.id)
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
            idsToInsert.map((id) => resolveTrack(songsCacheById.get(id)!))
          )

          await TrackPlayer.add(tracks, insertBeforePlayerIndex)
        }

        set({
          queueIds: newQueueIds,
          isQueueLoading: false
        })

        get().updateNavigationStates()
      },
      addAfterCurrent: async (newTracks) => {
        const { queueIds, currentTrackIndex, windowStartIndex, windowSize } = get()

        set({ isQueueLoading: true })

        const songsArray = Array.isArray(newTracks) ? newTracks : [newTracks]
        songsArray.forEach((s) => songsCacheById.set(s.id, s))

        const idsToInsert = songsArray.map((s) => s.id)
        const insertIndex = currentTrackIndex !== null ? currentTrackIndex + 1 : queueIds.length

        const newQueueIds = [...queueIds]
        newQueueIds.splice(insertIndex, 0, ...idsToInsert)

        const start = windowStartIndex
        const end = Math.min(start + windowSize, newQueueIds.length)

        if (insertIndex >= start && insertIndex < end) {
          const insertBeforePlayerIndex = insertIndex - start
          const tracks = await Promise.all(
            idsToInsert.map((id) => resolveTrack(songsCacheById.get(id)!))
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
          throw new Error("Invalid index to remove")
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
                const newCurrentTrack = await resolveTrack(songsCacheById.get(newCurrentTrackId)!)

                set({
                  currentTrack: newCurrentTrack,
                  currentTrackId: newCurrentTrackId,
                  duration: newCurrentTrack?.duration || 0
                })
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
          console.error("Error in removeSongById:", error)
          set({ isQueueLoading: false })
          throw error
        }
      },
      moveInQueue: async (fromIndex, toIndex) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (!isValidIndex(fromIndex, queueIds.length) || !isValidIndex(toIndex, queueIds.length)) {
          throw new Error("Invalid move indices")
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
          console.error("Error in clearQueue (reset):", error)
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
          isQueueLoading: false
        })
      },
      ensureWindowForIndex: async (index) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (!queueIds.length) return

        const start = windowStartIndex
        const end = Math.min(start + windowSize, queueIds.length)

        if (index < start || index >= end) {
          const { start: newStart, end: newEnd } = calculateOptimalWindow(
            index,
            queueIds.length,
            windowSize
          )
          const windowIds = queueIds.slice(newStart, newEnd)

          const missingSongs = windowIds.filter((id) => !songsCacheById.has(id))

          if (missingSongs.length > 0) {
            const missingSongsData = await getSongsByIdsWithMainRelations(missingSongs)

            if (missingSongsData.length !== missingSongs.length) {
              throw new Error("Failed to load missing songs for window")
            }

            missingSongsData.forEach((s) => songsCacheById.set(s.id, s))
          }

          const tracks = await Promise.all(
            windowIds.map((id) => resolveTrack(songsCacheById.get(id)!))
          )

          await TrackPlayer.reset()
          await TrackPlayer.add(tracks)

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

        if (index >= end - 5 && end < queueIds.length) {
          const toAddIds = queueIds.slice(end, Math.min(end + 10, queueIds.length))

          const missingSongs = toAddIds.filter((id) => !songsCacheById.has(id))

          if (missingSongs.length > 0) {
            const missingSongsData = await getSongsByIdsWithMainRelations(missingSongs)

            if (missingSongsData.length !== missingSongs.length) {
              return
            }

            missingSongsData.forEach((s) => songsCacheById.set(s.id, s))
          }

          const toAddTracks = await Promise.all(
            toAddIds.map((id) => resolveTrack(songsCacheById.get(id)!))
          )

          if (toAddTracks.length) {
            await TrackPlayer.add(toAddTracks)

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
            canPlayNext = canPlayPrevious = repeatMode !== RepeatMode.Off
          } else {
            switch (repeatMode) {
              case RepeatMode.Off:
                canPlayNext = currentTrackIndex < queueIds.length - 1
                canPlayPrevious = currentTrackIndex > 0
                break
              case RepeatMode.Track:
              case RepeatMode.Queue:
                canPlayNext = canPlayPrevious = true
                break
              default:
                canPlayNext = currentTrackIndex < queueIds.length - 1
                canPlayPrevious = currentTrackIndex > 0
            }
          }
        }

        set({ canPlayNext, canPlayPrevious })
      },
      syncStateWithPlayer: async () => {
        const { queueIds, currentTrackIndex } = get()

        if (queueIds.length === 0) return

        try {
          const playerQueue = TrackPlayer.getQueue()
          const activePlayerIndex = TrackPlayer.getActiveTrackIndex()

          if (!isValidIndex(activePlayerIndex, playerQueue.length)) {
            return
          }

          const activeTrack = playerQueue[activePlayerIndex]
          if (!activeTrack) return

          const actualQueueIndex = queueIds.findIndex(
            (id) => songsCacheById.get(id)?.id === activeTrack.id
          )

          if (actualQueueIndex >= 0 && actualQueueIndex !== currentTrackIndex) {
            const currentTrackId = queueIds[actualQueueIndex]
            const currentTrack = await resolveTrack(songsCacheById.get(currentTrackId)!)

            set({
              currentTrackIndex: actualQueueIndex,
              currentTrackId,
              currentTrack,
              duration: Math.round(currentTrack?.duration || 0)
            })

            get().updateNavigationStates()
          }
        } catch (error) {
          console.error("Error in syncStateWithPlayer:", error)
        }
      },
      destroyPlayer: async () => {
        try {
          await TrackPlayer.destroy()
        } catch (error) {
          console.error("Error in destroyPlayer:", error)
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
          playSource: "unknown"
        })

        unregisterPlaybackListeners()
      },
      setPlaySource: (source: PlaySource) => {
        set({ playSource: source })
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
        playSource: state.playSource
      }),
      onRehydrateStorage: () => {
        return async (state) => {
          usePlayerStore.setState({ isRehydrating: true })

          await setupAudioPlayer()
          registerPlaybackListeners()

          if (state) {
            try {
              await TrackPlayer.setVolume(0)

              if (state.repeatMode !== undefined) {
                await TrackPlayer.setRepeatMode(state.repeatMode)
              }

              if (
                state.trackIds &&
                state.trackIds.length > 0 &&
                state.queueIds &&
                state.queueIds.length > 0 &&
                state.currentTrackIndex !== null &&
                state.currentTrackId !== null
              ) {
                const { trackIds, queueIds, currentTrackIndex, currentTrackId } = state

                if (!validateQueueIntegrity(trackIds, queueIds, currentTrackIndex)) {
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
                const { start, end } = calculateOptimalWindow(
                  currentTrackIndex,
                  queueIds.length,
                  windowSize
                )
                const windowIds = queueIds.slice(start, end)

                try {
                  const windowSongs = await getSongsByIdsWithMainRelations(windowIds)

                  if (windowSongs.length !== windowIds.length) {
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

                  songsCacheById.clear()
                  windowSongs.forEach((s) => songsCacheById.set(s.id, s))

                  const tracks = await Promise.all(
                    windowIds.map((id) => resolveTrack(songsCacheById.get(id)!))
                  )

                  await TrackPlayer.reset()
                  await TrackPlayer.add(tracks)

                  const playerIndex = currentTrackIndex - start

                  if (isValidIndex(playerIndex, tracks.length)) {
                    await TrackPlayer.skip(playerIndex)
                  }

                  if (typeof state.position === "number" && state.position > 0) {
                    await TrackPlayer.seekTo(state.position)
                  }

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

                  usePlayerStore.getState().updateNavigationStates()
                } catch (error) {
                  console.error("Error in onRehydrateStorage:", error)
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
                usePlayerStore.setState({
                  isRehydrating: false,
                  hasHydrated: true
                })
              }

              if (state.volume !== undefined) {
                await TrackPlayer.setVolume(state.isMuted ? 0 : state.volume)
              } else {
                await TrackPlayer.setVolume(1)
              }
            } finally {
              state.setHasHydrated(true)
              const currentState = usePlayerStore.getState()

              if (currentState.isRehydrating) {
                usePlayerStore.setState({ isRehydrating: false })
              }
            }
          } else {
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
