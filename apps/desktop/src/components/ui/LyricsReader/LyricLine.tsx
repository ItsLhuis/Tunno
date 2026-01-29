import { memo } from "react"

import { cn } from "@lib/utils"

import { Button } from "@components/ui/Button"
import { Icon } from "@components/ui/Icon"

import { type LyricLineProps } from "./types"

const LyricLine = memo(function LyricLine({ lyric, isActive, onClick, index }: LyricLineProps) {
  const isEmpty = !lyric.text || lyric.text.trim() === ""

  return (
    <Button
      variant="link"
      data-lyric-index={index}
      onClick={onClick}
      className={cn(
        "relative h-auto w-fit justify-start text-left transition-[font-size,font-weight,color]",
        isActive ? "text-2xl font-bold" : "text-muted-foreground text-base"
      )}
    >
      {isEmpty ? <Icon name="Ellipsis" /> : lyric.text}
    </Button>
  )
})

export { LyricLine }
