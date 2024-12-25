import { useState, useEffect } from "react"

import { BrowserRouter } from "react-router-dom"

import Logo from "@assets/images/appicon-primary.png"

import { motion } from "motion/react"

import { Titlebar, Sidebar, Main, Footer } from "@app/main/layout"

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true)

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false)
    }, 2000)

    return () => {
      clearTimeout(splashTimeout)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="flex flex-col h-dvh w-dvw relative">
        {isSplashVisible && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <img src={Logo} className="w-20" />
          </motion.div>
        )}
        <motion.div
          className="z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Titlebar isSplashVisible={isSplashVisible} />
        </motion.div>
        <motion.div
          className="flex flex-col h-full w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSplashVisible ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <Main />
          </div>
          <Footer />
        </motion.div>
      </div>
    </BrowserRouter>
  )
}

export default App
