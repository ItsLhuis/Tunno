import { useCallback, useMemo, useRef } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import {
  Button,
  Fade,
  Icon,
  IconButton,
  NotFound,
  ScrollArea,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Typography,
  VirtualizedList
} from "@components/ui"

import { SongItem } from "../SongItem"

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

const QueueSheet = () => {
  const { t } = useTranslation()

  const scrollRef = useRef<HTMLDivElement>(null)

  const { queueIds, currentTrackIndex, cachedSongs, clearQueue } = usePlayerStore(
    useShallow((state) => ({
      queueIds: state.queueIds,
      currentTrackIndex: state.currentTrackIndex,
      cachedSongs: state.cachedSongs,
      clearQueue: state.clearQueue
    }))
  )

  const queueSongs = useMemo(() => {
    if (!queueIds.length || !cachedSongs.size) return []
    return queueIds
      .map((id, originalIndex) => {
        const song = cachedSongs.get(id)
        return song ? { song, originalIndex } : null
      })
      .filter((item): item is QueueSongItem => item !== null)
  }, [queueIds, cachedSongs])

  const totalInQueue = queueIds.length
  const loadedCount = queueSongs.length

  const currentSong = useMemo(() => {
    if (currentTrackIndex === null || !queueSongs.length) return null
    return queueSongs.find((item) => item.originalIndex === currentTrackIndex) || null
  }, [currentTrackIndex, queueSongs])

  const upcomingSongs = useMemo(() => {
    if (currentTrackIndex === null) return queueSongs
    return queueSongs.filter((item) => item.originalIndex > currentTrackIndex)
  }, [currentTrackIndex, queueSongs])

  const previousSongs = useMemo(() => {
    if (currentTrackIndex === null || currentTrackIndex === 0) return []
    return queueSongs.filter((item) => item.originalIndex < currentTrackIndex)
  }, [currentTrackIndex, queueSongs])

  const queueListItems = useMemo(() => {
    const items: QueueListItem[] = []

    if (currentSong && currentTrackIndex !== null) {
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
      upcomingSongs.forEach((item) => {
        items.push({
          type: "song",
          song: item.song,
          originalIndex: item.originalIndex
        })
      })
    }

    if (previousSongs.length > 0) {
      items.push({
        type: "section",
        title: t("common.previous"),
        id: "previous"
      })
      previousSongs.forEach((item) => {
        items.push({
          type: "song",
          song: item.song,
          originalIndex: item.originalIndex
        })
      })
    }

    return items
  }, [currentSong, currentTrackIndex, upcomingSongs, previousSongs, t])

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
            {loadedCount === totalInQueue
              ? `${totalInQueue} ${totalInQueue === 1 ? t("common.song") : "songs"}`
              : t("common.loadedOfTotal", { loaded: loadedCount, total: totalInQueue })}
          </Typography>
        </SheetHeader>
        <Separator />
        <ScrollArea ref={scrollRef} className="h-full">
          <Fade key={String(queueSongs.length === 0)} className="h-full">
            {queueSongs.length === 0 ? (
              <NotFound />
            ) : (
              <div className="py-6">
                <VirtualizedList
                  data={queueListItems}
                  keyExtractor={(item) =>
                    item.type === "section" ? item.id : `${item.song.id}-${item.originalIndex}`
                  }
                  estimateItemHeight={70}
                  gap={8}
                  containerClassName="px-6"
                  scrollRef={scrollRef}
                  renderItem={({ item }) => {
                    if (item.type === "section") {
                      return <Typography affects={["small", "muted"]}>{item.title}</Typography>
                    }
                    return (
                      <SongItem
                        song={item.song}
                        variant="list"
                        allSongIds={queueIds}
                        visibleColumns={["title"]}
                        queueIndex={item.originalIndex}
                      />
                    )
                  }}
                />
              </div>
            )}
          </Fade>
        </ScrollArea>
        {queueSongs.length > 0 && (
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
