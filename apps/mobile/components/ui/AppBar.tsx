import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeColor } from "@hooks/useThemeColor"

import { size } from "@constants/font"
import { spacing } from "@constants/styles"

import { type StyleProp, type ViewStyle } from "react-native"

import { View, ViewProps } from "./View"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { SearchInput } from "./SearchInput"

export type AppBarProps = ViewProps & {
  title?: string
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  hideSearch?: boolean
  searchPlaceholder?: string
  value?: string
  onSearchChange?: (text: string) => void
}

export function AppBar({
  title = "Title",
  renderLeft,
  renderRight,
  containerStyle,
  hideSearch = false,
  searchPlaceholder = "Search",
  value,
  onSearchChange,
  ...rest
}: AppBarProps) {
  const insets = useSafeAreaInsets()

  const colors = useThemeColor()

  return (
    <View
      style={[
        {
          paddingTop: insets.top + spacing.medium,
          paddingBottom: spacing.large,
          paddingHorizontal: spacing.large,
          gap: spacing.small
        },
        containerStyle
      ]}
      {...rest}
    >
      <View
        style={{
          minHeight: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.medium
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {renderLeft ? renderLeft() : <Icon name="information" style={{ opacity: 0 }} />}
        </View>
        {/*         <Text
          numberOfLines={1}
          variant="bold"
          style={{ flex: 1, textAlign: "center", color: colors.text, fontSize: size.medium }}
        >
          {title}
        </Text> */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {renderRight ? renderRight() : <Icon name="information" style={{ opacity: 0 }} />}
        </View>
      </View>
      <Text
        numberOfLines={2}
        variant="bold"
        style={{ color: colors.text, fontSize: size.xxLarge, marginTop: spacing.medium }}
      >
        {title}
      </Text>
      {!hideSearch && (
        <SearchInput
          placeholder={searchPlaceholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onSearchChange}
          style={{ backgroundColor: colors.tabBarBackground }}
        />
      )}
    </View>
  )
}
