import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { AlbumActions } from "../AlbumActions"

import {
  Checkbox,
  Fade,
  IconButton,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type Album } from "@repo/api"

type AlbumsListSubHeaderProps = {
  list: VirtualizedListController<Album>
  className?: string
}

const AlbumsListSubHeader = ({ list, className }: AlbumsListSubHeaderProps) => {
  const { t } = useTranslation()

  const hasSelectedRows = list.hasSelection

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[24px_40px_1fr_0.5fr_0.5fr_0.5fr_40px] items-center gap-6 px-2 pb-2 text-sm font-medium"
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
        {t("common.totalPlays")}
      </Typography>
      <Typography className="text-sm font-medium text-muted-foreground">
        {t("common.lastPlayed")}
      </Typography>
      <Typography className="text-sm font-medium text-muted-foreground">
        {t("common.added")}
      </Typography>
      <div className="flex items-center justify-center">
        <Fade show={hasSelectedRows}>
          <AlbumActions list={list} />
        </Fade>
      </div>
    </div>
  )
}

export { AlbumsListSubHeader }
