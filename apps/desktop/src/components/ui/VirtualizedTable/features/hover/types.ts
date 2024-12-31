import type { OnChangeFn, Row, Updater } from "@tanstack/react-table"

export interface HoveringOptions {
  onRowHoveringChange?: OnChangeFn<RowHoveringState | undefined>
}

export type RowHoveringState = Record<string, boolean>

export interface HoveringTableState {
  rowHovering?: RowHoveringState
}

export interface HoveringTable<TData> {
  getHoveredRows(): Row<TData>[]
  setHoveredRows(updater: Updater<RowHoveringState | undefined>): void
}

export interface HoveringRow {
  getIsHovered(): boolean
  toggleHovered(): void
}
