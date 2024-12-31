import "@tanstack/react-table"

import {
  type HoveringOptions,
  type HoveringRow,
  type HoveringTable,
  type HoveringTableState
} from "@components/ui/VirtualizedTable/features/hover/types"

declare module "@tanstack/react-table" {
  interface TableState extends HoveringTableState {}

  interface TableOptionsResolved<TData extends RowData> extends HoveringOptions {}

  interface Table<TData extends RowData> extends HoveringTable<TData> {}

  interface Row<TData extends RowData> extends HoveringRow {}

  interface ColumnMeta<TData extends RowData, TValue> {
    width?: string | number
    className?: string
  }
}
