import { useNavigate } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { Button, Icon, type IconProps, Typography } from "@components/ui"

type ActionId = "add-songs" | "add-albums" | "create-playlist" | "add-artists"

type OnboardingAction = {
  id: ActionId
  title: string
  description: string
  icon: IconProps["name"]
}

const HomePageEmpty = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleActionClick = (id: ActionId) => {
    switch (id) {
      case "add-songs":
        navigate({ to: "/songs", search: { create: true } })
        break
      case "add-albums":
        navigate({ to: "/albums", search: { create: true } })
        break
      case "create-playlist":
        navigate({ to: "/playlists", search: { create: true } })
        break
      case "add-artists":
        navigate({ to: "/artists", search: { create: true } })
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
    <div className="flex min-h-full flex-col items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col gap-9">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="bg-muted mb-3 inline-flex items-center rounded-lg p-3">
            <Icon name="Library" className="size-16" />
          </div>
          <Typography variant="h1">{t("home.empty.title")}</Typography>
          <Typography affects={["muted"]}>{t("home.empty.description")}</Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            affects={["muted", "uppercase"]}
            className="text-left text-xs font-bold tracking-wide"
          >
            {t("home.empty.getStarted")}
          </Typography>
          <div className="flex flex-col gap-2">
            {actions.map((action) => (
              <Button
                key={action.id}
                variant="ghost"
                className="group h-auto w-full justify-start p-3 text-left"
                onClick={() => handleActionClick(action.id)}
              >
                <div className="flex w-full items-center gap-3">
                  <div className="bg-muted inline-flex items-center rounded-lg p-3">
                    <Icon name={action.icon} className="text-foreground" />
                  </div>
                  <div className="overflow-wrap-anywhere flex w-full flex-col items-start gap-1 wrap-break-word whitespace-normal">
                    {action.title}
                    <Typography affects={["muted"]} className="font-normal">
                      {action.description}
                    </Typography>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { HomePageEmpty }
