import { cn } from "@lib/utils"

import { type HeaderProps, type StickyHeaderProps } from "./types"

function Header({
  containerClassName,
  SurfaceComponent,
  className,
  children,
  ...props
}: HeaderProps) {
  return (
    <div className={containerClassName}>
      {SurfaceComponent && SurfaceComponent()}
      <div className={cn("p-9 pb-0", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
Header.displayName = "Header"

function StickyHeader({ className, children, ...props }: StickyHeaderProps) {
  return (
    <div className={cn("pt-9", className)} {...props}>
      {children}
    </div>
  )
}
StickyHeader.displayName = "StickyHeader"

export { Header, StickyHeader }
