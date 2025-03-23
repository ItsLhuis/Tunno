import {
  functionalUpdate,
  makeStateUpdater,
  type Row,
  type RowData,
  type Table,
  type TableFeature,
  type TableOptionsResolved,
  type TableState,
  type Updater
} from "@tanstack/table-core"

import type {
  FocusingOptions,
  FocusingRow,
  FocusingTable,
  FocusingTableState,
  RowFocusingState
} from "./types"

export const Focusing = {
  createRow<TData extends RowData>(row: Row<TData>, table: Table<TData>): void {
    type RowWithFocus = Row<TData> & FocusingRow
    ;(row as RowWithFocus).getIsFocused = () =>
      Boolean((table.getState() as FocusingTableState).rowFocusing?.[row.id])
    ;(row as RowWithFocus).toggleFocused = () =>
      table.setState((old: TableState & FocusingTableState) => {
        const currentFocusing = Boolean(old.rowFocusing?.[row.id])
        if (currentFocusing === !currentFocusing) return old
        return {
          ...old,
          rowFocusing: {
            ...old.rowFocusing,
            [row.id]: !currentFocusing
          }
        }
      })
  },

  createTable<TData extends RowData>(table: Table<TData>): void {
    type TableWithFocus = Table<TData> & FocusingTable<TData>
    ;(table as TableWithFocus).getFocusedRows = () =>
      Object.entries((table.getState() as FocusingTableState).rowFocusing || {})
        .filter(([, isFocused]) => isFocused)
        .map(([id]) => table.getRow(id))
    ;(table as TableWithFocus).setFocusedRows = (updater) => {
      const safeUpdater: Updater<RowFocusingState | undefined> = (old) =>
        functionalUpdate(updater, old)

      return (table.options as FocusingOptions).onRowFocusingChange?.(safeUpdater)
    }
  },

  getDefaultOptions<TData extends RowData>(
    table: Table<TData>
  ): Partial<TableOptionsResolved<TData>> & FocusingOptions {
    return {
      onRowFocusingChange: makeStateUpdater("focusing" as any, table)
    }
  },

  getInitialState(state): Partial<TableState> & FocusingTableState {
    return {
      rowFocusing: {},
      ...(state as Partial<TableState>)
    }
  }
} satisfies TableFeature
