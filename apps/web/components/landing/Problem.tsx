"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { AuroraText, Icon, InView, type IconProps } from "@components/ui"

type ProblemProps = ComponentProps<"section">

type ProblemCard = {
  icon: IconProps["name"]
  title: string
  description: string
}

const cards: ProblemCard[] = [
  {
    icon: "FolderSearch",
    title: "Folder Chaos",
    description:
      "MP3s scattered across drives, folders, and old backups. Finding that one track you love feels like a treasure hunt."
  },
  {
    icon: "Tag",
    title: "Missing Metadata",
    description:
      "Wrong album covers, misspelled artists, undefined genres. Your library deserves accurate and complete information."
  },
  {
    icon: "Smartphone",
    title: "Stuck on Desktop",
    description:
      "Your collection stays home while you leave. Without easy sync, your music can't follow you everywhere."
  }
]

const Problem = ({ className, ...props }: ProblemProps) => {
  return (
    <section className={cn("relative overflow-hidden py-32", className)} {...props}>
      <div className="relative z-10 mx-auto max-w-350 px-6">
        <InView className="mx-auto mb-20 max-w-4xl text-center">
          <h2 className="text-foreground mb-5 text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Your music deserves
            <br />
            better <AuroraText>organization</AuroraText>.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed md:text-lg">
            Managing a local music library shouldn't be this complicated.
          </p>
        </InView>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <InView
              key={card.icon}
              delay={0.1 + index * 0.1}
              className="bg-card border-border hover:border-primary/30 group flex flex-col items-center rounded-3xl border p-10 text-center transition-colors"
            >
              <div className="bg-foreground/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300">
                <Icon name={card.icon} className="h-8 w-8" />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">{card.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{card.description}</p>
            </InView>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Problem }
