import { useTranslation } from "@repo/i18n"

import { Header, ScrollAreaWithHeaders, StickyHeader, Typography } from "@components/ui"

import { LanguageSection } from "@features/settings/features/language/components"
import { SidebarTrigger } from "@features/settings/layout"

const Language = () => {
  const { t } = useTranslation()

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <SidebarTrigger />
            <Typography variant="h1" className="truncate">
              {t("settings.language.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <SidebarTrigger />
            <Typography variant="h4" className="truncate">
              {t("settings.language.title")}
            </Typography>
          </StickyHeader>
        )
      }}
    >
      <div className="flex flex-col gap-9">
        <LanguageSection />
      </div>
    </ScrollAreaWithHeaders>
  )
}

export { Language }
