"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import Link from "next/link"

import { AuroraText, Button, Icon, InView, type IconProps } from "@components/ui"

type DownloadProps = ComponentProps<"section">

type DownloadCardProps = {
  iconName: IconProps["name"]
  title: string
  subtitle: string
  buttonText: string
  href: string
  disabled?: boolean
  delay?: number
}

const DownloadCard = ({
  iconName,
  title,
  subtitle,
  buttonText,
  href,
  disabled,
  delay = 0
}: DownloadCardProps) => (
  <InView
    delay={delay}
    className="bg-card border-border hover:border-primary/30 group flex flex-col items-center rounded-4xl border p-10 text-center transition-colors"
  >
    <div className="bg-foreground/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300">
      <Icon name={iconName} className="h-8 w-8" />
    </div>
    <h3 className="text-foreground mb-2 text-2xl font-bold">{title}</h3>
    <p className="text-muted-foreground mb-8 text-sm">{subtitle}</p>
    {disabled ? (
      <Button
        variant="secondary"
        className="w-full cursor-not-allowed rounded-xl py-6 opacity-60"
        disabled
      >
        Coming Soon
      </Button>
    ) : (
      <Button className="w-full rounded-xl py-6 transition-all" asChild>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Icon name="ExternalLink" className="h-4 w-4" /> {buttonText}
        </Link>
      </Button>
    )}
  </InView>
)

const Download = ({ className, ...props }: DownloadProps) => {
  return (
    <section
      id="download"
      className={cn("relative overflow-hidden pt-32 pb-16", className)}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="bg-primary/10 absolute top-1/4 left-1/4 h-[50vw] w-[50vw] rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-350 px-6 text-center">
        <InView>
          <h2 className="text-foreground mb-5 text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Get <AuroraText>Tunno</AuroraText>
          </h2>
          <p className="text-muted-foreground mx-auto mb-16 max-w-md text-base leading-relaxed md:text-lg">
            Free, open source, and ready to use. Choose your platform.
          </p>
        </InView>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <DownloadCard
            iconName="Terminal"
            title="CLI"
            subtitle="Windows, macOS, Linux"
            buttonText="View on npm"
            href="https://www.npmjs.com/package/@tunno/cli"
            delay={0.1}
          />
          <DownloadCard
            iconName="Monitor"
            title="Desktop"
            subtitle="Windows 10/11"
            buttonText="View on GitHub"
            href="https://github.com/ItsLhuis/Tunno/releases"
            delay={0.15}
          />
          <DownloadCard
            iconName="Smartphone"
            title="Mobile"
            subtitle="Android"
            buttonText="View on GitHub"
            href="https://github.com/ItsLhuis/Tunno/releases"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}

export { Download }
