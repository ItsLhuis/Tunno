import { useTranslation } from "@repo/i18n"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { useBundleValidation } from "../hooks/useBundleValidation"

import { useFastUploadProcessor } from "../hooks/useFastUploadProcessor"

import { cleanupAllFastUploadCache, cleanupCacheDirectory } from "../api/tauri"

import { Button, Fade, UploadPicker } from "@components/ui"

type ProcessingControlsProps = {
  className?: string
}

const ProcessingControls = ({ className }: ProcessingControlsProps) => {
  const { t } = useTranslation()

  const { validateBundle } = useBundleValidation()

  const { startProcessing, cleanupCache, isProcessing } = useFastUploadProcessor()

  const status = useFastUploadStore((state) => state.status)
  const cachePath = useFastUploadStore((state) => state.cachePath)
  const initializeProcess = useFastUploadStore((state) => state.initializeProcess)
  const setStatus = useFastUploadStore((state) => state.setStatus)
  const resetStore = useFastUploadStore((state) => state.resetStore)

  const isValidating = status === "validating"
  const isReady = status === "ready"
  const isCompleted = status === "completed"
  const isIdle = status === "idle" || status === "error"
  const isLoading = isProcessing || isValidating

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
      console.error("FastUpload: Bundle validation failed:", result.error, result.errorType)
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

  return (
    <div className={className}>
      <div className="ml-auto flex items-center gap-2">
        <Fade show={isIdle} mode="popLayout" initial={false}>
          <UploadPicker
            mode="file"
            onChange={handleBundleSelect}
            onError={handleBundleError}
            accept={["zip"]}
            disabled={isLoading}
            hideDefaultTrigger
            trigger={({ onClick, disabled }) => (
              <Button size="sm" onClick={onClick} disabled={disabled} isLoading={isLoading}>
                {t("fastUpload.selectBundle")}
              </Button>
            )}
            showPreview={false}
          />
        </Fade>
        <Fade show={isReady || isProcessing} mode="popLayout" initial={false}>
          <div className="flex items-center gap-2">
            <UploadPicker
              mode="file"
              onChange={handleBundleSelect}
              onError={handleBundleError}
              accept={["zip"]}
              disabled={isLoading}
              hideDefaultTrigger
              trigger={({ onClick, disabled }) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClick}
                  disabled={disabled}
                  isLoading={isLoading}
                >
                  {t("fastUpload.selectBundle")}
                </Button>
              )}
              showPreview={false}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAndSelectNew}
              isLoading={isLoading}
            >
              {t("common.clear")}
            </Button>
            <Button onClick={handleStartProcessing} isLoading={isLoading} size="sm">
              {t("common.start")}
            </Button>
          </div>
        </Fade>
        <Fade show={isCompleted} mode="popLayout" initial={false}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAndSelectNew}
            isLoading={isLoading}
          >
            {t("common.clear")}
          </Button>
        </Fade>
      </div>
    </div>
  )
}

export { ProcessingControls }
