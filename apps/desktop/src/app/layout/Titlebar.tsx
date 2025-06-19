import { useLocation, useNavigate } from "react-router-dom"

import { useTranslation } from "@repo/i18n"

import { getCurrentWindow } from "@tauri-apps/api/window"

import Logo from "@assets/images/app/icons/primary.png"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Icon,
  IconButton,
  Image,
  SafeLink
} from "@components/ui"
import { Titlebar as WindowTitlebar } from "@components/window"

import { motion } from "motion/react"

type TitleBarProps = {
  isSplashVisible: boolean
}

function TitleBar({ isSplashVisible }: TitleBarProps) {
  const location = useLocation()

  const navigate = useNavigate()

  const { t } = useTranslation()

  const canGoBack = window.history.state.idx !== 0
  const canGoForward = window.history.state.idx < window.history.length - 1

  const toggleFullScreen = async () => {
    const window = getCurrentWindow()
    const fullscreenState = await window.isFullscreen()
    await window.setFullscreen(!fullscreenState)
  }

  const getTranslatedLabel = (segment: string): string => {
    const segmentMap: Record<string, string> = {
      home: t("breadcrumbs.home.title"),
      songs: t("breadcrumbs.songs.title"),
      favorites: t("breadcrumbs.favorites.title"),
      playlists: t("breadcrumbs.playlists.title"),
      artists: t("breadcrumbs.artists.title"),
      settings: t("breadcrumbs.settings.title"),
      appearance: t("breadcrumbs.settings.appearance.title"),
      language: t("breadcrumbs.settings.language.title"),
      sync: t("breadcrumbs.settings.sync.title"),
      "fast-upload": t("breadcrumbs.fastUpload.title")
    }

    return (
      segmentMap[segment] ||
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
  }

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean)
    const searchParams = new URLSearchParams(location.search)

    if (pathSegments.length === 0) return [{ label: t("breadcrumbs.home.title"), path: "/" }]

    const breadcrumbs = [{ label: t("breadcrumbs.home.title"), path: "/" }]

    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/")
      const label = getTranslatedLabel(segment)

      breadcrumbs.push({ label, path })
    })

    if (searchParams.size > 0) {
      searchParams.forEach((value) => {
        const queryLabel = getTranslatedLabel(value)
        const fullPath = location.pathname + location.search

        breadcrumbs.push({
          label: queryLabel,
          path: fullPath
        })
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="h-full border-b bg-sidebar transition-[background-color,border-color]">
      <WindowTitlebar
        onMinimize={() => getCurrentWindow().minimize()}
        onMaximize={() => getCurrentWindow().toggleMaximize()}
        onFullSceen={() => toggleFullScreen()}
        onClose={() => getCurrentWindow().hide()}
      >
        <div data-tauri-drag-region className="flex flex-1 items-center justify-between">
          <div data-tauri-drag-region className="flex w-full items-center gap-3">
            <div className="flex items-center gap-2">
              <IconButton
                name="ArrowLeft"
                tooltip={{ children: "Go Back", side: "bottom" }}
                variant="ghost"
                onClick={() => navigate(-1)}
                disabled={!canGoBack}
              />
              <IconButton
                name="ArrowRight"
                tooltip={{ children: "Go Forward", side: "bottom" }}
                variant="ghost"
                onClick={() => navigate(1)}
                disabled={!canGoForward}
              />
            </div>
            <Image
              src={Logo}
              alt="App logo"
              containerClassName="bg-transparent"
              className="aspect-auto w-4"
            />
            {!isSplashVisible && (
              <motion.div
                className="ml-3 w-full rounded-md bg-muted p-2 px-3 text-sm transition-[background-color]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-tauri-drag-region
              >
                <Breadcrumb data-tauri-drag-region>
                  <BreadcrumbList data-tauri-drag-region className="gap-0 sm:gap-0">
                    {breadcrumbs.map((breadcrumb, index) => {
                      const isLast = index === breadcrumbs.length - 1
                      const hasParams = new URLSearchParams(location.search).size > 0
                      const isSecondToLast = index === breadcrumbs.length - 2

                      const shouldBeNonClickable = hasParams && isSecondToLast

                      return (
                        <div key={breadcrumb.path} className="flex items-center">
                          <BreadcrumbItem>
                            {isLast || shouldBeNonClickable ? (
                              <BreadcrumbPage data-tauri-drag-region>
                                {breadcrumb.label}
                              </BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink onClick={() => navigate(breadcrumb.path)}>
                                {breadcrumb.label}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator className="mx-2" />
                          )}
                        </div>
                      )
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>
            )}
          </div>
          {!isSplashVisible && (
            <motion.div
              className="ml-3 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                tooltip={{ children: t("fastUpload.title"), side: "bottom" }}
                variant="ghost"
                size="icon"
                asChild
              >
                <SafeLink to="/fast-upload">
                  <Icon name="Zap" />
                </SafeLink>
              </Button>
              <Button
                tooltip={{ children: t("settings.title"), side: "bottom" }}
                variant="ghost"
                size="icon"
                asChild
              >
                <SafeLink to="/settings?tab=appearance">
                  <Icon name="Settings" />
                </SafeLink>
              </Button>
            </motion.div>
          )}
        </div>
      </WindowTitlebar>
    </div>
  )
}

export default TitleBar
