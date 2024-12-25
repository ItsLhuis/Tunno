import { useLocation, Routes, Route } from "react-router-dom"

import { motion } from "framer-motion"

import { Songs, Favorites, Playlists, Artists, Settings } from "@app/main/pages"

const routes = [
  { path: "/", element: <Songs /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/playlists", element: <Playlists /> },
  { path: "/artists", element: <Artists /> },
  { path: "/settings", element: <Settings /> }
]

function Main() {
  const location = useLocation()

  return (
    <main className="flex flex-1 flex-col gap-2 items-start bg-background overflow-auto transition-colors">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full"
      >
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </motion.div>
    </main>
  )
}

export default Main
