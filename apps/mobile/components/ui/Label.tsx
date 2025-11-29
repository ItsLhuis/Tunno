import { Text, type TextProps } from "@components/ui/Text"

export type LabelProps = TextProps & {
  htmlFor?: string
  disabled?: boolean
}

const Label = ({ disabled = false, color, ...props }: LabelProps) => {
  return <Text size="sm" weight="medium" color={disabled ? "mutedForeground" : color} {...props} />
}

export { Label }
