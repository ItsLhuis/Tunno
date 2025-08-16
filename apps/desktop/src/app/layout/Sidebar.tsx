import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useRouterState, type LinkProps } from "@tanstack/react-router"

import { Button, Icon, SafeLink, ScrollArea, type IconProps } from "@components/ui"

type SidebarItem = {
  icon: IconProps["name"]
  label: "home.title" | "songs.title" | "favorites.title" | "playlists.title" | "artists.title"
  href: LinkProps["to"]
}

const sidebar: SidebarItem[] = [
  { icon: "Home", label: "home.title", href: "/" },
  { icon: "Music", label: "songs.title", href: "/songs" },
  { icon: "Heart", label: "favorites.title", href: "/favorites" },
  { icon: "List", label: "playlists.title", href: "/playlists" },
  { icon: "Users", label: "artists.title", href: "/artists" }
] as const

const Sidebar = () => {
  const { t } = useTranslation()

  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const activeIndex = sidebar.findIndex((item) => item.href === currentPath)
  const [lastValidIndex, setLastValidIndex] = useState<number>(activeIndex)

  useEffect(() => {
    if (activeIndex !== -1) setLastValidIndex(activeIndex)
  }, [activeIndex])

  const isVisible = activeIndex !== -1

  return (
    <aside className="flex h-full flex-row border-r bg-sidebar transition-[background-color,border-color]">
      <ScrollArea className="h-full">
        <div className="relative">
          <div
            className="absolute left-0 top-0 w-1 rounded-br-lg rounded-tr-lg bg-primary transition-[transform,opacity]"
            style={{
              transform: `translateY(${lastValidIndex * 3.5}rem)`,
              height: "3.5rem",
              opacity: isVisible ? 1 : 0
            }}
          />
          <div className="flex flex-col bg-transparent">
            {sidebar.map((item, index) => (
              <Button
                key={item.label}
                tooltip={{ children: t(item.label), side: "right" }}
                variant="ghost"
                className="h-14 w-14 rounded-none"
                asChild
              >
                <SafeLink to={item.href}>
                  <Icon
                    name={item.icon}
                    className={`${activeIndex === index ? "text-primary" : "text-current"}`}
                  />
                </SafeLink>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

export { Sidebar }
