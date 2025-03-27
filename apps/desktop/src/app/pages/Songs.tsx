import { useEffect, useMemo, useState } from "react"

import { useTranslation } from "@i18n/hooks"

import { debounce } from "lodash"

import { formatRelativeDate } from "@utils/format"

import { ColumnDef, Table } from "@tanstack/react-table"

import {
  Button,
  Checkbox,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Header,
  Icon,
  IconButton,
  Image,
  Marquee,
  SafeLink,
  SearchInput,
  StickyHeader,
  Typography,
  VirtualizedTableGrid
} from "@components/ui"

import { motion } from "motion/react"

import Thumbnail from "@assets/thumbs/1.jpg"

type Song = {
  id: string
  title: string
  album: string
  date: Date | string
  duration: number
  artist: string
}

const columns: ColumnDef<Song>[] = [
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
      <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        <IconButton name="Play" onClick={() => console.log(row.original.id)} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 truncate flex-1">
          <Image
            src={Thumbnail}
            alt="thumbnail"
            containerClassName="border border-muted rounded-md"
            className="size-12 object-cover rounded-md"
          />
          <div className="w-full truncate">
            <Marquee>
              <Button className="transition-none" variant="link" asChild>
                <SafeLink to="/favorites">
                  <Typography className="transition-none">{row.getValue("title")}</Typography>
                </SafeLink>
              </Button>
            </Marquee>
            <Marquee>
              <Button className="transition-none" variant="link" asChild>
                <SafeLink to="/">
                  <Typography className="transition-none" affects={["muted", "small"]}>
                    {row.original.artist}
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
    accessorKey: "album",
    header: "Album"
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatRelativeDate(row.getValue("date"))
  },
  {
    accessorKey: "duration",
    header: () => <Icon name="Timer" />,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Typography className="truncate transition-none">{row.getValue("duration")}</Typography>
      </div>
    ),
    meta: { className: "flex justify-center" }
  },
  {
    id: "options",
    header: ({ table }) => {
      const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasSelectedRows ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
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
      <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
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

const getRandomPastDate = () => {
  const now = Date.now()
  const pastTime = now - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 5)
  return new Date(pastTime)
}

const data: Song[] = Array.from({ length: 2012 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `Song ${index + 1}`,
  album: `Album ${index + 1}`,
  artist: `Artist ${index + 1}`,
  date: getRandomPastDate(),
  duration: 3 * (index + 1)
}))

const SearchComponent = ({ table }: { table: Table<Song> }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value) => table.setGlobalFilter(value), 300),
    [table]
  )

  useEffect(() => {
    debouncedSetGlobalFilter(searchTerm)
  }, [searchTerm, debouncedSetGlobalFilter])

  return (
    <SearchInput
      containerClassName="p-3 md:p-9 pb-0 md:pb-0 pt-3 md:pt-3 transition-[padding]"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1"
      renderRight={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Visibility</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  )
}

function Songs() {
  const { t } = useTranslation()

  return (
    <VirtualizedTableGrid
      HeaderComponent={(table: Table<Song>) => {
        const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

        return (
          <Header className="flex items-center gap-3">
            <IconButton
              name="Plus"
              className="[&_svg]:size-5"
              variant="ghost"
              tooltip={{ children: "Add song", side: "bottom" }}
            />
            <IconButton
              name="Shuffle"
              className="shrink-0 w-11 h-11 rounded-full [&_svg]:size-5"
              disabled={hasSelectedRows}
              tooltip={{ children: "Shuffle and play", side: "bottom" }}
            />
            <Typography variant="h1" className="truncate">
              {t("songs.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={(table: Table<Song>) => {
        const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0

        return (
          <StickyHeader className="flex items-center gap-3">
            <IconButton
              name="Plus"
              className="[&_svg]:size-5"
              variant="ghost"
              tooltip={{ children: "Add song", side: "bottom" }}
            />
            <IconButton
              name="Shuffle"
              variant="text"
              className="w-11 h-11 [&_svg]:size-5"
              disabled={hasSelectedRows}
              tooltip={{ children: "Shuffle and play", side: "bottom" }}
            />
            <Typography variant="h4" className="truncate">
              {t("songs.title")}
            </Typography>
          </StickyHeader>
        )
      }}
      ListHeaderComponent={(table) => <SearchComponent table={table} />}
      containerClassName="overflow-x-hidden"
      columns={columns}
      data={data ?? []}
      estimateSize={70}
      rowGridCols={["auto", "auto", "1fr", "1fr", "0.5fr", "minmax(50px,0.2fr)", "auto"]}
      rowContextMenuContent={() => {
        return (
          <ContextMenuContent>
            <ContextMenuItem inset>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset disabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                  Save Page As...
                  <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>
              Show Bookmarks Bar
              <ContextMenuShortcut className="ml-3">⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value="pedro">
              <ContextMenuLabel inset>People</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
              <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        )
      }}
    />
  )
}

export default Songs
