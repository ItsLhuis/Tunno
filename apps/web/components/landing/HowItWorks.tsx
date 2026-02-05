"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { AuroraText, Icon, InView } from "@components/ui"

type HowItWorksProps = ComponentProps<"section">

const steps = [
  {
    icon: "Terminal",
    title: "Download",
    description: "Use Tunno CLI to download tracks with enriched metadata from Spotify."
  },
  {
    icon: "Monitor",
    title: "Organize",
    description: "Import to Desktop app, create playlists, edit metadata, manage your collection."
  },
  {
    icon: "Smartphone",
    title: "Sync",
    description: "Sync to mobile app and listen anywhere, fully offline."
  }
] as const

const HowItWorks = ({ className, ...props }: HowItWorksProps) => {
  return (
    <section id="how-it-works" className={cn("relative py-32", className)} {...props}>
      <div className="mx-auto max-w-350 px-6">
        <InView className="mb-24 text-center">
          <h2 className="text-foreground text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            From download
            <br />
            to <AuroraText>play</AuroraText> in minutes
          </h2>
        </InView>
        <div className="relative flex flex-col items-center justify-between gap-12 md:flex-row">
          <div className="bg-border absolute top-12 left-0 -z-10 hidden h-0.5 w-full md:block" />
          {steps.map((step, index) => (
            <InView
              key={step.icon}
              delay={0.1 + index * 0.15}
              className="flex max-w-sm flex-col items-center text-center"
            >
              <div className="bg-card border-border relative z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-full border">
                <Icon name={step.icon} className="text-primary h-8 w-8" />
                <div className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-foreground mb-4 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </InView>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HowItWorks }
