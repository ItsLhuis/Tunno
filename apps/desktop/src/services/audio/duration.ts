import { invoke } from "@tauri-apps/api/core"

/**
 * Retrieves the duration of an audio file from its file path.
 *
 * This function invokes a Tauri command (`get_audio_duration`) to interact with
 * the native backend, which calculates the duration of the audio file.
 *
 * @param filePath - The absolute path to the audio file.
 * @returns A Promise that resolves to the duration of the audio in seconds, or 0 if an error occurs.
 */
export async function getAudioDuration(filePath: string): Promise<number> {
  try {
    const durationSeconds = await invoke<number>("get_audio_duration", { filePath })
    return durationSeconds
  } catch {
    return 0
  }
}
