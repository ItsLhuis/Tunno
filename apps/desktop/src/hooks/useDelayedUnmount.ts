import { useEffect, useRef, useState } from "react"

/**
 * Custom hook to manage delayed unmounting of a component, often used for exit animations.
 *
 * This hook keeps a component rendered for a specified `delay` even after its `isOpen` state
 * becomes `false`. This allows time for exit animations to complete before the component is
 * removed from the DOM. If `isOpen` becomes `true` again before the delay finishes, the unmount
 * is cancelled, and the component remains rendered.
 *
 * @param isOpen - A boolean indicating whether the component should logically be open/mounted.
 * @param delay - The delay in milliseconds before `shouldRender` becomes `false` after `isOpen` is `false`.
 *                Defaults to 150ms.
 * @returns A boolean indicating whether the component should currently be rendered (`true` for mounted, `false` for unmounted or unmounting).
 *
 * @example
 * ```tsx
 * function ModalWrapper({ isOpen, children }) {
 *   const shouldRender = useDelayedUnmount(isOpen, 300);
 *
 *   if (!shouldRender) return null;
 *
 *   return (
 *     <div className={`modal ${isOpen ? 'animate-in' : 'animate-out'}`}>
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDelayedUnmount(isOpen: boolean, delay = 150) {
  const [shouldRender, setShouldRender] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isOpen) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setShouldRender(true)
    } else {
      timeoutRef.current = setTimeout(() => setShouldRender(false), delay)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isOpen, delay])

  return shouldRender
}
