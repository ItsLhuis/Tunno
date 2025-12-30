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
    android: {
      appKilledPlaybackBehavior: DefaultAudioServiceBehaviour
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Skip,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.JumpForward,
      Capability.JumpBackward,
      Capability.SeekTo
    ],
    notificationCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Skip,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.JumpForward,
      Capability.JumpBackward,
      Capability.SeekTo
    ],
    progressUpdateEventInterval: 1
  })
  await TrackPlayer.setRepeatMode(DefaultRepeatMode)
}
