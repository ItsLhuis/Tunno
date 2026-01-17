import { useEffect, useRef, useState } from "react"

/**
 * Custom hook to manage delayed mounting of a component, often used for entry animations.
 *
 * This hook delays rendering a component for a specified `delay` after its `shouldMount` state
 * becomes `true`. This allows time for other UI elements to settle before triggering entrance
 * animations. If `shouldMount` becomes `false` before the delay finishes, the mount is cancelled,
 * and the component remains unrendered.
 *
 * @param shouldMount - A boolean indicating whether the component should logically be mounted.
 * @param delay - The delay in milliseconds before `shouldRender` becomes `true` after `shouldMount` is `true`.
 *                Defaults to 0ms (no delay).
 * @returns A boolean indicating whether the component should currently be rendered (true for mounted/mounting, false for unmounted).
 *
 * @example
 * ```tsx
 * function AnimatedScreen({ isVisible, children }) {
 *   const shouldRender = useDelayedMount(isVisible, 300);
 *
 *   if (!shouldRender) return null;
 *
 *   return (
 *     <Fade show={shouldRender} duration={300}>
 *       {children}
 *     </Fade>
 *   );
 * }
 * ```
 */
export function useDelayedMount(shouldMount: boolean, delay = 0) {
  const [shouldRender, setShouldRender] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (shouldMount) {
      timeoutRef.current = setTimeout(() => setShouldRender(true), delay)
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setShouldRender(false)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [shouldMount, delay])

  return shouldRender
}
