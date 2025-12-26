import { useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { cn } from "@lib/utils"

import { Icon, IconButton, Typography } from "@components/ui"

type OnRepeatSubHeaderProps = {
  className?: string
}

const OnRepeatSubHeader = ({ className }: OnRepeatSubHeaderProps) => {
  const { t } = useTranslation()

  const { isBelow } = useBreakpoint()

  const showAlbumColumn = !isBelow("md")
  const showDurationColumn = !isBelow("sm")

  const gridTemplateColumns = useMemo(() => {
    const cols: string[] = ["60px", "1fr"]
    if (showAlbumColumn) cols.push("1fr")
    if (showDurationColumn) cols.push("80px")
    cols.push("40px")
    return cols.join(" ")
  }, [showAlbumColumn, showDurationColumn])

  return (
    <div
      className={cn(className, "grid w-full items-center gap-3 px-2 pb-2 text-sm font-medium")}
      style={{ gridTemplateColumns }}
    >
      <div className="flex items-center justify-center">
        <Typography affects={["small", "muted", "uppercase"]}>#</Typography>
      </div>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.title")}</Typography>
      {showAlbumColumn && (
        <Typography affects={["small", "muted", "uppercase"]}>{t("common.album")}</Typography>
      )}
      {showDurationColumn && (
        <div className="flex items-center justify-center">
          <Icon name="Timer" className="text-muted-foreground" />
        </div>
      )}
      <div className="opacity-0">
        <IconButton name="MoreHorizontal" />
      </div>
    </div>
  )
}

export { OnRepeatSubHeader }
