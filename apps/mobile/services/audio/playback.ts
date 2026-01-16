import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import {
  clearWidgetColorCache,
  triggerWidgetUpdate
} from "@features/player/components/Widget/widgetUpdate"

import { Statistics } from "@services/statistics"

import TrackPlayer, { Event, State } from "react-native-track-player"

/**
 * Stores functions to unsubscribe from TrackPlayer event listeners.
 * Used for cleanup when listeners need to be re-registered or unregistered.
 */
let unsubscribeFns: Array<() => void> = []

/**
 * Registers a comprehensive set of event listeners for `react-native-track-player`.
 *
 * These listeners manage playback state, handle remote control events (from headphones, car stereos, etc.),
 * update the global player store, and integrate with the statistics tracking service.
 * Existing listeners are first unregistered to prevent duplicates.
 *
 * Listeners include:
 * - `Event.RemotePause`, `Event.RemotePlay`, `Event.RemoteNext`, `Event.RemotePrevious`: For basic playback control.
 * - `Event.RemoteJumpForward`, `Event.RemoteJumpBackward`, `Event.RemoteSeek`: For seeking.
 * - `Event.PlaybackState`: Updates player store's `playbackState` and `isTrackLoading`, integrates with `Statistics` for play/pause/stop.
 * - `Event.PlaybackActiveTrackChanged`: Synchronizes player store with native player, ensures window for new track, updates navigation states, and tracks new plays.
 * - `Event.PlaybackProgressUpdated`: Updates player store's `position`, `duration`, and `buffered` states.
 * - `Event.PlaybackError`: Resets loading states and forces statistics to end.
 */
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
        triggerWidgetUpdate()
        break
      case State.Paused:
        Statistics.pausePlay()
        triggerWidgetUpdate()
        break
      case State.Stopped:
        await Statistics.endPlay()
        triggerWidgetUpdate()
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
        isRehydrating,
        isQueueLoading
      } = usePlayerStore.getState()

      if (isRehydrating || isQueueLoading) return

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

        clearWidgetColorCache()
        triggerWidgetUpdate()
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

/**
 * Unregisters all previously registered playback event listeners.
 *
 * This function is crucial for preventing memory leaks and ensuring that
 * event handlers are properly cleaned up, especially when the audio service
 * is being stopped or reinitialized. It also forces the statistics tracking
 * to end any active play session.
 */
export function unregisterPlaybackListeners() {
  if (unsubscribeFns.length === 0) return
  unsubscribeFns.forEach((fn) => fn())
  unsubscribeFns = []

  Statistics.forceEnd()
}
