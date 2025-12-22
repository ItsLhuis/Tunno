import { Header, ScrollAreaWithHeaders, StickyHeader, Typography } from "@components/ui"

import { ExportSection } from "@features/sync/components"

const Sync = () => {
  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3">
            <Typography variant="h1" className="truncate">
              Sync
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              Sync
            </Typography>
          </StickyHeader>
        )
      }}
    >
      <div className="flex flex-col gap-9">
        <ExportSection />
      </div>
    </ScrollAreaWithHeaders>
  )
}

export { Sync }
