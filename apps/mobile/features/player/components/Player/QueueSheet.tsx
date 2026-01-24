import { useCallback, useMemo, type ReactElement } from "react"

import { FlatList, View, type ListRenderItem } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { formatNumber } from "@repo/utils"

import { type DragEndParams, type RenderItemParams } from "react-native-draggable-flatlist"

import {
  AnimatedIconButton,
  Button,
  Fade,
  NotFound,
  Separator,
  Sheet,
  SheetContent,
  SheetDraggableFlatList,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Text
} from "@components/ui"

import { SongItemList } from "@features/songs/components/SongItem"

import { type SongWithMainRelations } from "@repo/api"

type QueueSongItem = {
  song: SongWithMainRelations
  originalIndex: number
}

const MAX_UPCOMING_SONGS = 25
const MAX_PREVIOUS_SONGS = 25

const QueueSheet = () => {
  const styles = useStyles(queueSheetStyles)

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

  const { currentSong, upcomingItems, previousItems } = useMemo(() => {
    if (queueIds.length === 0 || cachedSongs.size === 0) {
      return { currentSong: null, upcomingItems: [], previousItems: [] }
    }

    let currentSong: QueueSongItem | null = null
    const upcoming: QueueSongItem[] = []
    const previous: QueueSongItem[] = []

    if (currentTrackIndex === null) {
      for (let i = 0; i < queueIds.length && upcoming.length < MAX_UPCOMING_SONGS; i++) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          upcoming.push({ song, originalIndex: i })
        }
      }
    } else {
      const currentSongItem = cachedSongs.get(queueIds[currentTrackIndex])
      if (currentSongItem) {
        currentSong = {
          song: currentSongItem,
          originalIndex: currentTrackIndex
        }
      }

      for (
        let i = currentTrackIndex + 1;
        i < queueIds.length && upcoming.length < MAX_UPCOMING_SONGS;
        i++
      ) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          upcoming.push({ song, originalIndex: i })
        }
      }

      for (let i = currentTrackIndex - 1; i >= 0 && previous.length < MAX_PREVIOUS_SONGS; i--) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          previous.push({ song, originalIndex: i })
        }
      }
    }

    return { currentSong, upcomingItems: upcoming, previousItems: previous }
  }, [queueIds, cachedSongs, currentTrackIndex])

  const songCount = upcomingItems.length + previousItems.length + (currentSong ? 1 : 0)

  const totalInQueue = queueIds.length

  const keyExtractor = useCallback(
    (item: QueueSongItem) => `${item.song.id}-${item.originalIndex}`,
    []
  )

  const renderItem = useCallback(
    ({ item, drag, isActive, getIndex }: RenderItemParams<QueueSongItem>): ReactElement => {
      const index = getIndex() ?? 0
      const isLastInSection = index === upcomingItems.length - 1

      return (
        <View style={isLastInSection ? undefined : styles.itemContainer}>
          <SongItemList
            song={item.song}
            queueIndex={item.originalIndex}
            queuePlayback
            drag={drag}
            isActive={isActive}
          />
        </View>
      )
    },
    [upcomingItems.length]
  )

  const renderPreviousItem: ListRenderItem<QueueSongItem> = useCallback(
    ({ item, index }) => (
      <View style={index === previousItems.length - 1 ? undefined : styles.itemContainer}>
        <SongItemList song={item.song} queueIndex={item.originalIndex} queuePlayback />
      </View>
    ),
    [previousItems.length]
  )

  const handleDragEnd = useCallback(
    ({ from, to }: DragEndParams<QueueSongItem>) => {
      if (from === to) return

      const fromItem = upcomingItems[from]
      const toItem = upcomingItems[to]

      if (!fromItem || !toItem) return

      moveInQueue(fromItem.originalIndex, toItem.originalIndex)
    },
    [upcomingItems, moveInQueue]
  )

  const handleClearQueue = useCallback(async () => {
    await clearQueue()
  }, [clearQueue])

  const listHeaderComponent = useMemo(() => {
    if (!currentSong && upcomingItems.length === 0) return null

    return (
      <View>
        {currentSong && (
          <View style={styles.itemContainer}>
            <View style={styles.sectionHeaderFirst}>
              <Text size="sm" color="mutedForeground">
                {t("common.nowPlaying")}
              </Text>
            </View>
            <SongItemList
              song={currentSong.song}
              queueIndex={currentSong.originalIndex}
              queuePlayback
            />
          </View>
        )}
        {upcomingItems.length > 0 && (
          <View style={currentSong ? styles.sectionHeader : styles.sectionHeaderFirst}>
            <Text size="sm" color="mutedForeground">
              {t("common.upNext")}
            </Text>
          </View>
        )}
      </View>
    )
  }, [currentSong, upcomingItems.length, t])

  const listFooterComponent = useMemo(() => {
    if (previousItems.length === 0) return null

    return (
      <View>
        <View style={styles.sectionHeader}>
          <Text size="sm" color="mutedForeground">
            {t("common.previous")}
          </Text>
        </View>
        <FlatList
          data={previousItems}
          keyExtractor={keyExtractor}
          renderItem={renderPreviousItem}
          scrollEnabled={false}
        />
      </View>
    )
  }, [previousItems, styles, t, keyExtractor, renderPreviousItem])

  const hasContent = songCount > 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AnimatedIconButton
          name="ListMusic"
          variant="text"
          animatedIconColor="foreground"
          iconSize="2xl"
        />
      </SheetTrigger>
      <SheetContent enableDynamicSizing={false} snapPoints={["100%"]} stackBehavior="push">
        <View style={styles.sheetContainer}>
          <SheetHeader>
            <SheetTitle>{t("common.queue")}</SheetTitle>
            <Text size="sm" color="mutedForeground">
              {songCount === totalInQueue
                ? t("common.songsPlayed", { count: totalInQueue })
                : t("common.showingOfTotal", {
                    showing: formatNumber(songCount),
                    total: formatNumber(totalInQueue)
                  })}
            </Text>
          </SheetHeader>
          <Separator />
          <View style={styles.listContainer}>
            {hasContent ? (
              <SheetDraggableFlatList
                data={upcomingItems}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListHeaderComponent={listHeaderComponent}
                ListFooterComponent={listFooterComponent}
                contentContainerStyle={styles.contentContainer}
                onDragEnd={handleDragEnd}
              />
            ) : (
              <NotFound />
            )}
          </View>
          {hasContent && (
            <Fade style={styles.footer}>
              <Separator />
              <SheetFooter>
                <Button
                  title={t("common.clear")}
                  variant="outline"
                  leftIcon="Trash2"
                  onPress={handleClearQueue}
                />
              </SheetFooter>
            </Fade>
          )}
        </View>
      </SheetContent>
    </Sheet>
  )
}

const queueSheetStyles = createStyleSheet(({ theme, runtime }) => ({
  sheetContainer: {
    flex: 1
  },
  sectionHeader: {
    paddingTop: theme.space("lg"),
    paddingBottom: theme.space("sm")
  },
  sectionHeaderFirst: {
    paddingBottom: theme.space("sm")
  },
  itemContainer: {
    marginBottom: theme.space("md")
  },
  listContainer: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.space("lg")
  },
  footer: {
    paddingBottom: theme.space("lg") + runtime.insets.bottom
  }
}))

export { QueueSheet }
