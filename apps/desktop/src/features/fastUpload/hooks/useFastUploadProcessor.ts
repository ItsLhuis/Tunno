import { useCallback, useEffect, useRef } from "react"

import { useTranslation } from "@repo/i18n"

import { useQueryClient } from "@tanstack/react-query"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { useTrackProcessor } from "./useTrackProcessor"

import { invalidateQueries } from "@repo/api"

import { toast } from "@components/ui"

import { EntityCache } from "../utils"

export const useFastUploadProcessor = () => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()

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
          updateTrackStatus(track.id, "success", undefined, result.songId)
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

      if (processedCount % 5 === 0) {
        invalidateQueries(queryClient, "song", { relations: ["home"] })
      }

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    if (entityCacheRef.current) {
      entityCacheRef.current.clear()
      entityCacheRef.current = null
    }

    setStatus("completed")

    invalidateQueries(queryClient, "song", { forceAll: true })
    invalidateQueries(queryClient, "artist", { forceAll: true })
    invalidateQueries(queryClient, "album", { forceAll: true })

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
    queryClient,
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
