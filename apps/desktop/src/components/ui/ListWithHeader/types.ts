import { type HTMLAttributes, type ReactNode } from "react"

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  containerClassName?: string
  children?: ReactNode
  SurfaceComponent?: () => ReactNode
}

export type StickyHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

export type SharedScrollContainerProps = {
  stickHeaderThreshold?: number
}
