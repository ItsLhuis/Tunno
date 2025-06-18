import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useLocation } from "react-router-dom"

import { Button, Icon, SafeLink, ScrollArea, type IconProps } from "@components/ui"

type SidebarItem = {
  icon: IconProps["name"]
  label: "home.title" | "songs.title" | "favorites.title" | "playlists.title" | "artists.title"
  href: string
}

const sidebar: SidebarItem[] = [
  { icon: "Home", label: "home.title", href: "/" },
  { icon: "Music", label: "songs.title", href: "/songs" },
  { icon: "Heart", label: "favorites.title", href: "/favorites" },
  { icon: "List", label: "playlists.title", href: "/playlists" },
  { icon: "Users", label: "artists.title", href: "/artists" }
] as const

function Sidebar() {
  const { t } = useTranslation()

  const location = useLocation()

  const activeIndex = sidebar.findIndex((item) => item.href === location.pathname)
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
                tooltip={t(item.label)}
                variant="ghost"
                className="h-14 w-14 rounded-none"
                asChild
              >
                <SafeLink to={item.href}>
                  <Icon
                    name={item.icon}
                    className={`${activeIndex === index ? "text-primary" : "text-current"}`}
                  />
                  <span className="sr-only">Open {t(item.label)} screen</span>
                </SafeLink>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
