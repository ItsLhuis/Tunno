import { Route, Routes, useLocation } from "react-router-dom"

import { Artists, FastUpload, Favorites, Home, Playlists, Settings, Songs } from "@app/pages"

import { AnimatePresence, motion } from "motion/react"

type RouteConfig = {
  path: string
  element: React.ReactElement
  children?: RouteConfig[]
}

const routes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  { path: "/songs", element: <Songs /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/playlists", element: <Playlists /> },
  { path: "/artists", element: <Artists /> },
  { path: "/fast-upload", element: <FastUpload /> },
  { path: "/settings", element: <Settings /> }
]

function renderRoutes(routeList: RouteConfig[]) {
  return routeList.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ))
}

function Main() {
  const location = useLocation()

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex w-full flex-1"
      >
        <Routes location={location} key={location.pathname}>
          {renderRoutes(routes)}
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default Main
