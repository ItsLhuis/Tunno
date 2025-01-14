import { useRef } from "react"

import { ColumnDef } from "@tanstack/react-table"

import { Song } from "@utils/types"

import { Edit, Forward, ListVideo, MoreHorizontal, Play, Plus, Shuffle, Timer } from "lucide-react"

import { motion } from "motion/react"

import { Link } from "react-router-dom"

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  Marquee,
  Typography,
  VirtualizedTable,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@components/ui"

import Thumbnail120x120 from "../thumbnail120x120.jpg"

const columns: ColumnDef<Song>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    meta: { width: "100%" },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: "media",
    cell: ({ row }) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: row.getIsFocused() || row.getIsHovered() ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button size="icon" onClick={() => console.log(row.original.id)}>
          <Play />
        </Button>
      </motion.div>
    ),
    meta: { width: "100%" },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 truncate flex-1">
          <img src={Thumbnail120x120} className="size-10 object-cover rounded-md" />
          <div className="w-full truncate">
            <Marquee>
              <Button variant="link" asChild>
                <Link to="/">
                  <Typography>{row.getValue("title")}</Typography>
                </Link>
              </Button>
            </Marquee>
            <Marquee>
              <Button variant="link" asChild>
                <Link to="/">
                  <Typography affects="muted">{row.original.artist}</Typography>
                </Link>
              </Button>
            </Marquee>
          </div>
        </div>
      )
    },
    meta: { width: "100%", className: "truncate" },
    enableHiding: false
  },
  {
    accessorKey: "date",
    header: "Date",
    meta: { width: "100%", className: "truncate" }
  },
  {
    accessorKey: "duration",
    header: () => <Timer />,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Typography className="truncate">{row.getValue("duration")}</Typography>
      </div>
    ),
    meta: { width: "100%", className: "flex justify-center" }
  },
  {
    id: "options",
    cell: ({ row }) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: row.getIsFocused() || row.getIsHovered() ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button variant="ghost" size="icon" onClick={() => console.log(row.original.id)}>
          <MoreHorizontal />
        </Button>
      </motion.div>
    ),
    meta: { width: "100%", className: "truncate" },
    enableSorting: false,
    enableHiding: false
  }
]

const data: Song[] = Array.from({ length: 127 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `Song ${index + 1}`,
  artist: `Artist ${index + 1}`,
  date: new Date().toISOString(),
  duration: 3 * (index + 1)
}))

function Songs() {
  const mainRef = useRef<HTMLDivElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="relative flex-1 p-3 md:p-9 pt-0 md:pt-0 overflow-auto transition-[background-color,border-color,text-decoration-color,fill,stroke,padding]"
    >
      <VirtualizedTable
        parentRef={mainRef}
        header={{
          containerProps: {
            className:
              "flex flex-col sticky bg-background z-10 top-0 gap-6 pt-6 md:pt-9 hidden sm-h:flex transition-[background-color,border-color,text-decoration-color,fill,stroke,padding]"
          },
          children: (table) => {
            const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

            return (
              <div className="flex flex-col items-start gap-6">
                <Typography variant="h1">Songs</Typography>
                <div className="flex items-center w-full gap-3">
                  {!hasSelectedRows ? (
                    <motion.div
                      key="shuffle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button>
                        <Shuffle />
                        Shuffle and play
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="selected"
                      className="flex items-center justify-between gap-2 w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center shrink-0 gap-2">
                        <Checkbox
                          checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                          }
                          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                          aria-label="Select all"
                        />
                        <Typography>
                          {table.getSelectedRowModel().flatRows.length} songs selected
                        </Typography>
                        <Button
                          variant="outline"
                          onClick={() => table.toggleAllPageRowsSelected(false)}
                        >
                          Clear
                        </Button>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" className="ml-auto">
                            <MoreHorizontal />
                            <span className="sr-only">Selected songs options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="m-3 mt-0">
                          <DropdownMenuLabel>Playback</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Play />
                            Play
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Forward />
                            Play next
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Plus />
                              Add to
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <ListVideo />
                                Play queue
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Plus />
                                New playlist
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          {table.getSelectedRowModel().flatRows.length === 1 && (
                            <DropdownMenuItem>
                              <Edit />
                              Edit
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  )}
                </div>
              </div>
            )
          }
        }}
        columns={columns}
        data={data ?? []}
        estimateSize={70}
        rowGridCols={["2.5rem", "3.75rem", "1fr", "0.5fr", "minmax(50px,0.2fr)", "3.75rem"]}
        rowClassName="gap-1 w-full"
      />
    </main>
  )
}

export default Songs
