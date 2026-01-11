import TrackPlayer, { RepeatMode } from "@track-player/web"

/**
 * The default repeat mode for the audio player.
 * Tracks will repeat in a queue by default.
 */
export const DefaultRepeatMode = RepeatMode.Queue

/**
 * Checks if the `@track-player/web` instance has already been set up.
 *
 * This function attempts to retrieve the playback state to determine if `TrackPlayer.setupPlayer`
 * has been successfully called, preventing redundant setup calls.
 *
 * @returns `true` if TrackPlayer is already set up, `false` otherwise.
 */
function isTrackPlayerSetup() {
  try {
    const state = TrackPlayer.getPlaybackState()
    return state !== undefined
  } catch {
    return false
  }
}

/**
 * Configures and initializes the `@track-player/web` instance.
 *
 * This function sets up the web player with:
 * - A check to prevent redundant setup.
 * - Integration with the Web Media Session API (`useMediaSession`).
 * - A default repeat mode (`DefaultRepeatMode`).
 *
 * @returns A Promise that resolves when the audio player has been set up.
 */
export async function setupAudioPlayer() {
  if (isTrackPlayerSetup()) {
    return
  }

  await TrackPlayer.setupPlayer({
    updateInterval: 0.5,
    useMediaSession: true
  })
  await TrackPlayer.setRepeatMode(DefaultRepeatMode)
}
