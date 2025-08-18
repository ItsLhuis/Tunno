import { useContext, useRef } from "react"

import { Outlet, getRouterContext, useMatch, useMatches } from "@tanstack/react-router"

import { cloneDeep } from "lodash"

import { Fade, FadeProps } from "@components/ui/Fade"

import { useIsPresent } from "motion/react"

export type AnimatedOutletProps = Omit<FadeProps, "children">

const AnimatedOutlet = ({ ...props }: AnimatedOutletProps) => {
  const RouterContext = getRouterContext()

  const routerContext = useContext(RouterContext)
  const renderedContext = useRef(routerContext)

  const isPresent = useIsPresent()

  if (isPresent) {
    renderedContext.current = cloneDeep(routerContext)
  }

  const matches = useMatches()

  const match = useMatch({ strict: false })
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1
  const nextMatch = matches[nextMatchIndex]

  const key = nextMatch?.id || match.id

  return (
    <Fade key={key} className="flex w-full flex-1 overflow-hidden" {...props}>
      <RouterContext.Provider value={renderedContext.current}>
        <Outlet />
      </RouterContext.Provider>
    </Fade>
  )
}

export { AnimatedOutlet }
