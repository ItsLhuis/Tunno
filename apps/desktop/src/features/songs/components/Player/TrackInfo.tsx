import { useTranslation } from "@repo/i18n"

import { IconButton, Image, Marquee, Typography } from "@components/ui"

import Thumbnail from "@assets/thumbs/1.jpg"

const TrackInfo = () => {
  const { t } = useTranslation()

  return (
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
          tooltip={t("common.favorite")}
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
  )
}

export { TrackInfo }
