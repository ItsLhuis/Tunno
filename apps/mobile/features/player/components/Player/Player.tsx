import { useEffect, useRef } from "react"

import { View } from "react-native"

import { AnimatedScopedPalette, createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailUri } from "@hooks/useThumbnailUri"

import {
  AnimatedBackground,
  AnimatedIconButton,
  AnimatedText,
  type BottomSheetRef,
  Fade,
  Sheet,
  SheetContent,
  SheetScrollView
} from "@components/ui"

import { SongActions } from "@features/songs/components/SongActions"

import { PlaybackControls } from "./PlaybackControls"
import { PlaybackOptions } from "./PlaybackOptions"
import { PlaybackProgress } from "./PlaybackProgress"
import { TrackInfo } from "./TrackInfo"

const Player = () => {
  const styles = useStyles(playerStyles)

  const { t } = useTranslation()

  const sheetRef = useRef<BottomSheetRef>(null)

  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const setPlayerSheetRef = usePlayerStore((state) => state.setPlayerSheetRef)

  const thumbnailUri = useThumbnailUri({ fileName: currentTrack?.thumbnail })

  const { palette } = useImageColorAndPalette({ imageUri: thumbnailUri })

  const handleDismiss = () => {
    sheetRef.current?.dismiss()
  }

  useEffect(() => {
    setPlayerSheetRef(sheetRef.current)

    return () => {
      setPlayerSheetRef(null)
    }
  }, [setPlayerSheetRef])

  return (
    <Sheet ref={sheetRef}>
      <SheetContent
        topInset={0}
        handleStyle={styles.handle}
        enableDynamicSizing={false}
        snapPoints={["100%"]}
        backgroundComponent={AnimatedBackground}
      >
        <AnimatedScopedPalette palette={palette}>
          <AnimatedBackground style={styles.container}>
            <View style={styles.handleContainer}>
              <AnimatedIconButton
                name="ChevronDown"
                variant="text"
                animatedIconColor="foreground"
                iconSize="2xl"
                onPress={handleDismiss}
              />
              <AnimatedText weight="bold" fontStyle="uppercase">
                {t("common.nowPlaying")}
              </AnimatedText>
              <Fade show={!!currentTrack}>
                <SongActions songId={currentTrack?.id} stackBehavior="push">
                  <AnimatedIconButton
                    name="Ellipsis"
                    variant="text"
                    animatedIconColor="foreground"
                    iconSize="2xl"
                  />
                </SongActions>
              </Fade>
            </View>
            <SheetScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.topSection}>
                <TrackInfo />
                <PlaybackProgress />
              </View>
              <PlaybackControls />
              <PlaybackOptions />
            </SheetScrollView>
          </AnimatedBackground>
        </AnimatedScopedPalette>
      </SheetContent>
    </Sheet>
  )
}

const playerStyles = createStyleSheet(({ theme, runtime }) => ({
  handle: {
    display: "none"
  },
  container: {
    flex: 1,
    borderTopLeftRadius: theme.radius("2xl"),
    borderTopRightRadius: theme.radius("2xl"),
    paddingTop: runtime.insets.top
  },
  handleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.space("lg")
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.space("lg"),
    paddingBottom: theme.space("lg") + runtime.insets.bottom
  },
  topSection: {
    width: "100%",
    gap: theme.space("md")
  }
}))

export { Player }
