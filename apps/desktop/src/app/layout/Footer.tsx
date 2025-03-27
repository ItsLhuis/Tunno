import { IconButton, Image, Marquee, Slider, Typography } from "@components/ui"

import Thumbnail from "@assets/thumbs/1.jpg"

function Footer() {
  return (
    <footer className="flex flex-col items-center w-full border-t bg-sidebar transition-[background-color,border-color]">
      <div className="flex items-center justify-center w-full p-3 pb-0 gap-3">
        <Typography affects={["small"]}>0:01</Typography>
        <Slider />
        <Typography affects={["small"]}>2:24</Typography>
      </div>
      <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3 p-3 w-full">
        <div className="flex items-center gap-3 truncate">
          <Image
            src={Thumbnail}
            alt="Song thumbnail"
            containerClassName="border border-muted rounded-md"
            className="size-24 object-cover"
          />
          <div className="w-full truncate">
            <IconButton
              name="Heart"
              isFilled
              tooltip={{ children: "Favorite", side: "top" }}
              variant="text"
              className="shrink-0"
            />
            <Marquee>
              <Typography variant="h6">Marisola - Remix</Typography>
            </Marquee>
            <Marquee>
              <Typography affects={["muted"]}>
                Cris Mj, Duki, Nicki Nicole, Standly, Stars Music Chile
              </Typography>
            </Marquee>
          </div>
        </div>
        <div className="flex flex-col gap-3 mx-3 justify-center">
          <div className="flex flex-row items-center justify-center gap-2">
            <IconButton
              name="Shuffle"
              tooltip={{ children: "Enable shuffle", side: "top" }}
              variant="ghost"
            />
            <IconButton
              name="SkipBack"
              tooltip={{ children: "Previous", side: "top" }}
              variant="ghost"
            />
            <IconButton
              name="Play"
              className="rounded-full [&_svg]:size-5 w-11 h-11"
              tooltip={{ children: "Play", side: "top" }}
            />
            <IconButton
              name="SkipForward"
              tooltip={{ children: "Next", side: "top" }}
              variant="ghost"
            />
            <IconButton
              name="Repeat"
              tooltip={{ children: "Enable repeat", side: "top" }}
              variant="ghost"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 truncate">
          <div className="flex flex-[0_1_125px]">
            <IconButton
              name="Volume1"
              tooltip={{ children: "Mute", side: "top" }}
              variant="ghost"
              className="shrink-0"
            />
            <Slider className="w-full" />
          </div>
          <IconButton
            name="MonitorSpeaker"
            tooltip={{ children: "Devices", side: "top" }}
            variant="text"
          />
          <IconButton
            name="ListMusic"
            tooltip={{ children: "Queue", side: "top" }}
            variant="ghost"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
