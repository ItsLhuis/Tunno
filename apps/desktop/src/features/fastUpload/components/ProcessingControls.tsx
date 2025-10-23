import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { useBundleValidation } from "../hooks/useBundleValidation"

import { useFastUploadProcessor } from "../hooks/useFastUploadProcessor"

import { cleanupAllFastUploadCache, cleanupCacheDirectory } from "../api/tauri"

import { Button, UploadPicker } from "@components/ui"

type ProcessingControlsProps = {
  className?: string
}

const ProcessingControls = ({ className }: ProcessingControlsProps) => {
  const { t } = useTranslation()

  const { validateBundle, isValidating } = useBundleValidation()

  const { startProcessing, cleanupCache, isProcessing } = useFastUploadProcessor()

  const { status, cachePath, initializeProcess, setStatus, resetStore } = useFastUploadStore(
    useShallow((state) => ({
      status: state.status,
      cachePath: state.cachePath,
      initializeProcess: state.initializeProcess,
      setStatus: state.setStatus,
      resetStore: state.resetStore
    }))
  )

  const handleBundleSelect = async (path: string) => {
    if (isValidating || isProcessing) return

    if (cachePath) {
      try {
        await cleanupCacheDirectory(cachePath)
      } catch {}
    }

    try {
      await cleanupAllFastUploadCache()
    } catch {}

    resetStore()

    setStatus("validating")

    const result = await validateBundle(path)

    if (result.isValid && result.manifest && result.cachePath) {
      initializeProcess(path, result.manifest, result.cachePath)
    } else {
      setStatus("error")
    }
  }

  const handleBundleError = () => {
    if (isValidating || isProcessing) return

    setStatus("error")
  }

  const handleStartProcessing = () => {
    if (isProcessing || isValidating) return

    startProcessing()
  }

  const handleClearAndSelectNew = async () => {
    if (isValidating || isProcessing) return

    cleanupCache()

    if (cachePath) {
      try {
        await cleanupCacheDirectory(cachePath)
      } catch {}
    }

    try {
      await cleanupAllFastUploadCache()
    } catch {}

    resetStore()
  }

  const isReady = status === "ready"
  const isCompleted = status === "completed"

  const showSecondaryButton = isReady || isCompleted
  const secondaryButtonText = isCompleted ? t("common.clear") : t("fastUpload.selectBundle")

  const primaryButtonText = isReady ? t("common.start") : t("fastUpload.selectBundle")

  return (
    <div className={className}>
      <div className="ml-auto flex items-center gap-2">
        {showSecondaryButton ? (
          isCompleted ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAndSelectNew}
              isLoading={isValidating || isProcessing}
            >
              {secondaryButtonText}
            </Button>
          ) : (
            <UploadPicker
              mode="file"
              onChange={handleBundleSelect}
              onError={handleBundleError}
              accept={["zip"]}
              disabled={isValidating || isProcessing}
              hideDefaultTrigger={true}
              trigger={
                <Button variant="outline" size="sm" isLoading={isValidating || isProcessing}>
                  {secondaryButtonText}
                </Button>
              }
              showPreview={false}
            />
          )
        ) : (
          <Button variant="outline" size="sm" style={{ visibility: "hidden" }} disabled>
            {t("fastUpload.changeBundle")}
          </Button>
        )}
        {isReady ? (
          <Button
            onClick={handleStartProcessing}
            isLoading={isProcessing || isValidating}
            size="sm"
          >
            {primaryButtonText}
          </Button>
        ) : (
          <UploadPicker
            mode="file"
            onChange={handleBundleSelect}
            onError={handleBundleError}
            accept={["zip"]}
            disabled={isValidating || isProcessing}
            hideDefaultTrigger={true}
            trigger={
              <Button size="sm" isLoading={isValidating || isProcessing}>
                {primaryButtonText}
              </Button>
            }
            showPreview={false}
          />
        )}
      </div>
    </div>
  )
}

export { ProcessingControls }
