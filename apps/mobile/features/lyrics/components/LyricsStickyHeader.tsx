import { useTranslation } from "@repo/i18n"

import { BackButton } from "@components/navigation"
import { Header, Text, type HeaderProps } from "@components/ui"

type LyricsStickyHeaderProps = HeaderProps

const LyricsStickyHeader = ({ scrollY, showHeader, ...props }: LyricsStickyHeaderProps) => {
  const { t } = useTranslation()

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerCenter={
        <Text weight="semibold" numberOfLines={1}>
          {t("lyrics.title")}
        </Text>
      }
      headerLeft={<BackButton />}
      {...props}
    />
  )
}

export { LyricsStickyHeader }
