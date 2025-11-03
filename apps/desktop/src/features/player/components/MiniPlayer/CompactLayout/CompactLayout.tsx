import { PlaybackControls } from "./PlaybackControls"
import { Titlebar } from "./Titlebar"
import { TrackInfo } from "./TrackInfo"

const CompactLayout = () => {
  return (
    <div className="grid h-full w-full grid-cols-[auto_1fr_auto]">
      <Titlebar />
      <div className="ml-3 min-w-0">
        <TrackInfo />
      </div>
      <div className="mr-3 flex shrink-0 items-center">
        <PlaybackControls />
      </div>
    </div>
  )
}

export { CompactLayout }
