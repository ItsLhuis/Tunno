"use client"

import { ArrowRight } from "lucide-react"

import Image from "next/image"

import Link from "next/link"

import { Footer, Navbar } from "@components/landing"
import { AuroraText, BlurFade, BorderBeam, Button, Particles, Spotlight } from "@components/ui"

export default function Home() {
  return (
    <div className="relative size-full min-h-screen">
      <Navbar />
      <Particles className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />
      <Spotlight />
      <div className="relative z-10 mx-auto h-full w-full max-w-full px-4 transition-all md:max-w-screen-xl md:px-12 lg:px-20">
        <BlurFade className="mt-20 mb-12 flex flex-col items-center justify-center">
          <Button variant="outline" className="relative rounded-full" asChild>
            <Link href="https://github.com/ItsLhuis/tunno">
              🎊 Introduction Tunno <ArrowRight />
            </Link>
          </Button>
        </BlurFade>
        <BlurFade>
          <section id="home" className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-center text-6xl md:text-8xl">
              Your Music, <AuroraText>Your Way</AuroraText>
            </h1>
            <h3 className="text-muted-foreground w-[80%] text-center md:text-xl">
              A complete ecosystem for downloading, managing, and enjoying your personal music
              library across all devices
            </h3>
            <Button size="lg" asChild>
              <Link href="https://github.com/ItsLhuis/tunno">
                Get Started <ArrowRight />
              </Link>
            </Button>
          </section>
        </BlurFade>
        <BlurFade className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32">
          <div className="gradient bg-primary absolute inset-0 top-[20%] left-1/2 h-1/4 w-3/4 -translate-x-1/2 blur-[4rem] md:top-[15%] md:h-1/3" />
          <div className="bg-opacity-50 ring-foreground/20 relative z-10 -m-2 rounded-2xl p-2 ring-1 backdrop-blur-3xl ring-inset lg:-m-4">
            <BorderBeam size={150} />
            <Image
              src="/tunno/assets/dashboard-dark.png"
              alt="Dashboard"
              width={1500}
              height={1500}
              className="bg-muted/40 rounded-xl"
            />
            <div className="from-background absolute inset-x-0 -bottom-4 z-40 h-1/2 w-full bg-gradient-to-t" />
            <div className="from-background absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t md:-bottom-8" />
          </div>
        </BlurFade>
      </div>
      <Footer />
    </div>
  )
}
