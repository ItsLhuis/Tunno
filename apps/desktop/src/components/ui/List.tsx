"use client"

import * as React from "react"

import { cn } from "@lib/utils"

import { Typography, DataTable, DataTableProps } from "@components/ui"

export interface ListHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  title?: string
}

export interface ListProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement>,
    DataTableProps<TData, TValue> {
  headerProps?: ListHeaderProps
}

const List = React.forwardRef<HTMLDivElement, ListProps<any, any>>(
  ({ headerProps, placeholder, data, columns, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col relative transition-all", className)} {...props}>
        {headerProps && (
          <div className={cn("mb-2", headerProps.className)}>
            {headerProps.title && <Typography variant="h1">{headerProps.title}</Typography>}
          </div>
        )}
        <DataTable columns={columns} data={data} placeholder={placeholder} />
      </div>
    )
  }
)
List.displayName = "List"

export { List }
