import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { SongActions } from "@features/songs/components"

import { Checkbox, Fade, Icon, Typography, type VirtualizedListController } from "@components/ui"

import type { SongWithMainRelations } from "@repo/api"

type ArtistInfoSubHeaderProps = {
  list: VirtualizedListController<SongWithMainRelations> | null
  className?: string
}

const ArtistInfoSubHeader = ({ list, className }: ArtistInfoSubHeaderProps) => {
  const { t } = useTranslation()

  const hasSelectedRows = list?.hasSelection ?? false
  const isAllSelected = list?.isAllSelected ?? false

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[24px_60px_1fr_1fr_0.5fr_80px_40px] items-center gap-3 px-2 pb-2 text-sm font-medium"
      )}
    >
      <Checkbox
        className="ml-1"
        checked={isAllSelected ? true : hasSelectedRows ? "indeterminate" : false}
        onCheckedChange={(value) => {
          if (!list) return
          value ? list.selectAll() : list.clearSelection()
        }}
      />
      <div className="flex items-center justify-center">
        <Typography affects={["small", "muted", "uppercase"]}>#</Typography>
      </div>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.title")}</Typography>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.album")}</Typography>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.added")}</Typography>
      <div className="flex items-center justify-center">
        <Icon name="Timer" className="text-muted-foreground" />
      </div>
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

export { ArtistInfoSubHeader }
