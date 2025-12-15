import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { Icon, Typography } from "@components/ui"

type SongInfoSubHeaderProps = {
  className?: string
}

const SongInfoSubHeader = ({ className }: SongInfoSubHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[60px_1fr_1fr_0.5fr_80px_40px] items-center gap-3 px-2 pb-2 text-sm font-medium"
      )}
    >
      <div className="flex items-center justify-center">
        <Typography affects={["small", "muted", "uppercase"]}>#</Typography>
      </div>
      <Typography className="text-muted-foreground text-sm font-medium">
        {t("common.title")}
      </Typography>
      <Typography className="text-muted-foreground text-sm font-medium">
        {t("common.album")}
      </Typography>
      <Typography className="text-muted-foreground text-sm font-medium">
        {t("common.added")}
      </Typography>
      <div className="flex items-center justify-center">
        <Icon name="Timer" className="text-muted-foreground" />
      </div>
    </div>
  )
}

export { SongInfoSubHeader }
