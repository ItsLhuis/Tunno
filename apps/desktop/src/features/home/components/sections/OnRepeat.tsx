import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

import { SongItem } from "@features/songs/components"

import { type OnRepeat } from "@repo/api"

type OnRepeatProps = {
  onRepeat: OnRepeat
}

const OnRepeat = ({ onRepeat }: OnRepeatProps) => {
  const { t } = useTranslation()

  if (onRepeat.totalSongs === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="mb-2 flex flex-col gap-1">
        <Typography variant="h1">{t("home.onRepeat.title", "On Repeat")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.onRepeat.description")}</Typography>
      </div>
      {onRepeat.songs.length > 0 && (
        <div className="flex flex-col gap-3">
          <SongItem song={onRepeat.songs[0]} variant="hero" />
          {onRepeat.songs.length > 1 && (
            <div className="flex flex-col gap-1">
              {onRepeat.songs.slice(1).map((song, index) => (
                <SongItem key={`${song.id}-${index}`} song={song} visibleColumns={["title"]} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export { OnRepeat }
