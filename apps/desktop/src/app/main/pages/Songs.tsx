import { useRef } from "react"

import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal, Play, Shuffle, Timer } from "lucide-react"

import { motion } from "motion/react"

import { Button, Checkbox, Typography, VirtualizedTable } from "@components/ui"

import { Song } from "@utils/types"

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
    meta: { width: "100%", className: "truncate" },
    enableHiding: false
  },
  {
    accessorKey: "artist",
    header: "Artist",
    meta: { width: "100%", className: "truncate" }
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

const data: Song[] = Array.from({ length: 372 }, (_, index) => ({
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
      className="relative flex-1 p-3 md:p-9 pt-0 md:pt-0 overflow-auto transition-all"
    >
      <VirtualizedTable
        parentRef={mainRef}
        header={{
          containerProps: {
            className:
              "flex flex-col sticky bg-background z-10 top-0 gap-6 pt-6 md:pt-9 hidden sm-h:flex transition-all"
          },
          children: (table) => {
            const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

            return (
              <div className="flex flex-col items-start gap-6">
                <Typography variant="h1">Songs</Typography>
                <div className="flex items-center gap-3">
                  <Button>
                    <Shuffle />
                    Shuffle and play
                  </Button>
                  {hasSelectedRows && ` ${table.getSelectedRowModel().flatRows.length} songs`}
                </div>
              </div>
            )
          }
        }}
        columns={columns}
        data={data ?? []}
        estimateSize={70}
        rowClassName="grid grid-cols-[2.5rem_3.75rem_1fr_1fr_0.5fr_minmax(50px,_0.2fr)_3.75rem] gap-3 w-full"
      />
    </main>
  )
}

export default Songs
