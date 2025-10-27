import type { CSSProperties, HTMLAttributes, ReactNode } from "react"

export type VirtualizedListController<TItem> = {
  data: TItem[]
  selectedIds: string[]
  isAllSelected: boolean
  hasSelection: boolean
  selectedCount: number
  toggleSelect: (id: string, additive?: boolean) => void
  selectAll: () => void
  clearSelection: () => void
}

export type VirtualizedListProps<TItem> = HTMLAttributes<HTMLDivElement> & {
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
  minItemWidth?: number
  containerClassName?: string
  rowClassName?: string
  rowStyle?: CSSProperties
  ListEmptyComponent?: React.ComponentType
  ListFooterComponent?: React.ComponentType<{ list: VirtualizedListController<TItem> }>
  onSelectionChange?: (selectedIds: string[], selectedItems: TItem[]) => void
  onController?: (controller: VirtualizedListController<TItem>) => void
  onEndReached?: () => void
  onEndReachedThreshold?: number
  scrollRef?: React.RefObject<HTMLDivElement>
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
  onToggle: (id: string) => void
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
  selectedIds: Set<string>
  onToggleItem: (id: string) => void
  measureRef: (element: HTMLElement | null) => void
}
