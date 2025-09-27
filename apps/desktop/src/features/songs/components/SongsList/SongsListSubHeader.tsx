import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { SongActions } from "../SongActions"

import {
  Checkbox,
  Fade,
  Icon,
  IconButton,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type SongsListSubHeaderProps = {
  list: VirtualizedListController<SongWithMainRelations>
  className?: string
}

const SongsListSubHeader = ({ list, className }: SongsListSubHeaderProps) => {
  const { t } = useTranslation()

  const hasSelectedRows = list.hasSelection

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[24px_40px_1fr_1fr_0.5fr_80px_40px] items-center gap-6 px-2 pb-2 text-sm font-medium"
      )}
    >
      <Checkbox
        className="ml-1"
        checked={list.isAllSelected ? true : list.hasSelection ? "indeterminate" : false}
        onCheckedChange={(value) => (value ? list.selectAll() : list.clearSelection())}
      />
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
        {t("common.date")}
      </Typography>
      <div className="flex items-center justify-center">
        <Icon name="Timer" className="text-muted-foreground" />
      </div>
      <div className="flex items-center justify-center">
        <Fade show={hasSelectedRows}>
          <SongActions list={list} variant="dropdown" />
        </Fade>
      </div>
    </div>
  )
}

export { SongsListSubHeader }
