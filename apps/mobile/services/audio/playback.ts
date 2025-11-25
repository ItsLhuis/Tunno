import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { Statistics } from "@services/statistics"

import TrackPlayer, { Event, State } from "react-native-track-player"

let unsubscribeFns: Array<() => void> = []

export async function registerPlaybackListeners() {
  if (unsubscribeFns.length > 0) {
    unsubscribeFns.forEach((fn) => fn())
    unsubscribeFns = []
  }

  const onRemotePause = TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause()
  })
  unsubscribeFns.push(() => onRemotePause.remove())

  const onRemotePlay = TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play()
  })
  unsubscribeFns.push(() => onRemotePlay.remove())

  const onRemoteNext = TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext()
  })
  unsubscribeFns.push(() => onRemoteNext.remove())

  const onRemotePrevious = TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious()
  })
  unsubscribeFns.push(() => onRemotePrevious.remove())

  const onRemoteJumpForward = TrackPlayer.addEventListener(
    Event.RemoteJumpForward,
    async (event) => {
      TrackPlayer.seekBy(event.interval)
    }
  )
  unsubscribeFns.push(() => onRemoteJumpForward.remove())

  const onRemoteJumpBackward = TrackPlayer.addEventListener(
    Event.RemoteJumpBackward,
    async (event) => {
      TrackPlayer.seekBy(-event.interval)
    }
  )
  unsubscribeFns.push(() => onRemoteJumpBackward.remove())

  const onRemoteSeek = TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    TrackPlayer.seekTo(event.position)
  })
  unsubscribeFns.push(() => onRemoteSeek.remove())

  const onPlaybackState = TrackPlayer.addEventListener(Event.PlaybackState, async (event) => {
    const state = event.state

    usePlayerStore.setState({
      playbackState: state,
      isTrackLoading: state === State.Buffering || state === State.Loading
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
  })
  unsubscribeFns.push(() => onPlaybackState.remove())

  const onTrackChanged = TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    async () => {
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

        if (
          playbackState === State.Playing &&
          currentTrackId &&
          typeof currentTrackId === "number"
        ) {
          await Statistics.startPlay(currentTrackId, playSource, sourceContextId ?? undefined)
        }
      } catch (error) {
        console.error("Playback: Error in onTrackChanged:", error)
        await validateAndUpdateState()
      }
    }
  )
  unsubscribeFns.push(() => onTrackChanged.remove())

  const onProgress = TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, (event) => {
    const { position, duration, buffered } = event

    usePlayerStore.setState({
      position: Math.floor(position),
      duration: Math.round(duration),
      buffered: Math.floor(buffered ?? 0)
    })
  })
  unsubscribeFns.push(() => onProgress.remove())

  const onError = TrackPlayer.addEventListener(Event.PlaybackError, () => {
    usePlayerStore.setState({ isTrackLoading: false, playbackState: State.Error })
    Statistics.forceEnd()
  })
  unsubscribeFns.push(() => onError.remove())
}

export function unregisterPlaybackListeners() {
  if (unsubscribeFns.length === 0) return
  unsubscribeFns.forEach((fn) => fn())
  unsubscribeFns = []

  Statistics.forceEnd()
}
