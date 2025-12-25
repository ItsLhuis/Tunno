import { useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

import { SongItemList } from "@features/songs/components"

import { type OnRepeat } from "@repo/api"

import { OnRepeatSubHeader } from "./OnRepeatSubHeader"

type OnRepeatProps = {
  onRepeat: OnRepeat
}

const OnRepeat = ({ onRepeat }: OnRepeatProps) => {
  const { t } = useTranslation()

  const allSongIds = useMemo(() => onRepeat.songs.map((song) => song.id), [onRepeat.songs])

  if (onRepeat.totalSongs === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h1">{t("home.onRepeat.title", "On Repeat")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.onRepeat.description")}</Typography>
      </div>
      <OnRepeatSubHeader className="border-b" />
      <div className="flex flex-col gap-2">
        {onRepeat.songs.map((song, index) => (
          <SongItemList
            key={`${song.id}-${index}`}
            song={song}
            index={index}
            allSongIds={allSongIds}
            visibleColumns={["title", "album", "duration"]}
          />
        ))}
      </div>
    </section>
  )
}

export { OnRepeat }
