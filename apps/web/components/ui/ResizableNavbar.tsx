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

  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <motion.header ref={ref} className={cn("group fixed inset-x-0 top-4 z-40 w-full", className)}>
      <motion.div
        animate={{
          width: isScrolled ? "60%" : "100%",
          y: !isMobile && isScrolled ? 10 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50
        }}
        className={cn(
          "bg-background relative z-60 mx-auto max-w-450 flex-row items-center justify-between self-start rounded-full border border-transparent px-4 py-2",
          isScrolled && "border-border",
          className
        )}
      >
        {children}
      </motion.div>
    </motion.header>
  )
}

export { ResizableNavbar }
