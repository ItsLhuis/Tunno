import { createAudioPlayer } from "expo-audio"

/**
 * Retrieves the duration of an audio file from its URI.
 *
 * This function creates an `expo-audio` player instance, loads the audio from the provided URI,
 * and extracts its duration. It then releases the player resources to prevent memory leaks.
 *
 * @param uri - The URI of the audio file.
 * @returns A Promise that resolves to the duration of the audio in milliseconds.
 */
export function getAudioDuration(uri: string): Promise<number> {
  return new Promise((resolve) => {
    const player = createAudioPlayer(uri)

    const cleanup = () => {
      subscription.remove()
      player.release()
    }

    const subscription = player.addListener("playbackStatusUpdate", (status) => {
      if (status.isLoaded && status.duration > 0) {
        cleanup()
        resolve(status.duration)
      }
    })
  })
}
