import { Fragment, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useSyncStore } from "../stores/useSyncStore"

import { useSyncOrchestrator } from "../hooks/useSyncOrchestrator"

import { Button, Icon } from "@components/ui"

import { SettingButton } from "@features/settings/components/ui/SettingButton"

import { QrScannerModal } from "./QrScannerModal"
import { SyncProgressView } from "./SyncProgressView"

import { type SyncConnectionData } from "../types"

const SyncSection = () => {
  const { t } = useTranslation()

  const { syncState, reset } = useSyncStore()

  const { startSync, cancelSync } = useSyncOrchestrator()

  const [scannerVisible, setScannerVisible] = useState(false)

  const isActive = syncState !== "idle"

  const handleOpenScanner = () => {
    setScannerVisible(true)
  }

  const handleCloseScanner = () => {
    setScannerVisible(false)
  }

  const handleScanned = (data: SyncConnectionData) => {
    setScannerVisible(false)
    startSync(data)
  }

  const handleCancel = () => {
    cancelSync()
  }

  const handleReset = () => {
    reset()
  }

  return (
    <Fragment>
      <SettingButton
        title={t("settings.sync.mobile.title")}
        description={isActive ? undefined : t("settings.sync.mobile.scanQrDescription")}
        renderLeft={() => <Icon name="FolderSync" size="lg" color="mutedForeground" />}
      >
        {isActive ? (
          <SyncProgressView onCancel={handleCancel} onReset={handleReset} />
        ) : (
          <Button
            title={t("settings.sync.mobile.scanQr")}
            variant="outline"
            size="sm"
            leftIcon="QrCode"
            onPress={handleOpenScanner}
          />
        )}
      </SettingButton>
      <QrScannerModal
        visible={scannerVisible}
        onScanned={handleScanned}
        onClose={handleCloseScanner}
      />
    </Fragment>
  )
}

export { SyncSection }
