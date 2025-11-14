import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { SongActions } from "@features/songs/components"

import {
  Checkbox,
  Fade,
  Icon,
  IconButton,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import type { SongWithMainRelations } from "@repo/api"

type ArtistInfoSubHeaderProps = {
  list: VirtualizedListController<SongWithMainRelations>
  className?: string
}

const ArtistInfoSubHeader = ({ list, className }: ArtistInfoSubHeaderProps) => {
  const { t } = useTranslation()

  const hasSelectedRows = list.hasSelection

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[24px_40px_1fr_1fr_0.5fr_80px_40px] items-center gap-3 px-2 pb-2 text-sm font-medium"
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
      <div className="flex items-center justify-center">
        <Fade show={hasSelectedRows}>
          <SongActions list={list} />
        </Fade>
      </div>
    </div>
  )
}

export { ArtistInfoSubHeader }
