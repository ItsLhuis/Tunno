import { forwardRef, useContext, useRef } from "react"

import { Outlet, getRouterContext, useMatch, useMatches } from "@tanstack/react-router"

import { cloneDeep } from "lodash"

import { AnimatePresence, motion, useIsPresent } from "motion/react"

const AnimatedOutlet = forwardRef<HTMLDivElement>((props, ref) => {
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
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex w-full flex-1 overflow-hidden"
        {...props}
      >
        <RouterContext.Provider value={renderedContext.current}>
          <Outlet />
        </RouterContext.Provider>
      </motion.div>
    </AnimatePresence>
  )
})

export { AnimatedOutlet }
