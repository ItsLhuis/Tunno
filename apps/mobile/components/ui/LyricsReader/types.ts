import { type ReactNode } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import { type FlashListProps } from "@shopify/flash-list"

export type Lyric = {
  text: string
  startTime: number
}

export type LyricsReaderProps = Omit<
  FlashListProps<Lyric>,
  "data" | "keyExtractor" | "renderItem"
> & {
  lyrics: Lyric[]
  currentTime: number
  onSeek: (time: number) => void
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  ListEmptyComponent?: ReactNode
}

export type LyricLineProps = {
  lyric: Lyric
  isActive: boolean
  onPress: () => void
}
