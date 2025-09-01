import { useRouter, useRouterState } from "@tanstack/react-router"

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
  Fade,
  Icon,
  IconButton,
  Image,
  SafeLink
} from "@components/ui"
import { Titlebar as WindowTitlebar } from "@components/window"

type TitlebarProps = {
  isSplashVisible: boolean
}

const Titlebar = ({ isSplashVisible }: TitlebarProps) => {
  const router = useRouter()
  const routerState = useRouterState()
  const { t } = useTranslation()

  const canGoBack = router.history.canGoBack()
  const canGoForward = router.history.length > routerState.location.state.__TSR_index + 1

  const toggleFullScreen = async () => {
    const window = getCurrentWindow()
    const fullscreenState = await window.isFullscreen()
    await window.setFullscreen(!fullscreenState)
  }

  const getTranslatedLabel = (segment: string): string => {
    const segmentMap: Record<string, string> = {
      home: t("breadcrumbs.home.title"),
      songs: t("breadcrumbs.songs.title"),
      playlists: t("breadcrumbs.playlists.title"),
      albums: t("breadcrumbs.albums.title"),
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
    const pathname = routerState.location.pathname

    const pathSegments = pathname.split("/").filter(Boolean)

    if (pathSegments.length === 0) {
      return [{ label: t("breadcrumbs.home.title"), path: "/" }]
    }

    const breadcrumbs = [{ label: t("breadcrumbs.home.title"), path: "/" }]

    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/")
      const label = getTranslatedLabel(segment)

      breadcrumbs.push({ label, path })
    })

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
                tooltip={{ children: t("common.goBack"), side: "bottom" }}
                variant="ghost"
                onClick={() => router.history.go(-1)}
                disabled={!canGoBack}
              />
              <IconButton
                name="ArrowRight"
                tooltip={{ children: t("common.goFoward"), side: "bottom" }}
                variant="ghost"
                onClick={() => router.history.go(1)}
                disabled={!canGoForward}
              />
            </div>
            <Image
              src={Logo}
              alt="App logo"
              containerClassName="bg-transparent border-none rounded-none"
              className="aspect-auto w-4"
            />
            <Fade
              show={!isSplashVisible}
              className="ml-3 w-full rounded-md bg-muted p-2 px-3 text-sm"
              data-tauri-drag-region
            >
              <Breadcrumb data-tauri-drag-region>
                <BreadcrumbList data-tauri-drag-region className="gap-0 sm:gap-0">
                  {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    const isNotClickable = breadcrumb.path === "/settings"

                    return (
                      <div key={breadcrumb.path} className="flex items-center">
                        <BreadcrumbItem>
                          {isLast || isNotClickable ? (
                            <BreadcrumbPage data-tauri-drag-region>
                              {breadcrumb.label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              onClick={() => router.navigate({ to: breadcrumb.path })}
                              className="hover:text-foreground"
                            >
                              {breadcrumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="mx-2" />}
                      </div>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </Fade>
          </div>
          <Fade show={!isSplashVisible} className="ml-3 flex items-center gap-2">
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
              <SafeLink to="/settings/appearance">
                <Icon name="Settings" />
              </SafeLink>
            </Button>
          </Fade>
        </div>
      </WindowTitlebar>
    </div>
  )
}

export { Titlebar }

