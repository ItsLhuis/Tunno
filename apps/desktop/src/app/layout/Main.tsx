import { Route, Routes, useLocation } from "react-router-dom"

import { motion } from "framer-motion"

import { Artists, FastUpload, Favorites, Playlists, Settings, Songs } from "@/app/pages"

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
      transition={{ duration: 0.3 }}
      className="flex flex-1 w-full"
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
