import { useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { cn } from "@lib/utils"

import { ArtistActions } from "../ArtistActions"

import { Checkbox, Fade, Typography, type VirtualizedListController } from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistsListSubHeaderProps = {
  list: VirtualizedListController<Artist>
  className?: string
}

const ArtistsListSubHeader = ({ list, className }: ArtistsListSubHeaderProps) => {
  const { t } = useTranslation()

  const { isBelow } = useBreakpoint()

  const showCheckboxColumn = !isBelow("sm")
  const showPlayCountColumn = !isBelow("md")
  const showLastPlayedColumn = !isBelow("lg")
  const showDateColumn = !isBelow("xl")

  const hasSelectedRows = list.hasSelection

  const gridTemplateColumns = useMemo(() => {
    const cols: string[] = []
    if (showCheckboxColumn) cols.push("24px")
    cols.push("60px", "1fr")
    if (showPlayCountColumn) cols.push("0.5fr")
    if (showLastPlayedColumn) cols.push("0.5fr")
    if (showDateColumn) cols.push("0.5fr")
    cols.push("40px")
    return cols.join(" ")
  }, [showCheckboxColumn, showPlayCountColumn, showLastPlayedColumn, showDateColumn])

  return (
    <div
      className={cn(className, "grid w-full items-center gap-3 px-2 pb-2 text-sm font-medium")}
      style={{ gridTemplateColumns }}
    >
      {showCheckboxColumn && (
        <Checkbox
          className="ml-1"
          checked={list.isAllSelected ? true : list.hasSelection ? "indeterminate" : false}
          onCheckedChange={(value) => (value ? list.selectAll() : list.clearSelection())}
        />
      )}
      <div className="flex items-center justify-center">
        <Typography affects={["small", "muted", "uppercase"]}>#</Typography>
      </div>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.title")}</Typography>
      {showPlayCountColumn && (
        <Typography affects={["small", "muted", "uppercase"]}>{t("common.totalPlays")}</Typography>
      )}
      {showLastPlayedColumn && (
        <Typography affects={["small", "muted", "uppercase"]}>{t("common.lastPlayed")}</Typography>
      )}
      {showDateColumn && (
        <Typography affects={["small", "muted", "uppercase"]}>{t("common.added")}</Typography>
      )}
      <div className="flex items-center justify-center">
        <Fade show={hasSelectedRows} unmountOnExit={false}>
          <ArtistActions list={list} />
        </Fade>
      </div>
    </div>
  )
}

export { ArtistsListSubHeader }
