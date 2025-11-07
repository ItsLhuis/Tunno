import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from "react"

import { Link, type LinkProps } from "@tanstack/react-router"

import { open } from "@tauri-apps/plugin-shell"

export type SafeLinkProps = { children: ReactNode } & LinkProps

const SafeLink = forwardRef<HTMLAnchorElement, SafeLinkProps>(({ children, to, ...props }, ref) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  useImperativeHandle(ref, () => linkRef.current!)

  const isExternal =
    typeof to === "string" && (to.startsWith("http://") || to.startsWith("https://"))

  useEffect(() => {
    const linkElement = linkRef.current

    if (linkElement) {
      const handleAllClicks = (event: MouseEvent) => {
        if (event.button === 1) {
          event.preventDefault()
          return
        }

        if (event.button === 0) {
          if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) {
            event.preventDefault()
            return
          }

          if (isExternal) {
            event.preventDefault()
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
    <Link
      ref={linkRef}
      to={to}
      className="inline cursor-default leading-none transition-colors hover:text-primary focus:outline-none focus-visible:text-primary [&>*]:hover:text-primary [&>*]:focus-visible:text-primary"
      {...props}
    >
      {children}
    </Link>
  )
})

export { SafeLink }
