import { useTranslation } from "@repo/i18n"

import { IconButton } from "@components/ui"

const PlaybackControls = () => {
  const { t } = useTranslation()

  return (
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
  )
}

export { PlaybackControls }
