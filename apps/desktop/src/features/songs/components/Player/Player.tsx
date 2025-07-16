import { Fragment } from "react"

import { PlaybackControls } from "./PlaybackControls"
import { PlaybackOptions } from "./PlaybackOptions"
import { PlaybackProgress } from "./PlaybackProgress"
import { TrackInfo } from "./TrackInfo"

const Player = () => {
  return (
    <Fragment>
      <PlaybackProgress />
      <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center gap-3 p-3">
        <TrackInfo />
        <PlaybackControls />
        <PlaybackOptions />
      </div>
    </Fragment>
  )
}

export { Player }
