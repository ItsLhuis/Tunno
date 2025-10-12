import { cn } from "@lib/utils"

import { type HeaderProps, type StickyHeaderProps } from "../types"

const Header = ({
  containerClassName,
  SurfaceComponent,
  className,
  children,
  ...props
}: HeaderProps) => {
  return (
    <div className={containerClassName}>
      {SurfaceComponent && SurfaceComponent()}
      <div className={cn("p-9 pb-0", className)} {...props}>
        {children}
      </div>
    </div>
  )
}

const StickyHeader = ({ className, children, ...props }: StickyHeaderProps) => {
  return (
    <div className={cn("pt-9", className)} {...props}>
      {children}
    </div>
  )
}

export { Header, StickyHeader }
