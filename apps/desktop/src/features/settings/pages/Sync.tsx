import { Header, ScrollAreaWithHeaders, StickyHeader, Typography } from "@components/ui"

import { ExportSection, SyncSection } from "@features/settings/features/sync/components"
import { SidebarTrigger } from "@features/settings/layout"

const Sync = () => {
  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <SidebarTrigger />
            <Typography variant="h1" className="truncate">
              Sync
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <SidebarTrigger />
            <Typography variant="h4" className="truncate">
              Sync
            </Typography>
          </StickyHeader>
        )
      }}
    >
      <div className="flex flex-col gap-9">
        <SyncSection />
        <ExportSection />
      </div>
    </ScrollAreaWithHeaders>
  )
}

export { Sync }
