import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { useRouterState, type LinkProps } from "@tanstack/react-router"

import {
  Button,
  Header,
  Icon,
  SafeLink,
  ScrollAreaWithHeaders,
  StickyHeader,
  Typography,
  type IconProps
} from "@components/ui"

type SidebarItem = {
  icon: IconProps["name"]
  label: "settings.appearance.title" | "settings.language.title" | "settings.sync.title"
  href: LinkProps["to"]
}

const sidebar: SidebarItem[] = [
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
    icon: "FolderSync",
    label: "settings.sync.title",
    href: "/settings/sync"
  }
] as const

const Sidebar = () => {
  const { t } = useTranslation()

  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <aside className="flex h-full flex-row border-r transition-[border-color]">
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
        <div className="flex flex-col gap-2">
          {sidebar.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn("justify-start", currentPath === item.href && "bg-muted !text-primary")}
              asChild
            >
              <SafeLink to={item.href}>
                <Icon name={item.icon} />
                <Typography>{t(item.label)}</Typography>
              </SafeLink>
            </Button>
          ))}
        </div>
      </ScrollAreaWithHeaders>
    </aside>
  )
}

export { Sidebar }
