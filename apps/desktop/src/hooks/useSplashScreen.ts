import { useEffect, useState } from "react"

import { getCurrentWindow } from "@tauri-apps/api/window"

type UseSplashScreenProps = {
  onConfig?: () => Promise<void>
}

export const useSplashScreen = ({ onConfig }: UseSplashScreenProps = {}) => {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true)

  useEffect(() => {
    const initializeApp = async () => {
      let showMainWindowTimeout: NodeJS.Timeout
      let splashTimeout: NodeJS.Timeout

      showMainWindowTimeout = setTimeout(async () => {
        await getCurrentWindow().show()
        await getCurrentWindow().setFocus()
      }, 200)

      if (onConfig) {
        await onConfig().then(
          () =>
            (splashTimeout = setTimeout(() => {
              setIsSplashVisible(false)
            }, 800))
        )
      } else {
        splashTimeout = setTimeout(() => {
          setIsSplashVisible(false)
        }, 800)
      }

      return () => {
        clearTimeout(showMainWindowTimeout)
        clearTimeout(splashTimeout)
      }
    }

    initializeApp()
  }, [])

  return { isSplashVisible }
}
