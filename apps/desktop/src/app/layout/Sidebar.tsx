import { Fragment, useCallback, useEffect, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useRouterState, type LinkProps } from "@tanstack/react-router"

import { useFetchSidebarItems } from "@features/sidebar/hooks"

import {
  Button,
  Icon,
  SafeLink,
  ScrollArea,
  Separator,
  VirtualizedList,
  type IconProps
} from "@components/ui"

import { SidebarItem } from "@features/sidebar/components"

import { type SidebarItemWithDetails } from "@repo/api"

type SidebarNavItem = {
  icon: IconProps["name"]
  label: "home.title" | "songs.title" | "playlists.title" | "albums.title" | "artists.title"
  href: LinkProps["to"]
}

const navItems: SidebarNavItem[] = [
  { icon: "Home", label: "home.title", href: "/" },
  { icon: "Music", label: "songs.title", href: "/songs" },
  { icon: "DiscAlbum", label: "albums.title", href: "/albums" },
  { icon: "ListMusic", label: "playlists.title", href: "/playlists" },
  { icon: "Users", label: "artists.title", href: "/artists" }
] as const

const Sidebar = () => {
  const { t } = useTranslation()

  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: sidebarItems } = useFetchSidebarItems()

  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const activeIndex = navItems.findIndex((item) => item.href === currentPath)
  const [lastValidIndex, setLastValidIndex] = useState<number>(activeIndex)

  useEffect(() => {
    if (activeIndex !== -1) setLastValidIndex(activeIndex)
  }, [activeIndex])

  const isVisible = activeIndex !== -1

  const hasSidebarItems = sidebarItems && sidebarItems.length > 0

  const keyExtractor = useCallback(
    (item: SidebarItemWithDetails) => `${item.entityType}-${item.entityId}`,
    []
  )

  return (
    <aside className="bg-sidebar flex h-full flex-row border-r">
      <ScrollArea className="h-full" ref={scrollRef}>
        <div className="relative">
          <div
            className="bg-primary absolute top-0 left-0 w-1 rounded-tr-lg rounded-br-lg transition-[transform,opacity]"
            style={{
              transform: `translateY(${lastValidIndex * 3.5}rem)`,
              height: "3.5rem",
              opacity: isVisible ? 1 : 0
            }}
          />
          <div className="flex flex-col bg-transparent">
            {navItems.map((item, index) => (
              <Button
                key={item.label}
                tooltip={{ children: t(item.label), side: "right" }}
                variant="ghost"
                className="size-14 rounded-none"
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
          {hasSidebarItems && (
            <Fragment>
              <Separator />
              <VirtualizedList
                scrollRef={scrollRef}
                data={sidebarItems}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => <SidebarItem item={item} />}
                estimateItemHeight={40}
              />
            </Fragment>
          )}
        </div>
      </ScrollArea>
    </aside>
  )
}

export { Sidebar }
