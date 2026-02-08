import { useCallback, useEffect, useRef } from "react"

import { AppState, type AppStateStatus } from "react-native"

import { type TFunction, useTranslation } from "@repo/i18n"

import { getFreeDiskStorageAsync } from "expo-file-system/legacy"

import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake"

import { useSyncStore } from "../stores/useSyncStore"

import { createSyncClient, type SyncClient } from "../api/client"

import { getAllLocalFingerprints } from "../api/queries"

import {
  insertSyncedAlbum,
  insertSyncedArtist,
  insertSyncedPlaylist,
  insertSyncedSong,
  linkAlbumToArtists,
  linkSongToArtists,
  linkSongToPlaylists,
  updateAggregateStats
} from "../api/mutations"

import { EntityCache } from "../utils/entityCache"

import {
  type SyncAlbumData,
  type SyncArtistData,
  type SyncCompareResponse,
  type SyncConnectionData,
  type SyncPlaylistData,
  type SyncSongData
} from "../types"

/** Number of songs to process per batch request to the desktop server. */
const BATCH_SIZE = 20

/** Tag used by expo-keep-awake to prevent screen dimming during sync. */
const KEEP_AWAKE_TAG = "tunno-sync"

/** Estimated bytes per song for storage validation (~4 MB). */
const ESTIMATED_BYTES_PER_SONG = 4 * 1024 * 1024

/** Estimated bytes per thumbnail for storage validation (~50 KB). */
const ESTIMATED_BYTES_PER_THUMBNAIL = 50 * 1024

/**
 * Formats a byte count into a human-readable string (e.g. "1.2 GB").
 */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`

  const units = ["KB", "MB", "GB"]
  let value = bytes / 1024
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }

  return `${value.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Hook that orchestrates the entire sync lifecycle.
 *
 * Manages the state machine transitions: connecting -> comparing -> syncing -> finalizing -> completed.
 * Processes songs in batches of 20, resolving related artists/albums/playlists via an in-memory
 * entity cache to minimize database lookups. Uses expo-keep-awake to prevent screen dimming.
 * Validates available storage before starting downloads and monitors app state to detect backgrounding.
 *
 * @returns An object with `startSync` and `cancelSync` functions.
 */
export function useSyncOrchestrator() {
  const { t } = useTranslation()

  const cancelledRef = useRef(false)
  const clientRef = useRef<SyncClient | null>(null)
  const isSyncingRef = useRef(false)

  const { setSyncState, setConnectionData, updateProgress, addError, reset } = useSyncStore()

  // Monitor app state — if the app goes to background during sync, mark as failed
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState !== "active" && isSyncingRef.current) {
        cancelledRef.current = true
        isSyncingRef.current = false

        addError({
          type: "network",
          message: t("settings.sync.mobile.syncInterrupted"),
          timestamp: Date.now()
        })
        setSyncState("failed")
        deactivateKeepAwake(KEEP_AWAKE_TAG)
      }
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [addError, setSyncState, t])

  const cancelSync = useCallback(() => {
    cancelledRef.current = true
    isSyncingRef.current = false
    deactivateKeepAwake(KEEP_AWAKE_TAG)
    reset()
  }, [reset])

  const startSync = useCallback(
    async (connectionData: SyncConnectionData) => {
      cancelledRef.current = false
      isSyncingRef.current = true

      await activateKeepAwakeAsync(KEEP_AWAKE_TAG)

      try {
        setConnectionData(connectionData)
        setSyncState("connecting")
        updateProgress({ currentOperation: t("settings.sync.mobile.connectingToDesktop") })

        const client = createSyncClient(connectionData)
        clientRef.current = client

        const isReachable = await client.ping()

        if (!isReachable) {
          setSyncState("failed")
          addError({
            type: "network",
            message: t("settings.sync.mobile.connectionFailed"),
            timestamp: Date.now()
          })
          return
        }

        if (cancelledRef.current) return

        setSyncState("comparing")
        updateProgress({ currentOperation: t("settings.sync.mobile.comparingLibraries") })

        const localFingerprints = await getAllLocalFingerprints()
        const compareResult = await client.compare(localFingerprints)

        const totalItems =
          compareResult.totals.songs +
          compareResult.totals.albums +
          compareResult.totals.artists +
          compareResult.totals.playlists

        if (totalItems === 0) {
          setSyncState("completed")
          updateProgress({ currentOperation: t("settings.sync.mobile.alreadySynced") })
          deactivateKeepAwake(KEEP_AWAKE_TAG)
          isSyncingRef.current = false

          return
        }

        if (cancelledRef.current) return

        // Validate available storage before downloading
        const totalThumbnails =
          compareResult.totals.songs + compareResult.totals.albums + compareResult.totals.artists
        const requiredBytes =
          compareResult.totals.songs * ESTIMATED_BYTES_PER_SONG +
          totalThumbnails * ESTIMATED_BYTES_PER_THUMBNAIL

        const freeBytes = await getFreeDiskStorageAsync()

        if (freeBytes < requiredBytes) {
          setSyncState("failed")
          addError({
            type: "storage",
            message: t("settings.sync.mobile.insufficientStorageDescription", {
              required: formatBytes(requiredBytes),
              available: formatBytes(freeBytes)
            }),
            timestamp: Date.now()
          })
          deactivateKeepAwake(KEEP_AWAKE_TAG)
          isSyncingRef.current = false

          return
        }

        setSyncState("syncing")

        const entityCache = new EntityCache()
        await entityCache.initialize()

        const allArtistIds: number[] = []
        const allAlbumIds: number[] = []
        const allPlaylistIds: number[] = []

        const songBatches = chunkArray(compareResult.missingSongs, BATCH_SIZE)
        const totalBatches = songBatches.length || 1

        updateProgress({ totalItems, syncedItems: 0, currentBatch: 0, totalBatches })

        if (songBatches.length === 0 && totalItems > 0) {
          await processBatch(
            client,
            entityCache,
            compareResult,
            [],
            0,
            allArtistIds,
            allAlbumIds,
            allPlaylistIds,
            cancelledRef,
            updateProgress,
            addError,
            t
          )
        }

        for (let i = 0; i < songBatches.length; i++) {
          if (cancelledRef.current) break

          updateProgress({ currentBatch: i + 1 })

          await processBatch(
            client,
            entityCache,
            compareResult,
            songBatches[i],
            i,
            allArtistIds,
            allAlbumIds,
            allPlaylistIds,
            cancelledRef,
            updateProgress,
            addError,
            t
          )
        }

        if (cancelledRef.current) return

        setSyncState("finalizing")
        updateProgress({ currentOperation: t("settings.sync.mobile.updatingStats") })

        await updateAggregateStats(allArtistIds, allAlbumIds, allPlaylistIds)

        entityCache.clear()

        setSyncState("completed")
        updateProgress({
          currentOperation: t("settings.sync.mobile.syncComplete"),
          syncedItems: totalItems
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : "An unexpected error occurred"

        addError({ type: "network", message, timestamp: Date.now() })
        setSyncState("failed")
      } finally {
        deactivateKeepAwake(KEEP_AWAKE_TAG)
        clientRef.current = null
        isSyncingRef.current = false
      }
    },
    [setSyncState, setConnectionData, updateProgress, addError, t]
  )

  return { startSync, cancelSync }
}

/**
 * Processes a single batch of songs and their related entities.
 *
 * For each batch, fetches metadata from the desktop, then processes entities
 * in dependency order: artists -> albums -> playlists -> songs.
 */
async function processBatch(
  client: SyncClient,
  entityCache: EntityCache,
  compareResult: SyncCompareResponse,
  songFingerprints: string[],
  batchIndex: number,
  allArtistIds: number[],
  allAlbumIds: number[],
  allPlaylistIds: number[],
  cancelledRef: React.RefObject<boolean>,
  updateProgress: (
    progress: Partial<{
      totalItems: number
      syncedItems: number
      currentBatch: number
      totalBatches: number
      currentOperation: string | null
    }>
  ) => void,
  addError: (error: {
    type: "network" | "storage" | "database"
    message: string
    timestamp: number
  }) => void,
  t: TFunction
): Promise<void> {
  try {
    const neededArtistFingerprints = compareResult.missingArtists.filter(
      (fp) => !entityCache.getArtist(fp)
    )
    const neededAlbumFingerprints = compareResult.missingAlbums.filter(
      (fp) => !entityCache.getAlbum(fp)
    )
    const neededPlaylistFingerprints = compareResult.missingPlaylists.filter(
      (fp) => !entityCache.getPlaylist(fp)
    )

    const batchRequest = {
      songFingerprints,
      artistFingerprints: batchIndex === 0 ? neededArtistFingerprints : [],
      albumFingerprints: batchIndex === 0 ? neededAlbumFingerprints : [],
      playlistFingerprints: batchIndex === 0 ? neededPlaylistFingerprints : []
    }

    updateProgress({
      currentOperation: t("settings.sync.mobile.fetchingBatch", { batch: batchIndex + 1 })
    })

    const batchData = await client.fetchBatch(batchRequest, batchIndex)

    if (cancelledRef.current) return

    for (const artist of batchData.artists) {
      if (cancelledRef.current) return
      const id = await processArtist(client, entityCache, artist)
      allArtistIds.push(id)
    }

    for (const album of batchData.albums) {
      if (cancelledRef.current) return
      const id = await processAlbum(client, entityCache, album)
      allAlbumIds.push(id)
    }

    for (const playlist of batchData.playlists) {
      if (cancelledRef.current) return
      const id = await processPlaylist(entityCache, playlist)
      allPlaylistIds.push(id)
    }

    for (const song of batchData.songs) {
      if (cancelledRef.current) return
      await processSong(
        client,
        entityCache,
        song,
        allArtistIds,
        allAlbumIds,
        allPlaylistIds,
        (op) => updateProgress(op),
        t
      )

      const currentSynced = useSyncStore.getState().progress.syncedItems + 1

      updateProgress({ syncedItems: currentSynced })
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Batch processing failed"
    addError({ type: "network", message, timestamp: Date.now() })
  }
}

/**
 * Processes a single artist: checks cache/DB, downloads thumbnail, inserts if new.
 */
async function processArtist(
  client: SyncClient,
  entityCache: EntityCache,
  artist: SyncArtistData
): Promise<number> {
  const cached = entityCache.getArtist(artist.fingerprint)

  if (cached) return cached.id

  let thumbnailFilename: string | null = null

  if (artist.hasThumbnail) {
    thumbnailFilename = await client.downloadThumbnail(artist.fingerprint, "artist")
  }

  const id = await insertSyncedArtist(artist, thumbnailFilename)

  entityCache.addArtist(artist.fingerprint, id)

  return id
}

/**
 * Processes a single album: checks cache/DB, downloads thumbnail, inserts if new, links artists.
 */
async function processAlbum(
  client: SyncClient,
  entityCache: EntityCache,
  album: SyncAlbumData
): Promise<number> {
  const cached = entityCache.getAlbum(album.fingerprint)

  if (cached) return cached.id

  let thumbnailFilename: string | null = null

  if (album.hasThumbnail) {
    thumbnailFilename = await client.downloadThumbnail(album.fingerprint, "album")
  }

  const id = await insertSyncedAlbum(album, thumbnailFilename)

  entityCache.addAlbum(album.fingerprint, id)

  const artistIds: number[] = []
  const artistOrders: number[] = []

  for (const artistRef of album.artistFingerprints) {
    const artistEntry = entityCache.getArtist(artistRef.fingerprint)

    if (artistEntry) {
      artistIds.push(artistEntry.id)
      artistOrders.push(artistRef.artistOrder)
    }
  }

  await linkAlbumToArtists(id, artistIds, artistOrders)

  return id
}

/**
 * Processes a single playlist: checks cache/DB, inserts if new.
 */
async function processPlaylist(
  entityCache: EntityCache,
  playlist: SyncPlaylistData
): Promise<number> {
  const cached = entityCache.getPlaylist(playlist.fingerprint)

  if (cached) return cached.id

  const id = await insertSyncedPlaylist(playlist)

  entityCache.addPlaylist(playlist.fingerprint, id)

  return id
}

/**
 * Processes a single song: downloads audio + thumbnail, inserts, links to artists/playlists.
 */
async function processSong(
  client: SyncClient,
  entityCache: EntityCache,
  song: SyncSongData,
  allArtistIds: number[],
  allAlbumIds: number[],
  allPlaylistIds: number[],
  updateProgress: (progress: Partial<{ currentOperation: string | null }>) => void,
  t: TFunction
): Promise<void> {
  updateProgress({
    currentOperation: t("settings.sync.mobile.downloadingItem", { name: song.name })
  })

  const audioFilename = await client.downloadAudioFile(song.fingerprint)

  let thumbnailFilename: string | null = null

  if (song.thumbnail) {
    thumbnailFilename = await client.downloadThumbnail(song.fingerprint, "song")
  }

  let albumId: number | null = null

  if (song.albumFingerprint) {
    const albumEntry = entityCache.getAlbum(song.albumFingerprint)

    if (albumEntry) {
      albumId = albumEntry.id
      allAlbumIds.push(albumEntry.id)
    }
  }

  const songId = await insertSyncedSong(song, audioFilename, thumbnailFilename, albumId)

  const artistIds: number[] = []
  const artistOrders: number[] = []

  for (const artistRef of song.artistFingerprints) {
    const artistEntry = entityCache.getArtist(artistRef.fingerprint)

    if (artistEntry) {
      artistIds.push(artistEntry.id)
      artistOrders.push(artistRef.artistOrder)
      allArtistIds.push(artistEntry.id)
    }
  }

  await linkSongToArtists(songId, artistIds, artistOrders)

  const playlistIds: number[] = []

  for (const playlistFingerprint of song.playlistFingerprints) {
    const playlistEntry = entityCache.getPlaylist(playlistFingerprint)

    if (playlistEntry) {
      playlistIds.push(playlistEntry.id)
      allPlaylistIds.push(playlistEntry.id)
    }
  }

  await linkSongToPlaylists(songId, playlistIds)
}

/**
 * Splits an array into chunks of the specified size.
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }

  return chunks
}
