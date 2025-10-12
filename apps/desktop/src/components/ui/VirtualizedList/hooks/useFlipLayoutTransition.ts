import { useCallback, useRef } from "react"

export type FlipLayoutTransitionOptions = {
  duration?: number
  easing?: string
  onStart?: () => void
  onEnd?: () => void
}

export type FlipLayoutTransitionReturn = {
  startTransition: () => Promise<void>
  isTransitioning: boolean
}

type ItemRect = {
  element: HTMLElement
  id: string
  rect: DOMRect
}

type FlipDelta = {
  element: HTMLElement
  id: string
  deltaX: number
  deltaY: number
  deltaWidth: number
  deltaHeight: number
}

export function useFlipLayoutTransition(
  containerRef: React.RefObject<HTMLElement>,
  options: FlipLayoutTransitionOptions = {}
): FlipLayoutTransitionReturn {
  const { duration = 300, easing = "cubic-bezier(0.4, 0, 0.2, 1)", onStart, onEnd } = options

  const isTransitioningRef = useRef(false)
  const currentAnimationRef = useRef<Animation | null>(null)

  const batchRead = useCallback((callback: () => void) => {
    Promise.resolve().then(callback)
  }, [])

  const batchWrite = useCallback((callback: () => void) => {
    requestAnimationFrame(callback)
  }, [])

  const getVisibleItems = useCallback((): ItemRect[] => {
    if (!containerRef.current) return []

    const container = containerRef.current
    const items: ItemRect[] = []
    const itemElements = container.querySelectorAll("[data-virtualized-item]")

    itemElements.forEach((element) => {
      const htmlElement = element as HTMLElement
      const id = htmlElement.getAttribute("data-item-id")

      if (id && htmlElement.offsetParent !== null) {
        const rect = htmlElement.getBoundingClientRect()
        items.push({
          element: htmlElement,
          id,
          rect: rect
        })
      }
    })

    return items
  }, [containerRef])

  const calculateFlipDeltas = useCallback(
    (oldRects: ItemRect[], newRects: ItemRect[]): FlipDelta[] => {
      const deltas: FlipDelta[] = []
      const newRectsMap = new Map(newRects.map((rect) => [rect.id, rect]))

      oldRects.forEach(({ element, id, rect: oldRect }) => {
        const newRect = newRectsMap.get(id)
        if (!newRect) return

        const deltaX = oldRect.left - newRect.rect.left
        const deltaY = oldRect.top - newRect.rect.top
        const deltaWidth = oldRect.width / newRect.rect.width
        const deltaHeight = oldRect.height / newRect.rect.height

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        if (distance < 1 && Math.abs(deltaWidth - 1) < 0.01 && Math.abs(deltaHeight - 1) < 0.01) {
          return
        }

        deltas.push({
          element,
          id,
          deltaX,
          deltaY,
          deltaWidth,
          deltaHeight
        })
      })

      return deltas
    },
    []
  )

  const applyInvertedTransforms = useCallback((deltas: FlipDelta[]) => {
    deltas.forEach(({ element, deltaX, deltaY, deltaWidth, deltaHeight }) => {
      element.style.transition = "none"
      element.style.willChange = "transform"

      const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${deltaWidth}, ${deltaHeight})`
      element.style.transform = transform
    })
  }, [])

  const animateToFinalPositions = useCallback(
    (deltas: FlipDelta[]): Promise<void> => {
      return new Promise((resolve) => {
        let completedAnimations = 0
        const totalAnimations = deltas.length

        if (totalAnimations === 0) {
          resolve()
          return
        }

        const onAnimationComplete = () => {
          completedAnimations++
          if (completedAnimations === totalAnimations) {
            deltas.forEach(({ element }) => {
              element.style.transition = ""
              element.style.transform = ""
              element.style.willChange = ""
            })
            resolve()
          }
        }

        batchWrite(() => {
          deltas.forEach(({ element }) => {
            element.style.transition = `transform ${duration}ms ${easing}`
            element.style.transform = "translate3d(0, 0, 0) scale(1, 1)"

            const handleAnimationEnd = () => {
              element.removeEventListener("transitionend", handleAnimationEnd)
              onAnimationComplete()
            }

            element.addEventListener("transitionend", handleAnimationEnd)
          })
        })
      })
    },
    [duration, easing, batchWrite]
  )

  const startTransition = useCallback(async (): Promise<void> => {
    if (isTransitioningRef.current) {
      if (currentAnimationRef.current) {
        currentAnimationRef.current.cancel()
        currentAnimationRef.current = null
      }
    }

    isTransitioningRef.current = true
    onStart?.()

    try {
      const oldRects = getVisibleItems()

      if (oldRects.length === 0) {
        return
      }

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve())
        })
      })

      const newRects = getVisibleItems()
      const deltas = calculateFlipDeltas(oldRects, newRects)

      if (deltas.length === 0) {
        return
      }

      applyInvertedTransforms(deltas)
      await animateToFinalPositions(deltas)
    } catch (error) {
      console.warn("VirtualizedList: FLIP transition failed:", error)
    } finally {
      isTransitioningRef.current = false
      onEnd?.()
    }
  }, [
    getVisibleItems,
    calculateFlipDeltas,
    applyInvertedTransforms,
    animateToFinalPositions,
    batchRead,
    batchWrite,
    onStart,
    onEnd
  ])

  return {
    startTransition,
    isTransitioning: isTransitioningRef.current
  }
}
