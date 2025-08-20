import TrackPlayer, {
  Event,
  type EventData,
  type EventHandler,
  type PlaybackProgressEventData,
  type PlaybackStateEventData,
  State
} from "react-track-player-web"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

let unsubscribeFns: Array<() => void> = []
let bufferingTimeout: NodeJS.Timeout | null = null

export const registerPlaybackListeners = () => {
  if (unsubscribeFns.length > 0) {
    unsubscribeFns.forEach((fn) => fn())
    unsubscribeFns = []
  }

  const onPlaybackState: EventHandler = (data: EventData) => {
    if ((data as PlaybackStateEventData).type !== Event.PlaybackState) return
    const { state } = data as PlaybackStateEventData

    if (state === State.Buffering) {
      if (bufferingTimeout) clearTimeout(bufferingTimeout)
      bufferingTimeout = setTimeout(() => {
        usePlayerStore.setState({ playbackState: state, isLoading: true })
      }, 300)
    } else {
      if (bufferingTimeout) {
        clearTimeout(bufferingTimeout)
        bufferingTimeout = null
      }
      usePlayerStore.setState({ playbackState: state, isLoading: false })
    }
  }

  const onTrackChanged = async () => {
    const index = TrackPlayer.getActiveTrackIndex()
    const track = TrackPlayer.getActiveTrack()

    usePlayerStore.setState({
      currentTrackIndex: typeof index === "number" ? index : null,
      currentTrack: (track as any) ?? null,
      duration: TrackPlayer.getDuration() || 0
    })
  }

  const onProgress: EventHandler = (data: EventData) => {
    if ((data as PlaybackProgressEventData).type !== Event.PlaybackProgressUpdated) return
    const { position, duration, buffered } = data as PlaybackProgressEventData

    usePlayerStore.setState({
      position: Math.floor(position),
      duration: Math.floor(duration),
      buffered: Math.floor(buffered)
    })
  }

  const onError = () => {
    usePlayerStore.setState({ isLoading: false, playbackState: State.Error })
  }

  TrackPlayer.addEventListener(Event.PlaybackState, onPlaybackState)
  unsubscribeFns.push(() => TrackPlayer.removeEventListener(Event.PlaybackState, onPlaybackState))

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, onTrackChanged)
  unsubscribeFns.push(() =>
    TrackPlayer.removeEventListener(Event.PlaybackTrackChanged, onTrackChanged)
  )

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, onProgress)
  unsubscribeFns.push(() =>
    TrackPlayer.removeEventListener(Event.PlaybackProgressUpdated, onProgress)
  )

  TrackPlayer.addEventListener(Event.PlaybackError, onError)
  unsubscribeFns.push(() => TrackPlayer.removeEventListener(Event.PlaybackError, onError))
}

export const unregisterPlaybackListeners = () => {
  if (unsubscribeFns.length === 0) return
  unsubscribeFns.forEach((fn) => fn())
  unsubscribeFns = []

  if (bufferingTimeout) {
    clearTimeout(bufferingTimeout)
    bufferingTimeout = null
  }
}
