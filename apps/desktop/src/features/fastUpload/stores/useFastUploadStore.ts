import { create } from "zustand"

import {
  type FastUploadManifest,
  type ProcessError,
  type ProcessingTrack,
  type ProcessStatus
} from "../types"

/**
 * Represents the state structure of the {@link useFastUploadStore}.
 */
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

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useFastUploadStore}.
 */
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

/**
 * Combines the state and actions interfaces for the {@link useFastUploadStore}.
 */
type FastUploadStore = FastUploadState & FastUploadActions

/**
 * Zustand store for managing the state and actions of the fast upload process.
 *
 * This store centralizes all information related to a bulk music upload operation,
 * tracking its overall status, progress for individual tracks, and any errors encountered.
 * It's designed to manage the lifecycle of an upload from initialization to completion,
 * providing detailed feedback on success, errors, and skipped items.
 *
 * @returns A Zustand store instance with fast upload state and actions.
 */
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
