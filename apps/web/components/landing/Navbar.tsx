import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Icon,
  InView,
  ResizableNavbar,
  type IconProps
} from "@components/ui"

const navbarConfig: {
  logo: { src: string; alt: string; width: number; height: number }
  links: { href: string; label: string }[]
  cta: { href: string; label: string; icon: IconProps["name"] }
} = {
  logo: {
    src: "/Tunno/assets/images/app/icon.png",
    alt: "Logo",
    width: 40,
    height: 40
  },
  links: [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#download", label: "Download" }
  ],
  cta: {
    href: "#download",
    label: "Get Started",
    icon: "ArrowRight"
  }
}

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLinkClick = () => {
    setIsDrawerOpen(false)
  }

  return (
    <ResizableNavbar className="flex items-center px-4">
      <InView>
        <Image
          src={navbarConfig.logo.src}
          alt={navbarConfig.logo.alt}
          width={navbarConfig.logo.width}
          height={navbarConfig.logo.height}
        />
      </InView>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 transform lg:flex">
        <InView>
          <ul className="flex items-center space-x-6">
            {navbarConfig.links.map((link) => (
              <li key={link.href}>
                <Button asChild variant="link">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </InView>
      </nav>
      <div className="ml-auto hidden items-center lg:flex">
        <InView>
          <Button size="sm" asChild>
            <Link href={navbarConfig.cta.href}>
              {navbarConfig.cta.label} <Icon name={navbarConfig.cta.icon} />
            </Link>
          </Button>
        </InView>
      </div>
      <InView className="ml-auto lg:hidden">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="Menu" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="space-y-4 p-6">
              <div className="space-y-3">
                {navbarConfig.links.map((link) => (
                  <Button
                    key={link.href}
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
                    {navbarConfig.cta.label} <Icon name={navbarConfig.cta.icon} />
                  </Link>
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </InView>
    </ResizableNavbar>
  )
}

export { Navbar }
