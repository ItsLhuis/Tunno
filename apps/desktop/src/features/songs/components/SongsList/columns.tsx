import { TFunction } from "@repo/i18n"

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
  Icon,
  IconButton,
  Image,
  Marquee,
  SafeLink,
  Typography
} from "@components/ui"

import { motion } from "motion/react"

import { SongWithRelations } from "@repo/api"

export const columns = (t: TFunction): ColumnDef<SongWithRelations>[] => [
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
      <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        <IconButton name="Play" onClick={() => console.log(row.original.id)} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: t("common.title"),
    header: t("common.title"),
    cell: ({ row }) => {
      return (
        <div className="flex flex-1 items-center gap-3 truncate">
          <Image
            src={row.original.thumbnail ?? undefined}
            alt="thumbnail"
            containerClassName="border border-muted rounded-md"
            className="size-12 rounded-md object-cover"
          />
          <div className="w-full truncate">
            <Marquee>
              <Button className="transition-none" variant="link" asChild>
                <SafeLink to="/favorites">
                  <Typography className="transition-none">
                    {row.getValue(t("common.title"))}
                  </Typography>
                </SafeLink>
              </Button>
            </Marquee>
            <Marquee>
              <Button className="transition-none" variant="link" asChild>
                <SafeLink to="/">
                  <Typography className="transition-none" affects={["muted", "small"]}>
                    {row.original.artists.map((artist) => artist.artist.name).join(", ")}
                  </Typography>
                </SafeLink>
              </Button>
            </Marquee>
          </div>
        </div>
      )
    },
    enableHiding: false
  },
  {
    accessorKey: t("common.album"),
    header: t("common.album")
  },
  {
    accessorKey: t("common.date"),
    header: t("common.date"),
    cell: ({ row }) => formatRelativeDate(row.getValue(t("common.date")))
  },
  {
    accessorKey: t("common.duration"),
    header: () => <Icon name="Timer" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Typography className="truncate transition-none">
          {row.getValue(t("common.duration"))}
        </Typography>
      </div>
    ),
    meta: { className: "flex justify-center" }
  },
  {
    id: "options",
    header: ({ table }) => {
      const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: hasSelectedRows ? 1 : 0 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton name="MoreHorizontal" variant="ghost" disabled={!hasSelectedRows} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Playback</DropdownMenuLabel>
              <DropdownMenuItem>
                <Icon name="Play" />
                Play
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Forward" />
                Play next
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon name="Plus" />
                  Add to
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Icon name="ListVideo" />
                    Play queue
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Plus" />
                    New playlist
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {table.getSelectedRowModel().flatRows.length === 1 && (
                <DropdownMenuItem>
                  <Icon name="Edit" />
                  Edit
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
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
