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

import { getSongsByIdsWithRelations } from "@features/songs/api/queries"

import { type Track } from "../types/player"

import { type SongWithRelations } from "@repo/api"

const PLAYER_STORE_NAME = "player"

const DEFAULT_WINDOW_SIZE = 100

type PlayerState = {
  trackIds: number[]
  volume: number
  isMuted: boolean
  repeatMode: RepeatMode
  isShuffleEnabled: boolean
  queueIds: number[]
  currentTrackIndex: number | null
  windowStartIndex: number
  windowSize: number
  currentTrack: Track | null
  currentTrackId: number | null
  canPlayNext: boolean
  canPlayPrevious: boolean
  playbackState: State
  position: number
  duration: number
  buffered: number
  isTrackLoading: boolean
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
  addAfterCurrent: (track: SongWithRelations | SongWithRelations[]) => Promise<void>
  removeFromQueue: (index: number) => Promise<void>
  moveInQueue: (fromIndex: number, toIndex: number) => Promise<void>
  ensureWindowForIndex: (index: number) => Promise<void>
  updateNavigationStates: () => void
  clearQueue: () => Promise<void>
  destroyPlayer: () => Promise<void>
  syncStateWithPlayer: () => Promise<void>
  setHasHydrated: (hasHydrated: boolean) => void
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
      trackIds: [],
      volume: 1,
      isMuted: false,
      repeatMode: RepeatMode.Off,
      isShuffleEnabled: false,
      hasHydrated: false,
      queueIds: [],
      currentTrackIndex: null,
      windowStartIndex: 0,
      windowSize: DEFAULT_WINDOW_SIZE,
      currentTrack: null,
      currentTrackId: null,
      canPlayNext: false,
      canPlayPrevious: false,
      playbackState: State.None,
      position: 0,
      duration: 0,
      buffered: 0,
      isTrackLoading: false,
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

        get().updateNavigationStates()
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
        const currentId = allIds[startIndex]

        if (isShuffleEnabled) {
          const otherIds = allIds.filter((_, i) => i !== startIndex)
          const shuffledOthers = shuffleArray(otherIds)
          queueIds = [currentId, ...shuffledOthers]
          currentIndex = 0
        } else {
          queueIds = [...allIds]
          currentIndex = startIndex
        }

        const halfWindow = Math.floor(windowSize / 2)
        const start = Math.max(
          0,
          Math.min(currentIndex - halfWindow, Math.max(0, queueIds.length - windowSize))
        )
        const end = Math.min(queueIds.length, start + windowSize)
        const windowIds = queueIds.slice(start, end)
        const tracks = await Promise.all(
          windowIds.map((id) => resolveTrack(songsCacheById.get(id)!))
        )

        await TrackPlayer.reset()
        await TrackPlayer.add(tracks)
        await TrackPlayer.skip(currentIndex - start)

        set({
          trackIds: allIds,
          queueIds,
          currentTrackIndex: currentIndex,
          windowStartIndex: start,
          currentTrack: tracks[currentIndex - start] || null,
          currentTrackId: currentId,
          position: 0,
          duration: tracks[currentIndex - start]?.duration || 0,
          buffered: 0,
          isQueueLoading: false
        })

        get().updateNavigationStates()
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
        const { currentTrackIndex, queueIds, repeatMode } = get()

        if (currentTrackIndex === null || queueIds.length === 0) {
          return
        }

        if (repeatMode === RepeatMode.Track) {
          await TrackPlayer.seekTo(0)
          await TrackPlayer.play()
          return
        }

        const nextIndex = currentTrackIndex + 1

        if (nextIndex < queueIds.length) {
          await get().skipToTrack(nextIndex)
          return
        }

        if (repeatMode === RepeatMode.Queue && queueIds.length > 0) {
          await get().skipToTrack(0)
        }
      },
      playPrevious: async () => {
        const { currentTrackIndex, queueIds, repeatMode } = get()

        if (currentTrackIndex === null || queueIds.length === 0) {
          return
        }

        if (repeatMode === RepeatMode.Track) {
          await TrackPlayer.seekTo(0)
          await TrackPlayer.play()
          return
        }

        const previousIndex = currentTrackIndex - 1
        if (previousIndex >= 0) {
          await get().skipToTrack(previousIndex)
          return
        }

        if (repeatMode === RepeatMode.Queue && queueIds.length > 0) {
          await get().skipToTrack(queueIds.length - 1)
        }
      },
      skipToTrack: async (index) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (index < 0 || index >= queueIds.length) {
          return
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

          if (playerIndex >= 0) {
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
          if (index === currentTrackIndex) {
            if (newQueueIds.length === 0) {
              nextCurrentIndex = null
            } else {
              nextCurrentIndex = Math.min(currentTrackIndex, newQueueIds.length - 1)

              if (nextCurrentIndex >= start && nextCurrentIndex < end) {
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
          isQueueLoading: false,
          currentTrackIndex: nextCurrentIndex
        })

        get().updateNavigationStates()
      },
      moveInQueue: async (fromIndex, toIndex) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        set({ isQueueLoading: true })

        if (
          fromIndex < 0 ||
          fromIndex >= queueIds.length ||
          toIndex < 0 ||
          toIndex >= queueIds.length
        ) {
          set({ isQueueLoading: false })
          return
        }

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
      clearQueue: async () => {
        set({ isQueueLoading: true })

        await TrackPlayer.reset()

        set({
          trackIds: [],
          queueIds: [],
          currentTrack: null,
          currentTrackId: null,
          canPlayNext: false,
          canPlayPrevious: false,
          currentTrackIndex: null,
          windowStartIndex: 0,
          windowSize: DEFAULT_WINDOW_SIZE,
          position: 0,
          duration: 0,
          buffered: 0,
          playbackState: State.None,
          isQueueLoading: false
        })
      },
      destroyPlayer: async () => {
        await TrackPlayer.destroy()

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
          canPlayPrevious: false
        })

        unregisterPlaybackListeners()
      },
      ensureWindowForIndex: async (index) => {
        const { queueIds, windowStartIndex, windowSize } = get()

        if (!queueIds.length) return

        const start = windowStartIndex
        const end = Math.min(start + windowSize, queueIds.length)

        if (index < start || index >= end) {
          const halfWindow = Math.floor(windowSize / 2)
          const newStart = Math.max(
            0,
            Math.min(index - halfWindow, Math.max(0, queueIds.length - windowSize))
          )
          const newEnd = Math.min(queueIds.length, newStart + windowSize)
          const windowIds = queueIds.slice(newStart, newEnd)

          const missingSongs = windowIds.filter((id) => !songsCacheById.has(id))
          if (missingSongs.length > 0) {
            const missingSongsData = await getSongsByIdsWithRelations(missingSongs)

            if (missingSongsData.length !== missingSongs.length) {
              return
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
            const missingSongsData = await getSongsByIdsWithRelations(missingSongs)

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
      syncStateWithPlayer: async () => {
        const { queueIds, currentTrackIndex } = get()

        if (queueIds.length === 0) return

        const playerQueue = TrackPlayer.getQueue()
        const activePlayerIndex = TrackPlayer.getActiveTrackIndex()

        if (activePlayerIndex < 0 || activePlayerIndex >= playerQueue.length) {
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
            duration: currentTrack?.duration || 0
          })

          get().updateNavigationStates()
        }
      }
    }),
    {
      name: PLAYER_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${PLAYER_STORE_NAME}.json`),
      partialize: (state) => ({
        trackIds: state.trackIds,
        volume: state.volume,
        isMuted: state.isMuted,
        repeatMode: state.repeatMode,
        isShuffleEnabled: state.isShuffleEnabled,
        currentTrackId: state.currentTrackId,
        position: state.position
      }),
      onRehydrateStorage: () => {
        return async (state) => {
          await setupAudioPlayer()
          registerPlaybackListeners()

          if (state) {
            try {
              await TrackPlayer.setVolume(0)

              if (state.repeatMode !== undefined) {
                await TrackPlayer.setRepeatMode(state.repeatMode)
              }

              if (state.trackIds && state.trackIds.length > 0 && state.currentTrackId !== null) {
                const isShuffleEnabled = state.isShuffleEnabled
                const trackIds = state.trackIds
                const currentId = state.currentTrackId

                let queueIds: number[]
                let currentIndex: number

                if (isShuffleEnabled) {
                  const remainingIds = trackIds.filter((id: number) => id !== currentId)
                  queueIds = [currentId, ...shuffleArray(remainingIds)]
                  currentIndex = 0
                } else {
                  queueIds = [...trackIds]
                  currentIndex = trackIds.indexOf(currentId)
                }

                const windowSize = state.windowSize ?? 50
                const half = Math.floor(windowSize / 2)
                const start = Math.max(
                  0,
                  Math.min(currentIndex - half, Math.max(0, queueIds.length - windowSize))
                )
                const end = Math.min(queueIds.length, start + windowSize)
                const windowIds = queueIds.slice(start, end)

                try {
                  const windowSongs = await getSongsByIdsWithRelations(windowIds)

                  if (windowSongs.length !== windowIds.length) {
                    const foundIds = windowSongs.map((s) => s.id)

                    const missingIds = windowIds.filter((id: number) => !foundIds.includes(id))
                    const validQueueIds = queueIds.filter((id: number) => !missingIds.includes(id))

                    if (validQueueIds.length === 0) {
                      usePlayerStore.setState({
                        trackIds: [],
                        queueIds: [],
                        currentTrack: null,
                        currentTrackId: null,
                        currentTrackIndex: null,
                        windowStartIndex: 0,
                        windowSize: 50,
                        hasHydrated: true
                      })
                      return
                    }

                    queueIds = validQueueIds
                    currentIndex = Math.min(currentIndex, validQueueIds.length - 1)

                    const newCurrentId = validQueueIds[currentIndex]

                    const newStart = Math.max(
                      0,
                      Math.min(currentIndex - half, Math.max(0, queueIds.length - windowSize))
                    )
                    const newEnd = Math.min(queueIds.length, newStart + windowSize)
                    const newWindowIds = queueIds.slice(newStart, newEnd)

                    const newWindowSongs = await getSongsByIdsWithRelations(newWindowIds)
                    if (newWindowSongs.length === 0) {
                      usePlayerStore.setState({
                        trackIds: [],
                        queueIds: [],
                        currentTrack: null,
                        currentTrackId: null,
                        currentTrackIndex: null,
                        windowStartIndex: 0,
                        windowSize: 50,
                        hasHydrated: true
                      })
                      return
                    }

                    songsCacheById.clear()
                    newWindowSongs.forEach((s) => songsCacheById.set(s.id, s))

                    const tracks = await Promise.all(
                      newWindowIds.map((id: number) => resolveTrack(songsCacheById.get(id)!))
                    )

                    await TrackPlayer.reset()
                    await TrackPlayer.add(tracks)
                    await TrackPlayer.skip(currentIndex - newStart)

                    if (typeof state.position === "number" && state.position > 0) {
                      await TrackPlayer.seekTo(state.position)
                    }

                    await TrackPlayer.pause()

                    usePlayerStore.setState({
                      trackIds,
                      queueIds,
                      currentTrackIndex: currentIndex,
                      windowStartIndex: newStart,
                      currentTrack: tracks[currentIndex - newStart] || null,
                      currentTrackId: newCurrentId,
                      duration: tracks[currentIndex - newStart]?.duration || 0
                    })

                    usePlayerStore.getState().updateNavigationStates()
                    return
                  }

                  songsCacheById.clear()
                  windowSongs.forEach((s) => songsCacheById.set(s.id, s))

                  const tracks = await Promise.all(
                    windowIds.map((id: number) => resolveTrack(songsCacheById.get(id)!))
                  )

                  await TrackPlayer.reset()
                  await TrackPlayer.add(tracks)
                  await TrackPlayer.skip(currentIndex - start)

                  if (typeof state.position === "number" && state.position > 0) {
                    await TrackPlayer.seekTo(state.position)
                  }

                  await TrackPlayer.pause()

                  usePlayerStore.setState({
                    trackIds,
                    queueIds,
                    currentTrackIndex: currentIndex,
                    windowStartIndex: start,
                    currentTrack: tracks[currentIndex - start] || null,
                    currentTrackId: currentId,
                    duration: tracks[currentIndex - start]?.duration || 0
                  })

                  usePlayerStore.getState().updateNavigationStates()
                } catch (error) {
                  usePlayerStore.setState({
                    trackIds: [],
                    queueIds: [],
                    currentTrack: null,
                    currentTrackId: null,
                    currentTrackIndex: null,
                    windowStartIndex: 0,
                    windowSize: 50,
                    hasHydrated: true
                  })
                }
              }

              if (state.volume !== undefined) {
                await TrackPlayer.setVolume(state.isMuted ? 0 : state.volume)
              } else {
                TrackPlayer.setVolume(1)
              }
            } finally {
              state.setHasHydrated(true)
            }
          }
        }
      }
    }
  )
)
