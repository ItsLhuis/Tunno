import { Fragment } from "react"

import { useRouter, useRouterState } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { useBreakpoint } from "@hooks/useBreakpoint"

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Fade,
  Icon,
  IconButton,
  Image,
  OverflowMenu,
  SafeLink,
  Spinner,
  Typography
} from "@components/ui"

type TitlebarProps = {
  isSplashVisible: boolean
}

const Titlebar = ({ isSplashVisible }: TitlebarProps) => {
  const router = useRouter()
  const routerState = useRouterState()

  const { t } = useTranslation()

  const { isBelow } = useBreakpoint()
  const isCompact = isBelow("sm")

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
    <div className="bg-sidebar h-full border-b">
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
                tooltip={{ children: t("common.goForward"), side: "bottom" }}
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
            <Fade show={!isSplashVisible} className="bg-muted flex w-full items-center rounded">
              <OverflowMenu
                data-tauri-drag-region
                className="flex-1 px-3"
                triggerClassName="-ml-3"
                renderOverflowItem={(_, index) => {
                  const breadcrumb = breadcrumbs[index]
                  const isLast = index === breadcrumbs.length - 1

                  if (isLast || breadcrumb.isNotClickable) {
                    return (
                      <DropdownMenuItem key={breadcrumb.path} disabled>
                        <Icon name="ChevronRight" />
                        {breadcrumb.label || t("common.noResultsFound")}
                      </DropdownMenuItem>
                    )
                  }

                  return (
                    <DropdownMenuItem
                      key={breadcrumb.path}
                      onClick={() => router.navigate({ to: breadcrumb.path })}
                    >
                      <Icon name="ChevronRight" />
                      {breadcrumb.label}
                    </DropdownMenuItem>
                  )
                }}
              >
                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1

                  return (
                    <div key={breadcrumb.path} className="flex items-center">
                      {isLast || breadcrumb.isNotClickable ? (
                        <AsyncState
                          data={breadcrumb.label}
                          isLoading={breadcrumb.isLoading}
                          LoadingComponent={<Spinner variant="ellipsis" size={12} />}
                          ErrorComponent={
                            <Typography
                              data-tauri-drag-region
                              affects="small"
                              className="line-clamp-1 leading-4 break-all"
                            >
                              {t("common.noResultsFound")}
                            </Typography>
                          }
                          EmptyComponent={
                            <Typography
                              data-tauri-drag-region
                              affects="small"
                              className="line-clamp-1 leading-4 break-all"
                            >
                              {t("common.noResultsFound")}
                            </Typography>
                          }
                          className="items-start transition-colors"
                        >
                          {(label) => (
                            <Typography
                              data-tauri-drag-region
                              affects="small"
                              className="line-clamp-1 leading-4 break-all"
                            >
                              {label}
                            </Typography>
                          )}
                        </AsyncState>
                      ) : (
                        <Button
                          variant="link"
                          size="sm"
                          className="text-muted-foreground p-0 leading-4"
                          onClick={() => router.navigate({ to: breadcrumb.path })}
                        >
                          {breadcrumb.label}
                        </Button>
                      )}
                      {index < breadcrumbs.length - 1 && (
                        <Icon name="ChevronRight" className="text-muted-foreground mx-1" />
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
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-0 rotate-90 opacity-0"
                  )}
                >
                  <Icon name="RefreshCw" className={cn(isLoading && "animate-spin")} />
                </div>
                <Icon
                  name="Check"
                  className={cn(
                    "absolute transition-all",
                    showSuccess
                      ? "text-success scale-100 rotate-0 opacity-100"
                      : "scale-0 rotate-90 opacity-0"
                  )}
                />
                <Icon
                  name="X"
                  className={cn(
                    "absolute transition-all",
                    showError
                      ? "text-error scale-100 rotate-0 opacity-100"
                      : "scale-0 rotate-90 opacity-0"
                  )}
                />
              </Button>
            </Fade>
          </div>
          <Fade show={!isSplashVisible} className="ml-3 flex items-center gap-2">
            {isCompact ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton name="MoreHorizontal" variant="ghost" tooltip={t("common.more")} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <SafeLink to="/fast-upload">
                      <Icon name="Zap" />
                      {t("fastUpload.title")}
                    </SafeLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <SafeLink to="/settings/appearance">
                      <Icon name="Settings" />
                      {t("settings.title")}
                    </SafeLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </Fade>
        </div>
      </WindowTitlebar>
    </div>
  )
}

export { Titlebar }
