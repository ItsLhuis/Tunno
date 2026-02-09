import { invoke } from "@tauri-apps/api/core"

import { type TrackExportData } from "../types"

/**
 * Track export data structure sent to the Tauri backend.
 * Uses `snake_case` naming to match the corresponding Rust struct.
 */
type TauriTrackExportData = {
  dir_name: string
  audio_file: string
  thumbnails: string[]
  metadata_json: string
}

/**
 * Represents the connection details of the running sync server.
 */
export type ServerInfo = {
  ip: string
  port: number
  url: string
  endpoints: string[]
}

/**
 * Starts the local sync server for mobile pairing.
 *
 * @returns A Promise that resolves with the server connection details.
 */
export async function startServer(): Promise<ServerInfo> {
  return await invoke<ServerInfo>("start_server")
}

/**
 * Stops the currently running sync server.
 */
export async function stopServer(): Promise<void> {
  return await invoke<void>("stop_server")
}

/**
 * Checks whether the sync server is currently running.
 *
 * @returns A Promise that resolves to `true` if the server is active.
 */
export async function isServerRunning(): Promise<boolean> {
  return await invoke<boolean>("is_server_running")
}

/**
 * Retrieves the connection details of the running sync server.
 *
 * @returns A Promise that resolves to the server info, or `null` if not running.
 */
export async function getServerInfo(): Promise<ServerInfo | null> {
  return await invoke<ServerInfo | null>("get_server_info")
}

/**
 * Retrieves the QR code data string for mobile pairing.
 *
 * @returns A Promise that resolves to the QR JSON string, or `null` if unavailable.
 */
export async function getQrData(): Promise<string | null> {
  return await invoke<string | null>("get_qr_data")
}

/**
 * Retrieves the current sync status from the running server.
 *
 * @returns A Promise that resolves to the sync status string ("waiting" | "connected" | "syncing" | "completed").
 */
export async function getSyncStatus(): Promise<string> {
  return await invoke<string>("get_sync_status")
}

/**
 * Generates audio fingerprints for songs that are missing them.
 *
 * @returns A Promise that resolves to the number of fingerprints generated.
 */
export async function backfillFingerprints(): Promise<number> {
  return await invoke<number>("backfill_fingerprints")
}

/**
 * Invokes the Tauri command to create an export bundle on the native filesystem.
 *
 * @param outputDir - The absolute path to the directory where the bundle will be created.
 * @param manifestJson - A JSON string representing the manifest of all exported data.
 * @param tracksData - An array of track data objects to be included in the bundle.
 * @returns A Promise that resolves with the resulting bundle path.
 */
export async function createExportBundle(
  outputDir: string,
  manifestJson: string,
  tracksData: TrackExportData[]
): Promise<string> {
  const tauriTracksData: TauriTrackExportData[] = tracksData.map((track) => ({
    dir_name: track.dirName,
    audio_file: track.audioFile,
    thumbnails: track.thumbnails,
    metadata_json: track.metadataJson
  }))

  return await invoke<string>("sync_create_bundle", {
    outputDir,
    manifestJson,
    tracksData: tauriTracksData
  })
}
