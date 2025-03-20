import type { OnChangeFn, Row, Updater } from "@tanstack/react-table"

export type FocusingOptions = {
  onRowFocusingChange?: OnChangeFn<RowFocusingState | undefined>
}

export type RowFocusingState = Record<string, boolean>

export type FocusingTableState = {
  rowFocusing?: RowFocusingState
}

export type FocusingTable<TData> = {
  getFocusedRows(): Row<TData>[]
  setFocusedRows(updater: Updater<RowFocusingState | undefined>): void
}

export type FocusingRow = {
  getIsFocused(): boolean
  toggleFocused(): void
}

export type HoveringOptions = {
  onRowHoveringChange?: OnChangeFn<RowHoveringState | undefined>
}

export type RowHoveringState = Record<string, boolean>

export type HoveringTableState = {
  rowHovering?: RowHoveringState
}

export type HoveringTable<TData> = {
  getHoveredRows(): Row<TData>[]
  setHoveredRows(updater: Updater<RowHoveringState | undefined>): void
}

export type HoveringRow = {
  getIsHovered(): boolean
  toggleHovered(): void
}
