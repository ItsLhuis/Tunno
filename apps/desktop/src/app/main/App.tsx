import { useEffect, useState } from "react"

import { useTranslation } from "@i18n/hooks"

import { useSettingsStore } from "@stores/useSettingsStore"

import { migrate } from "@database/migrate"

import { BrowserRouter } from "react-router-dom"

import Logo from "@assets/images/app/icons/primary.png"

import { ErrorBoundary } from "@components/core"

import { Footer, Main, Sidebar, Titlebar } from "@app/main/layout"

import { motion } from "motion/react"

function App() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const { hasHydrated, language } = useSettingsStore()

  const { i18n } = useTranslation()

  const prepareApp = async (): Promise<void> => {
    await migrate()
    i18n.changeLanguage(language)
    
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  useEffect(() => {
    if (!hasHydrated || isAppReady) return

    const startApp = async () => {
      await prepareApp()
      setIsAppReady(true)
    }

    startApp()
  }, [hasHydrated])

  return (
    <BrowserRouter>
      <div className="flex flex-col h-dvh w-dvw relative bg-background transition-[background-color]">
        {!isAppReady && (
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
          <Titlebar isSplashVisible={!isAppReady} />
        </motion.div>
        <ErrorBoundary>
          <motion.div
            className="flex flex-col h-full w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: !isAppReady ? 0 : 1 }}
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
