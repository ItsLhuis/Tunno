import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { Button, Icon, Text, type IconProps } from "@components/ui"

type ActionId = "add-songs" | "add-albums" | "create-playlist" | "add-artists"

type OnboardingAction = {
  id: ActionId
  title: string
  description: string
  icon: IconProps["name"]
}

const HomePageEmpty = () => {
  const styles = useStyles(homePageEmptyStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const handleActionPress = (id: ActionId) => {
    switch (id) {
      case "add-songs":
        router.push("/songs")
        break
      case "add-albums":
        router.push("/albums")
        break
      case "create-playlist":
        router.push("/playlists")
        break
      case "add-artists":
        router.push("/artists")
        break
    }
  }

  const actions: OnboardingAction[] = [
    {
      id: "add-songs",
      title: t("home.empty.songs.title"),
      description: t("home.empty.songs.description"),
      icon: "Music"
    },
    {
      id: "add-albums",
      title: t("home.empty.albums.title"),
      description: t("home.empty.albums.description"),
      icon: "DiscAlbum"
    },
    {
      id: "create-playlist",
      title: t("home.empty.playlists.title"),
      description: t("home.empty.playlists.description"),
      icon: "ListMusic"
    },
    {
      id: "add-artists",
      title: t("home.empty.artists.title"),
      description: t("home.empty.artists.description"),
      icon: "Users"
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="Library" size="4xl" color="mutedForeground" />
          </View>
          <Text variant="h1" style={styles.title}>
            {t("home.empty.title")}
          </Text>
          <Text color="mutedForeground" style={styles.description}>
            {t("home.empty.description")}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <Text size="xs" weight="bold" color="mutedForeground" style={styles.getStartedLabel}>
            {t("home.empty.getStarted")}
          </Text>
          <View style={styles.actions}>
            {actions.map((action) => (
              <Button
                key={action.id}
                variant="ghost"
                style={styles.actionButton}
                onPress={() => handleActionPress(action.id)}
              >
                <View style={styles.actionContent}>
                  <View style={styles.actionIcon}>
                    <Icon name={action.icon} size="lg" color="foreground" />
                  </View>
                  <View style={styles.actionText}>
                    <Text weight="medium">{action.title}</Text>
                    <Text size="sm" color="mutedForeground">
                      {action.description}
                    </Text>
                  </View>
                </View>
              </Button>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

const homePageEmptyStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.space("lg")
  },
  content: {
    width: "100%",
    maxWidth: 400,
    gap: theme.space("2xl")
  },
  header: {
    alignItems: "center",
    gap: theme.space()
  },
  iconContainer: {
    backgroundColor: theme.colors.secondary,
    padding: theme.space("lg"),
    borderRadius: theme.radius("lg"),
    marginBottom: theme.space()
  },
  title: {
    textAlign: "center"
  },
  description: {
    textAlign: "center"
  },
  actionsContainer: {
    gap: theme.space("sm")
  },
  getStartedLabel: {
    textTransform: "uppercase",
    letterSpacing: 1
  },
  actions: {
    gap: theme.space("sm")
  },
  actionButton: {
    paddingVertical: theme.space("sm"),
    paddingHorizontal: theme.space()
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space()
  },
  actionIcon: {
    backgroundColor: theme.colors.secondary,
    padding: theme.space("sm"),
    borderRadius: theme.radius()
  },
  actionText: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { HomePageEmpty }
