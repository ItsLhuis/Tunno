import { useTranslation } from "@repo/i18n"

import { BackButton } from "@components/navigation"
import { Header, Text, type HeaderProps } from "@components/ui"

type QueueStickyHeaderProps = HeaderProps

const QueueStickyHeader = ({ scrollY, showHeader, ...props }: QueueStickyHeaderProps) => {
  const { t } = useTranslation()

  return (
    <Header
      scrollY={scrollY}
      showHeader={showHeader}
      headerCenter={
        <Text weight="semibold" numberOfLines={1}>
          {t("common.queue")}
        </Text>
      }
      headerLeft={<BackButton />}
      {...props}
    />
  )
}

export { QueueStickyHeader }
