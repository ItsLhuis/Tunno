import { useCallback, useEffect, useRef } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { useTrackProcessor } from "./useTrackProcessor"

import { toast } from "@components/ui"

import { EntityCache } from "../utils"

/**
 * A custom hook that orchestrates the entire track processing workflow for the fast upload feature.
 *
 * This hook is the central processor that manages the state of the upload queue,
 * processes each track, and handles the final completion and cleanup logic. It
 * integrates with the `useFastUploadStore` for state management and `useTrackProcessor`
 * for individual track processing logic.
 *
 * @returns An object containing:
 * - `startProcessing`: A function to begin processing the tracks in the queue.
 * - `cleanupCache`: A function to manually clear any existing entity cache.
 * - `isProcessing`: A boolean indicating if the processor is currently active.
 *
 * @example
 * ```tsx
 * const { startProcessing, isProcessing } = useFastUploadProcessor();
 *
 * // In a component:
 * <button onClick={startProcessing} disabled={isProcessing}>
 *   {isProcessing ? "Processing..." : "Start Upload"}
 * </button>
 * ```
 */
export function useFastUploadProcessor() {
  const { t } = useTranslation()

  const entityCacheRef = useRef<EntityCache | null>(null)

  const {
    status,
    tracks,
    cachePath,
    setStatus,
    updateTrackStatus,
    incrementProgress,
    incrementSuccessCount,
    incrementErrorCount,
    incrementSkippedCount,
    addError
  } = useFastUploadStore(
    useShallow((state) => ({
      status: state.status,
      tracks: state.tracks,
      cachePath: state.cachePath,
      setStatus: state.setStatus,
      updateTrackStatus: state.updateTrackStatus,
      incrementProgress: state.incrementProgress,
      incrementSuccessCount: state.incrementSuccessCount,
      incrementErrorCount: state.incrementErrorCount,
      incrementSkippedCount: state.incrementSkippedCount,
      addError: state.addError
    }))
  )

  const { processTrack } = useTrackProcessor()

  useEffect(() => {
    if (status === "idle" && entityCacheRef.current) {
      entityCacheRef.current.clear()
      entityCacheRef.current = null
    }
  }, [status])

  const processRemainingTracks = useCallback(async () => {
    if (!cachePath) {
      return
    }

    if (!entityCacheRef.current) {
      entityCacheRef.current = new EntityCache()
      try {
        await entityCacheRef.current.initialize()
      } catch (error) {
        console.error("FastUpload: Error initializing entity cache:", error)
        entityCacheRef.current = null
      }
    }

    let processedCount = 0

    for (const track of tracks) {
      if (track.status !== "pending") {
        continue
      }

      updateTrackStatus(track.id, "processing")

      try {
        const result = await processTrack(track, cachePath, entityCacheRef.current || undefined)

        if (result.skipped) {
          updateTrackStatus(track.id, "skipped", result.reason)
          incrementSkippedCount()
        } else if (result.success && result.songId) {
          const statusMessage = result.thumbnailsUpdated ? "Thumbnails updated" : undefined
          updateTrackStatus(track.id, "success", statusMessage, result.songId)
          incrementSuccessCount()
        } else if (result.error) {
          updateTrackStatus(track.id, "error", "Failed to import track")
          addError({
            trackId: track.id,
            message: result.error.message,
            stack: result.error.stack
          })
          incrementErrorCount()
        }
      } catch (error) {
        console.error("FastUpload: Error processing track:", track.id, error)
        updateTrackStatus(track.id, "error", "Failed to import track")
        addError({
          trackId: track.id,
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        })
        incrementErrorCount()
      }

      incrementProgress()
      processedCount++

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    if (entityCacheRef.current) {
      entityCacheRef.current.clear()
      entityCacheRef.current = null
    }

    setStatus("completed")

    const finalState = useFastUploadStore.getState()
    const { successCount, errorCount, skippedCount } = finalState

    if (errorCount === 0 && skippedCount === 0) {
      toast.success(t("fastUpload.completed.allSuccess.title"), {
        description: t("fastUpload.completed.allSuccess.description", {
          count: successCount
        })
      })
    } else if (errorCount > 0) {
      toast.error(t("fastUpload.completed.withErrors.title"), {
        description: t("fastUpload.completed.withErrors.description", {
          successCount,
          errorCount,
          skippedCount
        })
      })
    } else {
      toast.info(t("fastUpload.completed.withSkipped.title"), {
        description: t("fastUpload.completed.withSkipped.description", {
          successCount,
          skippedCount
        })
      })
    }
  }, [
    tracks,
    cachePath,
    setStatus,
    updateTrackStatus,
    incrementProgress,
    incrementSuccessCount,
    incrementErrorCount,
    incrementSkippedCount,
    addError,
    processTrack,
    t
  ])

  const startProcessing = useCallback(async () => {
    if (status !== "ready" || !cachePath) {
      return
    }

    setStatus("processing")

    await processRemainingTracks()
  }, [status, cachePath, setStatus, processRemainingTracks])

  const isProcessing = status === "processing"

  const cleanupCache = useCallback(() => {
    if (entityCacheRef.current) {
      entityCacheRef.current.clear()
      entityCacheRef.current = null
    }
  }, [])

  return {
    startProcessing,
    cleanupCache,
    isProcessing
  }
}
