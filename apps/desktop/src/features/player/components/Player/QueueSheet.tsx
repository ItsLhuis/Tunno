import { useCallback, useMemo, useRef } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { formatNumber } from "@repo/utils"

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

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

import { SongItemList } from "@features/songs/components/SongItem"

import { type SongWithMainRelations } from "@repo/api"

type SectionType = "current" | "upcoming" | "previous"

type QueueSongItem = {
  song: SongWithMainRelations
  originalIndex: number
  section: SectionType
  displayIndex: number
}

const MAX_UPCOMING_SONGS = 50
const MAX_PREVIOUS_SONGS = 50

const QueueSheet = () => {
  const { t } = useTranslation()

  const { queueIds, currentTrackIndex, cachedSongs, clearQueue, moveInQueue } = usePlayerStore(
    useShallow((state) => ({
      queueIds: state.queueIds,
      currentTrackIndex: state.currentTrackIndex,
      cachedSongs: state.cachedSongs,
      clearQueue: state.clearQueue,
      moveInQueue: state.moveInQueue
    }))
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
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

  const sortableItems = useMemo(
    () => queueSongs.filter((item) => item.section === "upcoming"),
    [queueSongs]
  )

  const sortableIds = useMemo(
    () => sortableItems.map((item) => `${item.song.id}-${item.originalIndex}`),
    [sortableItems]
  )

  const itemsMap = useMemo(
    () => new Map(sortableItems.map((item) => [`${item.song.id}-${item.originalIndex}`, item])),
    [sortableItems]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (!over || active.id === over.id) return

      const activeItemData = itemsMap.get(String(active.id))
      const overItemData = itemsMap.get(String(over.id))

      if (!activeItemData || !overItemData) return

      moveInQueue(activeItemData.originalIndex, overItemData.originalIndex)
    },
    [moveInQueue, itemsMap]
  )

  const totalInQueue = queueIds.length
  const visibleCount = queueSongs.length
  const isLoading = queueIds.length > 0 && cachedSongs.size === 0

  const scrollRef = useRef<HTMLDivElement | null>(null)

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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2 p-6">
                    {songs.map((item, index) => {
                      const showSectionHeader =
                        index === 0 || songs[index - 1].section !== item.section

                      return (
                        <div
                          key={`${item.song.id}-${item.originalIndex}`}
                          className="flex flex-col gap-2"
                        >
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
                            sortableId={
                              item.section === "upcoming"
                                ? `${item.song.id}-${item.originalIndex}`
                                : undefined
                            }
                          />
                        </div>
                      )
                    })}
                  </div>
                </SortableContext>
              </DndContext>
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
