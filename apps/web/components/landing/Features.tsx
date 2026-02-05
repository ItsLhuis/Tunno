"use client"

import { useLayoutEffect, useRef, type ComponentProps } from "react"

import { cn } from "@lib/utils"

import gsap from "gsap"

import Image from "next/image"
import Link from "next/link"

import { AuroraText, Button, Icon, InView, type IconProps } from "@components/ui"

type FeaturesProps = ComponentProps<"section">

type Feature = {
  id: number
  icon: IconProps["name"]
  title: string
  highlightWord: string
  description: string
  image: string
  cta: string
  ctaHref: string
  layout: "left" | "center" | "right"
}

const features: Feature[] = [
  {
    id: 1,
    icon: "Terminal",
    title: "Automate your downloads",
    highlightWord: "downloads",
    description:
      "Download from YouTube with one command. Enrich metadata from Spotify. Batch process entire playlists.",
    image: "/Tunno/assets/automateyourdownloads.jpg",
    cta: "View CLI Docs",
    ctaHref: "https://github.com/ItsLhuis/Tunno/blob/main/apps/cli/README.md",
    layout: "left"
  },
  {
    id: 2,
    icon: "Monitor",
    title: "Your music command center",
    highlightWord: "center",
    description:
      "Beautiful organization. Smart search. Listening stats. The ultimate home for your local library.",
    image: "/Tunno/assets/yourmusiccommandcenter.jpg",
    cta: "Download for Windows",
    ctaHref: "#download",
    layout: "center"
  },
  {
    id: 3,
    icon: "Smartphone",
    title: "Listen anywhere",
    highlightWord: "anywhere",
    description:
      "Full library on the go. Offline playback. Auto-sync with desktop. No internet needed.",
    image: "/Tunno/assets/listenanywhere.jpg",
    cta: "Get Android App",
    ctaHref: "#download",
    layout: "right"
  }
]

const Features = ({ className, ...props }: FeaturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const container = containerRef.current
      const trigger = triggerRef.current
      if (!container || !trigger) return

      const totalSections = features.length
      const movePercent = (-100 * (totalSections - 1)) / totalSections

      gsap.to(container, {
        xPercent: movePercent,
        ease: "none",
        scrollTrigger: {
          trigger,
          pin: true,
          scrub: 1,
          snap: 1 / (totalSections - 1),
          end: () => `+=${window.innerWidth * 2.5}`,
          invalidateOnRefresh: true
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="features"
      ref={triggerRef}
      className={cn("text-foreground relative overflow-hidden", className)}
      {...props}
    >
      <div
        ref={containerRef}
        className="flex h-auto w-full flex-col lg:h-screen lg:w-[300%] lg:flex-row"
      >
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="border-border relative flex h-screen w-full shrink-0 items-center justify-center border-r p-6 last:border-r-0 lg:w-screen lg:p-20"
          >
            <span className="text-foreground/5 pointer-events-none absolute top-10 left-10 text-[20vw] leading-none font-black select-none">
              0{index + 1}
            </span>
            <InView
              className={cn(
                "z-10 grid w-full max-w-500 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16",
                feature.layout === "right" && "lg:[direction:rtl]"
              )}
            >
              <div
                className={cn(
                  "order-2 lg:[direction:ltr]",
                  feature.layout === "right" ? "lg:order-2" : "lg:order-1"
                )}
              >
                <div className="bg-card border-border text-primary mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border">
                  <Icon name={feature.icon} className="h-8 w-8" />
                </div>
                <h3 className="mb-5 text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                  {feature.title.split(feature.highlightWord)[0]}
                  <AuroraText>{feature.highlightWord}</AuroraText>
                  {feature.title.split(feature.highlightWord)[1]}
                </h3>
                <p className="text-muted-foreground mb-8 max-w-xl text-base leading-relaxed md:text-lg">
                  {feature.description}
                </p>
                {index === 0 && (
                  <div className="bg-card/80 border-border mb-8 overflow-hidden rounded-xl border backdrop-blur-sm">
                    <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <span className="bg-error/80 h-3 w-3 rounded-full" />
                        <span className="bg-warning/80 h-3 w-3 rounded-full" />
                        <span className="bg-success/80 h-3 w-3 rounded-full" />
                      </div>
                      <span className="text-muted-foreground ml-2 font-mono text-xs">terminal</span>
                    </div>
                    <div className="space-y-1 p-4 font-mono text-sm">
                      <p>
                        <span className="text-primary">$</span>{" "}
                        <span className="text-foreground">tunno youtube --id dQw4w9WgXcQ</span>
                      </p>
                      <p className="text-muted-foreground">
                        <span className="text-success">✓</span> Downloading audio...
                      </p>
                      <p className="text-muted-foreground">
                        <span className="text-success">✓</span> Fetching metadata from Spotify...
                      </p>
                      <p className="text-foreground">
                        <span className="text-success">✓</span> Track saved:{" "}
                        <span className="text-primary">Never Gonna Give You Up</span>
                      </p>
                    </div>
                  </div>
                )}
                <Button variant="link" className="text-primary p-0" asChild>
                  <Link href={feature.ctaHref} target="_blank">
                    {feature.cta}
                    <Icon name="ArrowRight" className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div
                className={cn(
                  "order-1 lg:[direction:ltr]",
                  feature.layout === "right" ? "lg:order-1" : "lg:order-2"
                )}
              >
                <div className="bg-card border-border relative aspect-16/10 w-full max-w-150 overflow-hidden rounded-3xl border shadow-2xl lg:max-w-175 xl:max-w-200">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </InView>
          </div>
        ))}
      </div>
    </section>
  )
}

export { Features }
