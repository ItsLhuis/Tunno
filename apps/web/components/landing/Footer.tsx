import { useTheme } from "next-themes"

import Image from "next/image"
import Link from "next/link"

import { AuroraText, BlurFade, Button, ThemeSwitcher } from "@components/ui"

const Footer = () => {
  const { theme, setTheme } = useTheme()

  return (
    <BlurFade>
      <footer className="border-border relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-t bg-[radial-gradient(35%_128px_at_50%_0%,oklch(from_var(--primary)_l_c_h_/_0.2),transparent)] px-6 pt-16 pb-8 md:pb-0 lg:px-8 lg:pt-32">
        <div className="bg-primary absolute top-0 right-1/2 left-1/2 h-1.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-start">
              <Image src="/tunno/assets/images/app/icon.png" alt="Logo" height={30} width={30} />
            </div>
            <p className="text-muted-foreground mt-4 text-start text-sm">
              Enjoy your music anywhere, anytime.
            </p>
            <span className="text-muted-foreground mt-4 flex items-center text-sm">
              Made by&nbsp;
              <Button variant="link" className="text-foreground font-bold" asChild>
                <Link href="https://github.com/ItsLhuis">ItsLhuis</Link>
              </Button>
            </span>
            <div className="text-muted-foreground flex items-center gap-1 pt-2">
              <Link href="https://github.com/ItsLhuis/tunno" target="_blank">
                <Image
                  src="/tunno/assets/images/github.svg"
                  alt="GitHub"
                  width={16}
                  height={16}
                  className="dark:invert"
                />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="">
                <h3 className="text-base font-medium">Apps</h3>
                <ul className="text-muted-foreground mt-4 text-sm">
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#cli">CLI</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#desktop">Desktop</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#mobile">Mobile</Link>
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="text-base font-medium">Integrations</h3>
                <ul className="text-muted-foreground mt-4 text-sm">
                  <li>
                    <Button variant="link" asChild>
                      <Link href="#">Facebook</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#">Instagram</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#">Twitter</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#">LinkedIn</Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="">
                <h3 className="text-base font-medium">Resources</h3>
                <ul className="text-muted-foreground mt-4 text-sm">
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="/resources/blog">Blog</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="/resources/help">Support</Link>
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="text-base font-medium">Company</h3>
                <ul className="text-muted-foreground mt-4 text-sm">
                  <li className="">
                    <Button variant="link" asChild>
                      <Link href="#" className="hover:text-foreground transition-all duration-300">
                        About Us
                      </Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link
                        href="/privacy"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Privacy Policy
                      </Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link
                        href="/terms"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Terms & Conditions
                      </Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex w-full items-center justify-between">
          <div className="w-full md:flex md:items-center md:justify-between">
            <p className="text-muted-foreground text-sm">
              &copy;&nbsp;{new Date().getFullYear()} Tunno. All rights reserved.
            </p>
          </div>
          <div>
            <ThemeSwitcher
              defaultValue="system"
              value={theme as "system" | "dark" | "light"}
              onChange={(theme) => setTheme(theme)}
            />
          </div>
        </div>
        <AuroraText className="mt-16 pb-20 text-center text-7xl md:text-9xl">Tunno</AuroraText>
      </footer>
    </BlurFade>
  )
}

export { Footer }
