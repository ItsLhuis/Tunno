"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { formatTime, parseTime } from "@repo/utils"

import { Badge } from "@components/ui/Badge"
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
import { ScrollArea } from "@components/ui/ScrollArea"
import { TextInput } from "@components/ui/TextInput"
import { Typography } from "@components/ui/Typography"
import { VirtualizedList } from "@components/ui/VirtualizedList"

import { type Lyric } from "@components/ui/LyricsReader/types"

export type LyricsEditorProps = {
  value?: Lyric[] | null
  onChange?: (data: Lyric[]) => void
  placeholder?: string
  className?: string
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
}

const LyricLine = memo(
  ({
    line,
    index,
    minTime,
    maxTime,
    placeholder,
    onTextChange,
    onTimeChange,
    onRemove,
    canRemove
  }: LyricLineProps) => {
    const { t } = useTranslation()

    return (
      <div className="flex items-center gap-3 rounded border p-3 transition-colors">
        <NumberInput
          min={Math.max(0, minTime)}
          max={maxTime}
          step={1}
          value={line.startTime}
          onChange={(val) => onTimeChange(index, Math.max(0, val ?? 0))}
          format={formatTime}
          parse={parseTime}
          className="w-auto max-w-[40%]"
        />
        <TextInput
          placeholder={placeholder}
          value={line.text}
          onChange={(event) => onTextChange(index, event.target.value)}
          className="flex-1"
        />
        <IconButton
          tooltip={t("common.clear")}
          name="X"
          variant="ghost"
          onClick={() => onRemove(index)}
          disabled={!canRemove}
        />
      </div>
    )
  }
)

const LyricsEditor = ({ value, onChange, placeholder, className }: LyricsEditorProps) => {
  const { t } = useTranslation()

  const [syncedLines, setSyncedLines] = useState<Lyric[]>(() => (Array.isArray(value) ? value : []))

  const previewScrollRef = useRef<HTMLDivElement | null>(null)
  const editorScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (Array.isArray(value) && JSON.stringify(value) !== JSON.stringify(syncedLines)) {
      setSyncedLines(value)
    }
  }, [value])

  useEffect(() => {
    onChange?.(syncedLines)
  }, [syncedLines, onChange])

  const handleSyncedLineChange = useCallback(
    (index: number, field: "text" | "startTime", value: string | number) => {
      setSyncedLines((prevLines) => {
        const newLines = [...prevLines]
        if (field === "startTime") {
          const sanitizedValue = Math.max(0, Number(value) || 0)
          newLines[index] = { ...newLines[index], startTime: sanitizedValue }
        } else {
          newLines[index] = { ...newLines[index], text: value as string }
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

  const keyExtractor = useCallback((_: Lyric, index: number) => index.toString(), [])

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

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="rounded border">
          <div className="flex items-center justify-between gap-2 border-b p-3">
            <div className="flex items-center gap-2">
              <Badge variant="muted">
                <Typography affects="small">
                  {t("form.badges.lines", { count: syncedLines.length })}
                </Typography>
              </Badge>
              <Badge variant="muted">
                <Typography affects="small">
                  {t("form.badges.duration", {
                    time:
                      syncedLines.length > 0
                        ? formatTime(Math.max(...syncedLines.map((l) => l.startTime)))
                        : "0:00"
                  })}
                </Typography>
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <IconButton tooltip={t("common.preview")} variant="ghost" name="Eye" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t("form.titles.lyricsPreview")}</DialogTitle>
                    <DialogDescription>{t("form.descriptions.lyricsPreview")}</DialogDescription>
                  </DialogHeader>
                  <ScrollArea ref={previewScrollRef} className="h-[240px] rounded border">
                    <VirtualizedList
                      data={syncedLines}
                      keyExtractor={keyExtractor}
                      estimateItemHeight={20}
                      gap={8}
                      scrollRef={previewScrollRef}
                      containerClassName="p-3"
                      ListEmptyComponent={() => (
                        <div className="flex h-full items-center justify-center py-8">
                          <Typography affects={["muted", "italic"]}>
                            {t("form.messages.noLyrics")}
                          </Typography>
                        </div>
                      )}
                      renderItem={({ item: line }) => (
                        <div className="mb-2 flex w-full gap-2">
                          <Typography affects="muted" className="shrink-0">
                            [{formatTime(line.startTime)}]
                          </Typography>
                          <Typography className="shrink-0">-</Typography>
                          <Typography className="overflow-wrap-anywhere min-w-0 flex-1 break-all">
                            {line.text || "..."}
                          </Typography>
                        </div>
                      )}
                    />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <IconButton
                tooltip={t("common.more")}
                variant="ghost"
                name="Plus"
                onClick={addSyncedLine}
              />
            </div>
          </div>
          <ScrollArea ref={editorScrollRef} className="h-[300px]">
            <VirtualizedList
              data={syncedLines}
              keyExtractor={keyExtractor}
              estimateItemHeight={60}
              gap={8}
              scrollRef={editorScrollRef}
              containerClassName="p-3"
              ListEmptyComponent={() => (
                <div className="flex h-full items-center justify-center py-8">
                  <Typography affects={["muted", "italic"]}>
                    {t("form.messages.noLyrics")}
                  </Typography>
                </div>
              )}
              renderItem={({ item: line, index }) => (
                <LyricLine
                  line={line}
                  index={index}
                  minTime={Math.max(0, index > 0 ? syncedLines[index - 1].startTime + 1 : 0)}
                  maxTime={
                    index < syncedLines.length - 1 ? syncedLines[index + 1].startTime - 1 : Infinity
                  }
                  placeholder={placeholder}
                  onTextChange={handleTextChange}
                  onTimeChange={handleTimeChange}
                  onRemove={removeSyncedLine}
                  canRemove={true}
                />
              )}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export { LyricsEditor }
