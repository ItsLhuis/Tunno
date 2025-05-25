import { Fragment, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { ArrowRight, Menu } from "lucide-react"

import { Button, Drawer, DrawerContent, DrawerTrigger, ResizableNavbar } from "@components/ui"

const navbarConfig: {
  logo: { src: string; alt: string; width: number; height: number }
  links: { href: string; label: string }[]
  cta: { href: string; label: string; icon: React.ElementType }
} = {
  logo: {
    src: "/tunno/assets/images/app/icon.png",
    alt: "Logo",
    width: 40,
    height: 40
  },
  links: [
    { href: "#", label: "Home" },
    { href: "#apps", label: "Apps" },
    { href: "#features", label: "Features" }
  ],
  cta: {
    href: "https://github.com/ItsLhuis/tunno",
    label: "Get Started",
    icon: ArrowRight
  }
}

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLinkClick = () => {
    setIsDrawerOpen(false)
  }

  return (
    <Fragment>
      <ResizableNavbar className="flex items-center px-4">
        <Image
          src={navbarConfig.logo.src}
          alt={navbarConfig.logo.alt}
          width={navbarConfig.logo.width}
          height={navbarConfig.logo.height}
        />
        <nav className="absolute left-1/2 hidden -translate-x-1/2 transform lg:flex">
          <ul className="flex items-center space-x-6">
            {navbarConfig.links.map((link, index) => (
              <li key={index}>
                <Button asChild variant="link">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center lg:flex">
          <Button size="sm" asChild>
            <Link href={navbarConfig.cta.href}>
              {navbarConfig.cta.label} <navbarConfig.cta.icon />
            </Link>
          </Button>
        </div>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="flex lg:hidden">
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="space-y-4 p-6">
              <div className="space-y-3">
                {navbarConfig.links.map((link, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="ghost"
                    className="w-full justify-start text-lg"
                    onClick={handleLinkClick}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </div>
              <div className="border-t pt-4">
                <Button asChild className="w-full" onClick={handleLinkClick}>
                  <Link href={navbarConfig.cta.href}>
                    {navbarConfig.cta.label} <navbarConfig.cta.icon />
                  </Link>
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </ResizableNavbar>
    </Fragment>
  )
}

export { Navbar }
