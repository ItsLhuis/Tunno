"use client"

import { memo, useCallback, useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

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

import { formatTime, parseTime } from "@repo/utils"

type Lyric = {
  text: string
  startTime: number
}

export type LyricsEditorProps = {
  value?: Lyric[] | null
  onChange?: (data: Lyric[]) => void
  placeholder?: string
  className?: string
}

const LyricLine = memo(
  ({
    line,
    index,
    minTime,
    maxTime,
    placeholder,
    onLineChange,
    onRemove,
    canRemove
  }: {
    line: Lyric
    index: number
    minTime: number
    maxTime: number
    placeholder?: string
    onLineChange: (index: number, field: "text" | "startTime", value: string | number) => void
    onRemove: (index: number) => void
    canRemove: boolean
  }) => {
    const { t } = useTranslation()

    return (
      <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors">
        <NumberInput
          min={minTime}
          max={maxTime}
          step={1}
          value={line.startTime}
          onChange={(val) => onLineChange(index, "startTime", val ?? 0)}
          format={formatTime}
          parse={parseTime}
          className="w-auto"
        />
        <TextInput
          placeholder={placeholder}
          value={line.text}
          onChange={(e) => onLineChange(index, "text", e.target.value)}
          className="flex-1"
        />
        <IconButton
          tooltip={t("common.clear")}
          name="Trash2"
          variant="text"
          onClick={() => onRemove(index)}
          disabled={!canRemove}
        />
      </div>
    )
  }
)

const LyricsEditor = ({ value, onChange, placeholder, className }: LyricsEditorProps) => {
  const { t } = useTranslation()

  const [syncedLines, setSyncedLines] = useState<Lyric[]>(() => {
    if (value && value.length > 0) {
      return value
    }
    return [{ text: "", startTime: 0 }]
  })

  useEffect(() => {
    if (value && value.length > 0 && JSON.stringify(value) !== JSON.stringify(syncedLines)) {
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
        newLines[index] = { ...newLines[index], [field]: value }
        return newLines
      })
    },
    []
  )

  const addSyncedLine = useCallback(() => {
    setSyncedLines((prevLines) => {
      const lastTime = prevLines.length > 0 ? prevLines[prevLines.length - 1].startTime : 0
      const newLine = { text: "", startTime: lastTime + 5 }
      return [...prevLines, newLine]
    })
  }, [])

  const removeSyncedLine = useCallback((index: number) => {
    setSyncedLines((prevLines) => {
      if (prevLines.length > 1) {
        return prevLines.filter((_, i) => i !== index)
      }
      return prevLines
    })
  }, [])

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{syncedLines.length} linhas</Badge>
            <Badge variant="outline">
              Duração: {formatTime(Math.max(...syncedLines.map((l) => l.startTime)))}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <IconButton variant="outline" name="Eye" />
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Preview das Lyrics</DialogTitle>
                  <DialogDescription>
                    Visualize como as lyrics ficaram com os timestamps
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[240px] w-full rounded-md border transition-[border-color]">
                  <div className="whitespace-pre-wrap p-3 text-sm">
                    {syncedLines.map((line, index) => (
                      <div key={index} className="mb-2 flex gap-2">
                        <span className="text-muted-foreground">
                          [{formatTime(line.startTime)}]
                        </span>
                        <span>-</span>
                        <span>{line.text || "..."}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <IconButton
              tooltip={t("common.more")}
              variant="outline"
              name="Plus"
              onClick={addSyncedLine}
            />
          </div>
        </div>
        <ScrollArea className="h-[300px] w-full rounded-md border transition-[border-color]">
          <div className="space-y-3 p-4">
            {syncedLines.map((line, index) => (
              <LyricLine
                key={index}
                line={line}
                index={index}
                minTime={index > 0 ? syncedLines[index - 1].startTime + 1 : 0}
                maxTime={
                  index < syncedLines.length - 1 ? syncedLines[index + 1].startTime - 1 : Infinity
                }
                placeholder={placeholder}
                onLineChange={handleSyncedLineChange}
                onRemove={removeSyncedLine}
                canRemove={syncedLines.length > 1}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export { LyricsEditor }
