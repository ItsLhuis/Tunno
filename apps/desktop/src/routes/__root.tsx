"use client"

import { createRootRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@repo/i18n"

import { useAllStoresHydrated } from "@utils/stores"

import { relaunch } from "@tauri-apps/plugin-process"
import { check } from "@tauri-apps/plugin-updater"

import { migrate } from "@database/migrate"

import { setupAudioPlayer } from "@services/audio"
import { initializeStorage } from "@services/storage"

import { Footer, Sidebar, Titlebar } from "@app/layout"
import { AnimatedOutlet, Fade, Image, toast } from "@components/ui"

import Logo from "@assets/images/app/icons/primary.png"

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  const { language } = useSettingsStore()

  const allStoresHydrated = useAllStoresHydrated()

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
    if (!allStoresHydrated || isAppReady) return

    const startApp = async () => {
      await prepareApp()
      await checkUpdateApp()

      setIsAppReady(true)
    }

    startApp()
  }, [allStoresHydrated])

  return (
    <div className="relative flex h-dvh w-dvw flex-col bg-background transition-[background-color]">
      <Fade
        show={!isAppReady}
        className="absolute inset-0 z-40 flex items-center justify-center bg-background"
      >
        <Image
          src={Logo || "/placeholder.svg"}
          alt="App logo"
          containerClassName="bg-transparent border-none rounded-none"
          className="w-20"
        />
      </Fade>
      <Fade className="z-50">
        <Titlebar isSplashVisible={!isAppReady} />
      </Fade>
      <Fade show={isAppReady} className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <AnimatedOutlet />
        </div>
        <Footer />
      </Fade>
    </div>
  )
}
