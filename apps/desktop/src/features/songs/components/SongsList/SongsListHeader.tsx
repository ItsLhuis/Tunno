import { Fragment } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { cn } from "@lib/utils"

import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Fade,
  Icon,
  IconButton,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type SongWithRelations } from "@repo/api"

type SongsListHeaderProps = {
  list: VirtualizedListController<SongWithRelations>
  className?: string
}

export const SongsListHeader = ({ list, className }: SongsListHeaderProps) => {
  const { t } = useTranslation()

  const { loadTracks, play } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play
    }))
  )

  const hasSelectedRows = list.hasSelection
  const selectedSongs = list.data.filter((song) => list.selectedIds[song.id.toString()])

  const handlePlaySelected = async () => {
    if (selectedSongs.length > 0) {
      await loadTracks(selectedSongs, 0)
      await play()
    }
  }

  return (
    <div
      className={cn(
        className,
        "grid w-full grid-cols-[24px_24px_1fr_1fr_0.5fr_80px_40px] items-center gap-6 px-2 pb-2 text-sm font-medium"
      )}
    >
      <div className="flex items-center justify-center">
        <Checkbox
          checked={list.isAllSelected ? true : list.hasSelection ? "indeterminate" : false}
          onCheckedChange={(value) => (value ? list.selectAll() : list.clearSelection())}
          aria-label="Select all"
        />
      </div>
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
        <Fade show={hasSelectedRows} unmountOnExit={false}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton name="MoreHorizontal" variant="ghost" disabled={!hasSelectedRows} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{t("common.playback")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={handlePlaySelected}>
                <Icon name="Play" />
                {t("common.play")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Forward" />
                {t("common.playNext")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon name="Plus" />
                  {t("common.addTo")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Icon name="ListVideo" />
                    {t("common.queue")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Plus" />
                    {t("common.playlist")}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {list.selectedCount === 1 && (
                <Fragment>
                  <DropdownMenuItem>
                    <Icon name="DiscAlbum" />
                    {t("common.goToAlbum")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="User" />
                    {t("common.goToArtist")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Edit" />
                    {t("form.buttons.update")}
                  </DropdownMenuItem>
                </Fragment>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </Fade>
      </div>
    </div>
  )
}
