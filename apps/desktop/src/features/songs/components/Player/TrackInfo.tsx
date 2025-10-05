import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useToggleSongFavorite } from "../../hooks/useToggleSongFavorite"

import { Fade, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

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
            placeholderIcon="Music"
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName="size-24 rounded-md"
            className={currentTrack?.thumbnail ? "size-24" : "size-8"}
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
          <SafeLink to={`/songs/$id`} params={{ id: currentTrack?.id?.toString() }}>
            <Typography variant="h6">{currentTrack?.title}</Typography>
          </SafeLink>
        </Marquee>
        <Marquee>
          {currentTrack?.artist ? (
            <Typography affects={["muted"]}>{currentTrack?.artist}</Typography>
          ) : (
            <Typography affects={["muted"]}>{t("common.unknownArtist")}</Typography>
          )}
        </Marquee>
      </Fade>
    </div>
  )
}

export { TrackInfo }
