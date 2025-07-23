import { useTranslation } from "@repo/i18n"

import { SongForm } from "@/components/forms"
import { Button, Typography } from "@components/ui"

function Home() {
  const { t } = useTranslation()

  return (
    <div className="w-full overflow-auto p-9">
      <Typography variant="h1">{t("home.title")}</Typography>
      <SongForm onSubmit={(data) => console.log(data)}>
        {({ isValid }) => (
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        )}
      </SongForm>
    </div>
  )
}

export default Home
