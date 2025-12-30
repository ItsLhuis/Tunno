import { Fragment } from "react"

import { Linking, View } from "react-native"

import { useTranslation } from "@repo/i18n"

import Constants from "@constants/expo"

import { createStyleSheet, useStyles } from "@styles"

import { Button, Icon, Image, Text } from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components"

const AboutSection = () => {
  const styles = useStyles(aboutSectionStyles)

  const { t } = useTranslation()

  const appName = Constants.expoConfig?.name ?? "Tunno"
  const currentVersion = Constants.expoConfig?.version ?? "0.0.0"

  const handleOpenGitHub = () => {
    Linking.openURL("https://github.com/ItsLhuis/Tunno")
  }

  const handleOpenLicense = () => {
    Linking.openURL("https://github.com/ItsLhuis/Tunno/blob/main/LICENSE")
  }

  const handleOpenChangelog = () => {
    Linking.openURL("https://github.com/ItsLhuis/Tunno/blob/main/apps/mobile/CHANGELOG.md")
  }

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "about",
      title: t("settings.about.title"),
      description: t("settings.about.description"),
      renderLeft: () => <Icon name="Info" size="lg" color="mutedForeground" />,
      children: (
        <View style={styles.aboutContent}>
          <Image
            source={require("@assets/images/app/icons/primary.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <View style={styles.aboutInfo}>
            <Text weight="medium">{appName}</Text>
            <Text size="xs" color="mutedForeground">
              {t("settings.about.version")} {currentVersion}
            </Text>
          </View>
        </View>
      )
    },
    {
      key: "whatsNew",
      title: t("settings.about.whatsNew.title"),
      description: t("settings.about.whatsNew.description"),
      renderLeft: () => <Icon name="Sparkles" size="lg" color="mutedForeground" />,
      children: (
        <Button
          title={t("settings.about.whatsNew.viewChangelog")}
          variant="outline"
          size="sm"
          leftIcon="ExternalLink"
          onPress={handleOpenChangelog}
          containerStyle={styles.buttonContainer}
        />
      )
    },
    {
      key: "legal",
      title: t("settings.about.legal.title"),
      description: t("settings.about.legal.description"),
      renderLeft: () => <Icon name="FileText" size="lg" color="mutedForeground" />,
      children: (
        <View style={styles.legalContent}>
          <View style={styles.legalInfo}>
            <Text size="xs" color="mutedForeground">
              {t("settings.about.legal.copyright")} {new Date().getFullYear()} ItsLhuis
            </Text>
            <Text size="xs" color="mutedForeground">
              {t("settings.about.legal.licensed")}
            </Text>
          </View>
          <View style={styles.legalButtons}>
            <Button
              title={t("settings.about.legal.viewLicense")}
              variant="outline"
              size="sm"
              leftIcon="Scale"
              onPress={handleOpenLicense}
            />
            <Button
              title={t("settings.about.legal.viewOnGitHub")}
              variant="outline"
              size="sm"
              leftIcon="Github"
              onPress={handleOpenGitHub}
            />
          </View>
        </View>
      )
    }
  ]

  return (
    <Fragment>
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
    </Fragment>
  )
}

const aboutSectionStyles = createStyleSheet(({ theme }) => ({
  aboutContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: "transparent"
  },
  aboutInfo: {
    gap: theme.space("xs")
  },
  buttonContainer: {
    alignSelf: "flex-start"
  },
  legalContent: {
    gap: theme.space("sm")
  },
  legalInfo: {
    gap: theme.space("xs")
  },
  legalButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.space("sm")
  }
}))

export { AboutSection }
