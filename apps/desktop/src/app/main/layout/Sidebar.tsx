import { useState, useEffect } from "react"

import { Music, Heart, List, Users } from "lucide-react"

import { useLocation, Link } from "react-router-dom"

import { Button, ScrollArea } from "@components/ui"

const sidebarItems = [
  { icon: Music, label: "Songs", href: "/" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: List, label: "PLaylists", href: "/playlists" },
  { icon: Users, label: "Artists", href: "/artists" }
]

function Sidebar() {
  const location = useLocation()

  const activeIndex = sidebarItems.findIndex((item) => item.href === location.pathname)

  const [lastValidIndex, setLastValidIndex] = useState(activeIndex)

  useEffect(() => {
    if (activeIndex !== -1) {
      setLastValidIndex(activeIndex)
    }
  }, [activeIndex])

  const isVisible = activeIndex !== -1

  return (
    <aside className="flex flex-row h-full border-r bg-sidebar transition-[background-color,border-color]">
      <ScrollArea className="relative h-full">
        <div
          className="absolute top-0 left-0 w-1 rounded-tr-lg rounded-br-lg bg-primary z-10 transition-[transform,opacity]"
          style={{
            transform: `translateY(${lastValidIndex * 3.5}rem)`,
            height: "3.5rem",
            opacity: isVisible ? 1 : 0
          }}
        />
        <div className="flex flex-col bg-transparent">
          {sidebarItems.map((item, index) => (
            <Button
              key={item.label}
              tooltip={item.label}
              variant="ghost"
              className="h-14 w-14 rounded-none"
              asChild
            >
              <Link to={item.href}>
                <item.icon
                  className={`transition-colors ${
                    activeIndex === index ? "text-primary" : "text-current"
                  }`}
                />
                <span className="sr-only">Open {item.label} screen</span>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
