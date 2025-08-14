import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from "react"

import { Link, type LinkProps } from "@tanstack/react-router"

import { open } from "@tauri-apps/plugin-shell"

export type SafeLinkProps = { children: ReactNode } & LinkProps

const SafeLink = forwardRef<HTMLAnchorElement, SafeLinkProps>(
  ({ children, to, ...props }, ref) => {
    const linkRef = useRef<HTMLAnchorElement>(null)
    useImperativeHandle(ref, () => linkRef.current!)

    const isExternal =
      typeof to === "string" && (to.startsWith("http://") || to.startsWith("https://"))

      useEffect(() => {
        const linkElement = linkRef.current
    
        if (linkElement) {
          const handleAllClicks = (e: MouseEvent) => {
            if (e.button === 1) {
              e.preventDefault()
              return
            }
    
            if (e.button === 0) {
              if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
                e.preventDefault()
                return
              }
    
              if (isExternal) {
                e.preventDefault()
                open(to as string)
                return
              }
            }
          }
    
          linkElement.addEventListener("click", handleAllClicks)
          linkElement.addEventListener("auxclick", handleAllClicks)
    
          return () => {
            linkElement.removeEventListener("click", handleAllClicks)
            linkElement.removeEventListener("auxclick", handleAllClicks)
          }
        }
      }, [isExternal, to, linkRef])
    
      return (
        <Link ref={linkRef} to={to} {...props}>
          {children}
        </Link>
      )
  }
)

export { SafeLink }

