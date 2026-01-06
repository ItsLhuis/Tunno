import { useCallback, useEffect, useMemo, useRef } from "react"

import { View } from "react-native"

import {
  createStyleSheet,
  durationTokens,
  imageStyle,
  spacingTokens,
  useRuntime,
  useStyles,
  viewStyle
} from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useToggleSongFavorite } from "@features/songs/hooks/useToggleSongFavorite"

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue
} from "react-native-reanimated"

import { scheduleOnRN } from "react-native-worklets"

import { Gesture, GestureDetector } from "react-native-gesture-handler"

import { AnimatedIconButton, AnimatedText, Thumbnail } from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type VisibleTrack = {
  song: SongWithMainRelations
  queueIndex: number
}

const ITEM_WIDTH_RATIO = 0.75
const ITEM_GAP = spacingTokens.lg
const SIDE_SCALE = 0.75
const SIDE_OPACITY = 1

const WINDOW_OFFSET = 4
const ANIMATION_DURATION = durationTokens[300]
const SWIPE_VELOCITY_THRESHOLD = 500
const SWIPE_DISTANCE_THRESHOLD = 0.25

type CarouselDimensions = {
  itemWidth: number
  snapInterval: number
  containerPadding: number
}

const calculateDimensions = (screenWidth: number, isSingleTrack: boolean): CarouselDimensions => {
  const itemWidth = isSingleTrack ? screenWidth - ITEM_GAP * 2 : screenWidth * ITEM_WIDTH_RATIO

  const snapInterval = itemWidth + ITEM_GAP
  const containerPadding = isSingleTrack ? ITEM_GAP : (screenWidth - itemWidth) / 2

  return { itemWidth, snapInterval, containerPadding }
}

type CarouselItemProps = {
  item: VisibleTrack
  visualIndex: number
  offsetX: SharedValue<number>
  dimensions: CarouselDimensions
  isSingleTrack: boolean
}

const CarouselItem = ({
  item,
  visualIndex,
  offsetX,
  dimensions,
  isSingleTrack
}: CarouselItemProps) => {
  const styles = useStyles(carouselItemStyles)

  const { itemWidth, snapInterval } = dimensions

  const animatedStyle = useAnimatedStyle(() => {
    if (isSingleTrack) {
      return {
        transform: [{ translateX: 0 }, { scale: 1 }],
        opacity: 1
      }
    }

    const itemCenter = visualIndex * snapInterval
    const distance = offsetX.value - itemCenter
    const normalizedDistance = Math.abs(distance) / snapInterval

    const scale = interpolate(normalizedDistance, [0, 1], [1, SIDE_SCALE], Extrapolation.CLAMP)

    const opacity = interpolate(normalizedDistance, [0, 1], [1, SIDE_OPACITY], Extrapolation.CLAMP)

    const scaleOffset = (itemWidth * (1 - scale)) / 2
    const translateX = distance > 0 ? scaleOffset : -scaleOffset

    return {
      transform: [{ translateX }, { scale }],
      opacity
    }
  })

  return (
    <Animated.View style={[styles.itemContainer(itemWidth), animatedStyle]}>
      <Thumbnail
        fileName={item.song.thumbnail}
        placeholderIcon="Music"
        containerStyle={styles.thumbnail(!!item.song.thumbnail)}
      />
    </Animated.View>
  )
}

const carouselItemStyles = createStyleSheet(({ theme }) => ({
  itemContainer: (width: number) => ({
    width,
    aspectRatio: 1,
    marginRight: ITEM_GAP
  }),
  thumbnail: (hasThumbnail: boolean) =>
    imageStyle({
      width: "100%",
      aspectRatio: 1,
      borderRadius: theme.radius(),
      ...(hasThumbnail && { borderWidth: 0 })
    })
}))

const TrackInfo = () => {
  const styles = useStyles(trackInfoStyles)

  const {
    dimensions: { width: screenWidth }
  } = useRuntime()

  const { t } = useTranslation()

  const offsetX = useSharedValue(0)
  const gestureStartOffset = useSharedValue(0)
  const isGestureActive = useSharedValue(false)
  const isInitialized = useRef(false)
  const lastSyncedQueueIndex = useRef<number | null>(null)

  const { currentTrack, queueIds, currentTrackIndex, cachedSongs, isQueueLoading, skipToTrack } =
    usePlayerStore(
      useShallow((state) => ({
        currentTrack: state.currentTrack,
        queueIds: state.queueIds,
        currentTrackIndex: state.currentTrackIndex,
        cachedSongs: state.cachedSongs,
        isQueueLoading: state.isQueueLoading,
        skipToTrack: state.skipToTrack
      }))
    )

  const toggleFavoriteMutation = useToggleSongFavorite()

  const handleToggleFavorite = async () => {
    if (currentTrack?.id) {
      await toggleFavoriteMutation.mutateAsync({ id: currentTrack.id })
    }
  }

  const { visibleTracks, currentVisualIndex } = useMemo(() => {
    if (currentTrackIndex === null || queueIds.length === 0) {
      return { visibleTracks: [], currentVisualIndex: 0 }
    }

    const items: VisibleTrack[] = []
    let currentIdx = -1

    for (let offset = -WINDOW_OFFSET; offset <= WINDOW_OFFSET; offset++) {
      const queueIdx = currentTrackIndex + offset

      if (queueIdx < 0 || queueIdx >= queueIds.length) {
        continue
      }

      const songId = queueIds[queueIdx]
      const song = cachedSongs.get(songId)

      if (song) {
        if (offset === 0) {
          currentIdx = items.length
        }

        items.push({
          song,
          queueIndex: queueIdx
        })
      }
    }

    if (currentIdx === -1 && items.length > 0) {
      currentIdx = Math.floor(items.length / 2)
    }

    return {
      visibleTracks: items,
      currentVisualIndex: Math.max(0, currentIdx)
    }
  }, [currentTrackIndex, queueIds, cachedSongs])

  const isSingleTrack = visibleTracks.length === 1

  const dimensions = useMemo(
    () => calculateDimensions(screenWidth, isSingleTrack),
    [screenWidth, isSingleTrack]
  )

  const { itemWidth, snapInterval, containerPadding } = dimensions

  const maxVisualIndex = Math.max(0, visibleTracks.length - 1)

  const handleTrackChange = useCallback(
    (visualIndex: number) => {
      const track = visibleTracks[visualIndex]

      if (!track) return

      if (track.queueIndex !== currentTrackIndex) {
        lastSyncedQueueIndex.current = track.queueIndex
        skipToTrack(track.queueIndex)
      }
    },
    [visibleTracks, currentTrackIndex, skipToTrack]
  )

  useEffect(() => {
    if (visibleTracks.length > 0 && !isInitialized.current) {
      const initialOffset = currentVisualIndex * snapInterval

      offsetX.value = initialOffset
      lastSyncedQueueIndex.current = currentTrackIndex
      isInitialized.current = true
    }
  }, [visibleTracks.length, currentVisualIndex, snapInterval, currentTrackIndex])

  useEffect(() => {
    if (
      isInitialized.current &&
      visibleTracks.length > 0 &&
      lastSyncedQueueIndex.current !== currentTrackIndex &&
      !isGestureActive.value
    ) {
      const targetOffset = currentVisualIndex * snapInterval

      offsetX.value = withTiming(targetOffset, { duration: ANIMATION_DURATION })
      lastSyncedQueueIndex.current = currentTrackIndex
    }
  }, [currentVisualIndex, visibleTracks.length, currentTrackIndex, snapInterval])

  useEffect(() => {
    if (queueIds.length === 0) {
      isInitialized.current = false
      lastSyncedQueueIndex.current = null
      offsetX.value = 0
    }
  }, [queueIds.length])

  const snapToIndex = useCallback(
    (targetIndex: number) => {
      "worklet"
      const clampedIndex = Math.max(0, Math.min(targetIndex, maxVisualIndex))
      const targetOffset = clampedIndex * snapInterval

      offsetX.value = withTiming(targetOffset, { duration: ANIMATION_DURATION }, (finished) => {
        if (finished) {
          scheduleOnRN(handleTrackChange, clampedIndex)
        }
      })
    },
    [maxVisualIndex, snapInterval, handleTrackChange]
  )

  const panGesture = Gesture.Pan()
    .enabled(!isQueueLoading && visibleTracks.length > 1)
    .activeOffsetX([-10, 10])
    .onStart(() => {
      "worklet"
      isGestureActive.value = true
      gestureStartOffset.value = offsetX.value
    })
    .onUpdate((event) => {
      "worklet"
      const newOffset = gestureStartOffset.value - event.translationX
      const maxOffset = maxVisualIndex * snapInterval
      const overscrollLimit = itemWidth * 0.2

      offsetX.value = Math.max(-overscrollLimit, Math.min(newOffset, maxOffset + overscrollLimit))
    })
    .onEnd((event) => {
      "worklet"
      isGestureActive.value = false

      const velocity = -event.velocityX
      const translation = -event.translationX

      const currentOffset = offsetX.value
      const nearestIndex = Math.round(currentOffset / snapInterval)

      let targetIndex = nearestIndex

      if (Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD) {
        targetIndex = velocity > 0 ? nearestIndex + 1 : nearestIndex - 1
      } else if (Math.abs(translation) > itemWidth * SWIPE_DISTANCE_THRESHOLD) {
        targetIndex = translation > 0 ? nearestIndex + 1 : nearestIndex - 1
      }

      targetIndex = Math.max(0, Math.min(targetIndex, maxVisualIndex))

      snapToIndex(targetIndex)
    })
    .onFinalize(() => {
      "worklet"
      isGestureActive.value = false
    })

  const carouselAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offsetX.value }]
  }))

  const artistsText =
    currentTrack?.artists && currentTrack.artists.length > 0
      ? currentTrack.artists.map((a) => a.artist.name).join(", ")
      : t("common.unknownArtist")

  const isFavorite = currentTrack?.isFavorite ?? false

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer(containerPadding)}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.carouselWrapper, carouselAnimatedStyle]}>
            {visibleTracks.map((item, index) => (
              <CarouselItem
                key={`${item.queueIndex}-${item.song.id}`}
                item={item}
                visualIndex={index}
                offsetX={offsetX}
                dimensions={dimensions}
                isSingleTrack={isSingleTrack}
              />
            ))}
          </Animated.View>
        </GestureDetector>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoContainer}>
          <AnimatedText size="xl" weight="semibold" numberOfLines={1}>
            {currentTrack?.title ?? t("common.noSongPlaying")}
          </AnimatedText>
          {currentTrack && (
            <AnimatedText animatedColor="mutedForeground" numberOfLines={1}>
              {artistsText}
            </AnimatedText>
          )}
        </View>
        <AnimatedIconButton
          name="Heart"
          variant="text"
          isFilled={isFavorite}
          animatedIconColor={isFavorite ? "primary" : "foreground"}
          iconSize="2xl"
          onPress={handleToggleFavorite}
          disabled={!currentTrack}
        />
      </View>
    </View>
  )
}

const trackInfoStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    width: "100%",
    alignItems: "center",
    gap: theme.space("lg")
  },
  carouselContainer: (padding: number) => {
    const verticalPadding = Math.max(theme.space("lg"), runtime.dimensions.height * 0.04)

    return viewStyle({
      width: "100%",
      paddingHorizontal: padding,
      paddingVertical: verticalPadding,
      overflow: "hidden"
    })
  },
  carouselWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm"),
    paddingHorizontal: theme.space("lg")
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { TrackInfo }
