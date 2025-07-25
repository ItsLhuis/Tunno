import { useTranslation } from "@repo/i18n"

import { IconButton } from "@components/ui"

const PlaybackControls = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <IconButton name="Shuffle" tooltip={t("common.enableShuffle")} variant="ghost" />
      <IconButton name="SkipBack" tooltip={t("common.previous")} variant="ghost" />
      <IconButton
        name="Play"
        className="h-11 w-11 rounded-full [&_svg]:size-5"
        tooltip={t("common.play")}
      />
      <IconButton name="SkipForward" tooltip={t("common.next")} variant="ghost" />
      <IconButton name="Repeat" tooltip={t("common.enableRepeat")} variant="ghost" />
    </div>
  )
}

export { PlaybackControls }
