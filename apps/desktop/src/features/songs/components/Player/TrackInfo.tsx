import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"
import { useToggleSongFavorite } from "../../hooks/useToggleSongFavorite"

import { cn } from "@lib/utils"

import { Button, Fade, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

const TrackInfo = () => {
  const { t } = useTranslation()

  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  const toggleFavoriteMutation = useToggleSongFavorite()

  const handleToggleFavorite = () => {
    if (currentTrack?.id) {
      toggleFavoriteMutation.mutate({ id: currentTrack.id })
    }
  }

  return (
    <div className="flex h-full items-center gap-3 truncate">
      {currentTrack ? (
        <Fade>
          <Thumbnail
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName="size-24 border border-muted rounded-md"
            className={cn("object-cover", currentTrack?.thumbnail ? "size-24" : "size-8")}
          />
        </Fade>
      ) : (
        <div className="size-24" />
      )}
      <Fade show={!!currentTrack} className="w-full truncate">
        <IconButton
          name="Heart"
          isFilled={currentTrack?.isFavorite}
          tooltip={currentTrack?.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          className="shrink-0"
          disabled={!currentTrack || toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <Marquee>
          <Button variant="link" asChild>
            <SafeLink to={`/songs/$id`} params={{ id: currentTrack?.id?.toString() }}>
              <Typography variant="h6">{currentTrack?.title}</Typography>
            </SafeLink>
          </Button>
        </Marquee>
        <Marquee>
          {currentTrack?.artist ? (
            <Typography affects={["muted"]}>{currentTrack?.artist}</Typography>
          ) : (
            <Typography affects={["muted"]}>{t("common.unknown")}</Typography>
          )}
        </Marquee>
      </Fade>
    </div>
  )
}

export { TrackInfo }
