import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@repo/i18n"

import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
  Header,
  Icon,
  Image,
  ScrollAreaWithHeaders,
  StickyHeader,
  Typography
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components/ui"

function Language() {
  const { t } = useTranslation()

  const { setLanguage, language } = useSettingsStore()

  const { locales } = useTranslation()

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "language",
      title: t("settings.language.title"),
      description: t("settings.language.description"),
      renderLeft: () => <Icon name="Languages" className="mt-1" />,
      children: (
        <Choicebox defaultValue={language} onValueChange={setLanguage}>
          {Object.values(locales).map((locale) => (
            <ChoiceboxItem value={locale.code} key={locale.code} className="gap-3">
              <Image className="aspect-4/3 h-3 flex-shrink-0" src={locale.flag} alt={locale.name} />
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>{locale.name}</ChoiceboxItemTitle>
                <ChoiceboxItemDescription>
                  {locales[language].translations.languages[locale.code]}
                </ChoiceboxItemDescription>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
          ))}
        </Choicebox>
      )
    }
  ]

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <Typography variant="h1" className="truncate">
              {t("settings.language.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              {t("settings.language.title")}
            </Typography>
          </StickyHeader>
        )
      }}
      containerClassName="overflow-x-hidden"
    >
      <div className="flex flex-col gap-6">
        {settings.map((setting) => (
          <SettingButton
            key={setting.key}
            title={setting.title}
            description={setting.description}
            renderLeft={setting.renderLeft}
            renderRight={setting.renderRight}
            children={setting.children}
          />
        ))}
      </div>
    </ScrollAreaWithHeaders>
  )
}

export default Language
