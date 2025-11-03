import { Titlebar } from "./Titlebar"
import { TrackArtwork } from "./TrackArtwork"
import { TrackInfo } from "./TrackInfo"

const ExpandedLayout = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Titlebar />
      <div className="flex min-h-0 flex-1">
        <TrackArtwork />
      </div>
      <div className="shrink-0">
        <TrackInfo />
      </div>
    </div>
  )
}

export { ExpandedLayout }
