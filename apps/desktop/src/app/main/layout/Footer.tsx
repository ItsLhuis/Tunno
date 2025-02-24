import { getOverlayWindow } from "@tauri/window/overlay"

import {
  MonitorStop,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Repeat,
  Shuffle,
  MonitorSpeaker
} from "lucide-react"

import {
  Button,
  Typography,
  Marquee,
  Slider,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@components/ui"

import Thumbnail120x120 from "../thumbnail.jpg"

function Footer() {
  const showOverlayWindow = async () => {
    const overlayWindow = await getOverlayWindow()
    await overlayWindow.unminimize()
    await overlayWindow.show()
    await overlayWindow.setFocus()
  }

  return (
    <footer className="flex flex-col items-center w-full border-t bg-sidebar transition-[background-color,border-color]">
      <div className="flex items-center justify-center w-full p-3 pb-0 gap-3">
        <Typography affects={["tiny"]}>0:01</Typography>
        <Slider />
        <Typography affects={["tiny"]}>2:24</Typography>
      </div>
      <div className="flex flex-row items-center gap-3 p-3 w-full">
        <div className="flex items-center gap-3 truncate flex-1">
          <img src={Thumbnail120x120} className="size-20 object-cover rounded-md" />
          <div className="w-full truncate">
            <Marquee>
              <Typography variant="h6">Marisola - Remix</Typography>
            </Marquee>
            <Marquee>
              <Typography affects={["small", "muted"]}>
                Cris Mj, Duki, Nicki Nicole, Standly, Stars Music Chile
              </Typography>
            </Marquee>
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-none">
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              tooltip={{ children: "Enable shuffle", side: "top" }}
              variant="ghost"
              size="icon"
            >
              <Shuffle />
            </Button>
            <Button tooltip={{ children: "Previous", side: "top" }} variant="ghost" size="icon">
              <SkipBack />
            </Button>
            <Button
              className="rounded-full [&_svg]:size-5 w-11 h-11"
              tooltip={{ children: "Play", side: "top" }}
              size="icon"
            >
              <Play />
            </Button>
            <Button tooltip={{ children: "Next", side: "top" }} variant="ghost" size="icon">
              <SkipForward />
            </Button>
            <Button
              tooltip={{ children: "Enable repeat", side: "top" }}
              variant="ghost"
              size="icon"
            >
              <Repeat />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 truncate flex-1">
          <Button
            className="text-primary hover:text-primary"
            tooltip={{ children: "Devices", side: "top" }}
            variant="ghost"
            size="icon"
            onClick={showOverlayWindow}
          >
            <MonitorSpeaker />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button tooltip={{ children: "Volume", side: "top" }} variant="ghost" size="icon">
                <Volume1 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex items-center p-2 max-w-60">
              <Button
                tooltip={{ children: "Mute", side: "top" }}
                variant="ghost"
                size="icon"
                className="shrink-0"
              >
                <Volume1 />
              </Button>
              <Slider />
              <Typography affects={["bold", "tiny"]} className="ml-3 mr-2">
                15%
              </Typography>
            </PopoverContent>
          </Popover>
          <Button
            tooltip={{ children: "Open miniplayer", side: "top" }}
            variant="ghost"
            size="icon"
            onClick={showOverlayWindow}
          >
            <MonitorStop />
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
