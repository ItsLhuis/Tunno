import { useTranslation } from "@repo/i18n"

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
  Markdown,
  ScrollArea
} from "@components/ui"

type ChangelogDialogProps = {
  changelog: string
}

const ChangelogDialog = ({ changelog }: ChangelogDialogProps) => {
  const { t } = useTranslation()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-fit">
          <Icon name="FileText" />
          {t("settings.about.whatsNew.viewChangelog")}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0">
        <DialogHeader className="shrink-0 border-b p-6">
          <DialogTitle>{t("settings.about.whatsNew.dialog.title")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex max-h-full flex-col">
          <div className="p-6">
            <Markdown content={changelog} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export { ChangelogDialog }
