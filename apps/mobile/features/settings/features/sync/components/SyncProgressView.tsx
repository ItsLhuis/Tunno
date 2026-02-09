import { useEffect } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { useSyncStore } from "../stores/useSyncStore"

import { Button, Card, Icon, Spinner, Text, type IconName } from "@components/ui"

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

  const progressWidth = useSharedValue(0)

  useEffect(() => {
    progressWidth.value = withTiming(percentage, { duration: 300 })
  }, [percentage])

  const progressBarAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`
  }))

  const cardStyle =
    syncState === "completed"
      ? styles.cardSuccess
      : syncState === "failed"
        ? styles.cardDestructive
        : undefined

  return (
    <Card style={cardStyle}>
      <StateHeader syncState={syncState} />
      {syncState === "syncing" && (
        <View style={styles.progressSection}>
          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBarFill, progressBarAnimatedStyle]} />
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
        <Text size="sm" color="mutedForeground" numberOfLines={1}>
          {progress.currentOperation}
        </Text>
      )}
      {syncState === "completed" && (
        <Text size="sm" color="success">
          {t("settings.sync.mobile.completedDescription")}
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
            variant="outline"
            size="sm"
            onPress={onReset}
          />
        )}
      </View>
    </Card>
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
      <Text
        variant="h5"
        color={
          syncState === "completed" ? "success" : syncState === "failed" ? "destructive" : undefined
        }
      >
        {t(config.labelKey)}
      </Text>
    </View>
  )
}

const syncProgressViewStyles = createStyleSheet(({ theme }) => ({
  cardSuccess: {
    borderColor: theme.withOpacity(theme.colors.success, 0.25),
    backgroundColor: theme.withOpacity(theme.colors.success, 0.05)
  },
  cardDestructive: {
    borderColor: theme.withOpacity(theme.colors.destructive, 0.25),
    backgroundColor: theme.withOpacity(theme.colors.destructive, 0.05)
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
    height: theme.size(1),
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
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: theme.space("sm")
  }
}))

export { SyncProgressView }
