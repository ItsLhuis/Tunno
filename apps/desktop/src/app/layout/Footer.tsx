import { useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useSettingsStore } from "@stores/useSettingsStore"

import { IconButton, Image, Marquee, Slider, Typography } from "@components/ui"

import Thumbnail from "@assets/thumbs/1.jpg"

function Footer() {
  const { t } = useTranslation()

  const { volume, setVolume, isMuted, setIsMuted } = useSettingsStore()

  const [localVolume, setLocalVolume] = useState<number>(volume)

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
              tooltip={{ children: t("common.favorite"), side: "top" }}
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
              tooltip={{ children: t("common.enableShuffle"), side: "top" }}
              variant="ghost"
            />
            <IconButton
              name="SkipBack"
              tooltip={{ children: t("common.previous"), side: "top" }}
              variant="ghost"
            />
            <IconButton
              name="Play"
              className="h-11 w-11 rounded-full [&_svg]:size-5"
              tooltip={{ children: t("common.play"), side: "top" }}
            />
            <IconButton
              name="SkipForward"
              tooltip={{ children: t("common.next"), side: "top" }}
              variant="ghost"
            />
            <IconButton
              name="Repeat"
              tooltip={{ children: t("common.enableRepeat"), side: "top" }}
              variant="ghost"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 truncate">
          <div className="flex flex-[0_1_125px] items-center gap-2">
            <IconButton
              name={
                isMuted
                  ? "VolumeOff"
                  : volume === 0
                    ? "VolumeX"
                    : volume < 0.5
                      ? "Volume1"
                      : "Volume2"
              }
              tooltip={{
                children: isMuted || volume === 0 ? t("common.unmute") : t("common.mute"),
                side: "top"
              }}
              variant="ghost"
              className="shrink-0"
              onClick={() => setIsMuted(!isMuted)}
            />
            <Slider
              className="w-full"
              min={0}
              max={1}
              step={0.01}
              value={[localVolume]}
              formatTooltip={(value) => `${Math.round(value * 100)}%`}
              onValueChange={([v]) => {
                setLocalVolume(v)
              }}
              onValueCommit={([v]) => {
                setVolume(v)
                if (isMuted && v > 0) setIsMuted(false)
              }}
            />
          </div>
          <IconButton
            name="MonitorSpeaker"
            tooltip={{ children: t("common.devices"), side: "top" }}
            variant="ghost"
          />
          <IconButton
            name="ListMusic"
            tooltip={{ children: t("common.queue"), side: "top" }}
            variant="ghost"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
