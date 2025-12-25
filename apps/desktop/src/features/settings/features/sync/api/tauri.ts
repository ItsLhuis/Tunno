import { invoke } from "@tauri-apps/api/core"

import { type TrackExportData } from "../types"

type TauriTrackExportData = {
  dir_name: string
  audio_file: string
  thumbnails: string[]
  metadata_json: string
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
