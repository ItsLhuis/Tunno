import { create } from "zustand"

import {
  type FastUploadManifest,
  type ProcessError,
  type ProcessingTrack,
  type ProcessStatus
} from "../types"

type FastUploadState = {
  processId: string | null
  bundlePath: string | null
  cachePath: string | null
  manifest: FastUploadManifest | null
  tracks: ProcessingTrack[]
  currentTrackIndex: number
  totalTracks: number
  status: ProcessStatus
  successCount: number
  errorCount: number
  skippedCount: number
  errors: ProcessError[]
  startedAt: string | null
  completedAt: string | null
}

type FastUploadActions = {
  initializeProcess: (bundlePath: string, manifest: FastUploadManifest, cachePath: string) => void
  setStatus: (status: ProcessStatus) => void
  updateTrackStatus: (
    trackId: string,
    status: ProcessingTrack["status"],
    errorMessage?: string,
    createdSongId?: number
  ) => void
  incrementProgress: () => void
  incrementSuccessCount: () => void
  incrementErrorCount: () => void
  incrementSkippedCount: () => void
  addError: (error: ProcessError) => void
  resetStore: () => void
}

type FastUploadStore = FastUploadState & FastUploadActions

export const useFastUploadStore = create<FastUploadStore>()((set, get) => ({
  processId: null,
  bundlePath: null,
  cachePath: null,
  manifest: null,
  tracks: [],
  currentTrackIndex: 0,
  totalTracks: 0,
  status: "idle",
  successCount: 0,
  errorCount: 0,
  skippedCount: 0,
  errors: [],
  startedAt: null,
  completedAt: null,
  initializeProcess: (bundlePath, manifest, cachePath) => {
    const parts = cachePath.split(/[\\/]/)
    const processId = parts[parts.length - 1]

    const tracks: ProcessingTrack[] = manifest.tracks.map((track) => ({
      id: track.dirName,
      dirName: track.dirName,
      title: track.title,
      artists: track.artists,
      album: track.album,
      thumbnail: track.thumbnail,
      status: "pending",
      errorMessage: null,
      createdSongId: null
    }))

    set({
      processId,
      bundlePath,
      cachePath,
      manifest,
      tracks,
      totalTracks: tracks.length,
      currentTrackIndex: 0,
      status: "ready",
      successCount: 0,
      errorCount: 0,
      skippedCount: 0,
      errors: [],
      startedAt: null,
      completedAt: null
    })
  },
  setStatus: (status) => {
    const update: Partial<FastUploadState> = { status }

    if (status === "processing" && !get().startedAt) {
      update.startedAt = new Date().toISOString()
    }

    if (status === "completed") {
      update.completedAt = new Date().toISOString()
    }

    set(update)
  },
  updateTrackStatus: (trackId, status, errorMessage, createdSongId) => {
    const { tracks } = get()
    const updatedTracks = tracks.map((track) =>
      track.id === trackId
        ? {
            ...track,
            status,
            errorMessage: errorMessage || null,
            createdSongId: createdSongId !== undefined ? createdSongId : track.createdSongId
          }
        : track
    )

    set({ tracks: updatedTracks })
  },
  incrementProgress: () => {
    set((state) => ({
      currentTrackIndex: state.currentTrackIndex + 1
    }))
  },
  incrementSuccessCount: () => {
    set((state) => ({
      successCount: state.successCount + 1
    }))
  },
  incrementErrorCount: () => {
    set((state) => ({
      errorCount: state.errorCount + 1
    }))
  },
  incrementSkippedCount: () => {
    set((state) => ({
      skippedCount: state.skippedCount + 1
    }))
  },
  addError: (error) => {
    set((state) => ({
      errors: [...state.errors, error]
    }))
  },
  resetStore: () => {
    set({
      processId: null,
      bundlePath: null,
      cachePath: null,
      manifest: null,
      tracks: [],
      currentTrackIndex: 0,
      totalTracks: 0,
      status: "idle",
      successCount: 0,
      errorCount: 0,
      skippedCount: 0,
      errors: [],
      startedAt: null,
      completedAt: null
    })
  }
}))
