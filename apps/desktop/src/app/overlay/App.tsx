import { getCurrentWindow } from "@tauri-apps/api/window"

import { moveCurrentWindowToCorner } from "@tauri/window/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconButton,
  Image,
  Marquee,
  Slider,
  Typography
} from "@components/ui"

import Thumbnail from "@assets/thumbs/1.jpg"

function App() {
  return (
    <main className="flex flex-col group h-dvh w-dvw relative bg-background transition-colors">
      <div className="flex flex-1 flex-col inset-0 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div data-tauri-drag-region className="flex justify-between items-center z-50 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton name="Layout" variant="ghost" className="hover:bg-background/50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="grid grid-cols-2 gap-1">
              <DropdownMenuItem
                className="rounded-none rounded-tl-sm justify-center"
                onClick={() => moveCurrentWindowToCorner("top-left")}
              >
                <Icon name="ArrowUpLeft" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-none rounded-tr-sm justify-center"
                onClick={() => moveCurrentWindowToCorner("top-right")}
              >
                <Icon name="ArrowUpRight" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-none rounded-bl-sm justify-center"
                onClick={() => moveCurrentWindowToCorner("bottom-left")}
              >
                <Icon name="ArrowDownLeft" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-none rounded-br-sm justify-center"
                onClick={() => moveCurrentWindowToCorner("bottom-right")}
              >
                <Icon name="ArrowDownRight" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <IconButton
            variant="ghost"
            className="hover:bg-background/50"
            onClick={() => getCurrentWindow().hide()}
            name="X"
          />
        </div>
        <div className="absolute flex flex-col h-full w-full">
          <div className="absolute flex h-full w-full items-center justify-center">
            <IconButton
              variant="ghost"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
              name="SkipBack"
            />
            <IconButton
              variant="ghost"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
              name="Play"
            />
            <IconButton
              variant="ghost"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
              name="SkipForward"
            />
          </div>
          <div className="flex flex-col gap-3 mt-auto py-4">
            <Marquee className="px-4">
              <Typography variant="h6">Marisola - Remix</Typography>
            </Marquee>
            <div className="flex items-center justify-center gap-2 px-4">
              <Typography affects={["small"]}>0:01</Typography>
              <Slider />
              <Typography affects={["small"]}>2:24</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex flex-col items-center justify-center">
        <Image
          alt="Thumbnail"
          src={Thumbnail}
          containerClassName="!absolute inset-0 w-full h-full bg-background"
          className="w-full h-full object-cover z-10 blur-xl"
        />
        <Image
          alt="Thumbnail"
          src={Thumbnail}
          containerClassName="z-20 w-[70%] h-[70%] max-w-[600px] max-h-[600px] rounded-lg"
          className="h-full w-full object-cover"
        />
      </div>
    </main>
  )
}

export default App
