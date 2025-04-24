import TrackPlayer, { RepeatMode } from "react-track-player-web"

export const DefaultRepeatMode = RepeatMode.Queue

export const setupAudioPlayer = async () => {
  await TrackPlayer.setupPlayer()
  await TrackPlayer.setRepeatMode(DefaultRepeatMode)
}
