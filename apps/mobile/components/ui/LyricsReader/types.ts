import { type FlashListWithHeadersProps } from "@components/ui/ListWithHeader/FlashList"

export type Lyric = {
  text: string
  startTime: number
}

export type LyricsReaderProps = Omit<
  FlashListWithHeadersProps<Lyric>,
  "data" | "keyExtractor" | "renderItem"
> & {
  lyrics: Lyric[]
  currentTime: number
  onSeek: (time: number) => void
  isPlaying: boolean
}

export type LyricLineProps = {
  lyric: Lyric
  isActive: boolean
  onPress: () => void
}
