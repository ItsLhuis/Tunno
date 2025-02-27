import { useState, useEffect } from "react"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { BrowserRouter } from "react-router-dom"

import Logo from "@assets/images/app/icons/primary.png"

import { ErrorBoundary } from "@components/core"

import { Titlebar, Sidebar, Main, Footer } from "@app/main/layout"

import { motion } from "motion/react"

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true)

  useEffect(() => {
    const initializeApp = async () => {
      const showMainWindowTimeout = setTimeout(async () => {
        await getCurrentWindow().show()
        await getCurrentWindow().setFocus()
      }, 200)

      const splashTimeout = setTimeout(() => {
        setIsSplashVisible(false)
      }, 2000)

      return () => {
        clearTimeout(showMainWindowTimeout)
        clearTimeout(splashTimeout)
      }
    }

    initializeApp()
  }, [])

  return (
    <BrowserRouter>
      <div className="flex flex-col h-dvh w-dvw relative bg-background transition-[background-color]">
        {isSplashVisible && (
          <motion.div
            className="absolute bg-background inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={Logo} alt="App logo" className="w-20" />
          </motion.div>
        )}
        <motion.div
          className="z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Titlebar isSplashVisible={isSplashVisible} />
        </motion.div>
        <ErrorBoundary>
          <motion.div
            className="flex flex-col h-full w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isSplashVisible ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <Main />
            </div>
            <Footer />
          </motion.div>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  )
}

export default App
