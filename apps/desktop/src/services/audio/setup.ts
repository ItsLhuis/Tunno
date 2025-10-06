import TrackPlayer, { RepeatMode } from "react-track-player-web"

export const DefaultRepeatMode = RepeatMode.Queue

const isTrackPlayerSetup = () => {
  try {
    const state = TrackPlayer.getPlaybackState()
    return state !== undefined
  } catch {
    return false
  }
}

export const setupAudioPlayer = async () => {
  if (isTrackPlayerSetup()) {
    return
  }

  await TrackPlayer.setupPlayer({
    updateInterval: 0.5,
    useMediaSession: true
  })
  await TrackPlayer.setRepeatMode(DefaultRepeatMode)
}
