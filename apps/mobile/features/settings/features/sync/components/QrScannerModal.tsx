import { Modal, View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { useQrScanner } from "../hooks/useQrScanner"

import { CameraView } from "expo-camera"

import { Button, Icon, Pressable, Text } from "@components/ui"

import { type SyncConnectionData } from "../types"

type QrScannerModalProps = {
  visible: boolean
  onScanned: (data: SyncConnectionData) => void
  onClose: () => void
}

const SCAN_FRAME_SIZE = 250
const CORNER_SIZE = 24
const CORNER_WIDTH = 3

const QrScannerModal = ({ visible, onScanned, onClose }: QrScannerModalProps) => {
  const styles = useStyles(qrScannerModalStyles)

  const { t } = useTranslation()

  const { hasPermission, isPermissionLoading, requestPermission } = useQrScanner()

  const handleBarcodeScanned = (result: { data: string }) => {
    try {
      const parsed = JSON.parse(result.data) as Record<string, unknown>

      if (
        typeof parsed.host !== "string" ||
        typeof parsed.port !== "number" ||
        typeof parsed.token !== "string" ||
        typeof parsed.url !== "string"
      ) {
        return
      }

      onScanned({
        host: parsed.host,
        port: parsed.port,
        token: parsed.token,
        url: parsed.url
      })
    } catch {
      // Invalid QR data — keep scanning
    }
  }

  const renderContent = () => {
    if (isPermissionLoading) {
      return (
        <View style={styles.centeredContent}>
          <Text>{t("settings.sync.mobile.cameraLoading")}</Text>
        </View>
      )
    }

    if (!hasPermission) {
      return (
        <View style={styles.centeredContent}>
          <Icon name="CameraOff" size="4xl" />
          <Text variant="h5" style={styles.permissionTitle}>
            {t("settings.sync.mobile.cameraPermissionTitle")}
          </Text>
          <Text size="sm" color="mutedForeground" style={styles.permissionDescription}>
            {t("settings.sync.mobile.cameraPermissionDescription")}
          </Text>
          <Button title={t("settings.sync.mobile.grantPermission")} onPress={requestPermission} />
        </View>
      )
    }

    return (
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom}>
            <Text style={styles.instructionText}>{t("settings.sync.mobile.scanInstruction")}</Text>
          </View>
        </View>
      </CameraView>
    )
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={styles.container}>
        {renderContent()}
        <View style={styles.closeButtonContainer}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Icon name="X" size="xl" />
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const qrScannerModalStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  camera: {
    flex: 1
  },
  overlay: {
    flex: 1
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  overlayMiddle: {
    flexDirection: "row",
    height: SCAN_FRAME_SIZE
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  scanFrame: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    paddingTop: theme.space("xl")
  },
  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: theme.colors.primary
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: theme.colors.primary
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: theme.colors.primary
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: theme.colors.primary
  },
  instructionText: {
    textAlign: "center",
    paddingHorizontal: theme.space("xl")
  },
  closeButtonContainer: {
    position: "absolute",
    top: theme.space("3xl"),
    right: theme.space("lg"),
    zIndex: 10
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  centeredContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.space("xl"),
    gap: theme.space("md")
  },
  permissionTitle: {
    textAlign: "center"
  },
  permissionDescription: {
    textAlign: "center",
    marginBottom: theme.space("md")
  }
}))

export { QrScannerModal }
