"use no memo"

import {
  FlexWidget,
  ImageWidget,
  SvgWidget,
  TextWidget,
  type ColorProp
} from "react-native-android-widget"

import { borderRadiusTokens, fontSizeTokens, spacingTokens } from "@styles"

import { generateWidgetPalette, type WidgetPalette, type WidgetTheme } from "./widgetTheme"
import { getTranslation, type WidgetTranslationKey } from "./widgetUtils"

const Icons = {
  skipBack: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/></svg>`,
  skipForward: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg>`,
  play: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`,
  pause: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`,
  shuffle: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/></svg>`,
  repeat: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`,
  repeatOne: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h1v4"/></svg>`,
  music: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
}

export { WidgetTheme }

export type WidgetSize = "small" | "medium" | "large"

export type MiniPlayerWidgetProps = {
  title: string
  artists: string
  thumbnailUri: `data:image${string}` | null
  dominantColor: string | null
  isPlaying: boolean
  canPlayPrevious: boolean
  canPlayNext: boolean
  isShuffleEnabled: boolean
  repeatMode: number
  theme: WidgetTheme
  language: string
  size: WidgetSize
}

const colorToString = (color: ColorProp): string => {
  return color as string
}

const t = (key: WidgetTranslationKey, language: string): string => {
  return getTranslation(key, language)
}

const getRepeatIcon = (mode: number, activeColor: string, inactiveColor: string): string => {
  if (mode === 2) return Icons.repeatOne(activeColor)
  if (mode === 1) return Icons.repeat(activeColor)
  return Icons.repeat(inactiveColor)
}

const Thumbnail = ({
  uri,
  size,
  palette,
  radius
}: {
  uri: `data:image${string}` | null
  size: number
  palette: WidgetPalette
  radius: number
}) => {
  return (
    <FlexWidget
      style={{
        backgroundColor: palette.muted,
        borderRadius: radius,
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {uri ? (
        <ImageWidget image={uri} imageWidth={size} imageHeight={size} radius={radius} />
      ) : (
        <SvgWidget
          svg={Icons.music(colorToString(palette.mutedForeground))}
          style={{ width: size * 0.4, height: size * 0.4 }}
        />
      )}
    </FlexWidget>
  )
}

const ControlButton = ({
  icon,
  size,
  clickAction,
  backgroundColor
}: {
  icon: string
  size: number
  clickAction: string
  backgroundColor?: ColorProp
}) => {
  return (
    <FlexWidget
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        ...(backgroundColor && { backgroundColor })
      }}
      clickAction={clickAction}
      clickActionData={{ action: clickAction }}
    >
      <SvgWidget svg={icon} style={{ width: size * 0.5, height: size * 0.5 }} />
    </FlexWidget>
  )
}

const TrackInfo = ({
  title,
  artists,
  palette,
  fontSize,
  smallFontSize
}: {
  title: string
  artists: string
  palette: WidgetPalette
  fontSize: number
  smallFontSize: number
}) => {
  return (
    <FlexWidget
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >
      <TextWidget
        text={title}
        maxLines={1}
        truncate="END"
        style={{
          fontFamily: "SpaceGrotesk-Bold",
          fontSize,
          color: palette.foreground,
          textAlign: "left"
        }}
      />
      <TextWidget
        text={artists}
        maxLines={1}
        truncate="END"
        style={{
          fontFamily: "SpaceGrotesk-Regular",
          fontSize: smallFontSize,
          color: palette.mutedForeground,
          textAlign: "left"
        }}
      />
    </FlexWidget>
  )
}

const MiniPlayerWidget = (props: MiniPlayerWidgetProps) => {
  const {
    title,
    artists,
    thumbnailUri,
    dominantColor,
    isPlaying,
    canPlayPrevious,
    canPlayNext,
    isShuffleEnabled,
    repeatMode,
    theme,
    language,
    size
  } = props

  const palette = generateWidgetPalette(theme, dominantColor)

  const hasTrack = Boolean(title)
  const displayTitle = title || t("noSongPlaying", language)
  const displayArtists = hasTrack ? artists || t("unknownArtist", language) : ""

  const dimensions = {
    small: {
      thumbnailSize: 48,
      controlButtonSize: 28,
      playButtonSize: 32,
      extraControlButtonSize: 28,
      fontSize: fontSizeTokens.sm,
      smallFontSize: fontSizeTokens.xs,
      padding: spacingTokens.sm,
      gap: spacingTokens.sm,
      borderRadius: borderRadiusTokens["2xl"]
    },
    medium: {
      thumbnailSize: 48,
      controlButtonSize: 28,
      playButtonSize: 32,
      extraControlButtonSize: 28,
      fontSize: fontSizeTokens.sm,
      smallFontSize: fontSizeTokens.xs,
      padding: spacingTokens.md,
      gap: spacingTokens.xs,
      borderRadius: borderRadiusTokens["2xl"]
    },
    large: {
      thumbnailSize: 72,
      controlButtonSize: 40,
      playButtonSize: 48,
      extraControlButtonSize: 36,
      fontSize: fontSizeTokens.lg,
      smallFontSize: fontSizeTokens.base,
      padding: spacingTokens.md,
      gap: spacingTokens.sm,
      controlsGap: spacingTokens.md,
      borderRadius: borderRadiusTokens["2xl"]
    }
  }

  const dimension = dimensions[size]

  const foregroundColor = colorToString(palette.foreground)
  const mutedForegroundColor = colorToString(palette.mutedForeground)
  const primaryColor = colorToString(palette.primary)
  const primaryForegroundColor = colorToString(palette.primaryForeground)

  if (size === "small") {
    return (
      <FlexWidget
        style={{
          width: "match_parent",
          height: "match_parent",
          backgroundColor: palette.background,
          borderRadius: dimension.borderRadius,
          padding: dimension.padding,
          flexDirection: "row",
          alignItems: "center",
          flexGap: dimension.gap
        }}
        clickAction="OPEN_APP"
      >
        <Thumbnail
          uri={thumbnailUri}
          size={dimension.thumbnailSize}
          palette={palette}
          radius={borderRadiusTokens.lg}
        />
        <TrackInfo
          title={displayTitle}
          artists={displayArtists}
          palette={palette}
          fontSize={dimension.fontSize}
          smallFontSize={dimension.smallFontSize}
        />
        <FlexWidget
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexGap: dimension.gap
          }}
        >
          <ControlButton
            icon={
              isPlaying ? Icons.pause(primaryForegroundColor) : Icons.play(primaryForegroundColor)
            }
            size={dimension.playButtonSize}
            clickAction="playPause"
            backgroundColor={palette.primary}
          />
          <ControlButton
            icon={Icons.skipForward(canPlayNext ? foregroundColor : mutedForegroundColor)}
            size={dimension.controlButtonSize}
            clickAction="skipNext"
          />
        </FlexWidget>
      </FlexWidget>
    )
  }

  if (size === "medium") {
    return (
      <FlexWidget
        style={{
          width: "match_parent",
          height: "match_parent",
          backgroundColor: palette.background,
          borderRadius: dimension.borderRadius,
          padding: dimension.padding,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexGap: dimension.gap
        }}
        clickAction="OPEN_APP"
      >
        <FlexWidget
          style={{
            width: "match_parent",
            flexDirection: "column",
            alignItems: "flex-start",
            flexGap: dimension.gap
          }}
        >
          <Thumbnail
            uri={thumbnailUri}
            size={dimension.thumbnailSize}
            palette={palette}
            radius={borderRadiusTokens.lg}
          />
          <FlexWidget
            style={{
              width: "match_parent",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <TextWidget
              text={displayTitle}
              maxLines={1}
              truncate="END"
              style={{
                fontFamily: "SpaceGrotesk-Bold",
                fontSize: dimension.fontSize,
                color: palette.foreground,
                textAlign: "left"
              }}
            />
            <TextWidget
              text={displayArtists}
              maxLines={1}
              truncate="END"
              style={{
                fontFamily: "SpaceGrotesk-Regular",
                fontSize: dimension.smallFontSize,
                color: palette.mutedForeground,
                textAlign: "left"
              }}
            />
          </FlexWidget>
        </FlexWidget>
        <FlexWidget
          style={{
            width: "match_parent",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <ControlButton
            icon={Icons.skipBack(canPlayPrevious ? foregroundColor : mutedForegroundColor)}
            size={dimension.controlButtonSize}
            clickAction="skipPrevious"
          />
          <ControlButton
            icon={
              isPlaying ? Icons.pause(primaryForegroundColor) : Icons.play(primaryForegroundColor)
            }
            size={dimension.playButtonSize}
            clickAction="playPause"
            backgroundColor={palette.primary}
          />
          <ControlButton
            icon={Icons.skipForward(canPlayNext ? foregroundColor : mutedForegroundColor)}
            size={dimension.controlButtonSize}
            clickAction="skipNext"
          />
        </FlexWidget>
      </FlexWidget>
    )
  }

  return (
    <FlexWidget
      style={{
        width: "match_parent",
        height: "match_parent",
        backgroundColor: palette.background,
        borderRadius: dimension.borderRadius,
        padding: dimension.padding,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }}
      clickAction="OPEN_APP"
    >
      <FlexWidget
        style={{
          width: "match_parent",
          flexDirection: "row",
          alignItems: "flex-end",
          flexGap: dimension.gap
        }}
      >
        <Thumbnail
          uri={thumbnailUri}
          size={dimension.thumbnailSize}
          palette={palette}
          radius={borderRadiusTokens.lg}
        />
        <TrackInfo
          title={displayTitle}
          artists={displayArtists}
          palette={palette}
          fontSize={dimension.fontSize}
          smallFontSize={dimension.smallFontSize}
        />
      </FlexWidget>
      <FlexWidget
        style={{
          width: "match_parent",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexGap: dimension.gap
        }}
      >
        <ControlButton
          icon={Icons.shuffle(isShuffleEnabled ? primaryColor : mutedForegroundColor)}
          size={dimension.extraControlButtonSize}
          clickAction="toggleShuffle"
        />
        <ControlButton
          icon={Icons.skipBack(canPlayPrevious ? foregroundColor : mutedForegroundColor)}
          size={dimension.controlButtonSize}
          clickAction="skipPrevious"
        />
        <ControlButton
          icon={
            isPlaying ? Icons.pause(primaryForegroundColor) : Icons.play(primaryForegroundColor)
          }
          size={dimension.playButtonSize}
          clickAction="playPause"
          backgroundColor={palette.primary}
        />
        <ControlButton
          icon={Icons.skipForward(canPlayNext ? foregroundColor : mutedForegroundColor)}
          size={dimension.controlButtonSize}
          clickAction="skipNext"
        />
        <ControlButton
          icon={getRepeatIcon(repeatMode, primaryColor, mutedForegroundColor)}
          size={dimension.extraControlButtonSize}
          clickAction="toggleRepeat"
        />
      </FlexWidget>
    </FlexWidget>
  )
}

export { MiniPlayerWidget }
