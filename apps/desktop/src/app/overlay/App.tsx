import { getCurrentWindow, currentMonitor, LogicalPosition } from "@tauri-apps/api/window"

import {
  Layout,
  GripHorizontal,
  X,
  Play,
  SkipBack,
  SkipForward,
  ArrowDownLeft,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

import {
  Button,
  Marquee,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Slider,
  Typography
} from "@components/ui"

import Thumbnail from "./thumbnail.jpg"

function App() {
  const moveToCorner = async (
    corner: "bottom-left" | "bottom-right" | "top-left" | "top-right"
  ) => {
    const monitor = await currentMonitor()

    if (monitor) {
      const { position, size, scaleFactor } = monitor

      const currentWindow = getCurrentWindow()

      const isCurrentWindowMaximized = await currentWindow.isMaximized()
      if (isCurrentWindowMaximized) await currentWindow.toggleMaximize()

      const windowSize = await currentWindow.outerSize()

      let newX = position.x
      let newY = position.y

      switch (corner) {
        case "bottom-left":
          newX = position.x + 10
          newY = position.y + size.height - windowSize.height - 10
          break
        case "bottom-right":
          newX = position.x + size.width - windowSize.width - 10
          newY = position.y + size.height - windowSize.height - 10
          break
        case "top-left":
          newX = position.x + 10
          newY = position.y + 10
          break
        case "top-right":
          newX = position.x + size.width - windowSize.width - 10
          newY = position.y + 10
          break
      }

      newX = Math.max(newX, position.x)
      newY = Math.max(newY, position.y)

      const newPosition = new LogicalPosition(
        Math.floor(newX / scaleFactor),
        Math.floor(newY / scaleFactor)
      )

      await getCurrentWindow().setPosition(newPosition)
    }
  }

  return (
    <main className="flex flex-col group h-dvh w-dvw relative bg-background transition-colors">
      <div className="flex flex-1 flex-col inset-0 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div data-tauri-drag-region className="flex justify-between items-center z-50 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-background/50">
                <Layout />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="grid grid-cols-2 gap-1">
              <DropdownMenuItem
                className="rounded-none rounded-tl-sm justify-center"
                onClick={() => moveToCorner("top-left")}
              >
                <ArrowUpLeft />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-none rounded-tr-sm justify-center"
                onClick={() => moveToCorner("top-right")}
              >
                <ArrowUpRight />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-none rounded-bl-sm justify-center"
                onClick={() => moveToCorner("bottom-left")}
              >
                <ArrowDownLeft />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-none rounded-br-sm justify-center"
                onClick={() => moveToCorner("bottom-left")}
              >
                <ArrowDownRight />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div data-tauri-drag-region className="cursor-grab active:cursor-grabbing p-2">
            <GripHorizontal data-tauri-drag-region size={20} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-background/50"
            onClick={() => getCurrentWindow().hide()}
          >
            <X />
          </Button>
        </div>
        <div className="absolute flex flex-col h-full w-full">
          <div className="absolute flex h-full w-full items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
            >
              <SkipBack />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
            >
              <Play />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
            >
              <SkipForward />
            </Button>
          </div>
          <div className="flex flex-col gap-3 mt-auto py-4">
            <Marquee className="px-4">
              <Typography variant="h6">Marisola - Remix</Typography>
            </Marquee>
            <div className="flex items-center justify-center gap-2 px-4">
              <Typography affects={["tiny"]}>0:01</Typography>
              <Slider />
              <Typography affects={["tiny"]}>2:24</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex flex-col items-center justify-center">
        <img src={Thumbnail} className="absolute inset-0 w-full h-full object-cover z-10 blur-xl" />
        <img
          src={Thumbnail}
          className="z-20 w-[70%] h-[70%] max-w-[800px] max-h-[800px] rounded-lg object-cover"
        />
      </div>
    </main>
  )
}

export default App
