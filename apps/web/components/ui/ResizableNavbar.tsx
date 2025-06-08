import { useRef, useState, type ReactNode } from "react"

import { useIsMobile } from "@hooks/useIsMobile"

import { cn } from "@lib/utils"

import { motion, useMotionValueEvent, useScroll } from "motion/react"

type ResizableNavbarProps = {
  children: ReactNode
  className?: string
}

const ResizableNavbar = ({ children, className }: ResizableNavbarProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <motion.header ref={ref} className={cn("group sticky inset-x-0 top-4 z-40 w-full", className)}>
      <motion.div
        animate={{
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          width: isScrolled ? "60%" : "100%",
          y: !isMobile && isScrolled ? 20 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50
        }}
        className={cn(
          "relative z-[60] mx-auto w-full max-w-full min-w-full flex-row items-center justify-between self-start rounded-full border border-transparent bg-transparent px-4 py-2 lg:max-w-7xl lg:min-w-[800px] dark:bg-transparent",
          isScrolled && "border-muted",
          className
        )}
      >
        {children}
      </motion.div>
    </motion.header>
  )
}

export { ResizableNavbar }
