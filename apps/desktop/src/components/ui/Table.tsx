import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

const Table = ({ className, ref, ...props }: ComponentProps<"table">) => {
  return <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
}

const TableHeader = ({ className, ref, ...props }: ComponentProps<"thead">) => {
  return <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
}

const TableBody = ({ className, ref, ...props }: ComponentProps<"tbody">) => {
  return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

const TableFooter = ({ className, ref, ...props }: ComponentProps<"tfoot">) => {
  return (
    <tfoot
      ref={ref}
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
}

const TableRow = ({ className, ref, ...props }: ComponentProps<"tr">) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors focus-within:bg-muted/50 hover:bg-muted/50 data-[state=selected]:bg-muted/50",
        className
      )}
      {...props}
    />
  )
}

const TableHead = ({ className, ref, ...props }: ComponentProps<"th">) => {
  return (
    <th
      ref={ref}
      className={cn("flex items-center p-3 font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

const TableCell = ({ className, ref, ...props }: ComponentProps<"td">) => {
  return <td ref={ref} className={cn("flex items-center p-3 py-2", className)} {...props} />
}

const TableCaption = ({ className, ref, ...props }: ComponentProps<"caption">) => {
  return (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  )
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
