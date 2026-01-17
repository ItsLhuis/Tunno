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
import { getTranslation, type WidgetSize, type WidgetTranslationKey } from "./widgetUtils"

const Icons = {
  skipBack: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/></svg>`,
  skipForward: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg>`,
  play: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`,
  pause: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`,
  music: (color: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
}

export { WidgetSize, WidgetTheme }

export type MiniPlayerWidgetProps = {
  title: string
  artists: string
  thumbnailUri: `data:image${string}` | null
  dominantColor: string | null
  isPlaying: boolean
  canPlayPrevious: boolean
  canPlayNext: boolean
  theme: WidgetTheme
  language: string
  size: WidgetSize
  isPlayerActive: boolean
}

const colorToString = (color: ColorProp): string => {
  return color as string
}

const t = (key: WidgetTranslationKey, language: string): string => {
  return getTranslation(key, language)
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
    theme,
    language,
    size,
    isPlayerActive
  } = props

  const palette = generateWidgetPalette(theme, dominantColor)

  const hasTrack = Boolean(title)
  const displayTitle = title || t("noSongPlaying", language)
  const displayArtists = hasTrack
    ? artists || t("unknownArtist", language)
    : t("openToStart", language)

  const getClickAction = (action: string) => (isPlayerActive ? action : "OPEN_APP")

  const dimensions = {
    tiny: {
      thumbnailSize: 48,
      controlButtonSize: 28,
      playButtonSize: 32,
      fontSize: fontSizeTokens.sm,
      smallFontSize: fontSizeTokens.xs,
      padding: spacingTokens.sm,
      gap: spacingTokens.sm,
      borderRadius: borderRadiusTokens["2xl"]
    },
    small: {
      thumbnailSize: 48,
      controlButtonSize: 28,
      playButtonSize: 32,
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
      fontSize: fontSizeTokens.sm,
      smallFontSize: fontSizeTokens.xs,
      padding: spacingTokens.md,
      gap: spacingTokens.sm,
      borderRadius: borderRadiusTokens["2xl"]
    },
    large: {
      thumbnailSize: 72,
      controlButtonSize: 40,
      playButtonSize: 48,
      fontSize: fontSizeTokens.lg,
      smallFontSize: fontSizeTokens.base,
      padding: spacingTokens.md,
      gap: spacingTokens.sm,
      borderRadius: borderRadiusTokens["2xl"]
    }
  }

  const dimension = dimensions[size]

  const foregroundColor = colorToString(palette.foreground)
  const mutedForegroundColor = colorToString(palette.mutedForeground)
  const primaryForegroundColor = colorToString(palette.primaryForeground)

  if (size === "tiny") {
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
          justifyContent: "space-between"
        }}
        clickAction="OPEN_APP"
      >
        <Thumbnail
          uri={thumbnailUri}
          size={dimension.thumbnailSize}
          palette={palette}
          radius={borderRadiusTokens.lg}
        />
        <ControlButton
          icon={
            isPlaying ? Icons.pause(primaryForegroundColor) : Icons.play(primaryForegroundColor)
          }
          size={dimension.playButtonSize}
          clickAction={getClickAction("playPause")}
          backgroundColor={palette.primary}
        />
        <ControlButton
          icon={Icons.skipForward(
            isPlayerActive && canPlayNext ? foregroundColor : mutedForegroundColor
          )}
          size={dimension.controlButtonSize}
          clickAction={getClickAction("skipNext")}
        />
      </FlexWidget>
    )
  }

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
            clickAction={getClickAction("playPause")}
            backgroundColor={palette.primary}
          />
          <ControlButton
            icon={Icons.skipForward(
              isPlayerActive && canPlayNext ? foregroundColor : mutedForegroundColor
            )}
            size={dimension.controlButtonSize}
            clickAction={getClickAction("skipNext")}
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
          alignItems: "flex-start"
        }}
        clickAction="OPEN_APP"
      >
        <FlexWidget
          style={{
            width: "match_parent",
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
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
            height: dimension.playButtonSize,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <ControlButton
            icon={Icons.skipBack(
              isPlayerActive && canPlayPrevious ? foregroundColor : mutedForegroundColor
            )}
            size={dimension.controlButtonSize}
            clickAction={getClickAction("skipPrevious")}
          />
          <ControlButton
            icon={
              isPlaying ? Icons.pause(primaryForegroundColor) : Icons.play(primaryForegroundColor)
            }
            size={dimension.playButtonSize}
            clickAction={getClickAction("playPause")}
            backgroundColor={palette.primary}
          />
          <ControlButton
            icon={Icons.skipForward(
              isPlayerActive && canPlayNext ? foregroundColor : mutedForegroundColor
            )}
            size={dimension.controlButtonSize}
            clickAction={getClickAction("skipNext")}
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
          flex: 1,
          justifyContent: "flex-start"
        }}
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
      </FlexWidget>
      <FlexWidget
        style={{
          width: "match_parent",
          height: dimension.playButtonSize,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexGap: spacingTokens.xl
        }}
      >
        <ControlButton
          icon={Icons.skipBack(
            isPlayerActive && canPlayPrevious ? foregroundColor : mutedForegroundColor
          )}
          size={dimension.controlButtonSize}
          clickAction={getClickAction("skipPrevious")}
        />
        <ControlButton
          icon={
            isPlaying ? Icons.pause(primaryForegroundColor) : Icons.play(primaryForegroundColor)
          }
          size={dimension.playButtonSize}
          clickAction={getClickAction("playPause")}
          backgroundColor={palette.primary}
        />
        <ControlButton
          icon={Icons.skipForward(
            isPlayerActive && canPlayNext ? foregroundColor : mutedForegroundColor
          )}
          size={dimension.controlButtonSize}
          clickAction={getClickAction("skipNext")}
        />
      </FlexWidget>
    </FlexWidget>
  )
}

export { MiniPlayerWidget }
