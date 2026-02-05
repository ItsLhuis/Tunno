"use client"

import {
  Download,
  Features,
  Footer,
  Hero,
  HowItWorks,
  Metrics,
  Navbar,
  Problem,
  SolutionCard
} from "@components/landing"
import { SmoothScroll } from "@components/ui"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative size-full min-h-screen">
        <Navbar />
        <Hero />
        <Problem />
        <SolutionCard />
        <Features />
        <Metrics />
        <HowItWorks />
        <Download />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
