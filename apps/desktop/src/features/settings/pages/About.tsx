import { useTranslation } from "@repo/i18n"

import { Header, ScrollAreaWithHeaders, StickyHeader, Typography } from "@components/ui"

import { AboutSection } from "@features/settings/features/about/components"
import { SidebarTrigger } from "@features/settings/layout"

const About = () => {
  const { t } = useTranslation()

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <SidebarTrigger />
            <Typography variant="h1" className="truncate">
              {t("settings.about.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <SidebarTrigger />
            <Typography variant="h4" className="truncate">
              {t("settings.about.title")}
            </Typography>
          </StickyHeader>
        )
      }}
    >
      <div className="flex flex-col gap-9">
        <AboutSection />
      </div>
    </ScrollAreaWithHeaders>
  )
}

export { About }
