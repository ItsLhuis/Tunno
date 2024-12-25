import { useLocation, Link } from "react-router-dom"

import { Music, Heart, List, Users } from "lucide-react"

import { Button } from "@components/ui"

const sidebarItems = [
  { icon: Music, label: "Songs", href: "/" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: List, label: "PLaylists", href: "/playlists" },
  { icon: Users, label: "Artists", href: "/artists" }
]

function Sidebar() {
  const location = useLocation()

  const activeIndex = sidebarItems.findIndex((item) => item.href === location.pathname)

  return (
    <aside className="flex flex-row h-full border-r">
      <div className="relative h-full overflow-hidden overflow-y-auto">
        <div
          className="absolute top-0 left-0 w-1 rounded-tr-lg rounded-br-lg bg-primary z-10 transition-[transform,opacity]"
          style={{
            transform: `translateY(${activeIndex * 3.5}rem)`,
            height: "3.5rem"
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
      </div>
    </aside>
  )
}

export default Sidebar
