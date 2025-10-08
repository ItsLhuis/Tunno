import { useRouter, useRouterState } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { useBreadcrumbs } from "./hooks"

import { useShallow } from "zustand/shallow"

import { useRefreshStore } from "./stores/useRefreshStore"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { cn } from "@lib/utils"

import Logo from "@assets/images/app/icons/primary.png"

import { Titlebar as WindowTitlebar } from "@components/window"

import {
  AsyncState,
  Button,
  Fade,
  Icon,
  IconButton,
  Image,
  SafeLink,
  Spinner,
  Typography
} from "@components/ui"

import { OverflowMenu } from "@components/ui/OverflowMenu"

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

  const { canRefresh, tooltip, isLoading, showSuccess, showError, executeRefresh } =
    useRefreshStore(
      useShallow((state) => ({
        canRefresh: state.canRefresh,
        tooltip: state.tooltip,
        isLoading: state.isLoading,
        showSuccess: state.showSuccess,
        showError: state.showError,
        executeRefresh: state.executeRefresh
      }))
    )

  const toggleFullScreen = async () => {
    const window = getCurrentWindow()
    const fullscreenState = await window.isFullscreen()
    await window.setFullscreen(!fullscreenState)
  }

  return (
    <div className="h-full border-b bg-sidebar transition-colors">
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
              className="mr-3 aspect-auto w-4"
            />
            <Fade show={!isSplashVisible} className="flex w-full items-center rounded-md bg-muted">
              <OverflowMenu data-tauri-drag-region className="flex-1 px-3" triggerClassName="-ml-3">
                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1

                  return (
                    <div key={breadcrumb.path} className="flex items-center">
                      {isLast || breadcrumb.isNotClickable ? (
                        <AsyncState
                          data={breadcrumb.label}
                          isLoading={breadcrumb.isLoading}
                          loadingComponent={<Spinner variant="ellipsis" size={12} />}
                          className="transition-colors"
                        >
                          {(label) => (
                            <Typography data-tauri-drag-region affects={["small", "muted"]}>
                              {label}
                            </Typography>
                          )}
                        </AsyncState>
                      ) : (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0"
                          onClick={() => router.navigate({ to: breadcrumb.path })}
                        >
                          {breadcrumb.label}
                        </Button>
                      )}
                      {index < breadcrumbs.length - 1 && (
                        <Icon name="ChevronRight" className="mx-1 text-muted-foreground" />
                      )}
                    </div>
                  )
                })}
              </OverflowMenu>
              <Button
                tooltip={tooltip || t("common.refresh")}
                variant="ghost"
                size="icon"
                onClick={executeRefresh}
                disabled={!canRefresh || isLoading}
                className="relative"
              >
                <div
                  className={cn(
                    "transition-all",
                    !showSuccess && !showError
                      ? "rotate-0 scale-100 opacity-100"
                      : "rotate-90 scale-0 opacity-0"
                  )}
                >
                  <Icon name="RefreshCw" className={cn(isLoading && "animate-spin")} />
                </div>
                <Icon
                  name="Check"
                  className={cn(
                    "absolute transition-all",
                    showSuccess
                      ? "rotate-0 scale-100 text-success opacity-100"
                      : "rotate-90 scale-0 opacity-0"
                  )}
                />
                <Icon
                  name="X"
                  className={cn(
                    "absolute transition-all",
                    showError
                      ? "rotate-0 scale-100 text-error opacity-100"
                      : "rotate-90 scale-0 opacity-0"
                  )}
                />
              </Button>
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
