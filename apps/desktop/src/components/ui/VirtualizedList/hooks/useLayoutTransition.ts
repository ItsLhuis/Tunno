import { useCallback, useMemo, useRef, useState } from "react"

export type LayoutTransitionOptions = {
  duration?: number
  easing?: string | number[]
  staggerChildren?: number
  onStart?: () => void
  onEnd?: () => void
  disableAnimations?: boolean
}

export type LayoutTransitionReturn = {
  startTransition: () => void
  isTransitioning: boolean
  layoutKey: string
  transitionConfig: {
    duration: number
    ease: string | number[]
    stagger: number
  }
  shouldAnimate: boolean
}

export function useLayoutTransition(options: LayoutTransitionOptions = {}): LayoutTransitionReturn {
  const {
    duration = 0.3,
    easing = [0.25, 0.46, 0.45, 0.94],
    staggerChildren = 0.02,
    onStart,
    onEnd,
    disableAnimations = false
  } = options

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [layoutKey, setLayoutKey] = useState("initial")

  const transitionTimeoutRef = useRef<NodeJS.Timeout>()

  const shouldAnimate = useMemo(() => {
    return !disableAnimations
  }, [disableAnimations])

  const startTransition = useCallback(() => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    setIsTransitioning(true)
    onStart?.()

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLayoutKey((prev) => (prev === "grid" ? "list" : "grid"))
      })
    })

    const staggerDelay = staggerChildren * 5
    const totalDuration = (duration + staggerDelay) * 1000

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      onEnd?.()
    }, totalDuration)
  }, [duration, staggerChildren, onStart, onEnd])

  return {
    startTransition,
    isTransitioning,
    layoutKey,
    transitionConfig: {
      duration,
      ease: easing,
      stagger: staggerChildren
    },
    shouldAnimate
  }
}
