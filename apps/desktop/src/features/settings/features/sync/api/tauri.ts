import { invoke } from "@tauri-apps/api/core"

import { type TrackExportData } from "../types"

type TauriTrackExportData = {
  dir_name: string
  audio_file: string
  thumbnails: string[]
  metadata_json: string
}

export type ServerInfo = {
  ip: string
  port: number
  url: string
  endpoints: string[]
}

export async function startServer(): Promise<ServerInfo> {
  return await invoke<ServerInfo>("start_server")
}

export async function stopServer(): Promise<void> {
  return await invoke<void>("stop_server")
}

export async function isServerRunning(): Promise<boolean> {
  return await invoke<boolean>("is_server_running")
}

export async function getServerInfo(): Promise<ServerInfo | null> {
  return await invoke<ServerInfo | null>("get_server_info")
}

export async function getQrData(): Promise<string | null> {
  return await invoke<string | null>("get_qr_data")
}

export async function backfillFingerprints(): Promise<number> {
  return await invoke<number>("backfill_fingerprints")
}

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
