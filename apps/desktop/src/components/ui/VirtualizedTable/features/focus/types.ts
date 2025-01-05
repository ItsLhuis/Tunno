import type { OnChangeFn, Row, Updater } from "@tanstack/react-table"

export interface FocusingOptions {
  onRowFocusingChange?: OnChangeFn<RowFocusingState | undefined>
}

export type RowFocusingState = Record<string, boolean>

export interface FocusingTableState {
  rowFocusing?: RowFocusingState
}

export interface FocusingTable<TData> {
  getFocusedRows(): Row<TData>[]
  setFocusedRows(updater: Updater<RowFocusingState | undefined>): void
}

export interface FocusingRow {
  getIsFocused(): boolean
  toggleFocused(): void
}
