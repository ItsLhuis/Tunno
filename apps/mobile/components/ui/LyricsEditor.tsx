import { memo, useCallback, useEffect, useState } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { FlashList, type ListRenderItemInfo } from "@shopify/flash-list"

import { createStyleSheet, useBreakpoints, useStyles, viewStyle } from "@styles"

import { useTranslation } from "@repo/i18n"

import { formatTime, parseTime } from "@repo/utils"

import { Badge } from "@components/ui/Badge"
import { BottomSheetFlashList } from "@components/ui/BottomSheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@components/ui/Dialog"
import { IconButton } from "@components/ui/IconButton"
import { NumberInput } from "@components/ui/NumberInput"
import { Separator } from "@components/ui/Separator"
import { Text } from "@components/ui/Text"
import { TextInput } from "@components/ui/TextInput"

export type Lyric = {
  text: string
  startTime: number
}

export type LyricsEditorProps = {
  value?: Lyric[] | null
  onChange?: (data: Lyric[]) => void
  placeholder?: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  insideBottomSheet?: boolean
}

type LyricLineProps = {
  line: Lyric
  index: number
  minTime: number
  maxTime: number
  placeholder?: string
  onTextChange: (index: number, text: string) => void
  onTimeChange: (index: number, time: number) => void
  onRemove: (index: number) => void
  canRemove: boolean
  disabled?: boolean
  isSmallScreen?: boolean
}

const LyricLine = memo(function LyricLine({
  line,
  index,
  minTime,
  maxTime,
  placeholder,
  onTextChange,
  onTimeChange,
  onRemove,
  canRemove,
  disabled,
  isSmallScreen = false
}: LyricLineProps) {
  const styles = useStyles(lyricLineStyles)

  const handleTimeChange = useCallback(
    (val: number | undefined) => {
      onTimeChange(index, Math.max(0, val ?? 0))
    },
    [index, onTimeChange]
  )

  const handleTextChange = useCallback(
    (text: string) => {
      onTextChange(index, text)
    },
    [index, onTextChange]
  )

  const handleRemove = useCallback(() => {
    onRemove(index)
  }, [index, onRemove])

  return (
    <View style={styles.container(index, isSmallScreen)}>
      <View style={styles.inputsRow(isSmallScreen)}>
        <NumberInput
          min={Math.max(0, minTime)}
          max={maxTime}
          step={1}
          value={line.startTime}
          onChange={handleTimeChange}
          format={formatTime}
          parse={parseTime}
          disabled={disabled}
          style={styles.timeInput(isSmallScreen)}
        />
        <TextInput
          placeholder={placeholder}
          value={line.text}
          onChangeText={handleTextChange}
          style={styles.textInput}
          disabled={disabled}
        />
      </View>
      <IconButton
        name="X"
        variant="ghost"
        onPress={handleRemove}
        disabled={!canRemove || disabled}
      />
    </View>
  )
})

const LyricsEditor = ({
  value,
  onChange,
  placeholder,
  style,
  disabled,
  insideBottomSheet = false
}: LyricsEditorProps) => {
  const styles = useStyles(lyricsEditorStyles)

  const breakpoints = useBreakpoints()

  const { t } = useTranslation()

  const isSmallScreen = !breakpoints.sm

  const [syncedLines, setSyncedLines] = useState<Lyric[]>(() => (Array.isArray(value) ? value : []))

  useEffect(() => {
    if (Array.isArray(value) && JSON.stringify(value) !== JSON.stringify(syncedLines)) {
      setSyncedLines(value)
    }
  }, [value])

  useEffect(() => {
    onChange?.(syncedLines)
  }, [syncedLines, onChange])

  const handleSyncedLineChange = useCallback(
    (index: number, field: "text" | "startTime", newValue: string | number) => {
      setSyncedLines((prevLines) => {
        const newLines = [...prevLines]
        if (field === "startTime") {
          const sanitizedValue = Math.max(0, Number(newValue) || 0)
          newLines[index] = { ...newLines[index], startTime: sanitizedValue }
        } else {
          newLines[index] = { ...newLines[index], text: newValue as string }
        }
        return newLines
      })
    },
    []
  )

  const handleTextChange = useCallback(
    (index: number, text: string) => {
      handleSyncedLineChange(index, "text", text)
    },
    [handleSyncedLineChange]
  )

  const handleTimeChange = useCallback(
    (index: number, time: number) => {
      handleSyncedLineChange(index, "startTime", time)
    },
    [handleSyncedLineChange]
  )

  const addSyncedLine = useCallback(() => {
    setSyncedLines((prevLines) => {
      const lastTime = prevLines.length > 0 ? prevLines[prevLines.length - 1].startTime : 0
      const newLine = { text: "", startTime: lastTime + 5 }
      return [...prevLines, newLine]
    })
  }, [])

  const removeSyncedLine = useCallback((index: number) => {
    setSyncedLines((prevLines) => prevLines.filter((_, i) => i !== index))
  }, [])

  const keyExtractor = useCallback((_: Lyric, index: number) => index.toString(), [])

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Lyric>) => (
      <LyricLine
        line={item}
        index={index}
        minTime={Math.max(0, index > 0 ? syncedLines[index - 1].startTime + 1 : 0)}
        maxTime={index < syncedLines.length - 1 ? syncedLines[index + 1].startTime - 1 : Infinity}
        placeholder={placeholder}
        onTextChange={handleTextChange}
        onTimeChange={handleTimeChange}
        onRemove={removeSyncedLine}
        canRemove={true}
        disabled={disabled}
        isSmallScreen={isSmallScreen}
      />
    ),
    [
      syncedLines,
      placeholder,
      handleTextChange,
      handleTimeChange,
      removeSyncedLine,
      disabled,
      isSmallScreen
    ]
  )

  const renderPreviewItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Lyric>) => (
      <View style={styles.previewLine(index)}>
        <Text size="sm" color="mutedForeground" style={styles.previewTime}>
          [{formatTime(item.startTime)}]
        </Text>
        <Text size="sm" color="mutedForeground">
          -
        </Text>
        <Text size="sm" style={styles.previewText}>
          {item.text || "..."}
        </Text>
      </View>
    ),
    [styles]
  )

  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text color="mutedForeground">{t("form.messages.noLyrics")}</Text>
      </View>
    ),
    [styles, t]
  )

  const maxDuration = syncedLines.length > 0 ? Math.max(...syncedLines.map((l) => l.startTime)) : 0

  return (
    <View style={[styles.container, style]}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.badges}>
            <Badge variant="muted">
              <Text size="xs">{t("form.badges.lines", { count: syncedLines.length })}</Text>
            </Badge>
            <Badge variant="muted">
              <Text size="xs">
                {t("form.badges.duration", {
                  time: syncedLines.length > 0 ? formatTime(maxDuration) : "0:00"
                })}
              </Text>
            </Badge>
          </View>
          <View style={styles.actions}>
            <Dialog>
              <DialogTrigger variant="ghost" size="icon">
                <IconButton name="Eye" variant="ghost" />
              </DialogTrigger>
              <DialogContent enableDynamicSizing={false} snapPoints={["100%"]}>
                <DialogHeader>
                  <DialogTitle>{t("form.titles.lyricsPreview")}</DialogTitle>
                  <DialogDescription>{t("form.descriptions.lyricsPreview")}</DialogDescription>
                </DialogHeader>
                <View style={styles.previewContainer}>
                  <BottomSheetFlashList
                    data={syncedLines}
                    keyExtractor={keyExtractor}
                    renderItem={renderPreviewItem}
                    ListEmptyComponent={ListEmptyComponent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.previewList}
                  />
                </View>
              </DialogContent>
            </Dialog>
            <IconButton name="Plus" variant="ghost" onPress={addSyncedLine} disabled={disabled} />
          </View>
        </View>
        <Separator />
        <View style={styles.list}>
          {insideBottomSheet ? (
            <BottomSheetFlashList
              data={syncedLines}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListEmptyComponent={ListEmptyComponent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
            />
          ) : (
            <FlashList
              data={syncedLines}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListEmptyComponent={ListEmptyComponent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
            />
          )}
        </View>
      </View>
    </View>
  )
}

const lyricLineStyles = createStyleSheet(({ theme }) => {
  const itemSpacing = theme.space("sm")
  const gap = theme.space(2)

  return {
    container: (index: number, isSmallScreen: boolean) =>
      viewStyle({
        flexDirection: "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        gap,
        padding: theme.space(3),
        borderRadius: theme.radius(),
        borderWidth: theme.borderWidth(),
        borderColor: theme.colors.border,
        backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(50)),
        marginTop: index > 0 ? itemSpacing : 0
      }),
    inputsRow: (isSmallScreen: boolean) =>
      viewStyle({
        flex: 1,
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "stretch" : "center",
        gap
      }),
    timeInput: (isSmallScreen: boolean) =>
      viewStyle({
        width: isSmallScreen ? "100%" : "30%"
      }),
    textInput: {
      flex: 1
    }
  }
})

const lyricsEditorStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    width: "100%"
  },
  card: {
    borderRadius: theme.radius(),
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.border,
    overflow: "hidden"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.space(3),
    gap: theme.space(2)
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2),
    flexWrap: "wrap",
    flex: 1
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(1)
  },
  list: {
    height: 300
  },
  listContent: {
    flex: 1,
    padding: theme.space(3)
  },
  emptyContainer: {
    flex: 1,
    padding: theme.space(8),
    alignItems: "center",
    justifyContent: "center"
  },
  previewContainer: {
    flex: 1,
    borderRadius: theme.radius(),
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.border,
    margin: theme.space(6),
    marginBottom: runtime.insets.bottom + theme.space(6)
  },
  previewList: {
    flex: 1,
    padding: theme.space(3)
  },
  previewLine: (index: number) =>
    viewStyle({
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.space(2),
      marginTop: index > 0 ? theme.space("sm") : 0
    }),
  previewTime: {
    flexShrink: 0
  },
  previewText: {
    flex: 1,
    flexWrap: "wrap"
  }
}))

export { LyricsEditor }
