import {
  type ComponentProps,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  type RefObject
} from "react"

import { type Virtualizer } from "@tanstack/react-virtual"
import { type SelectionController } from "@repo/utils"

export type VirtualizedListController<TItem> = SelectionController<TItem>

export type VirtualizedListProps<TItem> = ComponentProps<"div"> & {
  data: TItem[]
  keyExtractor: (item: TItem, index: number) => string
  renderItem: (args: {
    item: TItem
    index: number
    selected: boolean
    toggle: () => void
  }) => ReactNode
  estimateItemHeight: number
  layout?: "list" | "grid"
  gridBreakpoints?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  gap?: number
  containerClassName?: string
  rowClassName?: string
  rowStyle?: CSSProperties
  ListEmptyComponent?: ComponentType
  ListFooterComponent?: ComponentType<{ list: VirtualizedListController<TItem> }>
  onSelectionChange?: (selectedIds: readonly string[], selectedItems: readonly TItem[]) => void
  onController?: (controller: VirtualizedListController<TItem>) => void
  onVirtualizer?: (virtualizer: Virtualizer<HTMLElement, Element>) => void
  onEndReached?: () => void
  onEndReachedThreshold?: number
  scrollRef?: RefObject<HTMLDivElement | null>
}

export type VirtualizedItemProps<TItem> = {
  item: TItem
  index: number
  id: string
  renderItem: (args: {
    item: TItem
    index: number
    selected: boolean
    toggle: () => void
  }) => ReactNode
  isSelected: boolean
  onToggle: (id: string, additive?: boolean) => void
  itemId: string
}

export type VirtualRowProps<TItem> = {
  virtualRow: any
  data: TItem[]
  effectiveColumns: number
  keyExtractor: (item: TItem, index: number) => string
  renderItem: (args: {
    item: TItem
    index: number
    selected: boolean
    toggle: () => void
  }) => ReactNode
  gap: number
  rowClassName: string
  rowStyle: CSSProperties
  selectedIds: ReadonlySet<string>
  onToggleItem: (id: string, additive?: boolean) => void
  measureRef: (element: HTMLElement | null) => void
}
