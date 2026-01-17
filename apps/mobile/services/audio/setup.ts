import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode
} from "react-native-track-player"

/**
 * The default repeat mode for the audio player.
 * Tracks will repeat in a queue by default.
 */
export const DefaultRepeatMode = RepeatMode.Queue
/**
 * Defines the default behavior of the audio service when the app is killed.
 * By default, playback will stop and the notification will be removed.
 */
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification

/**
 * Configures and initializes the `react-native-track-player` instance.
 *
 * This function sets up the player with:
 * - Automatic interruption handling.
 * - Android-specific behavior for when the app is killed.
 * - Supported playback capabilities (play, pause, skip, seek, etc.).
 * - Notification capabilities for media controls.
 * - A default repeat mode (`DefaultRepeatMode`).
 */
export const setupAudioPlayer = async () => {
  await TrackPlayer.setupPlayer({
    autoHandleInterruptions: true
  })
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
      stopForegroundGracePeriod: 0
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
      Capability.SeekTo
    ],
    progressUpdateEventInterval: 1
  })
  await TrackPlayer.setRepeatMode(DefaultRepeatMode)
}
