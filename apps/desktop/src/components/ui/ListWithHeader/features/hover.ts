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
  HoveringOptions,
  HoveringRow,
  HoveringTable,
  HoveringTableState,
  RowHoveringState
} from "./types"

export const Hovering = {
  createRow<TData extends RowData>(row: Row<TData>, table: Table<TData>): void {
    type RowWithHover = Row<TData> & HoveringRow
    ;(row as RowWithHover).getIsHovered = () =>
      Boolean((table.getState() as HoveringTableState).rowHovering?.[row.id])
    ;(row as RowWithHover).toggleHovered = () =>
      table.setState((old: TableState & HoveringTableState) => {
        const currentHovering = Boolean(old.rowHovering?.[row.id])
        if (currentHovering === !currentHovering) {
          return old
        }
        return {
          ...old,
          rowHovering: {
            ...old.rowHovering,
            [row.id]: !currentHovering
          }
        }
      })
  },

  createTable<TData extends RowData>(table: Table<TData>): void {
    type TableWithHover = Table<TData> & HoveringTable<TData>
    ;(table as TableWithHover).getHoveredRows = () =>
      Object.entries((table.getState() as HoveringTableState).rowHovering || {})
        .filter(([, isHovered]) => isHovered)
        .map(([id]) => table.getRow(id))
    ;(table as TableWithHover).setHoveredRows = (updater) => {
      const safeUpdater: Updater<RowHoveringState | undefined> = (old) =>
        functionalUpdate(updater, old)

      return (table.options as HoveringOptions).onRowHoveringChange?.(safeUpdater)
    }
  },

  getDefaultOptions<TData extends RowData>(
    table: Table<TData>
  ): Partial<TableOptionsResolved<TData>> & HoveringOptions {
    return {
      onRowHoveringChange: makeStateUpdater("hovering" as any, table)
    }
  },

  getInitialState(state): Partial<TableState> & HoveringTableState {
    return {
      rowHovering: {},
      ...(state as Partial<TableState>)
    }
  }
} satisfies TableFeature
