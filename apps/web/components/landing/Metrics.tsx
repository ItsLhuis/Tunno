"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { AuroraText, Icon, InView, type IconProps } from "@components/ui"

type MetricsProps = ComponentProps<"section">

type Feature = {
  icon: IconProps["name"]
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: "Globe",
    title: "Unify All Sources",
    description: "YouTube, SoundCloud, local FLACs—all in one unified library."
  },
  {
    icon: "RefreshCw",
    title: "Seamless Sync",
    description: "Your library, always in harmony across desktop and mobile."
  },
  {
    icon: "WifiOff",
    title: "Offline First",
    description: "No internet? No problem. Your music is always accessible."
  },
  {
    icon: "Database",
    title: "Smart Metadata",
    description: "Enriched via Spotify API for accurate track information."
  },
  {
    icon: "FolderHeart",
    title: "Your Data, Your Devices",
    description: "Everything stored locally. No cloud dependency, no tracking."
  },
  {
    icon: "Sliders",
    title: "Advanced Organization",
    description: "Custom stats & filters. Organize exactly the way you want."
  }
]

const Metrics = ({ className, ...props }: MetricsProps) => {
  return (
    <section
      id="features"
      className={cn("text-foreground relative z-20 pb-32", className)}
      {...props}
    >
      <div className="mx-auto max-w-5xl px-6">
        <InView className="mx-auto mb-20 max-w-4xl text-center">
          <h2 className="text-foreground mb-5 text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            <AuroraText>Everything</AuroraText>
            <br />
            you need
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed md:text-lg">
            Built for people who care about their library, not just their stream.
          </p>
        </InView>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <InView key={feature.icon} className="text-center">
              <div className="bg-foreground/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <Icon name={feature.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </InView>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Metrics }
