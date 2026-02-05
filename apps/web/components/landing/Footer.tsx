import { useTheme } from "next-themes"

import Image from "next/image"
import Link from "next/link"

import { Button, Grainient, InView, Particles, ThemeSwitcher } from "@components/ui"

const Footer = () => {
  const { theme, setTheme } = useTheme()

  return (
    <InView>
      <footer className="border-border relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-t bg-[radial-gradient(35%_128px_at_50%_0%,oklch(from_var(--primary)_l_c_h/0.2),transparent)] px-6 pt-16 pb-8 md:pb-0 lg:px-8 lg:pt-32">
        <div className="bg-primary absolute top-0 right-1/2 left-1/2 h-1.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col items-start justify-start md:max-w-50">
            <div className="flex items-start">
              <Image src="/tunno/assets/images/app/icon.png" alt="Logo" height={30} width={30} />
            </div>
            <p className="text-muted-foreground mt-4 text-start text-sm">
              Enjoy your music anywhere, anytime.
            </p>
            <span className="text-muted-foreground mt-4 flex items-center text-sm">
              Made by&nbsp;
              <Button variant="link" className="text-foreground font-bold" asChild>
                <Link href="https://github.com/ItsLhuis" target="_blank">
                  ItsLhuis
                </Link>
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
              <div>
                <h3 className="text-base font-medium">Navigation</h3>
                <ul className="text-muted-foreground mt-4 text-sm">
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#home">Home</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#features">Features</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#how-it-works">How It Works</Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="#download">Download</Link>
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="text-base font-medium">Downloads</h3>
                <ul className="text-muted-foreground mt-4 text-sm">
                  <li>
                    <Button variant="link" asChild>
                      <Link href="https://www.npmjs.com/package/@tunno/cli" target="_blank">
                        CLI
                      </Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="https://github.com/ItsLhuis/Tunno/releases" target="_blank">
                        Desktop
                      </Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="https://github.com/ItsLhuis/Tunno/releases" target="_blank">
                        Mobile
                      </Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium">Project</h3>
                <ul className="text-muted-foreground mt-4 text-sm">
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="https://github.com/ItsLhuis/tunno" target="_blank">
                        GitHub
                      </Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="https://github.com/ItsLhuis/tunno/issues" target="_blank">
                        Report Issue
                      </Link>
                    </Button>
                  </li>
                  <li className="mt-2">
                    <Button variant="link" asChild>
                      <Link href="https://github.com/ItsLhuis/tunno/releases" target="_blank">
                        Releases
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
        <Grainient
          className="mt-16 mb-20 w-full rounded-3xl"
          color1="#fa3036"
          color2="#ff8a8a"
          color3="#fc3c44"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        >
          <div className="flex items-center justify-center py-16 md:py-24">
            <span className="text-primary-foreground text-center text-7xl font-black tracking-tight md:text-9xl">
              Tunno
            </span>
          </div>
        </Grainient>
        <Particles className="pointer-events-none fixed inset-0 z-0" />
      </footer>
    </InView>
  )
}

export { Footer }
