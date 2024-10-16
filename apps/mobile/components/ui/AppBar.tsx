import { type ViewProps, type StyleProp, type ViewStyle } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useThemeColor } from "@hooks/useThemeColor"

import { size } from "@constants/font"
import { spacing } from "@constants/styles"

import { View } from "./View"
import { Text } from "./Text"
import { SearchInput } from "./SearchInput"

export type AppBarProps = ViewProps & {
  title?: string
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (text: string) => void
}

export function AppBar({
  title = "Title",
  renderLeft,
  renderRight,
  containerStyle,
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  ...rest
}: AppBarProps) {
  const insets = useSafeAreaInsets()

  const colors = useThemeColor()

  return (
    <View
      style={[
        {
          paddingHorizontal: spacing.large,
          paddingTop: insets.top + spacing.xxLarge + spacing.small,
          paddingBottom: spacing.large,
          gap: spacing.small
        },
        containerStyle
      ]}
      {...rest}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.medium
        }}
      >
        {renderLeft && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {renderLeft()}
          </View>
        )}
        <Text type="bold" style={{ flex: 1, color: colors.text, fontSize: size.xxLarge }}>
          {title}
        </Text>
        {renderRight && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {renderRight()}
          </View>
        )}
      </View>
      <SearchInput
        placeholder={searchPlaceholder}
        placeholderTextColor={colors.placeholder}
        onChangeText={onSearchChange}
        value={searchValue}
        style={{ backgroundColor: colors.tabBarBackground }}
      />
    </View>
  )
}
