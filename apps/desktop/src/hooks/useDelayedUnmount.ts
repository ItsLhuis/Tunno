import { useEffect, useRef, useState } from "react"

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
