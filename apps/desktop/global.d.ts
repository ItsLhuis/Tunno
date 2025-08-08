import "@tanstack/react-table"

import {
  type FocusingOptions,
  type FocusingRow,
  type FocusingTable,
  type FocusingTableState,
  type HoveringOptions,
  type HoveringRow,
  type HoveringTable,
  type HoveringTableState
} from "@components/ui/ListWithHeader/features/types"

declare module "@tanstack/react-table" {
  interface TableState extends FocusingTableState, HoveringTableState {}

  interface TableOptionsResolved<TData extends RowData> extends FocusingOptions, HoveringOptions {}

  interface Table<TData extends RowData> extends FocusingTable<TData>, HoveringTable<TData> {}

  interface Row<TData extends RowData> extends FocusingRow, HoveringRow {}

  interface ColumnMeta<TData extends RowData, TValue> {
    width?: string | number
    className?: string
    headerText?: string
  }
}
