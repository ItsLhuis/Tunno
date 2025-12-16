import TrackPlayer, { RepeatMode } from "@track-player/web"

export const DefaultRepeatMode = RepeatMode.Queue

function isTrackPlayerSetup() {
  try {
    const state = TrackPlayer.getPlaybackState()
    return state !== undefined
  } catch {
    return false
  }
}

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
