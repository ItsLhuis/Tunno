import { useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { cn } from "@lib/utils"

import { SongActions } from "@features/songs/components"

import { Checkbox, Fade, Icon, Typography, type VirtualizedListController } from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type AlbumInfoSubHeaderProps = {
  list: VirtualizedListController<SongWithMainRelations> | null
  className?: string
}

const AlbumInfoSubHeader = ({ list, className }: AlbumInfoSubHeaderProps) => {
  const { t } = useTranslation()

  const { isBelow } = useBreakpoint()

  const showCheckboxColumn = !isBelow("sm")
  const showAlbumColumn = !isBelow("md")
  const showDateColumn = !isBelow("lg")
  const showDurationColumn = !isBelow("sm")

  const hasSelectedRows = list?.hasSelection ?? false
  const isAllSelected = list?.isAllSelected ?? false

  const gridTemplateColumns = useMemo(() => {
    const cols: string[] = []
    if (showCheckboxColumn) cols.push("24px")
    cols.push("60px", "1fr")
    if (showAlbumColumn) cols.push("1fr")
    if (showDateColumn) cols.push("0.5fr")
    if (showDurationColumn) cols.push("80px")
    cols.push("40px")
    return cols.join(" ")
  }, [showCheckboxColumn, showAlbumColumn, showDateColumn, showDurationColumn])

  return (
    <div
      className={cn(className, "grid w-full items-center gap-3 px-2 pb-2 text-sm font-medium")}
      style={{ gridTemplateColumns }}
    >
      {showCheckboxColumn && (
        <Checkbox
          className="ml-1"
          checked={isAllSelected ? true : hasSelectedRows ? "indeterminate" : false}
          onCheckedChange={(value) => {
            if (!list) return
            if (value) {
              list.selectAll()
            } else {
              list.clearSelection()
            }
          }}
        />
      )}
      <div className="flex items-center justify-center">
        <Typography affects={["small", "muted", "uppercase"]}>#</Typography>
      </div>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.title")}</Typography>
      {showAlbumColumn && (
        <Typography affects={["small", "muted", "uppercase"]}>{t("common.album")}</Typography>
      )}
      {showDateColumn && (
        <Typography affects={["small", "muted", "uppercase"]}>{t("common.added")}</Typography>
      )}
      {showDurationColumn && (
        <div className="flex items-center justify-center">
          <Icon name="Timer" className="text-muted-foreground" />
        </div>
      )}
      <div className="flex items-center justify-center">
        {list && (
          <Fade show={hasSelectedRows} unmountOnExit={false}>
            <SongActions list={list} />
          </Fade>
        )}
      </div>
    </div>
  )
}

export { AlbumInfoSubHeader }
