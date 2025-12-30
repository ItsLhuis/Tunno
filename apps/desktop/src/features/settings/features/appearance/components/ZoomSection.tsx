import { useTranslation } from "@repo/i18n"

import { useZoom } from "@hooks/useZoom"

import { Icon, RadioGroup, RadioGroupItem, Typography } from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components"

const ZoomSection = () => {
  const { t } = useTranslation()

  const { zoomLevel, setZoomLevel, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } = useZoom()

  const zoomLevels: number[] = []

  const steps = Math.round((MAX_ZOOM - MIN_ZOOM) / ZOOM_STEP) + 1

  for (let i = 0; i < steps; i++) {
    const level = Math.round((MIN_ZOOM + i * ZOOM_STEP) * 100)
    zoomLevels.push(level)
  }

  const handleZoomChange = (value: string) => {
    setZoomLevel(parseInt(value) / 100)
  }

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "zoom",
      title: t("settings.appearance.zoom.title"),
      description: t("settings.appearance.zoom.description"),
      renderLeft: () => <Icon name="ZoomIn" />,
      children: (
        <RadioGroup
          value={Math.round(zoomLevel * 100).toString()}
          onValueChange={handleZoomChange}
          className="relative"
        >
          <div className="bg-border absolute top-2 right-2 left-2 h-px" />
          <div className="relative flex items-start justify-between">
            {zoomLevels.map((zoom) => {
              const isSelected = Math.round(zoomLevel * 100) === zoom

              return (
                <div key={zoom} className="flex flex-col items-center gap-2">
                  <RadioGroupItem value={zoom.toString()} className="bg-background" />
                  <Typography affects={isSelected ? ["small"] : ["small", "muted"]}>
                    {zoom}%
                  </Typography>
                </div>
              )
            })}
          </div>
        </RadioGroup>
      )
    }
  ]

  return (
    <SettingButton
      key={settings[0].key}
      title={settings[0].title}
      description={settings[0].description}
      renderLeft={settings[0].renderLeft}
      renderRight={settings[0].renderRight}
      children={settings[0].children}
    />
  )
}

export { ZoomSection }
