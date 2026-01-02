import { createAudioPlayer } from "expo-audio"

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
