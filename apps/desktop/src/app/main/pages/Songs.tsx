import { useRef } from "react"

import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal, Play, Timer } from "lucide-react"

import { motion } from "motion/react"

import { Button, Typography, VirtualizedTable } from "@components/ui"

import { Song } from "@utils/types"

const columns: ColumnDef<Song>[] = [
  {
    id: "play",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" onClick={() => console.log(row.original.id)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: row.getIsHovered() ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Play />
        </motion.div>
      </Button>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: { width: "100%", className: "truncate" },
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
    header: () => <Timer className="size-4"/>,
    meta: { width: "100%", className: "truncate" }
  },
  {
    id: "options",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon" onClick={() => console.log(row.original.id)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: row.getIsHovered() ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <MoreHorizontal />
        </motion.div>
      </Button>
    ),
    enableSorting: false,
    enableHiding: false
  }
]

const data: Song[] = Array.from({ length: 362 }, (_, index) => ({
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
      className="flex flex-1 flex-col items-start gap-2 p-3 sm:p-9 bg-background overflow-auto transition-all"
    >
      <div className="mt-2 sm:mt-0">
        <Typography variant="h1">Songs</Typography>
      </div>
      <VirtualizedTable
        parentRef={mainRef}
        columns={columns}
        data={data}
        estimateSize={30}
        rowClassName="grid grid-cols-[2.25rem_minmax(100px,_0.2fr)_1fr_1fr_1fr_minmax(50px,_0.2fr)_3.75rem] gap-4 w-full"
      />
    </main>
  )
}

export default Songs
