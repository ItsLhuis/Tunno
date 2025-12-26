import { createFileRoute } from "@tanstack/react-router"

import { Sidebar } from "@features/settings/layout"

import { AnimatedOutlet } from "@components/ui"

export const Route = createFileRoute("/settings")({
  component: SettingsLayout
})

function SettingsLayout() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>
        <AnimatedOutlet />
      </Sidebar>
    </div>
  )
}
