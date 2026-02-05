"use client"

import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps } from "react"

import { cn } from "@lib/utils"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useTheme } from "next-themes"

import Image from "next/image"
import Link from "next/link"

import { AuroraText, Button, Icon, InView } from "@components/ui"

type HeroProps = ComponentProps<"section">

const DEVICE_MOCKUPS = [
  {
    id: "mobile",
    alt: "Tunno mobile app",
    width: 300,
    height: 600
  },
  {
    id: "tablet",
    alt: "Tunno tablet app",
    width: 400,
    height: 280
  },
  {
    id: "desktop",
    alt: "Tunno desktop app",
    width: 700,
    height: 450
  }
]

const Hero = ({ className, ...props }: HeroProps) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLElement>(null)

  const highlightRef = useRef<HTMLSpanElement>(null)

  const imagesContainerRef = useRef<HTMLDivElement>(null)

  const mobileImageRef = useRef<HTMLDivElement>(null)
  const tabletImageRef = useRef<HTMLDivElement>(null)
  const desktopImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themePath = mounted ? (resolvedTheme === "dark" ? "dark" : "light") : "light"
  const mobileImageSrc = `/Tunno/assets/${themePath}/mobile.jpg`
  const tabletImageSrc = `/Tunno/assets/${themePath}/tablet.jpg`
  const desktopImageSrc = `/Tunno/assets/${themePath}/desktop.jpg`

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        skewY: 7
      })
        .to(
          highlightRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "expo.inOut"
          },
          "-=0.5"
        )
        .from(
          ".hero-ui",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1
          },
          "-=0.4"
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1280px)", () => {
      const mobile = mobileImageRef.current
      const tablet = tabletImageRef.current
      const desktop = desktopImageRef.current
      const container = imagesContainerRef.current

      if (!mobile || !tablet || !desktop || !container) return

      const mobileOffset = 250
      const tabletOffset = 150

      gsap.set(mobile, { x: mobileOffset, zIndex: 30 })
      gsap.set(tablet, { x: tabletOffset, zIndex: 20 })
      gsap.set(desktop, { x: -mobileOffset - tabletOffset, zIndex: 10 })

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        end: "top 20%",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(mobile, { x: mobileOffset * (1 - progress) })
          gsap.set(tablet, { x: tabletOffset * (1 - progress) })
          gsap.set(desktop, { x: (-mobileOffset - tabletOffset) * (1 - progress) })
        }
      })

      return () => {
        scrollTrigger.kill()
      }
    })

    mm.add("(max-width: 1279px)", () => {
      const mobile = mobileImageRef.current
      const tablet = tabletImageRef.current
      const desktop = desktopImageRef.current

      if (!mobile || !tablet || !desktop) return

      gsap.set([mobile, tablet, desktop], { x: 0, zIndex: "auto" })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className={cn(
        "bg-background text-foreground relative flex min-h-screen flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      <InView className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-32 md:px-8">
        <div className="mb-14 flex flex-col items-center px-4 text-center md:px-8 lg:mb-16">
          <span className="border-primary/30 text-primary bg-primary/5 mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
            Now Available
          </span>
          <h1 className="text-foreground mb-5 text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            <div className="overflow-hidden">
              <div className="hero-line">
                Your <AuroraText>forever</AuroraText> space for
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line">everything you listen to.</div>
            </div>
          </h1>
          <p className="hero-ui text-muted-foreground mb-8 max-w-md text-base leading-relaxed md:text-lg">
            Download, organize, and sync your entire music collection across all your devices.
          </p>
          <div className="hero-ui flex flex-wrap justify-center gap-3">
            <Button size="lg" className="group h-11 rounded-full px-6" asChild>
              <Link href="#download">
                Get started
                <Icon name="ArrowRight" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-11 rounded-full px-6" asChild>
              <Link href="#how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
        <div ref={imagesContainerRef} className="hero-ui relative w-full pb-8 lg:pb-12">
          <div className="flex flex-col items-center gap-6 px-4 sm:gap-8 xl:hidden">
            <div ref={mobileImageRef} className="w-full max-w-70 sm:max-w-80">
              <InView
                once
                delay={1}
                direction="up"
                className="bg-card border-border overflow-hidden rounded-2xl border shadow-2xl"
              >
                <Image
                  src={mobileImageSrc}
                  alt={DEVICE_MOCKUPS[0].alt}
                  width={DEVICE_MOCKUPS[0].width}
                  height={DEVICE_MOCKUPS[0].height}
                  className="h-auto w-full"
                  unoptimized
                />
              </InView>
            </div>
            <div ref={tabletImageRef} className="w-full max-w-80 sm:max-w-100">
              <InView
                once
                delay={1.25}
                direction="up"
                className="bg-card border-border overflow-hidden rounded-2xl border shadow-2xl"
              >
                <Image
                  src={tabletImageSrc}
                  alt={DEVICE_MOCKUPS[1].alt}
                  width={DEVICE_MOCKUPS[1].width}
                  height={DEVICE_MOCKUPS[1].height}
                  className="h-auto w-full"
                  unoptimized
                />
              </InView>
            </div>
            <div ref={desktopImageRef} className="w-full max-w-125 sm:max-w-150">
              <InView
                once
                delay={1.5}
                direction="up"
                className="bg-card border-border overflow-hidden rounded-2xl border shadow-2xl"
              >
                <Image
                  src={desktopImageSrc}
                  alt={DEVICE_MOCKUPS[2].alt}
                  width={DEVICE_MOCKUPS[2].width}
                  height={DEVICE_MOCKUPS[2].height}
                  className="h-auto w-full"
                  unoptimized
                />
              </InView>
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="flex items-end justify-center gap-6 px-4">
              <div ref={mobileImageRef} className="relative shrink-0 will-change-transform">
                <InView
                  once
                  delay={1}
                  direction="up"
                  className="bg-card border-border overflow-hidden rounded-2xl border shadow-2xl"
                >
                  <Image
                    src={mobileImageSrc}
                    alt={DEVICE_MOCKUPS[0].alt}
                    width={DEVICE_MOCKUPS[0].width}
                    height={DEVICE_MOCKUPS[0].height}
                    className="h-auto w-full"
                    style={{ maxWidth: "300px" }}
                    unoptimized
                  />
                </InView>
              </div>
              <div ref={tabletImageRef} className="relative shrink-0 will-change-transform">
                <InView
                  once
                  delay={1.25}
                  direction="up"
                  className="bg-card border-border overflow-hidden rounded-2xl border shadow-2xl"
                >
                  <Image
                    src={tabletImageSrc}
                    alt={DEVICE_MOCKUPS[1].alt}
                    width={DEVICE_MOCKUPS[1].width}
                    height={DEVICE_MOCKUPS[1].height}
                    className="h-auto w-full"
                    style={{ maxWidth: "400px" }}
                    unoptimized
                  />
                </InView>
              </div>
              <div ref={desktopImageRef} className="relative shrink-0 will-change-transform">
                <InView
                  once
                  delay={1.5}
                  direction="up"
                  className="bg-card border-border overflow-hidden rounded-2xl border shadow-2xl"
                >
                  <Image
                    src={desktopImageSrc}
                    alt={DEVICE_MOCKUPS[2].alt}
                    width={DEVICE_MOCKUPS[2].width}
                    height={DEVICE_MOCKUPS[2].height}
                    className="h-auto w-full"
                    style={{ maxWidth: "700px" }}
                    unoptimized
                  />
                </InView>
              </div>
            </div>
          </div>
        </div>
      </InView>
    </section>
  )
}

export { Hero }
