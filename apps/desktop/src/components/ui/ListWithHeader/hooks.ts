import { useCallback, useEffect, useState } from "react"

type UseScrollProps = {
  scrollRef: React.RefObject<HTMLDivElement>
  headerHeight: number
}

export const useScroll = ({ scrollRef, headerHeight }: UseScrollProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop
      setIsScrolled(scrollTop > headerHeight)
    }
  }, [scrollRef])

  useEffect(() => {
    const parent = scrollRef.current
    if (parent) {
      parent.addEventListener("scroll", handleScroll)
      return () => parent.removeEventListener("scroll", handleScroll)
    }
  }, [scrollRef])

  return {
    isScrolled
  }
}
