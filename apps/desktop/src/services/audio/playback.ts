import TrackPlayer, {
  Event,
  type EventData,
  type EventHandler,
  type PlaybackProgressEventData,
  type PlaybackStateEventData,
  State
} from "react-track-player-web"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"
import { type Track } from "@features/songs/types/player"

let unsubscribeFns: Array<() => void> = []

export const registerPlaybackListeners = () => {
  if (unsubscribeFns.length > 0) {
    unsubscribeFns.forEach((fn) => fn())
    unsubscribeFns = []
  }

  const onPlaybackState: EventHandler = (data: EventData) => {
    if ((data as PlaybackStateEventData).type !== Event.PlaybackState) return
    const { state } = data as PlaybackStateEventData

    usePlayerStore.setState({
      playbackState: state,
      isTrackLoading: state === State.Buffering
    })
  }

  const onTrackChanged = async () => {
    const localIndex = TrackPlayer.getActiveTrackIndex()
    const track = TrackPlayer.getActiveTrack() as Track | undefined

    const { windowStartIndex } = usePlayerStore.getState()
    const globalIndex = typeof localIndex === "number" ? windowStartIndex + localIndex : null

    usePlayerStore.setState({
      currentTrackIndex: globalIndex,
      currentTrack: track ?? null,
      currentTrackId: track?.id ?? null,
      duration: Math.round(TrackPlayer.getDuration() || 0)
    })

    if (typeof globalIndex === "number") {
      await usePlayerStore.getState().ensureWindowForIndex(globalIndex)
    }

    usePlayerStore.getState().updateNavigationStates()
  }

  const onProgress: EventHandler = (data: EventData) => {
    if ((data as PlaybackProgressEventData).type !== Event.PlaybackProgressUpdated) return
    const { position, duration, buffered } = data as PlaybackProgressEventData

    usePlayerStore.setState({
      position: Math.floor(position),
      duration: Math.round(duration),
      buffered: Math.floor(buffered)
    })
  }

  const onError = () => {
    usePlayerStore.setState({ isTrackLoading: false, playbackState: State.Error })
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
}
