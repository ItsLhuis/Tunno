"use client"

import { useEffect, useState } from "react"

import { createRootRoute } from "@tanstack/react-router"

import { useShallow } from "zustand/shallow"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@repo/i18n"

import { useWindowVisibility } from "@hooks/useWindowVisibility"

import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

import { relaunch } from "@tauri-apps/plugin-process"
import { check } from "@tauri-apps/plugin-updater"

import { migrate } from "@database/migrate"

import { initializeStorage } from "@services/storage"

import { Footer, Sidebar, Titlebar } from "@app/layout"
import { AnimatedOutlet, Fade, Image, toast } from "@components/ui"

import Logo from "@assets/images/app/icons/primary.png"

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const [isAppReady, setIsAppReady] = useState(false)

  const [showSplashOnVisibility, setShowSplashOnVisibility] = useState(false)

  const isWindowVisible = useWindowVisibility()

  const { language } = useSettingsStore(
    useShallow((state) => ({
      language: state.language
    }))
  )

  const { i18n, t } = useTranslation()

  const prepareApp = async (): Promise<void> => {
    await initializeStorage()
    await migrate()
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
    const startApp = async () => {
      await prepareApp()
      await checkUpdateApp()

      setIsAppReady(true)
    }

    startApp()
  }, [])

  useEffect(() => {
    if (!isWindowVisible) {
      setShowSplashOnVisibility(true)
      return
    }

    if (showSplashOnVisibility && isAppReady && isWindowVisible) {
      const timer = setTimeout(() => {
        setShowSplashOnVisibility(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isWindowVisible, showSplashOnVisibility, isAppReady])

  useEffect(() => {
    if (!isWindowVisible) return

    const hideFullscreenPlayer = async () => {
      const fullscreenWindow = await WebviewWindow.getByLabel("fullscreenPlayer")
      if (fullscreenWindow) {
        await fullscreenWindow.hide()
      }
    }

    hideFullscreenPlayer()
  }, [isWindowVisible])

  const showSplash = !isAppReady || showSplashOnVisibility || !isWindowVisible

  return (
    <div className="relative flex h-dvh w-dvw flex-col bg-background">
      <Fade
        show={showSplash}
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
        <Titlebar isSplashVisible={showSplashOnVisibility} />
      </Fade>
      {isWindowVisible ? (
        <Fade
          show={isAppReady && !showSplashOnVisibility}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <AnimatedOutlet />
          </div>
          <Footer />
        </Fade>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden" aria-hidden="true" />
      )}
    </div>
  )
}
