import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from "react"

import { open } from "@tauri-apps/plugin-shell"

import { Link, type LinkProps } from "react-router-dom"

export type SafeLinkProps = { children: ReactNode } & LinkProps

export const SafeLink = forwardRef<HTMLAnchorElement, SafeLinkProps>(
  ({ children, to, onClick, ...props }, ref) => {
    const linkRef = useRef<HTMLAnchorElement>(null)
    useImperativeHandle(ref, () => linkRef.current!)

    const isExternal =
      typeof to === "string" && (to.startsWith("http://") || to.startsWith("https://"))

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault()
        return
      }

      if (isExternal) {
        e.preventDefault()
        open(to as string)
      }

      if (onClick) onClick(e)
    }

    useEffect(() => {
      const linkElement = linkRef.current

      if (linkElement) {
        const handleMiddleClick = (e: MouseEvent) => {
          if (e.button === 1) {
            e.preventDefault()
            return
          }
        }

        linkElement.addEventListener("auxclick", handleMiddleClick)

        return () => {
          linkElement.removeEventListener("auxclick", handleMiddleClick)
        }
      }
    }, [])

    return (
      <Link ref={linkRef} to={to} onClick={handleClick} {...props}>
        {children}
      </Link>
    )
  }
)
SafeLink.displayName = "SafeLink"
