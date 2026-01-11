import { invoke } from "@tauri-apps/api/core"

import { type TrackExportData } from "../types"

/**
 * Defines the data structure for track export data that is sent to the Tauri backend.
 * The `snake_case` naming convention is used to match the corresponding Rust struct.
 */
type TauriTrackExportData = {
  /**
   * The name of the directory for the track in `snake_case` format.
   */
  dir_name: string
  /**
   * The audio file path in `snake_case` format.
   */
  audio_file: string
  /**
   * An array of thumbnail paths in `snake_case` format.
   */
  thumbnails: string[]
  /**
   * The JSON string of the metadata in `snake_case` format.
   */
  metadata_json: string
}

/**
 * Invokes the Tauri command to create an export bundle on the native filesystem.
 *
 * This function acts as a bridge between the JavaScript frontend and the Rust backend.
 * It transforms the track data into the format expected by the Rust command (`TauriTrackExportData`),
 * and then calls the `sync_create_bundle` command with the necessary data.
 *
 * @param outputDir - The absolute path to the directory where the export bundle will be created.
 * @param manifestJson - A JSON string representing the manifest of all exported data.
 * @param tracksData - An array of track data objects to be included in the bundle.
 * @returns A Promise that resolves with a success or error message from the Rust backend.
 */
export async function createExportBundle(
  outputDir: string,
  manifestJson: string,
  tracksData: TrackExportData[]
): Promise<string> {
  // Maps the JavaScript-friendly camelCase data to the Rust-friendly snake_case struct.
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
