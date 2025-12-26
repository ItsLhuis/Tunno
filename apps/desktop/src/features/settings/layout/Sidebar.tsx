import { Fragment } from "react"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { useRouterState, type LinkProps } from "@tanstack/react-router"

import {
  Button,
  Header,
  Icon,
  IconButton,
  SafeLink,
  ScrollArea,
  ScrollAreaWithHeaders,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  StickyHeader,
  Typography,
  type IconProps
} from "@components/ui"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { SidebarProvider, useSidebar } from "../context"

type SidebarItem = {
  icon: IconProps["name"]
  label:
    | "settings.appearance.title"
    | "settings.language.title"
    | "settings.equalizer.title"
    | "settings.sync.title"
    | "settings.about.title"
  href: LinkProps["to"]
}

const sidebarItems: SidebarItem[] = [
  {
    icon: "Palette",
    label: "settings.appearance.title",
    href: "/settings/appearance"
  },
  {
    icon: "Languages",
    label: "settings.language.title",
    href: "/settings/language"
  },
  {
    icon: "Sliders",
    label: "settings.equalizer.title",
    href: "/settings/equalizer"
  },
  {
    icon: "FolderSync",
    label: "settings.sync.title",
    href: "/settings/sync"
  },
  {
    icon: "Info",
    label: "settings.about.title",
    href: "/settings/about"
  }
] as const

type SidebarContentProps = {
  onItemClick?: () => void
}

const SidebarContent = ({ onItemClick }: SidebarContentProps) => {
  const { t } = useTranslation()

  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <div className="flex flex-col gap-2">
      {sidebarItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          className={cn("justify-start", currentPath === item.href && "bg-muted text-primary!")}
          asChild
          onClick={onItemClick}
        >
          <SafeLink to={item.href}>
            <Icon name={item.icon} />
            <Typography>{t(item.label)}</Typography>
          </SafeLink>
        </Button>
      ))}
    </div>
  )
}

const SidebarTrigger = () => {
  const { t } = useTranslation()

  const { isCompact } = useSidebar()

  if (!isCompact) return null

  return (
    <SheetTrigger asChild>
      <IconButton name="Menu" tooltip={t("settings.title")} variant="ghost" className="shrink-0" />
    </SheetTrigger>
  )
}

const SidebarSheet = () => {
  const { t } = useTranslation()

  const { setOpen } = useSidebar()

  return (
    <SheetContent
      side="left"
      className="bg-sidebar flex w-[280px] flex-col gap-0 p-0"
      aria-describedby={undefined}
    >
      <SheetHeader className="p-6">
        <SheetTitle>{t("settings.title")}</SheetTitle>
      </SheetHeader>
      <Separator />
      <ScrollArea className="h-full">
        <div className="p-6">
          <SidebarContent onItemClick={() => setOpen(false)} />
        </div>
      </ScrollArea>
    </SheetContent>
  )
}

const SidebarDesktop = () => {
  const { t } = useTranslation()

  return (
    <aside className="flex h-full flex-row border-r">
      <ScrollAreaWithHeaders
        containerClassName="bg-sidebar"
        className="min-w-[250px]"
        HeaderComponent={() => (
          <Header className="flex items-center gap-3 pb-3">
            <Typography variant="h1" className="truncate">
              {t("settings.title")}
            </Typography>
          </Header>
        )}
        StickyHeaderComponent={() => (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              {t("settings.title")}
            </Typography>
          </StickyHeader>
        )}
      >
        <SidebarContent />
      </ScrollAreaWithHeaders>
    </aside>
  )
}

type SidebarProps = {
  children: React.ReactNode
}

const SidebarLayout = ({ children }: SidebarProps) => {
  const { open, setOpen, isCompact } = useSidebar()

  if (isCompact) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        {children}
        <SidebarSheet />
      </Sheet>
    )
  }

  return (
    <Fragment>
      <SidebarDesktop />
      {children}
    </Fragment>
  )
}

const Sidebar = ({ children }: SidebarProps) => {
  const { isBelow } = useBreakpoint()
  const isCompact = isBelow("md")

  return (
    <SidebarProvider isCompact={isCompact}>
      <SidebarLayout>{children}</SidebarLayout>
    </SidebarProvider>
  )
}

export { Sidebar, SidebarTrigger }
