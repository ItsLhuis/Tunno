import { useCallback, useMemo, useRef } from "react"

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
  Typography,
  VirtualizedList
} from "@components/ui"

import { SongItemList } from "@features/songs/components/SongItem"

import { type SongWithMainRelations } from "@repo/api"

type SectionType = "current" | "upcoming" | "previous"

type QueueSongItem = {
  song: SongWithMainRelations
  originalIndex: number
  section: SectionType
  displayIndex: number
}

const MAX_UPCOMING_SONGS = 100
const MAX_PREVIOUS_SONGS = 100

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

  const queueSongs = useMemo(() => {
    if (queueIds.length === 0 || cachedSongs.size === 0) {
      return []
    }

    const current: QueueSongItem[] = []
    const upcoming: QueueSongItem[] = []
    const previous: QueueSongItem[] = []

    if (currentTrackIndex === null) {
      for (let i = 0; i < queueIds.length && upcoming.length < MAX_UPCOMING_SONGS; i++) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          upcoming.push({
            song,
            originalIndex: i,
            section: "upcoming",
            displayIndex: 0
          })
        }
      }
    } else {
      const currentSong = cachedSongs.get(queueIds[currentTrackIndex])
      if (currentSong) {
        current.push({
          song: currentSong,
          originalIndex: currentTrackIndex,
          section: "current",
          displayIndex: 0
        })
      }

      for (
        let i = currentTrackIndex + 1;
        i < queueIds.length && upcoming.length < MAX_UPCOMING_SONGS;
        i++
      ) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          upcoming.push({
            song,
            originalIndex: i,
            section: "upcoming",
            displayIndex: 0
          })
        }
      }

      for (let i = currentTrackIndex - 1; i >= 0 && previous.length < MAX_PREVIOUS_SONGS; i--) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          previous.push({
            song,
            originalIndex: i,
            section: "previous",
            displayIndex: 0
          })
        }
      }
    }

    const ordered = [...current, ...upcoming, ...previous]

    return ordered.map((item, index) => ({
      ...item,
      displayIndex: index
    }))
  }, [queueIds, cachedSongs, currentTrackIndex])

  const totalInQueue = queueIds.length
  const visibleCount = queueSongs.length
  const isLoading = queueIds.length > 0 && cachedSongs.size === 0

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const keyExtractor = useCallback(
    (item: QueueSongItem) => `${item.song.id}-${item.originalIndex}`,
    []
  )

  const getSectionTitle = useCallback(
    (section: SectionType): string => {
      switch (section) {
        case "current":
          return t("common.nowPlaying")
        case "upcoming":
          return t("common.upNext")
        case "previous":
          return t("common.previous")
      }
    },
    [t]
  )

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
        <ScrollArea ref={scrollRef} className="h-full">
          <AsyncState data={queueSongs} isLoading={isLoading} className="h-full">
            {(songs) => (
              <VirtualizedList
                data={songs}
                keyExtractor={keyExtractor}
                estimateItemHeight={70}
                gap={8}
                scrollRef={scrollRef}
                containerClassName="p-6"
                renderItem={({ item, index }) => {
                  const showSectionHeader = index === 0 || songs[index - 1].section !== item.section

                  return (
                    <div className="flex flex-col gap-2">
                      {showSectionHeader && (
                        <Typography affects={["small", "muted"]} className="mt-2 first:mt-0">
                          {getSectionTitle(item.section)}
                        </Typography>
                      )}
                      <SongItemList
                        song={item.song}
                        index={item.displayIndex}
                        visibleColumns={["title"]}
                        queueIndex={item.originalIndex}
                        queuePlayback
                      />
                    </div>
                  )
                }}
                ListEmptyComponent={() => (
                  <div className="flex h-full items-center justify-center py-8">
                    <Typography affects={["muted"]}>{t("common.noResultsFound")}</Typography>
                  </div>
                )}
              />
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
