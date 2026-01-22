import { useEffect, useRef, useState } from "react"

type UseDelayedRenderProps = {
  index?: number
  staggerDelay?: number
  maxDelay?: number
  immediate?: boolean
  cancelOnUnmount?: boolean
}

/**
 * Custom hook for staggered rendering of list items to improve perceived performance.
 *
 * This hook delays the rendering of items based on their index, creating a "cascade" effect
 * where items appear sequentially. The delay is calculated as `index * staggerDelay`, capped
 * at `maxDelay` to prevent excessive wait times for items deep in the list.
 *
 * @param props - Configuration options for the delayed render behavior.
 * @returns An object containing `shouldRender` - a boolean indicating whether the item should be rendered.
 *
 * @example
 * ```tsx
 * function ListItem({ index, data }) {
 *   const { shouldRender } = useDelayedRender({ index, staggerDelay: 32 });
 *
 *   if (!shouldRender) return <Skeleton />;
 *
 *   return (
 *     <div className="animate-fade-in">
 *       {data.title}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDelayedRender({
  index = 0,
  staggerDelay = 16,
  maxDelay = 300,
  immediate = false,
  cancelOnUnmount = true
}: UseDelayedRenderProps = {}) {
  const [shouldRender, setShouldRender] = useState(immediate)

  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (immediate || shouldRender) return

    const delay = Math.min(index * staggerDelay, maxDelay)

    const timeout = setTimeout(() => {
      if (!cancelOnUnmount || mountedRef.current) {
        setShouldRender(true)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [index, staggerDelay, maxDelay, immediate, shouldRender, cancelOnUnmount])

  return { shouldRender }
}
