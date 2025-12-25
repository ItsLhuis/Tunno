import { useTranslation } from "@repo/i18n"

import { Header, ScrollAreaWithHeaders, StickyHeader, Typography } from "@components/ui"

import { EqualizerSection } from "@features/settings/features/equalizer/components"

const Equalizer = () => {
  const { t } = useTranslation()

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <Typography variant="h1" className="truncate">
              {t("settings.equalizer.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              {t("settings.equalizer.title")}
            </Typography>
          </StickyHeader>
        )
      }}
    >
      <div className="flex flex-col gap-9">
        <EqualizerSection />
      </div>
    </ScrollAreaWithHeaders>
  )
}

export { Equalizer }
