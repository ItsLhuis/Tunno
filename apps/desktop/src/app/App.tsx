import { useEffect, useState } from "react"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@i18n/hooks"

import { initializeAppStorage } from "@lib/appStorage"

import { migrate } from "@database/migrate"

import { setupAudioPlayer } from "@services/audio"

import { BrowserRouter } from "react-router-dom"

import Logo from "@assets/images/app/icons/primary.png"

import { ErrorBoundary } from "@components/core"
import { Image } from "@components/ui"

import { Footer, Main, Sidebar, Titlebar } from "@/app/layout"

import { motion } from "motion/react"

function App() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const { hasHydrated, language } = useSettingsStore()

  const { i18n } = useTranslation()

  const prepareApp = async (): Promise<void> => {
    await initializeAppStorage()
    await migrate()
    await setupAudioPlayer()
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
      <div className="relative flex h-dvh w-dvw flex-col bg-background transition-[background-color]">
        {!isAppReady && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image src={Logo} alt="App logo" containerClassName="bg-transparent" className="w-20" />
          </motion.div>
        )}
        <motion.div className="z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Titlebar isSplashVisible={!isAppReady} />
        </motion.div>
        <ErrorBoundary>
          <motion.div
            className="flex h-full w-full flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: !isAppReady ? 0 : 1 }}
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
