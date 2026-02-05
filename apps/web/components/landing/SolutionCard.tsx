"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { AuroraText, Icon, InView } from "@components/ui"

type SolutionCardProps = ComponentProps<"section">

const apps = [
  {
    icon: "Terminal",
    title: "CLI",
    description: "Automate downloads with rich metadata via terminal."
  },
  {
    icon: "Monitor",
    title: "Desktop",
    description: "Organize, play, and manage your complete library."
  },
  {
    icon: "Smartphone",
    title: "Mobile",
    description: "Sync wirelessly and listen anywhere, fully offline."
  }
] as const

const SolutionCard = ({ className, ...props }: SolutionCardProps) => {
  return (
    <section className={cn("bg-background px-6 pb-32", className)} {...props}>
      <div className="mx-auto max-w-350">
        <InView className="mx-auto mb-16 max-w-3xl text-center">
          <span className="border-primary/30 text-primary bg-primary/5 mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
            The Ecosystem
          </span>
          <h2 className="text-foreground text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Three apps.
            <br />
            <AuroraText>One</AuroraText> experience.
          </h2>
        </InView>
        <div className="relative flex flex-col items-center justify-between gap-12 md:flex-row">
          <div className="bg-border absolute top-12 left-0 -z-10 hidden h-0.5 w-full md:block" />
          {apps.map((app, index) => (
            <InView
              key={app.icon}
              delay={0.1 + index * 0.15}
              className="flex max-w-sm flex-col items-center text-center"
            >
              <div className="bg-card border-border relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border">
                <Icon name={app.icon} className="text-primary h-10 w-10" />
                <div className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">{app.title}</h3>
              <p className="text-muted-foreground">{app.description}</p>
            </InView>
          ))}
        </div>
      </div>
    </section>
  )
}

export { SolutionCard }
