import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

export function useResponsiveColumns(
  grid: boolean,
  gridBreakpoints: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
) {
  const [responsiveColumns, setResponsiveColumns] = useState<number>(1)
  const gridContainerRef = useRef<HTMLDivElement | null>(null)
  const isInitializedRef = useRef(false)

  const calculateColumns = useCallback(
    (width: number) => {
      if (!grid) return 1

      let cols = gridBreakpoints.xs || 1

      if (width >= 1536) cols = gridBreakpoints["2xl"] || 6
      else if (width >= 1280) cols = gridBreakpoints.xl || 5
      else if (width >= 1024) cols = gridBreakpoints.lg || 4
      else if (width >= 768) cols = gridBreakpoints.md || 3
      else if (width >= 640) cols = gridBreakpoints.sm || 2

      return cols
    },
    [grid, gridBreakpoints]
  )

  useLayoutEffect(() => {
    if (!grid || isInitializedRef.current) return

    const element = gridContainerRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    if (rect.width > 0) {
      const initialColumns = calculateColumns(rect.width)
      setResponsiveColumns(initialColumns)

      isInitializedRef.current = true
    } else {
      const windowWidth = window.innerWidth
      const initialColumns = calculateColumns(windowWidth)
      setResponsiveColumns(initialColumns)

      isInitializedRef.current = true
    }
  }, [grid, calculateColumns])

  useEffect(() => {
    const element = gridContainerRef.current

    if (!element || !grid) return

    let rafId: number

    const resizeObserver = new ResizeObserver((entries) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const entry = entries[0]
        if (entry?.contentRect?.width != null) {
          const width = entry.contentRect.width
          const cols = calculateColumns(width)
          setResponsiveColumns(cols)
          isInitializedRef.current = true
        }
      })
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [grid, calculateColumns])

  const effectiveColumns = useMemo(() => {
    if (!grid) return 1
    return Math.max(1, responsiveColumns)
  }, [grid, responsiveColumns])

  return {
    responsiveColumns,
    effectiveColumns,
    gridContainerRef
  }
}
