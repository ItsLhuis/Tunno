"use client"

import { createRootRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@repo/i18n"

import { relaunch } from "@tauri-apps/plugin-process"
import { check } from "@tauri-apps/plugin-updater"

import { migrate } from "@database/migrate"
import { setupAudioPlayer } from "@services/audio"
import { initializeStorage } from "@services/storage"

import { Footer, Sidebar, Titlebar } from "@app/layout"
import { AnimatedOutlet, Image, toast } from "@components/ui"

import { motion } from "motion/react"

import Logo from "@assets/images/app/icons/primary.png"

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const { hasHydrated, language } = useSettingsStore()

  const { i18n, t } = useTranslation()

  const prepareApp = async (): Promise<void> => {
    await initializeStorage()
    await migrate()
    await setupAudioPlayer()
    await i18n.changeLanguage(language)

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  const checkUpdateApp = () => {
    return new Promise(async (resolve) => {
      try {
        const update = await check()

        if (!update) return resolve(true)

        const updateAndInstall = async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          await update.downloadAndInstall()
          return true
        }

        toast.promise(updateAndInstall(), {
          loading: t("update.downloading"),
          description: t("update.downloadingDescription"),
          success: async () => {
            await relaunch()
            resolve(true)
            return t("update.installedSuccess")
          },
          error: (error) => {
            resolve(error)
            return t("update.failed")
          }
        })
      } catch (error) {
        resolve(error)
      }
    })
  }

  useEffect(() => {
    if (!hasHydrated || isAppReady) return

    const startApp = async () => {
      await prepareApp()
      await checkUpdateApp()

      setIsAppReady(true)
    }

    startApp()
  }, [hasHydrated])

  return (
    <div className="relative flex h-dvh w-dvw flex-col bg-background transition-[background-color]">
      {!isAppReady && (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Image
            src={Logo || "/placeholder.svg"}
            alt="App logo"
            containerClassName="bg-transparent border-none rounded-none"
            className="w-20"
          />
        </motion.div>
      )}
      <motion.div className="z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Titlebar isSplashVisible={!isAppReady} />
      </motion.div>
      {isAppReady && (
        <motion.div
          className="flex flex-1 flex-col overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <AnimatedOutlet />
          </div>
          <Footer />
        </motion.div>
      )}
    </div>
  )
}
