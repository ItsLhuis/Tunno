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

import { type Track } from "../types/player"

import { type SongWithRelations } from "@repo/api"

const PLAYER_STORE_NAME = "player"

type PlayerState = {
  volume: number
  isMuted: boolean
  repeatMode: RepeatMode
  isShuffleEnabled: boolean
  queueIds: number[]
  currentTrackIndex: number | null
  windowStartIndex: number
  windowSize: number
  currentTrack: Track | null
  playbackState: State
  position: number
  duration: number
  buffered: number
  isLoading: boolean
  isQueueLoading: boolean
  hasHydrated: boolean
}

type PlayerActions = {
  setVolume: (volume: number) => Promise<void>
  setIsMuted: (isMuted: boolean) => Promise<void>
  setRepeatMode: (mode: RepeatMode) => Promise<void>
  setShuffleEnabled: (enabled: boolean) => Promise<void>
  toggleShuffle: () => Promise<void>
  loadTracks: (songs: SongWithRelations[], startIndex?: number) => Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  stop: () => Promise<void>
  playNext: () => Promise<void>
  playPrevious: () => Promise<void>
  skipToTrack: (index: number) => Promise<void>
  seekTo: (position: number) => Promise<void>
  seekBy: (seconds: number) => Promise<void>
  retry: () => Promise<void>
  addToQueue: (
    track: SongWithRelations | SongWithRelations[],
    position?: "next" | "end"
  ) => Promise<void>
  removeFromQueue: (index: number) => Promise<void>
  moveInQueue: (fromIndex: number, toIndex: number) => Promise<void>
  clearQueue: () => Promise<void>
  setLoading: (loading: boolean) => void
  destroyPlayer: () => Promise<void>
  findTrackById: (id: number) => Track | undefined
  setHasHydrated: (hasHydrated: boolean) => void
  ensureWindowForIndex: (index: number) => Promise<void>
}

type PlayerStore = PlayerState & PlayerActions

const songsCacheById = new Map<number, SongWithRelations>()

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      volume: 1,
      isMuted: false,
      repeatMode: RepeatMode.Off,
      isShuffleEnabled: false,
      hasHydrated: false,
      queueIds: [],
      currentTrackIndex: null,
      windowStartIndex: 0,
      windowSize: 50,
      currentTrack: null,
      playbackState: State.None,
      position: 0,
      duration: 0,
      buffered: 0,
      isLoading: false,
      isQueueLoading: false,
      setVolume: async (volume) => {
        set({ volume })
        await TrackPlayer.setVolume(volume)
      },
      setIsMuted: async (isMuted) => {
        set({ isMuted })
        const volume = isMuted ? 0 : get().volume
        await TrackPlayer.setVolume(volume)
      },
      setRepeatMode: async (mode) => {
        set({ repeatMode: mode })
        await TrackPlayer.setRepeatMode(mode)
      },
      setShuffleEnabled: async (enabled) => {
        const { queueIds, currentTrackIndex, windowStartIndex, windowSize } = get()

        set({ isShuffleEnabled: enabled, isQueueLoading: true })

        if (queueIds.length === 0 || currentTrackIndex === null) {
          set({ isQueueLoading: false })
          return
        }

        const head = queueIds.slice(0, currentTrackIndex + 1)
        const tail = queueIds.slice(currentTrackIndex + 1)
        const newTail = enabled ? shuffleArray(tail) : tail
        const newQueueIds = [...head, ...newTail]

        const start = windowStartIndex
        const end = Math.min(start + windowSize, newQueueIds.length)
        const playerTailStart = Math.max(currentTrackIndex + 1, start)

        const removeIndices: number[] = []

        for (let i = end - 1; i >= playerTailStart; i--) removeIndices.push(i - start)

        if (removeIndices.length) await TrackPlayer.remove(removeIndices)

        const toAddIds = newQueueIds.slice(playerTailStart, end)
        const toAddTracks = await Promise.all(
          toAddIds.map(async (id) => {
            const s = songsCacheById.get(id)
            if (!s) return undefined
            return resolveTrack(s)
          })
        )

        const filtered = toAddTracks.filter(Boolean) as Track[]

        if (filtered.length) await TrackPlayer.add(filtered)

        set({ queueIds: newQueueIds, isQueueLoading: false })
      },
      toggleShuffle: async () => {
        await get().setShuffleEnabled(!get().isShuffleEnabled)
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      },
      loadTracks: async (songs, startIndex = 0) => {
        set({ isQueueLoading: true })

        songsCacheById.clear()

        songs.forEach((s) => songsCacheById.set(s.id, s))

        const allIds = songs.map((s) => s.id)

        const { isShuffleEnabled, windowSize } = get()

        let queueIds: number[]
        let currentIndex: number

        if (isShuffleEnabled) {
          const selectedId = allIds[startIndex]
          const otherIds = allIds.filter((_, i) => i !== startIndex)
          const shuffledOthers = shuffleArray(otherIds)

          queueIds = [selectedId, ...shuffledOthers]
          currentIndex = 0
        } else {
          queueIds = [...allIds]
          currentIndex = startIndex
        }

        const start = Math.max(0, currentIndex)
        const end = Math.min(queueIds.length, start + windowSize)
        const windowIds = queueIds.slice(start, end)
        const tracks = await Promise.all(
          windowIds.map((id) => resolveTrack(songsCacheById.get(id)!))
        )

        await TrackPlayer.reset()
        await TrackPlayer.add(tracks)
        await TrackPlayer.skip(currentIndex - start)

        set({
          queueIds,
          currentTrackIndex: currentIndex,
          windowStartIndex: start,
          currentTrack: tracks[currentIndex - start] || null,
          position: 0,
          duration: tracks[currentIndex - start]?.duration || 0,
          buffered: 0,
          isQueueLoading: false
        })
      },
      play: async () => {
        await TrackPlayer.play()
      },
      pause: async () => {
        await TrackPlayer.pause()
      },
      stop: async () => {
        await TrackPlayer.stop()
      },
      playNext: async () => {
        await TrackPlayer.skipToNext()
      },
      playPrevious: async () => {
        await TrackPlayer.skipToPrevious()
      },
      skipToTrack: async (index) => {
        const { windowStartIndex } = get()

        if (index - windowStartIndex >= 0) {
          await TrackPlayer.skip(index - windowStartIndex)
        } else {
          await get().ensureWindowForIndex(index)

          const { windowStartIndex: newStart } = get()

          await TrackPlayer.skip(index - newStart)
        }
      },
      seekTo: async (position) => {
        await TrackPlayer.seekTo(position)
      },
      seekBy: async (seconds) => {
        await TrackPlayer.seekBy(seconds)
      },
      retry: async () => {
        await TrackPlayer.retry()
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

        set({ queueIds: newQueueIds, isQueueLoading: false })
      },
      removeFromQueue: async (index) => {
        const { queueIds, windowStartIndex, windowSize, currentTrackIndex } = get()

        set({ isQueueLoading: true })

        if (index < 0 || index >= queueIds.length) {
          set({ isQueueLoading: false })
          return
        }

        const newQueueIds = queueIds.filter((_, i) => i !== index)

        const start = windowStartIndex
        const end = Math.min(start + windowSize, queueIds.length)

        if (index >= start && index < end) {
          await TrackPlayer.remove(index - start)
        }

        let nextCurrentIndex = currentTrackIndex

        if (currentTrackIndex !== null) {
          if (index < currentTrackIndex) nextCurrentIndex = currentTrackIndex - 1
          if (index === currentTrackIndex)
            nextCurrentIndex = Math.min(currentTrackIndex, newQueueIds.length - 1)
        }

        set({ queueIds: newQueueIds, isQueueLoading: false, currentTrackIndex: nextCurrentIndex })
      },
      moveInQueue: async (fromIndex, toIndex) => {
        set({ isQueueLoading: true })

        const { queueIds, windowStartIndex } = get()

        const newQueue = [...queueIds]
        const [moved] = newQueue.splice(fromIndex, 1)
        newQueue.splice(toIndex, 0, moved)

        await TrackPlayer.move(fromIndex - windowStartIndex, toIndex - windowStartIndex)

        set({ queueIds: newQueue, isQueueLoading: false })
      },
      clearQueue: async () => {
        set({ isQueueLoading: true })

        await TrackPlayer.reset()

        set({
          queueIds: [],
          currentTrack: null,
          currentTrackIndex: null,
          windowStartIndex: 0,
          position: 0,
          duration: 0,
          buffered: 0,
          playbackState: State.None,
          isQueueLoading: false
        })
      },
      setLoading: (loading) => {
        set({ isLoading: loading })
      },
      findTrackById: (id) => {
        const song = songsCacheById.get(id)

        if (!song) return undefined

        return {
          ...(song as unknown as Track),
          id: song.id
        }
      },
      destroyPlayer: async () => {
        await TrackPlayer.destroy()

        set({
          queueIds: [],
          currentTrack: null,
          currentTrackIndex: null,
          windowStartIndex: 0,
          playbackState: State.None,
          position: 0,
          duration: 0,
          buffered: 0,
          isLoading: false,
          isQueueLoading: false
        })

        unregisterPlaybackListeners()
      },
      ensureWindowForIndex: async (index) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (!queueIds.length) return

        const start = windowStartIndex
        const end = Math.min(start + windowSize, queueIds.length)

        if (index < start || index >= end) {
          const newStart = Math.max(0, Math.min(index, Math.max(0, queueIds.length - windowSize)))
          const newEnd = Math.min(queueIds.length, newStart + windowSize)
          const windowIds = queueIds.slice(newStart, newEnd)

          const tracks = await Promise.all(
            windowIds.map((id) => resolveTrack(songsCacheById.get(id)!))
          )

          await TrackPlayer.reset()
          await TrackPlayer.add(tracks)

          set({ windowStartIndex: newStart, currentTrack: tracks[index - newStart] || null })

          return
        }

        if (index >= end - 5 && end < queueIds.length) {
          const toAddIds = queueIds.slice(end, Math.min(end + 10, queueIds.length))
          const toAddTracks = await Promise.all(
            toAddIds.map((id) => resolveTrack(songsCacheById.get(id)!))
          )

          if (toAddTracks.length) await TrackPlayer.add(toAddTracks)
        }
      }
    }),
    {
      name: PLAYER_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${PLAYER_STORE_NAME}.json`),
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
        repeatMode: state.repeatMode,
        isShuffleEnabled: state.isShuffleEnabled,
        queueIds: state.queueIds,
        currentTrackIndex: state.currentTrackIndex
      }),
      onRehydrateStorage: () => {
        return async (state) => {
          await setupAudioPlayer()
          registerPlaybackListeners()

          if (state) {
            await TrackPlayer.setVolume(0)

            if (state.repeatMode !== undefined) {
              await TrackPlayer.setRepeatMode(state.repeatMode)
            }

            if (state.volume !== undefined) {
              await TrackPlayer.setVolume(state.isMuted ? 0 : state.volume)
            } else {
              TrackPlayer.setVolume(1)
            }

            state.setHasHydrated(true)
          }
        }
      }
    }
  )
)
