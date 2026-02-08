import { useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useSyncServer } from "../hooks/useSyncServer"

import { QRCodeSVG } from "qrcode.react"

import { Button, Card, CardTitle, Fade, Icon, Spinner, Typography } from "@components/ui"

import { SettingButton } from "@features/settings/components"

const SyncSection = () => {
  const { t } = useTranslation()

  const { isServerRunning, qrData, syncStatus, startSync, stopSync } = useSyncServer()

  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateQr = async () => {
    setIsStarting(true)
    setError(null)

    try {
      await startSync()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsStarting(false)
    }
  }

  const handleStopServer = async () => {
    await stopSync()
    setError(null)
  }

  const isIdle = !isServerRunning && !isStarting
  const isWaiting = syncStatus === "waiting"
  const isConnected = syncStatus === "connected"
  const isSyncing = syncStatus === "syncing"
  const isCompleted = syncStatus === "completed"

  return (
    <SettingButton
      title={t("settings.sync.mobile.title")}
      description={t("settings.sync.mobile.description")}
      renderLeft={() => <Icon name="Smartphone" className="mt-0.5" />}
    >
      <Fade show={isIdle && !error} mode="popLayout" initial={false}>
        <Button variant="outline" size="sm" onClick={handleGenerateQr} disabled={isStarting}>
          <Icon name="QrCode" />
          {t("settings.sync.mobile.generateQr")}
        </Button>
      </Fade>
      <Fade show={isStarting} mode="popLayout" initial={false}>
        <div className="flex items-center gap-3">
          <Spinner />
          <Typography affects={["small", "muted"]}>
            {t("settings.sync.mobile.waitingConnection")}
          </Typography>
        </div>
      </Fade>
      <Fade show={isServerRunning && isWaiting && !!qrData} mode="popLayout" initial={false}>
        <div className="flex flex-col gap-4">
          <div className="inline-block w-fit rounded-lg bg-white p-3">
            {qrData && <QRCodeSVG value={qrData} size={200} />}
          </div>
          <div className="flex items-center gap-3">
            <Spinner />
            <Typography affects={["small", "muted"]}>
              {t("settings.sync.mobile.waitingConnection")}
            </Typography>
          </div>
          <Button variant="outline" size="sm" className="w-fit" onClick={handleStopServer}>
            <Icon name="Square" />
            {t("settings.sync.mobile.stopServer")}
          </Button>
        </div>
      </Fade>
      <Fade show={isConnected} mode="popLayout" initial={false}>
        <div className="flex items-center gap-3">
          <Icon name="CheckCircle" className="text-success" />
          <Typography affects={["small"]}>{t("settings.sync.mobile.deviceConnected")}</Typography>
        </div>
      </Fade>
      <Fade show={isSyncing} mode="popLayout" initial={false}>
        <div className="flex items-center gap-3">
          <Spinner />
          <Typography affects={["small"]}>{t("settings.sync.mobile.syncInProgress")}</Typography>
        </div>
      </Fade>
      <Fade show={isCompleted} mode="popLayout" initial={false}>
        <Card className="border-success/25 bg-success/5 gap-2 rounded-lg">
          <CardTitle className="text-success">
            <Icon name="CheckCircle" />
            {t("settings.sync.mobile.syncCompleted")}
          </CardTitle>
        </Card>
      </Fade>
      <Fade show={!!error} mode="popLayout" initial={false}>
        <div className="flex flex-col gap-3">
          <Card className="border-destructive/25 bg-destructive/5 gap-2 rounded-lg">
            <CardTitle className="text-error">
              <Icon name="AlertCircle" />
              {t("settings.sync.mobile.serverError")}
            </CardTitle>
          </Card>
          <Button variant="outline" size="sm" className="w-fit" onClick={handleGenerateQr}>
            <Icon name="RotateCcw" />
            {t("settings.sync.mobile.generateQr")}
          </Button>
        </div>
      </Fade>
    </SettingButton>
  )
}

export { SyncSection }
