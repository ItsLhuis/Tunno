import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode
} from "react-native-track-player"

export const DefaultRepeatMode = RepeatMode.Queue
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification

export const setupAudioPlayer = async () => {
  await TrackPlayer.setupPlayer({
    autoHandleInterruptions: true
  })
  await TrackPlayer.updateOptions({
    icon: require("@assets/images/app/icon.png"),
    android: {
      appKilledPlaybackBehavior: DefaultAudioServiceBehaviour
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Skip,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious
    ],
    progressUpdateEventInterval: 1
  })
  await TrackPlayer.setRepeatMode(DefaultRepeatMode)
}
