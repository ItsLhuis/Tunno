import { useTranslation } from "@repo/i18n"

import { Button, Typography } from "@components/ui"
import { SongForm } from "@features/songs/forms"

function Home() {
  const { t } = useTranslation()

  return (
    <div className="w-full overflow-auto p-9">
      <Typography variant="h1">{t("home.title")}</Typography>
      <SongForm onSubmit={(data) => console.log(data)}>
        {({ isValid }) => (
          <Button type="submit" disabled={!isValid}>
            {t("form.buttons.create")}
          </Button>
        )}
      </SongForm>
    </div>
  )
}

export default Home
