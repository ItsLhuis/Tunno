import { useCallback, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { formatNumber } from "@repo/utils"

import {
  AsyncState,
  Button,
  Fade,
  Icon,
  IconButton,
  ScrollArea,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Typography
} from "@components/ui"

import { SongItem } from "@features/songs/components/SongItem"

import { type SongWithMainRelations } from "@repo/api"

type QueueSongItem = {
  song: SongWithMainRelations
  originalIndex: number
}

type SectionItem = {
  type: "section"
  title: string
  id: string
}

type SongItemType = {
  type: "song"
  song: SongWithMainRelations
  originalIndex: number
}

type QueueListItem = SectionItem | SongItemType

const MAX_UPCOMING_SONGS = 25
const MAX_PREVIOUS_SONGS = 25

const QueueSheet = () => {
  const { t } = useTranslation()

  const { queueIds, currentTrackIndex, cachedSongs, clearQueue } = usePlayerStore(
    useShallow((state) => ({
      queueIds: state.queueIds,
      currentTrackIndex: state.currentTrackIndex,
      cachedSongs: state.cachedSongs,
      clearQueue: state.clearQueue
    }))
  )

  const { currentSong, upcomingSongs, previousSongs } = useMemo(() => {
    if (queueIds.length === 0 || cachedSongs.size === 0) {
      return { currentSong: null, upcomingSongs: [], previousSongs: [] }
    }

    let current: QueueSongItem | null = null
    const upcoming: QueueSongItem[] = []
    const previous: QueueSongItem[] = []

    if (currentTrackIndex === null) {
      for (let i = 0; i < queueIds.length && upcoming.length < MAX_UPCOMING_SONGS; i++) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          upcoming.push({ song, originalIndex: i })
        }
      }
      return { currentSong: null, upcomingSongs: upcoming, previousSongs: [] }
    }

    const currentSongId = queueIds[currentTrackIndex]
    const currentSongData = cachedSongs.get(currentSongId)

    if (currentSongData) {
      current = { song: currentSongData, originalIndex: currentTrackIndex }
    }

    let upcomingCount = 0
    for (
      let i = currentTrackIndex + 1;
      i < queueIds.length && upcomingCount < MAX_UPCOMING_SONGS;
      i++
    ) {
      const song = cachedSongs.get(queueIds[i])
      if (song) {
        upcoming.push({ song, originalIndex: i })
        upcomingCount++
      }
    }

    let previousCount = 0
    for (let i = currentTrackIndex - 1; i >= 0 && previousCount < MAX_PREVIOUS_SONGS; i--) {
      const song = cachedSongs.get(queueIds[i])
      if (song) {
        previous.unshift({ song, originalIndex: i })
        previousCount++
      }
    }

    return {
      currentSong: current,
      upcomingSongs: upcoming,
      previousSongs: previous
    }
  }, [queueIds, cachedSongs, currentTrackIndex])

  const totalInQueue = queueIds.length

  const visibleCount = (currentSong ? 1 : 0) + upcomingSongs.length + previousSongs.length

  const isLoading = queueIds.length > 0 && cachedSongs.size === 0

  const queueListItems = useMemo(() => {
    const items: QueueListItem[] = []

    if (currentSong) {
      items.push({
        type: "section",
        title: t("common.nowPlaying"),
        id: "now-playing"
      })
      items.push({
        type: "song",
        song: currentSong.song,
        originalIndex: currentSong.originalIndex
      })
    }

    if (upcomingSongs.length > 0) {
      items.push({
        type: "section",
        title: t("common.upNext"),
        id: "up-next"
      })
      for (const item of upcomingSongs) {
        items.push({
          type: "song",
          song: item.song,
          originalIndex: item.originalIndex
        })
      }
    }

    if (previousSongs.length > 0) {
      items.push({
        type: "section",
        title: t("common.previous"),
        id: "previous"
      })
      for (const item of previousSongs) {
        items.push({
          type: "song",
          song: item.song,
          originalIndex: item.originalIndex
        })
      }
    }

    return items
  }, [currentSong, upcomingSongs, previousSongs, t])

  const handleClearQueue = useCallback(async () => {
    await clearQueue()
  }, [clearQueue])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton
          name="ListMusic"
          tooltip={t("common.queue")}
          variant="ghost"
          className="shrink-0"
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 p-0">
        <SheetHeader className="flex max-h-full flex-col items-start justify-between p-6">
          <SheetTitle>{t("common.queue")}</SheetTitle>
          <Typography affects={["small", "muted"]}>
            {visibleCount === totalInQueue
              ? t("common.songsPlayed", { count: totalInQueue })
              : t("common.showingOfTotal", {
                  showing: formatNumber(visibleCount),
                  total: formatNumber(totalInQueue)
                })}
          </Typography>
        </SheetHeader>
        <Separator />
        <ScrollArea className="h-full">
          <AsyncState data={queueListItems} isLoading={isLoading} className="h-full">
            {(items) => (
              <div className="flex flex-col gap-2 p-6">
                {items.map((item) => {
                  if (item.type === "section") {
                    return (
                      <Typography key={item.id} affects={["small", "muted"]} className="mt-2">
                        {item.title}
                      </Typography>
                    )
                  }
                  return (
                    <SongItem
                      key={`${item.song.id}-${item.originalIndex}`}
                      song={item.song}
                      variant="list"
                      allSongIds={queueIds}
                      visibleColumns={["title"]}
                      queueIndex={item.originalIndex}
                    />
                  )
                })}
              </div>
            )}
          </AsyncState>
        </ScrollArea>
        {visibleCount > 0 && (
          <Fade>
            <Separator />
            <SheetFooter className="p-6">
              <Button variant="outline" className="w-full" onClick={handleClearQueue}>
                <Icon name="Trash2" />
                {t("common.clear")}
              </Button>
            </SheetFooter>
          </Fade>
        )}
      </SheetContent>
    </Sheet>
  )
}

export { QueueSheet }
