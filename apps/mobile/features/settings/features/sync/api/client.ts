import { File } from "expo-file-system"

import { v4 as uuidv4 } from "uuid"

import { getFilePath } from "@services/storage"

import {
  type SyncBatchRequest,
  type SyncBatchResponse,
  type SyncCompareRequest,
  type SyncCompareResponse,
  type SyncConnectionData,
  type SyncError
} from "../types"

/** Timeout in milliseconds for metadata API requests. */
const API_TIMEOUT = 10_000

/** Timeout in milliseconds for file download requests (audio and thumbnails). */
const FILE_DOWNLOAD_TIMEOUT = 60_000

/**
 * Creates a typed {@link SyncError} object with the current timestamp.
 * @param type - The category of the error.
 * @param message - A human-readable description of the error.
 * @returns A {@link SyncError} instance.
 */
function createSyncError(type: SyncError["type"], message: string): SyncError {
  return { type, message, timestamp: Date.now() }
}

/**
 * Maps a MIME content-type string to a file extension.
 * Falls back to `"bin"` if the content-type is unknown or absent.
 * @param contentType - The `Content-Type` header value from the response.
 * @returns The corresponding file extension string.
 */
function getExtensionFromContentType(contentType: string | null): string {
  if (!contentType) return "bin"

  const mimeMap: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/mp4": "m4a",
    "audio/aac": "aac",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
    "audio/flac": "flac",
    "audio/x-flac": "flac",
    "audio/webm": "webm",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"
  }

  const base = contentType.split(";")[0]?.trim().toLowerCase() ?? ""

  return mimeMap[base] ?? "bin"
}

/**
 * Creates an HTTP client for communicating with the desktop Tunno sync server.
 *
 * All requests include an `Authorization: Bearer <token>` header parsed from the QR code.
 * Metadata requests use a 10-second timeout; file downloads use a 60-second timeout.
 * Methods throw typed {@link SyncError} objects that the orchestrator can catch and handle.
 *
 * @param connectionData - The connection details parsed from the desktop QR code.
 * @returns An object with methods for each sync API operation.
 */
export function createSyncClient(connectionData: SyncConnectionData) {
  const { url, token } = connectionData

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }

  /**
   * Wraps `fetch` with an abort-based timeout mechanism.
   * @param input - The request URL.
   * @param init - The fetch request options.
   * @param timeout - The maximum time in milliseconds before aborting.
   * @returns A Promise that resolves to the fetch {@link Response}.
   * @throws A {@link SyncError} with type `"network"` on timeout or fetch failure.
   */
  async function fetchWithTimeout(
    input: string,
    init: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController()

    const timer = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(input, { ...init, signal: controller.signal })

      return response
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw createSyncError("network", `Request timed out after ${timeout}ms`)
      }

      throw createSyncError(
        "network",
        error instanceof Error ? error.message : "Network request failed"
      )
    } finally {
      clearTimeout(timer)
    }
  }

  /**
   * Pings the desktop server to verify connectivity.
   * @returns A Promise that resolves to `true` if the server responds with a 2xx status, `false` otherwise.
   */
  async function ping(): Promise<{ ok: boolean; error?: string }> {
    try {
      const response = await fetchWithTimeout(
        `${url}/ping`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } },
        API_TIMEOUT
      )

      if (!response.ok) {
        return { ok: false, error: `Server responded with status ${response.status}` }
      }

      return { ok: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown network error"

      return { ok: false, error: message }
    }
  }

  /**
   * Sends the mobile's fingerprints to the desktop for comparison and receives
   * the fingerprints of entities that are missing on mobile.
   *
   * @param localFingerprints - The fingerprints of all local entities, grouped by type.
   * @returns A Promise that resolves to the desktop's {@link SyncCompareResponse}.
   * @throws A {@link SyncError} with type `"network"` on request failure.
   */
  async function compare(localFingerprints: SyncCompareRequest): Promise<SyncCompareResponse> {
    const response = await fetchWithTimeout(
      `${url}/api/sync/compare`,
      { method: "POST", headers, body: JSON.stringify(localFingerprints) },
      API_TIMEOUT
    )

    if (!response.ok) {
      throw createSyncError("network", `Compare failed with status ${response.status}`)
    }

    return response.json() as Promise<SyncCompareResponse>
  }

  /**
   * Fetches full metadata for a batch of entities from the desktop server.
   *
   * @param fingerprints - The fingerprints of entities to retrieve, grouped by type.
   * @param batchIndex - The zero-based index of the current batch.
   * @returns A Promise that resolves to the desktop's {@link SyncBatchResponse}.
   * @throws A {@link SyncError} with type `"network"` on request failure.
   */
  async function fetchBatch(
    fingerprints: Omit<SyncBatchRequest, "batchIndex">,
    batchIndex: number
  ): Promise<SyncBatchResponse> {
    const body: SyncBatchRequest = { ...fingerprints, batchIndex }

    const response = await fetchWithTimeout(
      `${url}/api/sync/batch`,
      { method: "POST", headers, body: JSON.stringify(body) },
      API_TIMEOUT
    )

    if (!response.ok) {
      throw createSyncError("network", `Batch fetch failed with status ${response.status}`)
    }

    return response.json() as Promise<SyncBatchResponse>
  }

  /**
   * Downloads an audio file from the desktop server and saves it to the local songs directory.
   *
   * The file is saved with a UUID-based filename, preserving the original format extension
   * derived from the response's `Content-Type` header.
   *
   * @param fingerprint - The fingerprint of the song whose audio file to download.
   * @returns A Promise that resolves to the generated filename (e.g., `"uuid.mp3"`).
   * @throws A {@link SyncError} with type `"network"` on download failure.
   */
  async function downloadAudioFile(fingerprint: string): Promise<string> {
    const response = await fetchWithTimeout(
      `${url}/api/files/audio/${fingerprint}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } },
      FILE_DOWNLOAD_TIMEOUT
    )

    if (!response.ok) {
      throw createSyncError("network", `Audio download failed with status ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    const extension = getExtensionFromContentType(contentType)
    const fileName = `${uuidv4()}.${extension}`

    const filePath = await getFilePath("songs", fileName)

    const bytes = new Uint8Array(await response.arrayBuffer())
    const file = new File(filePath)

    file.write(bytes)

    return fileName
  }

  /**
   * Downloads a thumbnail image from the desktop server and saves it to the local thumbnails directory.
   *
   * Returns `null` silently if the server responds with an error or if the download fails,
   * since thumbnails are optional and should not block the sync process.
   *
   * @param fingerprint - The fingerprint of the entity whose thumbnail to download.
   * @param entityType - The type of entity the thumbnail belongs to.
   * @returns A Promise that resolves to the generated filename (e.g., `"uuid.jpg"`), or `null` if unavailable.
   */
  async function downloadThumbnail(
    fingerprint: string,
    entityType: "song" | "album" | "artist"
  ): Promise<string | null> {
    try {
      const response = await fetchWithTimeout(
        `${url}/api/files/thumbnail/${fingerprint}/${entityType}`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } },
        FILE_DOWNLOAD_TIMEOUT
      )

      if (!response.ok) return null

      const contentType = response.headers.get("content-type")
      const extension = getExtensionFromContentType(contentType)
      const fileName = `${uuidv4()}.${extension}`

      const filePath = await getFilePath("thumbnails", fileName)

      const bytes = new Uint8Array(await response.arrayBuffer())
      const file = new File(filePath)

      file.write(bytes)

      return fileName
    } catch {
      return null
    }
  }

  /**
   * Notifies the desktop server that the sync has completed successfully.
   */
  async function complete(): Promise<void> {
    try {
      await fetchWithTimeout(`${url}/api/sync/complete`, { method: "POST", headers }, API_TIMEOUT)
    } catch {
      // Non-critical — desktop will still show stale status but sync succeeded
    }
  }

  /**
   * Notifies the desktop server that the mobile user cancelled the sync.
   * Fire-and-forget — errors are silently ignored since the server may already be down.
   */
  function abort(): void {
    fetch(`${url}/api/sync/abort`, { method: "POST", headers }).catch(() => {})
  }

  return { ping, compare, fetchBatch, downloadAudioFile, downloadThumbnail, complete, abort }
}

/**
 * The return type of {@link createSyncClient}, representing the sync HTTP client interface.
 */
export type SyncClient = ReturnType<typeof createSyncClient>
