import { Pressable as RNPressable, type PressableProps as RNPressableProps } from "react-native"

export type PressableProps = RNPressableProps & {
  children?: React.ReactNode
}

export function Pressable({ children, style, ...rest }: PressableProps) {
  return (
    <RNPressable style={style} {...rest}>
      {children}
    </RNPressable>
  )
}
