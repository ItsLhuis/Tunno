import { IconButton, Image, Marquee, Slider, Typography } from "@components/ui"

import Thumbnail from "@assets/thumbs/1.jpg"

function Footer() {
  return (
    <footer className="flex w-full flex-col items-center border-t bg-sidebar transition-[background-color,border-color]">
      <div className="flex w-full items-center justify-center gap-3 p-3 pb-0">
        <Typography affects={["small"]}>0:01</Typography>
        <Slider />
        <Typography affects={["small"]}>2:24</Typography>
      </div>
      <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center gap-3 p-3">
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
        <div className="mx-3 flex flex-col justify-center gap-3">
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
              className="h-11 w-11 rounded-full [&_svg]:size-5"
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
            variant="ghost"
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
