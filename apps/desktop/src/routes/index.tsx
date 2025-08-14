import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home
})

import { useTranslation } from "@repo/i18n"

import { useCreateSong } from "@/features/songs/hooks/useCreateSong"
import { Button, Typography } from "@components/ui"
import { SongForm } from "@features/songs/forms"

function Home() {
  const { t } = useTranslation()

  const { mutateAsync, isPending } = useCreateSong()

  return (
    <div className="w-full overflow-auto p-9">
      <Typography variant="h1">{t("home.title")}</Typography>
      <div className="mt-8">
        <SongForm
          onSubmit={async (data) => {
            await mutateAsync(data)
          }}
        >
          {({ isValid, isSubmitting, reset }) => (
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting || isPending}
                isLoading={isSubmitting || isPending}
              >
                {t("form.buttons.create")}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset()
                }}
              >
                {t("form.buttons.cancel")}
              </Button>
            </div>
          )}
        </SongForm>
      </div>
    </div>
  )
}
