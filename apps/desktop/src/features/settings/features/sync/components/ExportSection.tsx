import { useTranslation } from "@repo/i18n"

import { useSyncProcessor } from "../hooks/useSyncProcessor"

import { revealItemInDir } from "@tauri-apps/plugin-opener"

import {
  Button,
  Card,
  CardTitle,
  Fade,
  Icon,
  Spinner,
  Typography,
  UploadPicker
} from "@components/ui"

import { SettingButton } from "@features/settings/components"

const ExportSection = () => {
  const { t } = useTranslation()

  const { status, totalSongs, bundlePath, isExporting, startExport, reset } = useSyncProcessor()

  const handleSelectDestination = async (path: string) => {
    if (isExporting) return
    await startExport(path)
  }

  const handleOpenFolder = async () => {
    if (!bundlePath) return
    await revealItemInDir(bundlePath)
  }

  const isIdle = status === "idle"
  const isCompleted = status === "completed"
  const isError = status === "error"

  return (
    <SettingButton
      title={t("settings.sync.export.title")}
      description={t("settings.sync.export.description")}
      renderLeft={() => <Icon name="HardDriveDownload" className="mt-0.5" />}
    >
      <Fade show={isIdle} mode="popLayout" initial={false}>
        <UploadPicker
          mode="folder"
          onChange={handleSelectDestination}
          hideDefaultTrigger
          trigger={({ onClick, disabled }) => (
            <Button variant="outline" size="sm" onClick={onClick} disabled={disabled}>
              <Icon name="FolderOpen" />
              {t("settings.sync.export.selectDestination")}
            </Button>
          )}
          showPreview={false}
        />
      </Fade>
      <Fade show={isExporting} mode="popLayout" initial={false}>
        <div className="flex items-center gap-3">
          <Spinner />
          <div className="flex flex-col gap-1">
            <Typography affects={["small"]}>
              {totalSongs > 0
                ? t("settings.sync.export.exportingSongs", { count: totalSongs })
                : t("settings.sync.export.preparingExport")}
            </Typography>
            <Typography affects={["small", "muted"]}>
              {t("settings.sync.export.exportingMessage")}
            </Typography>
          </div>
        </div>
      </Fade>
      <Fade show={isCompleted && !!bundlePath} mode="popLayout" initial={false}>
        <div className="flex flex-col gap-3">
          <Card className="border-success/25 bg-success/5 gap-2 rounded-lg">
            <CardTitle className="text-success">
              <Icon name="CheckCircle" />
              {t("settings.sync.export.exportSuccess")}
            </CardTitle>
          </Card>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleOpenFolder}>
              <Icon name="FolderOpen" />
              {t("settings.sync.export.showFolder")}
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              {t("settings.sync.export.exportAgain")}
            </Button>
          </div>
        </div>
      </Fade>
      <Fade show={isError} mode="popLayout" initial={false}>
        <div className="flex flex-col gap-3">
          <Card className="border-destructive/25 bg-destructive/5 gap-2 rounded-lg">
            <CardTitle className="text-error">
              <Icon name="AlertCircle" />
              {t("settings.sync.export.exportFailed")}
            </CardTitle>
          </Card>
          <Button variant="outline" size="sm" className="w-fit" onClick={reset}>
            <Icon name="RotateCcw" />
            {t("settings.sync.export.tryAgain")}
          </Button>
        </div>
      </Fade>
    </SettingButton>
  )
}

export { ExportSection }
