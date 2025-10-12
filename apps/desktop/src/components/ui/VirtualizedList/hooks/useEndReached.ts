import { useCallback, useEffect, useRef, useState } from "react"

export function useEndReached(
  scrollRef: React.RefObject<HTMLDivElement>,
  onEndReached?: () => void,
  onEndReachedThreshold = 0.1
) {
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  const scrollElement = useRef<HTMLElement | null>(null)

  const getScrollElement = useCallback(() => {
    if (scrollElement.current) return scrollElement.current

    if (!scrollRef.current) return null

    const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
    const element = (viewport as HTMLElement) || scrollRef.current

    scrollElement.current = element
    return element
  }, [scrollRef])

  useEffect(() => {
    if (!onEndReached) return

    const scrollElement = getScrollElement()
    if (!scrollElement) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement

      const threshold = onEndReachedThreshold * clientHeight
      const isNearEnd = scrollTop + clientHeight >= scrollHeight - threshold

      if (isNearEnd && !hasReachedEnd) {
        setHasReachedEnd(true)
        onEndReached()
      } else if (!isNearEnd && hasReachedEnd) {
        setHasReachedEnd(false)
      }
    }

    scrollElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => scrollElement.removeEventListener("scroll", handleScroll)
  }, [onEndReached, onEndReachedThreshold, hasReachedEnd, getScrollElement])

  const resetEndReached = useCallback(() => {
    setHasReachedEnd(false)
  }, [])

  return {
    getScrollElement,
    resetEndReached
  }
}
