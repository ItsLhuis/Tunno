import { useTranslation } from "@repo/i18n"

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

  const hasSelectedRows = list.hasSelection

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[24px_60px_1fr_0.5fr_0.5fr_0.5fr_40px] items-center gap-3 px-2 pb-2 text-sm font-medium"
      )}
    >
      <Checkbox
        className="ml-1"
        checked={list.isAllSelected ? true : list.hasSelection ? "indeterminate" : false}
        onCheckedChange={(value) => (value ? list.selectAll() : list.clearSelection())}
      />
      <div className="flex items-center justify-center">
        <Typography affects={["small", "muted", "uppercase"]}>#</Typography>
      </div>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.title")}</Typography>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.totalPlays")}</Typography>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.lastPlayed")}</Typography>
      <Typography affects={["small", "muted", "uppercase"]}>{t("common.added")}</Typography>
      <div className="flex items-center justify-center">
        <Fade show={hasSelectedRows} unmountOnExit={false}>
          <ArtistActions list={list} />
        </Fade>
      </div>
    </div>
  )
}

export { ArtistsListSubHeader }
