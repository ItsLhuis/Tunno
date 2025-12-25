import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { Icon, IconButton, Typography } from "@components/ui"

type OnRepeatSubHeaderProps = {
  className?: string
}

const OnRepeatSubHeader = ({ className }: OnRepeatSubHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[60px_1fr_1fr_80px_40px] items-center gap-3 px-2 pb-2 text-sm font-medium"
      )}
    >
      <div className="flex items-center justify-center">
        <Typography affects={["small", "muted", "uppercase"]}>#</Typography>
      </div>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.title")}</Typography>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.album")}</Typography>
      <div className="flex items-center justify-center">
        <Icon name="Timer" className="text-muted-foreground" />
      </div>
      <div className="opacity-0">
        <IconButton name="MoreHorizontal" />
      </div>
    </div>
  )
}

export { OnRepeatSubHeader }
