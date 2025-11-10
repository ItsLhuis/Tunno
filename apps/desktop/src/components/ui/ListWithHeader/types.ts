import { type ComponentProps, type ReactNode } from "react"

export type HeaderProps = ComponentProps<"div"> & {
  containerClassName?: string
  children?: ReactNode
  SurfaceComponent?: () => ReactNode
}

export type StickyHeaderProps = ComponentProps<"div"> & {
  children?: ReactNode
}

export type SharedScrollContainerProps = {
  stickHeaderThreshold?: number
}
