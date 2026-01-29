import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { useToggleSongFavorite } from "@features/songs/hooks/useToggleSongFavorite"

import { Fade, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

const TrackInfo = () => {
  const { t } = useTranslation()

  const { isBelow } = useBreakpoint()
  const isCompact = isBelow("md")

  const currentTrack = usePlayerStore((state) => state.currentTrack)

  const toggleFavoriteMutation = useToggleSongFavorite()

  const handleToggleFavorite = () => {
    if (currentTrack?.id) {
      toggleFavoriteMutation.mutate({ id: currentTrack.id })
    }
  }

  const thumbnailSize = isCompact ? "size-14" : "size-24"
  const thumbnailPlaceholderSize = isCompact ? "size-5" : "size-8"

  return (
    <div className="flex h-full items-end gap-3 truncate">
      {currentTrack ? (
        <Fade>
          <Thumbnail
            placeholderIcon="Music"
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName={thumbnailSize}
            className={currentTrack?.thumbnail ? thumbnailSize : thumbnailPlaceholderSize}
          />
        </Fade>
      ) : (
        <div className={thumbnailSize} />
      )}
      <Fade show={!!currentTrack} className="w-full space-y-1 truncate">
        {!isCompact && (
          <IconButton
            name="Heart"
            isFilled={currentTrack?.isFavorite}
            tooltip={currentTrack?.isFavorite ? t("common.unfavorite") : t("common.favorite")}
            variant="text"
            className="shrink-0"
            disabled={!currentTrack || toggleFavoriteMutation.isPending}
            onClick={handleToggleFavorite}
          />
        )}
        <Marquee>
          <SafeLink to={`/songs/$id`} params={{ id: currentTrack?.id?.toString() }}>
            <Typography variant="h5">{currentTrack?.title}</Typography>
          </SafeLink>
        </Marquee>
        <Marquee>
          {currentTrack?.artist ? (
            currentTrack.artists.map((artist, index) => (
              <span key={artist.artistId}>
                <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                  <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                </SafeLink>
                {index < currentTrack.artists.length - 1 && (
                  <Typography affects={["muted", "small"]}>, </Typography>
                )}
              </span>
            ))
          ) : (
            <Typography affects={["muted", "small"]}>{t("common.unknownArtist")}</Typography>
          )}
        </Marquee>
      </Fade>
    </div>
  )
}

export { TrackInfo }
