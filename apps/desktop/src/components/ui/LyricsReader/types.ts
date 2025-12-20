import { type VirtualizedListWithHeadersProps } from "@components/ui/ListWithHeader/VirtualizedList"

export type Lyric = {
  text: string
  startTime: number
}

export type LyricsReaderProps = Omit<
  VirtualizedListWithHeadersProps<Lyric>,
  "data" | "keyExtractor" | "renderItem" | "onScrollRef"
> & {
  lyrics: Lyric[]
  currentTime: number
  onSeek: (time: number) => void
}

export type LyricLineProps = {
  lyric: Lyric
  isActive: boolean
  onClick: () => void
  index: number
}
