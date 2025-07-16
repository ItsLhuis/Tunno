import { Slider, Typography } from "@components/ui"

const PlaybackProgress = () => {
  return (
    <div className="flex w-full items-center justify-center gap-3 p-3 pb-0">
      <Typography affects={["small"]}>0:01</Typography>
      <Slider />
      <Typography affects={["small"]}>2:24</Typography>
    </div>
  )
}

export { PlaybackProgress }
