import { createStyleSheet, useStyles } from "@styles"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { Slider } from "@components/ui"

const PlaybackProgress = () => {
  const styles = useStyles(playbackProgressStyles)

  const { position, duration } = usePlayerStore(
    useShallow((state) => ({
      position: state.position,
      duration: state.duration
    }))
  )

  const progress = duration > 0 ? position / duration : 0

  return (
    <Slider
      disabled
      value={progress}
      containerStyle={styles.container}
      trackStyle={styles.track}
      renderThumbComponent={() => null}
    />
  )
}

const playbackProgressStyles = createStyleSheet(({ theme }) => ({
  container: {
    height: "auto"
  },
  track: {
    borderRadius: theme.radius("none")
  }
}))

export { PlaybackProgress }
