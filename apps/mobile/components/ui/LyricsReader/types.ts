import { type FlatListWithHeadersProps } from "@components/ui/ListWithHeader/FlatList"

export type Lyric = {
  text: string
  startTime: number
}

export type LyricsReaderProps = Omit<
  FlatListWithHeadersProps<Lyric>,
  "data" | "keyExtractor" | "renderItem"
> & {
  lyrics: Lyric[]
  currentTime: number
  onSeek: (time: number) => void
}

export type LyricLineProps = {
  lyric: Lyric
  isActive: boolean
  onPress: () => void
}
