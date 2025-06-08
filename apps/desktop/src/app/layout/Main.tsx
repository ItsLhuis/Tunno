import { Route, Routes, useLocation } from "react-router-dom"

import { Artists, FastUpload, Favorites, Playlists, Settings, Songs } from "@app/pages"

import { motion } from "motion/react"

const routes = [
  { path: "/", element: <Songs /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/playlists", element: <Playlists /> },
  { path: "/artists", element: <Artists /> },
  { path: "/fast-upload", element: <FastUpload /> },
  { path: "/settings", element: <Settings /> }
]

function Main() {
  const location = useLocation()

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full flex-1"
    >
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </motion.div>
  )
}

export default Main
