import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { PlaylistActions } from "../PlaylistActions"

import {
  Checkbox,
  Fade,
  IconButton,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type Playlist } from "@repo/api"

type PlaylistsListSubHeaderProps = {
  list: VirtualizedListController<Playlist>
  className?: string
}

const PlaylistsListSubHeader = ({ list, className }: PlaylistsListSubHeaderProps) => {
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
          <PlaylistActions list={list} />
        </Fade>
      </div>
    </div>
  )
}

export { PlaylistsListSubHeader }
