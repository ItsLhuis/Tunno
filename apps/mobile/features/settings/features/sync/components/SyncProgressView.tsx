import { View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { useSyncStore } from "../stores/useSyncStore"

import { Button, Icon, Spinner, Text, type IconName } from "@components/ui"

import { type SyncState } from "../types"

type SyncProgressViewProps = {
  onCancel: () => void
  onReset: () => void
}

const SyncProgressView = ({ onCancel, onReset }: SyncProgressViewProps) => {
  const styles = useStyles(syncProgressViewStyles)

  const { t } = useTranslation()

  const { syncState, progress } = useSyncStore()

  const percentage =
    progress.totalItems > 0 ? Math.round((progress.syncedItems / progress.totalItems) * 100) : 0

  return (
    <View style={styles.container}>
      <StateHeader syncState={syncState} />
      {syncState === "syncing" && (
        <View style={styles.progressSection}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
          </View>
          <View style={styles.statsRow}>
            <Text size="sm" color="mutedForeground">
              {t("settings.sync.mobile.itemsSynced", {
                synced: progress.syncedItems,
                total: progress.totalItems
              })}
            </Text>
            <Text size="sm" color="mutedForeground">
              {percentage}%
            </Text>
          </View>
          {progress.totalBatches > 0 && (
            <Text size="xs" color="mutedForeground">
              {t("settings.sync.mobile.batchProgress", {
                current: progress.currentBatch,
                total: progress.totalBatches
              })}
            </Text>
          )}
        </View>
      )}
      {progress.currentOperation && (
        <Text size="sm" color="mutedForeground" numberOfLines={1} style={styles.operationText}>
          {progress.currentOperation}
        </Text>
      )}
      <View style={styles.actions}>
        {(syncState === "connecting" ||
          syncState === "comparing" ||
          syncState === "syncing" ||
          syncState === "finalizing") && (
          <Button
            title={t("settings.sync.mobile.cancel")}
            variant="destructive"
            size="sm"
            onPress={onCancel}
          />
        )}
        {(syncState === "completed" || syncState === "failed") && (
          <Button
            title={t("settings.sync.mobile.done")}
            variant="secondary"
            size="sm"
            onPress={onReset}
          />
        )}
      </View>
    </View>
  )
}

const StateHeader = ({ syncState }: { syncState: SyncState }) => {
  const styles = useStyles(syncProgressViewStyles)

  const { t } = useTranslation()

  const stateConfig = {
    connecting: {
      icon: "Wifi",
      labelKey: "settings.sync.mobile.connecting",
      showSpinner: true
    },
    comparing: {
      icon: "GitCompare",
      labelKey: "settings.sync.mobile.comparing",
      showSpinner: true
    },
    syncing: { icon: "Download", labelKey: "settings.sync.mobile.syncing", showSpinner: true },
    finalizing: {
      icon: "RefreshCw",
      labelKey: "settings.sync.mobile.finalizing",
      showSpinner: true
    },
    completed: {
      icon: "CircleCheck",
      labelKey: "settings.sync.mobile.completed",
      showSpinner: false
    },
    failed: { icon: "CircleX", labelKey: "settings.sync.mobile.failed", showSpinner: false }
  } as const satisfies Record<
    Exclude<SyncState, "idle" | "scanning">,
    { icon: IconName; labelKey: string; showSpinner: boolean }
  >

  const config = stateConfig[syncState as keyof typeof stateConfig]
  if (!config) return null

  const iconColor =
    syncState === "failed" ? "destructive" : syncState === "completed" ? "success" : "primary"

  return (
    <View style={styles.headerRow}>
      {config.showSpinner ? (
        <Spinner size="lg" />
      ) : (
        <Icon name={config.icon} size="xl" color={iconColor} />
      )}
      <Text variant="h5">{t(config.labelKey)}</Text>
    </View>
  )
}

const syncProgressViewStyles = createStyleSheet(({ theme }) => ({
  container: {
    gap: theme.space("md"),
    padding: theme.space("md"),
    borderRadius: theme.radius("lg"),
    backgroundColor: theme.colors.card,
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.border
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  progressSection: {
    gap: theme.space("xs")
  },
  progressBarBackground: {
    height: 8,
    borderRadius: theme.radius("full"),
    backgroundColor: theme.colors.muted,
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    borderRadius: theme.radius("full"),
    backgroundColor: theme.colors.primary
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  operationText: {
    fontStyle: "italic"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: theme.space("sm")
  }
}))

export { SyncProgressView }
