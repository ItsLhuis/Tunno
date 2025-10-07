import { useRouter, useRouterState } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { useBreadcrumbs } from "./hooks"

import { getCurrentWindow } from "@tauri-apps/api/window"

import Logo from "@assets/images/app/icons/primary.png"

import {
  AsyncState,
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
  SafeLink,
  Spinner
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

  const { breadcrumbs } = useBreadcrumbs()

  const toggleFullScreen = async () => {
    const window = getCurrentWindow()
    const fullscreenState = await window.isFullscreen()
    await window.setFullscreen(!fullscreenState)
  }

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
              className="ml-3 flex w-full items-center justify-between rounded-md bg-muted p-2 px-3 text-sm"
              data-tauri-drag-region
            >
              <Breadcrumb data-tauri-drag-region>
                <BreadcrumbList data-tauri-drag-region className="gap-0 sm:gap-0">
                  {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1

                    return (
                      <div key={breadcrumb.path} className="flex items-center">
                        <BreadcrumbItem>
                          {isLast || breadcrumb.isNotClickable ? (
                            <BreadcrumbPage data-tauri-drag-region>
                              <AsyncState
                                data={breadcrumb.label}
                                isLoading={breadcrumb.isLoading}
                                loadingComponent={<Spinner variant="ellipsis" size={12} />}
                              >
                                {(label) => <span>{label}</span>}
                              </AsyncState>
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
