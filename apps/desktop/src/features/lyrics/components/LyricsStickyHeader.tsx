import { useTranslation } from "@repo/i18n"

import { Marquee, SafeLink, StickyHeader, Thumbnail, Typography } from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type LyricsStickyHeaderProps = {
  song: SongWithMainRelations
}

const LyricsStickyHeader = ({ song }: LyricsStickyHeaderProps) => {
  const { t } = useTranslation()

  return (
    <StickyHeader className="flex flex-col gap-6 pb-9">
      <Typography variant="h4" className="truncate">
        {t("lyrics.title")}
      </Typography>
      <div className="flex items-center gap-3">
        <Thumbnail placeholderIcon="Music" fileName={song.thumbnail} alt={song.name} />
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <SafeLink to="/songs/$id" params={{ id: song.id.toString() }}>
              <Typography className="truncate">{song.name}</Typography>
            </SafeLink>
          </Marquee>
          <Marquee>
            {song.artists.length > 0 ? (
              song.artists.map((artist, index) => (
                <span key={artist.artistId}>
                  <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                    <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                  </SafeLink>
                  {index < song.artists.length - 1 && (
                    <Typography affects={["muted", "small"]}>, </Typography>
                  )}
                </span>
              ))
            ) : (
              <Typography affects={["muted", "small"]}>{t("common.unknownArtist")}</Typography>
            )}
          </Marquee>
        </div>
      </div>
    </StickyHeader>
  )
}

export { LyricsStickyHeader }
