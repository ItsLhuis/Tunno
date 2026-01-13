import { useMemo } from "react"

import { type Breakpoint, responsive, useBreakpoint } from "@styles"

export type ResponsiveColumnsConfig = Partial<Record<Breakpoint, number>>

const DEFAULT_COLUMNS: ResponsiveColumnsConfig = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
  "2xl": 7
}

export function useResponsiveColumns(config: ResponsiveColumnsConfig = DEFAULT_COLUMNS): number {
  const breakpoint = useBreakpoint()

  const columns = useMemo(() => {
    const value = responsive(config, breakpoint)
    return value ?? 2
  }, [config, breakpoint])

  return columns
}
