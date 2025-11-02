import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { Statistics } from "@services/statistics"

import TrackPlayer, {
  Event,
  type EventData,
  type EventHandler,
  type PlaybackProgressEventData,
  type PlaybackStateEventData,
  State
} from "react-track-player-web"

let unsubscribeFns: Array<() => void> = []

export const registerPlaybackListeners = () => {
  if (unsubscribeFns.length > 0) {
    unsubscribeFns.forEach((fn) => fn())
    unsubscribeFns = []
  }

  const onPlaybackState: EventHandler = async (data: EventData) => {
    if ((data as PlaybackStateEventData).type !== Event.PlaybackState) return
    const { state } = data as PlaybackStateEventData

    usePlayerStore.setState({
      playbackState: state,
      isTrackLoading: state === State.Buffering
    })

    switch (state) {
      case State.Playing:
        const { currentTrackId, playSource, sourceContextId } = usePlayerStore.getState()
        if (currentTrackId && typeof currentTrackId === "number") {
          await Statistics.startPlay(currentTrackId, playSource, sourceContextId ?? undefined)
        }
        break
      case State.Paused:
        Statistics.pausePlay()
        break
      case State.Stopped:
        await Statistics.endPlay()
        break
      case State.Error:
        await Statistics.forceEnd()
        break
    }
  }

  const onTrackChanged = async () => {
    const {
      syncStateWithPlayer,
      ensureWindowForIndex,
      updateNavigationStates,
      validateAndUpdateState,
      isRehydrating
    } = usePlayerStore.getState()

    if (isRehydrating) return

    try {
      await syncStateWithPlayer()

      const { currentTrackIndex, currentTrackId, playSource, sourceContextId, playbackState } =
        usePlayerStore.getState()

      if (typeof currentTrackIndex === "number") {
        await ensureWindowForIndex(currentTrackIndex)
      }

      updateNavigationStates()

      if (playbackState === State.Playing && currentTrackId && typeof currentTrackId === "number") {
        await Statistics.startPlay(currentTrackId, playSource, sourceContextId ?? undefined)
      }
    } catch (error) {
      console.error("Playback: Error in onTrackChanged:", error)
      await validateAndUpdateState()
    }
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
    Statistics.forceEnd()
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

  Statistics.forceEnd()
}
