import { Modal, StyleSheet, View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, ScopedTheme, useStyles } from "@styles"

import { useQrScanner } from "../hooks/useQrScanner"

import { CameraView } from "expo-camera"

import { Button, Icon, IconButton, Text } from "@components/ui"

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
          <Button
            title={t("settings.sync.mobile.grantPermission")}
            containerStyle={styles.grantPermissionContainerStyle}
            onPress={requestPermission}
          />
        </View>
      )
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleBarcodeScanned}
        />
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
      </View>
    )
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <ScopedTheme theme="dark">
        <View style={styles.container}>
          {renderContent()}
          <View style={styles.closeButtonContainer}>
            <IconButton
              name="X"
              iconSize="xl"
              variant="ghost"
              onPress={onClose}
              style={styles.closeButton}
            />
          </View>
        </View>
      </ScopedTheme>
    </Modal>
  )
}

const qrScannerModalStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  cameraContainer: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  overlayMiddle: {
    flexDirection: "row",
    height: SCAN_FRAME_SIZE
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  scanFrame: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: theme.radius("full")
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
  },
  grantPermissionContainerStyle: {
    alignSelf: "center"
  }
}))

export { QrScannerModal }
