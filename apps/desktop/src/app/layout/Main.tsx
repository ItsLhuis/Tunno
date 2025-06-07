import { relaunch } from "@tauri-apps/plugin-process"
import { check } from "@tauri-apps/plugin-updater"
import { useEffect } from "react"

import { motion } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"

import { Artists, FastUpload, Favorites, Playlists, Settings, Songs } from "@app/pages"

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

  useEffect(() => {
    const checkUpdate = async () => {
      const update = await check()
      if (update) {
        console.log(`found update ${update.version} from ${update.date} with notes ${update.body}`)
        let downloaded = 0
        let contentLength: number | undefined = 0
        await update.downloadAndInstall((event) => {
          switch (event.event) {
            case "Started":
              contentLength = event.data.contentLength
              console.log(`started downloading ${event.data.contentLength} bytes`)
              break
            case "Progress":
              downloaded += event.data.chunkLength
              console.log(`downloaded ${downloaded} from ${contentLength}`)
              break
            case "Finished":
              console.log("download finished")
              break
          }
        })
        console.log("update installed")
        await relaunch()
      }
    }
    checkUpdate()
  }, [])

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
