import { useMemo } from "react"

import { type Breakpoint, responsive, useBreakpoint } from "@styles"

export type ResponsiveColumnsConfig = Partial<Record<Breakpoint, number>>

export function useResponsiveColumns(config: ResponsiveColumnsConfig): number {
  const breakpoint = useBreakpoint()

  const columns = useMemo(() => {
    const value = responsive(config, breakpoint)
    return value ?? 2
  }, [config, breakpoint])

  return columns
}
