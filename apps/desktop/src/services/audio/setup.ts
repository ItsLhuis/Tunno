import TrackPlayer, { RepeatMode } from "react-track-player-web"

export const DefaultRepeatMode = RepeatMode.Queue

export const setupAudioPlayer = async () => {
  await TrackPlayer.setupPlayer({
    updateInterval: 0.5,
    useMediaSession: true
  })
  await TrackPlayer.setRepeatMode(DefaultRepeatMode)
}
