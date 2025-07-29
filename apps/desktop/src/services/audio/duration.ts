import { invoke } from "@tauri-apps/api/core"

export async function getAudioDuration(filePath: string): Promise<number> {
  try {
    const durationSeconds = await invoke<number>("get_audio_duration", { filePath })
    return durationSeconds
  } catch {
    return 0
  }
}
