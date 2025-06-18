import { useSearchParams } from "react-router-dom"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

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
  href: string
  tab: string
}

const sidebar: SidebarItem[] = [
  {
    icon: "Palette",
    label: "settings.appearance.title",
    href: "?tab=appearance",
    tab: "appearance"
  },
  { icon: "Languages", label: "settings.language.title", href: "?tab=language", tab: "language" },
  { icon: "FolderSync", label: "settings.sync.title", href: "?tab=sync", tab: "sync" }
] as const

function Sidebar() {
  const { t } = useTranslation()

  const [searchParams] = useSearchParams()

  const tab = searchParams.get("tab") || "home"

  return (
    <aside className="flex h-full flex-row border-r bg-sidebar transition-[background-color,border-color]">
      <ScrollAreaWithHeaders
        className="min-w-[250px]"
        HeaderComponent={() => {
          return (
            <Header className="flex items-center gap-3 pb-3">
              <Typography variant="h1" className="truncate">
                {t("settings.title")}
              </Typography>
            </Header>
          )
        }}
        StickyHeaderComponent={() => {
          return (
            <StickyHeader className="flex items-center gap-3 pb-9">
              <Typography variant="h4" className="truncate">
                {t("settings.title")}
              </Typography>
            </StickyHeader>
          )
        }}
      >
        <div className="flex flex-col gap-2">
          {sidebar.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn("justify-start", tab === item.tab && "bg-muted !text-primary")}
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

export default Sidebar
