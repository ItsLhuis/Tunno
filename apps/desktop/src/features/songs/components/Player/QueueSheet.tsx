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

  const handleClearQueue = useCallback(async () => {
    await clearQueue()
  }, [clearQueue])

  const renderSection = (title: string, songs: QueueSongItem[]) => {
    if (songs.length === 0) return null

    return (
      <div className="space-y-2">
        <Typography affects={["small", "muted"]} className="px-6">
          {title}
        </Typography>
        <VirtualizedList
          data={songs}
          keyExtractor={(item) => `${item.song.id}-${item.originalIndex}`}
          estimateItemHeight={70}
          gap={4}
          containerClassName="px-6"
          scrollRef={scrollRef}
          renderItem={({ item }) => (
            <SongItem
              song={item.song}
              variant="list"
              allSongIds={queueIds}
              visibleColumns={["title"]}
              queueIndex={item.originalIndex}
            />
          )}
        />
      </div>
    )
  }

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
              <div className="space-y-6 py-6">
                {currentSong && currentTrackIndex !== null && (
                  <div className="space-y-2">
                    <Typography affects={["small", "muted"]} className="px-6">
                      {t("common.nowPlaying")}
                    </Typography>
                    <div className="px-6">
                      <SongItem
                        song={currentSong.song}
                        variant="list"
                        allSongIds={queueIds}
                        visibleColumns={["title"]}
                        queueIndex={currentSong.originalIndex}
                      />
                    </div>
                  </div>
                )}
                {upcomingSongs.length > 0 && renderSection(t("common.upNext"), upcomingSongs)}
                {previousSongs.length > 0 && renderSection(t("common.previous"), previousSongs)}
              </div>
            )}
          </Fade>
        </ScrollArea>
        {queueSongs.length > 0 && (
          <Fade>
            <Separator />
            <SheetFooter className="p-6">
              <Button variant="outline" className="w-full" onClick={handleClearQueue}>
                <Icon name="X" />
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
