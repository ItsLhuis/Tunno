import { useShallow } from "zustand/shallow"

import { useTranslation } from "@repo/i18n"

import { useSettingsStore } from "@stores/useSettingsStore"

import { cn } from "@lib/utils"

import {
  Button,
  Header,
  Icon,
  ScrollAreaWithHeaders,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  StickyHeader,
  Typography
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components"

import { type EqualizerPreset } from "react-track-player-web"

const Equalizer = () => {
  const { t } = useTranslation()

  const {
    equalizerEnabled,
    equalizerPreset,
    equalizerBandGains,
    setEqualizerEnabled,
    setEqualizerPreset,
    setEqualizerBandGain,
    resetEqualizer
  } = useSettingsStore(
    useShallow((state) => ({
      equalizerEnabled: state.equalizerEnabled,
      equalizerPreset: state.equalizerPreset,
      equalizerBandGains: state.equalizerBandGains,
      setEqualizerEnabled: state.setEqualizerEnabled,
      setEqualizerPreset: state.setEqualizerPreset,
      setEqualizerBandGain: state.setEqualizerBandGain,
      resetEqualizer: state.resetEqualizer
    }))
  )

  const equalizerBands = [
    { index: 0, frequency: 32, label: "32 Hz" },
    { index: 1, frequency: 64, label: "64 Hz" },
    { index: 2, frequency: 125, label: "125 Hz" },
    { index: 3, frequency: 250, label: "250 Hz" },
    { index: 4, frequency: 500, label: "500 Hz" },
    { index: 5, frequency: 1000, label: "1 kHz" },
    { index: 6, frequency: 2000, label: "2 kHz" },
    { index: 7, frequency: 4000, label: "4 kHz" },
    { index: 8, frequency: 8000, label: "8 kHz" },
    { index: 9, frequency: 16000, label: "16 kHz" }
  ]

  const equalizerPresets = [
    {
      value: "flat" as EqualizerPreset,
      label: t("settings.equalizer.presets.flat.label"),
      description: t("settings.equalizer.presets.flat.description")
    },
    {
      value: "rock" as EqualizerPreset,
      label: t("settings.equalizer.presets.rock.label"),
      description: t("settings.equalizer.presets.rock.description")
    },
    {
      value: "pop" as EqualizerPreset,
      label: t("settings.equalizer.presets.pop.label"),
      description: t("settings.equalizer.presets.pop.description")
    },
    {
      value: "jazz" as EqualizerPreset,
      label: t("settings.equalizer.presets.jazz.label"),
      description: t("settings.equalizer.presets.jazz.description")
    },
    {
      value: "classical" as EqualizerPreset,
      label: t("settings.equalizer.presets.classical.label"),
      description: t("settings.equalizer.presets.classical.description")
    },
    {
      value: "electronic" as EqualizerPreset,
      label: t("settings.equalizer.presets.electronic.label"),
      description: t("settings.equalizer.presets.electronic.description")
    },
    {
      value: "vocal" as EqualizerPreset,
      label: t("settings.equalizer.presets.vocal.label"),
      description: t("settings.equalizer.presets.vocal.description")
    },
    {
      value: "bass" as EqualizerPreset,
      label: t("settings.equalizer.presets.bass.label"),
      description: t("settings.equalizer.presets.bass.description")
    },
    {
      value: "treble" as EqualizerPreset,
      label: t("settings.equalizer.presets.treble.label"),
      description: t("settings.equalizer.presets.treble.description")
    }
  ]

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "enable",
      title: t("settings.equalizer.enable.title"),
      description: t("settings.equalizer.enable.description"),
      renderLeft: () => <Icon name="Volume2" className="mt-1" />,
      children: (
        <div className="flex items-center gap-3">
          <Button
            variant={equalizerEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setEqualizerEnabled(!equalizerEnabled)}
          >
            {equalizerEnabled
              ? t("settings.equalizer.enable.enabled")
              : t("settings.equalizer.enable.disabled")}
          </Button>
        </div>
      )
    },
    {
      key: "presets",
      title: t("settings.equalizer.presets.title"),
      description: t("settings.equalizer.presets.description"),
      renderLeft: () => <Icon name="Settings" className="mt-1" />,
      children: (
        <Select
          value={equalizerPreset}
          onValueChange={(value) => setEqualizerPreset(value as EqualizerPreset)}
          disabled={!equalizerEnabled}
        >
          <SelectTrigger className="h-auto w-fit gap-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {equalizerPresets.map((preset) => (
              <SelectItem key={preset.value} value={preset.value}>
                <div className="flex flex-col items-start">
                  <Typography affects={["bold"]}>{preset.label}</Typography>
                  <Typography affects={["muted"]} className="text-xs">
                    {preset.description}
                  </Typography>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      key: "bands",
      title: t("settings.equalizer.bands.title"),
      description: t("settings.equalizer.bands.description"),
      renderLeft: () => <Icon name="Sliders" className="mt-1" />,
      children: (
        <div className="grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10">
          {equalizerBands.map((band) => (
            <div key={band.index} className="flex min-w-0 flex-col items-center gap-2">
              <Typography affects={["small"]} className="w-full truncate text-center">
                {band.label}
              </Typography>
              <div className="flex w-full flex-col items-center gap-1">
                <Slider
                  value={[equalizerBandGains[band.index]]}
                  onValueChange={(value) => setEqualizerBandGain(band.index, value[0])}
                  min={-12}
                  max={12}
                  step={0.5}
                  disabled={!equalizerEnabled}
                  orientation="vertical"
                  formatTooltip={(value) => `${value > 0 ? "+" : ""}${value.toFixed(1)} dB`}
                  className="h-32"
                />
                <Typography
                  affects={["small"]}
                  className={cn(
                    "w-full truncate text-center",
                    equalizerBandGains[band.index] > 0
                      ? "text-success"
                      : equalizerBandGains[band.index] < 0
                        ? "text-error"
                        : "text-muted-foreground"
                  )}
                >
                  {equalizerBandGains[band.index] > 0 ? "+" : ""}
                  {equalizerBandGains[band.index].toFixed(1)} dB
                </Typography>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: "reset",
      title: t("settings.equalizer.reset.title"),
      description: t("settings.equalizer.reset.description"),
      renderLeft: () => <Icon name="RotateCcw" className="mt-1" />,
      children: (
        <Button variant="outline" size="sm" className="w-fit" onClick={resetEqualizer}>
          {t("settings.equalizer.reset.button")}
        </Button>
      )
    }
  ]

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <Typography variant="h1" className="truncate">
              {t("settings.equalizer.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              {t("settings.equalizer.title")}
            </Typography>
          </StickyHeader>
        )
      }}
    >
      <div className="flex flex-col gap-9">
        {settings.map((setting) => (
          <SettingButton
            key={setting.key}
            title={setting.title}
            description={setting.description}
            renderLeft={setting.renderLeft}
            renderRight={setting.renderRight}
            children={setting.children}
          />
        ))}
      </div>
    </ScrollAreaWithHeaders>
  )
}

export { Equalizer }
