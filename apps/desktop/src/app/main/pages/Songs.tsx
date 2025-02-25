import { useRef } from "react"

import { ColumnDef } from "@tanstack/react-table"

import { Edit, Forward, ListVideo, MoreHorizontal, Play, Plus, Shuffle, Timer } from "lucide-react"

import { AnimatePresence, motion } from "motion/react"

import { Link } from "react-router-dom"

import {
  ScrollArea,
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

import Thumbnail120x120 from "../thumbnail.jpg"

type Song = {
  id: string
  title: string
  date: string
  duration: number
  artist: string
}

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
        transition={{ duration: 0.3 }}
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
          <img src={Thumbnail120x120} className="size-14 object-cover rounded-md" />
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
        transition={{ duration: 0.3 }}
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
    <ScrollArea ref={mainRef} className="relative flex-1 overflow-x-hidden">
      <VirtualizedTable
        parentRef={mainRef}
        className="p-3 md:p-9 pt-0 md:pt-0 transition-[background-color,padding]"
        header={{
          sticky: {
            tableHeaderProps: {
              className: "px-3 md:px-9 border-b transition-[background-color,border-color,padding]"
            },
            children: (table) => {
              const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

              return (
                <div className="flex items-center justify-between gap-3 p-3 pt-6 md:px-9 transition-[background-color,padding]">
                  <div className="flex items-center gap-3">
                    <Button
                      disabled={hasSelectedRows}
                      className="rounded-full [&_svg]:size-5 w-11 h-11"
                      tooltip={{ children: "Shuffle and play", side: "bottom" }}
                      size="icon"
                    >
                      <Shuffle />
                    </Button>
                    <Typography variant="h3">Songs</Typography>
                  </div>
                  <AnimatePresence>
                    {hasSelectedRows && (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography>
                          {table.getSelectedRowModel().flatRows.length} songs selected
                        </Typography>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="ml-auto">
                              <MoreHorizontal />
                              <span className="sr-only">Selected songs options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
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
                  </AnimatePresence>
                </div>
              )
            }
          },
          containerProps: {
            className:
              "flex flex-col px-3 md:px-9 gap-6 pt-6 md:pt-9 transition-[background-color,padding]"
          },
          children: (table) => {
            const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

            return (
              <div className="flex flex-col items-start gap-6">
                <Typography variant="h1">Songs</Typography>
                <div className="flex items-center w-full gap-3">
                  <motion.div
                    key="shuffle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button disabled={hasSelectedRows}>
                      <Shuffle />
                      Shuffle and play
                    </Button>
                  </motion.div>
                  {hasSelectedRows && (
                    <motion.div
                      key="selected"
                      className="flex items-center ml-auto gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography>
                        {table.getSelectedRowModel().flatRows.length} songs selected
                      </Typography>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" className="ml-auto">
                            <MoreHorizontal />
                            <span className="sr-only">Selected songs options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
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
    </ScrollArea>
  )
}

export default Songs
