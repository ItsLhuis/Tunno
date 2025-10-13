import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { Icon, IconButton, Typography } from "@components/ui"

type AlbumInfoSubHeaderProps = {
  className?: string
}

const AlbumInfoSubHeader = ({ className }: AlbumInfoSubHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[40px_1fr_1fr_0.5fr_80px_40px] items-center gap-6 px-2 pb-2 text-sm font-medium"
      )}
    >
      <div className="flex items-center justify-center">
        <IconButton name="Play" className="invisible" />
      </div>
      <Typography className="text-sm font-medium text-muted-foreground">
        {t("common.title")}
      </Typography>
      <Typography className="text-sm font-medium text-muted-foreground">
        {t("common.album")}
      </Typography>
      <Typography className="text-sm font-medium text-muted-foreground">
        {t("common.added")}
      </Typography>
      <div className="flex items-center justify-center">
        <Icon name="Timer" className="text-muted-foreground" />
      </div>
    </div>
  )
}

export { AlbumInfoSubHeader }
