import { useCallback, useMemo, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { formatNumber } from "@repo/utils"

import {
  AnimatedIconButton,
  Button,
  Fade,
  NotFound,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetLegendList,
  SheetTitle,
  SheetTrigger,
  Text
} from "@components/ui"

import { SongItemList } from "@features/songs/components/SongItem"

import { type SongWithMainRelations } from "@repo/api"

type SectionType = "current" | "upcoming" | "previous"

type SectionHeader = {
  type: "header"
  section: SectionType
}

type QueueSongItem = {
  type: "song"
  song: SongWithMainRelations
  originalIndex: number
  section: SectionType
}

type QueueListItem = SectionHeader | QueueSongItem

const MAX_UPCOMING_SONGS = 100
const MAX_PREVIOUS_SONGS = 100

const QueueSheet = () => {
  const styles = useStyles(queueSheetStyles)

  const { t } = useTranslation()

  const { queueIds, currentTrackIndex, cachedSongs, clearQueue } = usePlayerStore(
    useShallow((state) => ({
      queueIds: state.queueIds,
      currentTrackIndex: state.currentTrackIndex,
      cachedSongs: state.cachedSongs,
      clearQueue: state.clearQueue
    }))
  )

  const { listItems, songCount } = useMemo(() => {
    if (queueIds.length === 0 || cachedSongs.size === 0) {
      return { listItems: [], songCount: 0 }
    }

    const current: QueueSongItem[] = []
    const upcoming: QueueSongItem[] = []
    const previous: QueueSongItem[] = []

    if (currentTrackIndex === null) {
      for (let i = 0; i < queueIds.length && upcoming.length < MAX_UPCOMING_SONGS; i++) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          upcoming.push({ type: "song", song, originalIndex: i, section: "upcoming" })
        }
      }
    } else {
      const currentSongItem = cachedSongs.get(queueIds[currentTrackIndex])
      if (currentSongItem) {
        current.push({
          type: "song",
          song: currentSongItem,
          originalIndex: currentTrackIndex,
          section: "current"
        })
      }

      for (
        let i = currentTrackIndex + 1;
        i < queueIds.length && upcoming.length < MAX_UPCOMING_SONGS;
        i++
      ) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          upcoming.push({ type: "song", song, originalIndex: i, section: "upcoming" })
        }
      }

      for (let i = currentTrackIndex - 1; i >= 0 && previous.length < MAX_PREVIOUS_SONGS; i--) {
        const song = cachedSongs.get(queueIds[i])
        if (song) {
          previous.push({ type: "song", song, originalIndex: i, section: "previous" })
        }
      }
    }

    const items: QueueListItem[] = []
    const totalSongs = current.length + upcoming.length + previous.length

    if (current.length > 0) {
      items.push({ type: "header", section: "current" })
      items.push(...current)
    }

    if (upcoming.length > 0) {
      items.push({ type: "header", section: "upcoming" })
      items.push(...upcoming)
    }

    if (previous.length > 0) {
      items.push({ type: "header", section: "previous" })
      items.push(...previous)
    }

    return { listItems: items, songCount: totalSongs }
  }, [queueIds, cachedSongs, currentTrackIndex])

  const totalInQueue = queueIds.length

  const keyExtractor = useCallback((item: QueueListItem) => {
    if (item.type === "header") {
      return `header-${item.section}`
    }
    return `${item.song.id}-${item.originalIndex}`
  }, [])

  const getItemType = useCallback((item: QueueListItem) => {
    return item.type === "header" ? "sectionHeader" : "row"
  }, [])

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

  const renderItem = useCallback(
    ({ item, index }: { item: QueueListItem; index: number }): ReactElement => {
      if (item.type === "header") {
        return (
          <View style={index === 0 ? styles.sectionHeaderFirst : styles.sectionHeader}>
            <Text size="sm" color="mutedForeground">
              {getSectionTitle(item.section)}
            </Text>
          </View>
        )
      }

      const nextItem = listItems[index + 1]
      const isLastInSection = !nextItem || nextItem.type === "header"

      return (
        <View
          style={isLastInSection ? undefined : styles.itemContainer}
          onLayout={(e) => console.log("MenuItem height:", e.nativeEvent.layout.height)}
        >
          <SongItemList song={item.song} queueIndex={item.originalIndex} queuePlayback />
        </View>
      )
    },
    [styles, getSectionTitle, listItems]
  )

  const handleClearQueue = useCallback(async () => {
    await clearQueue()
  }, [clearQueue])

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
          <SheetLegendList
            data={listItems}
            keyExtractor={keyExtractor}
            getItemType={getItemType}
            ListEmptyComponent={<NotFound />}
            contentContainerStyle={styles.contentContainer}
            renderItem={renderItem}
            estimatedItemSize={56}
          />
          {songCount > 0 && (
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
  contentContainer: {
    flexGrow: 1,
    padding: theme.space("lg")
  },
  footer: {
    paddingBottom: theme.space("lg") + runtime.insets.bottom
  }
}))

export { QueueSheet }
