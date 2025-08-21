import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import {
  registerPlaybackListeners,
  setupAudioPlayer,
  unregisterPlaybackListeners
} from "@services/audio"

import TrackPlayer, { RepeatMode, State } from "react-track-player-web"

import { convertSongsToTracks } from "../utils/player"

import { type Track } from "../types/player"

import { type SongWithRelations } from "@repo/api"

const PLAYER_STORE_NAME = "player"

type PlayerState = {
  volume: number
  isMuted: boolean
  repeatMode: RepeatMode
  isShuffleEnabled: boolean
  tracks: Track[]
  queue: Track[]
  currentTrackIndex: number | null
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
  addToQueue: (track: Track | Track[], position?: "next" | "end") => Promise<void>
  removeFromQueue: (index: number) => Promise<void>
  moveInQueue: (fromIndex: number, toIndex: number) => Promise<void>
  clearQueue: () => Promise<void>
  setLoading: (loading: boolean) => void
  destroyPlayer: () => Promise<void>
  findTrackById: (id: number) => Track | undefined
  setHasHydrated: (hasHydrated: boolean) => void
}

type PlayerStore = PlayerState & PlayerActions

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
      tracks: [],
      queue: [],
      currentTrackIndex: null,
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
        const { tracks, currentTrack, currentTrackIndex } = get()
        set({ isShuffleEnabled: enabled, isQueueLoading: true })

        if (tracks.length === 0 || !currentTrack || currentTrackIndex === null) {
          set({ isQueueLoading: false })
          return
        }

        let newQueue: Track[]

        if (enabled) {
          const otherTracks = tracks.filter((track) => track.id !== currentTrack.id)
          const shuffledOthers = shuffleArray(otherTracks)
          newQueue = [currentTrack, ...shuffledOthers]
        } else {
          newQueue = [...tracks]
        }

        const currentTrackNewIndex = newQueue.findIndex((track) => track.id === currentTrack.id)

        if (currentTrackNewIndex < 0) {
          await TrackPlayer.reset()
          await TrackPlayer.add(newQueue)
          set({
            queue: newQueue,
            currentTrackIndex: 0,
            currentTrack: newQueue[0] || null,
            isQueueLoading: false
          })
          return
        }

        const currentQueue = await TrackPlayer.getQueue()

        if (enabled) {
          const tracksAfterCurrent = newQueue.slice(1)

          for (let i = currentQueue.length - 1; i > currentTrackIndex; i--) {
            await TrackPlayer.remove(i)
          }

          if (tracksAfterCurrent.length > 0) {
            await TrackPlayer.add(tracksAfterCurrent)
          }
        } else {
          for (let i = currentQueue.length - 1; i > currentTrackIndex; i--) {
            await TrackPlayer.remove(i)
          }

          const tracksAfterCurrent = tracks.slice(currentTrackIndex + 1)
          if (tracksAfterCurrent.length > 0) {
            await TrackPlayer.add(tracksAfterCurrent)
          }
        }

        set({
          queue: newQueue,
          currentTrackIndex: currentTrackNewIndex,
          currentTrack: currentTrack,
          isQueueLoading: false
        })
      },
      toggleShuffle: async () => {
        await get().setShuffleEnabled(!get().isShuffleEnabled)
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      },
      loadTracks: async (songs, startIndex = 0) => {
        set({ isQueueLoading: true })

        const convertedTracks = await convertSongsToTracks(songs)

        const { isShuffleEnabled } = get()
        let queue: Track[]
        let currentIndex: number

        if (isShuffleEnabled) {
          const selectedTrack = convertedTracks[startIndex]
          const otherTracks = convertedTracks.filter((_, i) => i !== startIndex)
          const shuffledOthers = shuffleArray(otherTracks)
          queue = [selectedTrack, ...shuffledOthers]
          currentIndex = 0
        } else {
          queue = [...convertedTracks]
          currentIndex = startIndex
        }

        await TrackPlayer.reset()
        await TrackPlayer.add(queue)

        if (currentIndex < queue.length) {
          await TrackPlayer.skip(currentIndex)
        }

        set({
          tracks: convertedTracks,
          queue,
          currentTrackIndex: currentIndex,
          currentTrack: queue[currentIndex] || null,
          position: 0,
          duration: queue[currentIndex]?.duration || 0,
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
        await TrackPlayer.skip(index)
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
        const { queue, currentTrackIndex, tracks } = get()
        set({ isQueueLoading: true })
        const tracksArray = Array.isArray(newTracks) ? newTracks : [newTracks]

        let insertIndex: number

        if (position === "next" && currentTrackIndex !== null) {
          insertIndex = currentTrackIndex + 1
        } else {
          insertIndex = queue.length
        }

        const newQueue = [...queue]
        newQueue.splice(insertIndex, 0, ...tracksArray)

        const newTracksArray = [...tracks, ...tracksArray]

        for (let i = 0; i < tracksArray.length; i++) {
          await TrackPlayer.add(tracksArray[i], insertIndex + i)
        }

        set({
          queue: newQueue,
          tracks: newTracksArray,
          isQueueLoading: false
        })
      },
      removeFromQueue: async (index) => {
        const { queue, tracks } = get()
        set({ isQueueLoading: true })
        const trackToRemove = queue[index]

        if (!trackToRemove) {
          set({ isQueueLoading: false })
          return
        }

        await TrackPlayer.remove(index)

        const newQueue = queue.filter((_, i) => i !== index)
        const newTracks = tracks.filter((track) => track.id !== trackToRemove.id)

        set({
          queue: newQueue,
          tracks: newTracks,
          isQueueLoading: false
        })
      },
      moveInQueue: async (fromIndex, toIndex) => {
        set({ isQueueLoading: true })
        await TrackPlayer.move(fromIndex, toIndex)

        const { queue } = get()
        const newQueue = [...queue]
        const [movedTrack] = newQueue.splice(fromIndex, 1)
        newQueue.splice(toIndex, 0, movedTrack)

        set({ queue: newQueue, isQueueLoading: false })
      },
      clearQueue: async () => {
        set({ isQueueLoading: true })
        await TrackPlayer.reset()
        set({
          tracks: [],
          queue: [],
          currentTrack: null,
          currentTrackIndex: null,
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
        const { tracks } = get()
        return tracks.find((track) => track.id === id)
      },
      destroyPlayer: async () => {
        await TrackPlayer.destroy()
        set({
          tracks: [],
          queue: [],
          currentTrack: null,
          currentTrackIndex: null,
          playbackState: State.None,
          position: 0,
          duration: 0,
          buffered: 0,
          isLoading: false,
          isQueueLoading: false
        })
        unregisterPlaybackListeners()
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
        tracks: state.tracks,
        queue: state.queue,
        currentTrack: state.currentTrack,
        currentTrackIndex: state.currentTrackIndex,
        position: state.position
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

            if (state.queue && state.queue.length > 0) {
              await TrackPlayer.reset()
              await TrackPlayer.add(state.queue)
              if (typeof state.currentTrackIndex === "number") {
                await TrackPlayer.skip(state.currentTrackIndex)
              }
              if (typeof state.position === "number" && state.position > 0) {
                await TrackPlayer.seekTo(state.position)
              }
              await TrackPlayer.pause()
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
