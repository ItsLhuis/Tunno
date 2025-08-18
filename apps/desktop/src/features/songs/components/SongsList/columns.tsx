import { Fragment } from "react"

import { type TFunction } from "@repo/i18n"

import { formatRelativeDate } from "@repo/utils"

import { ColumnDef } from "@tanstack/react-table"

import {
  Button,
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
  Marquee,
  SafeLink,
  Thumbnail,
  Typography
} from "@components/ui"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

import { formatTime } from "@repo/utils"

import { type SongWithRelations } from "@repo/api"

export const columns = (t: TFunction, lang: string): ColumnDef<SongWithRelations>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: "media",
    header: () => <IconButton name="Play" className="invisible" />,
    cell: ({ row }) => (
      <div className="relative flex items-center justify-center">
        <div className="z-10 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <IconButton name="Play" onClick={() => console.log(row.original.id)} />
        </div>
        <Fade show={row.index === 0} className="absolute z-0 size-5">
          <Lottie animationData={PlayingLottie} className="group-hover:opacity-0" />
        </Fade>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { headerText: t("common.play") }
  },
  {
    accessorKey: "name",
    header: t("common.title"),
    cell: ({ row }) => {
      const song = row.original

      return (
        <div className="flex flex-1 items-center gap-3 truncate">
          <Thumbnail fileName={song.thumbnail} alt="thumbnail" />
          <div className="w-full truncate">
            <Marquee>
              <Button className="transition-none" variant="link" asChild>
                {/* <SafeLink to={`/songs/${song.id}`}> */}
                <SafeLink>
                  <Typography className="truncate transition-none">{song.name}</Typography>
                </SafeLink>
              </Button>
            </Marquee>
            <Marquee>
              <Button className="transition-none" variant="link" asChild>
                <SafeLink to={`/artists`}>
                  <Typography className="truncate transition-none" affects={["muted", "small"]}>
                    {song.artists.map((artist) => artist.artist.name).join(", ")}
                  </Typography>
                </SafeLink>
              </Button>
            </Marquee>
          </div>
        </div>
      )
    },
    enableHiding: false,
    meta: { headerText: t("common.title") }
  },
  {
    accessorKey: "album.name",
    header: t("common.album"),
    meta: { headerText: t("common.album") }
  },
  {
    accessorKey: "date",
    header: t("common.date"),
    cell: ({ row }) => formatRelativeDate(row.getValue("date"), lang, t),
    meta: { headerText: t("common.date") }
  },
  {
    accessorKey: "duration",
    header: () => <Icon name="Timer" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Typography className="truncate transition-none">
          {formatTime(row.getValue("duration"))}
        </Typography>
      </div>
    ),
    meta: { className: "flex justify-center", headerText: t("common.duration") }
  },
  {
    id: "options",
    header: ({ table }) => {
      const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

      return (
        <Fade show={hasSelectedRows} unmountOnExit={false}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton name="MoreHorizontal" variant="ghost" disabled={!hasSelectedRows} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{t("common.playback")}</DropdownMenuLabel>
              <DropdownMenuItem>
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
              {table.getSelectedRowModel().flatRows.length === 1 && (
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
      )
    },
    cell: ({ row }) => (
      <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        <IconButton
          name="MoreHorizontal"
          variant="ghost"
          onClick={() => console.log(row.original.id)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  }
]
