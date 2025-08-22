import { Fragment } from "react"

import { type TFunction } from "@repo/i18n"

import { ColumnDef } from "@tanstack/react-table"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { State } from "react-track-player-web"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

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

import { formatRelativeDate, formatTime } from "@repo/utils"

import { type SongWithRelations } from "@repo/api"

type ColumnsProps = {
  t: TFunction
  language: string
  songs: SongWithRelations[] | undefined
}

export const columns = ({ t, language, songs }: ColumnsProps): ColumnDef<SongWithRelations>[] => [
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
    cell: ({ row }) => {
      const song = row.original

      const { loadTracks, play, currentTrack, playbackState, isTrackLoading } = usePlayerStore(
        useShallow((state) => ({
          loadTracks: state.loadTracks,
          play: state.play,
          currentTrack: state.currentTrack,
          playbackState: state.playbackState,
          isTrackLoading: state.isTrackLoading
        }))
      )

      const handlePlaySong = async () => {
        if (!songs) return

        if (currentTrack) {
          if (currentTrack.id === song.id && playbackState === State.Playing) {
            await usePlayerStore.getState().pause()
            return
          }

          if (currentTrack.id === song.id && playbackState === State.Paused) {
            await play()
            return
          }
        }

        const index = row.index
        await loadTracks(songs, index)
        await play()
      }

      const isCurrentlyPlaying = currentTrack?.id === song.id && playbackState === State.Playing

      return (
        <div className="relative flex items-center justify-center">
          <div className="z-10 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
            <IconButton
              name={isCurrentlyPlaying ? "Pause" : "Play"}
              tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
              onClick={handlePlaySong}
              isLoading={isTrackLoading}
            />
          </div>
          <Fade show={isCurrentlyPlaying} className="absolute z-0 size-5">
            <Lottie animationData={PlayingLottie} className="group-hover:opacity-0" />
          </Fade>
        </div>
      )
    },
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
          <Thumbnail fileName={song.thumbnail} alt={song.name} />
          <div className="w-full truncate">
            <Marquee>
              <Button variant="link" asChild>
                <SafeLink>
                  <Typography className="truncate">{song.name}</Typography>
                </SafeLink>
              </Button>
            </Marquee>
            <Marquee>
              {song.artists.length > 0 ? (
                <Button variant="link" asChild>
                  <SafeLink to={`/artists`}>
                    <Typography className="truncate" affects={["muted", "small"]}>
                      {song.artists.map((artist) => artist.artist.name).join(", ")}
                    </Typography>
                  </SafeLink>
                </Button>
              ) : (
                <Typography className="truncate" affects={["muted", "small"]}>
                  Unkown artist
                </Typography>
              )}
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
    cell: ({ row }) => {
      const song = row.original

      return song.album ? (
        <Typography className="truncate">{song.album.name}</Typography>
      ) : (
        <Typography affects={["muted"]}>Unkown</Typography>
      )
    },
    meta: { headerText: t("common.album") }
  },
  {
    accessorKey: "date",
    header: t("common.date"),
    cell: ({ row }) => formatRelativeDate(row.getValue("date"), language, t),
    meta: { headerText: t("common.date") }
  },
  {
    accessorKey: "duration",
    header: () => <Icon name="Timer" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Typography className="truncate">{formatTime(row.getValue("duration"))}</Typography>
      </div>
    ),
    meta: { className: "flex justify-center", headerText: t("common.duration") }
  },
  {
    id: "options",
    header: ({ table }) => {
      const hasSelectedRows = table.getSelectedRowModel().flatRows.length > 0
      const selectedSongs = table.getSelectedRowModel().flatRows.map((row) => row.original)

      const { loadTracks, play } = usePlayerStore(
        useShallow((state) => ({
          loadTracks: state.loadTracks,
          play: state.play
        }))
      )

      const handlePlaySelected = async () => {
        if (selectedSongs.length > 0) {
          await loadTracks(selectedSongs, 0)
          await play()
        }
      }

      return (
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
