import { type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { Text, type TextProps } from "@components/ui/Text"

export type CardProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const Card = ({ children, style }: CardProps) => {
  const styles = useStyles(cardStyles)

  return <View style={[styles.card, style]}>{children}</View>
}

export type CardHeaderProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const CardHeader = ({ children, style }: CardHeaderProps) => {
  const styles = useStyles(cardStyles)

  return <View style={[styles.cardHeader, style]}>{children}</View>
}

export type CardTitleProps = TextProps

const CardTitle = ({ style, ...props }: CardTitleProps) => {
  const styles = useStyles(cardStyles)

  return <Text weight="semibold" style={[styles.cardTitle, style]} {...props} />
}

export type CardDescriptionProps = TextProps

const CardDescription = ({ style, ...props }: CardDescriptionProps) => {
  const styles = useStyles(cardStyles)

  return (
    <Text size="sm" color="mutedForeground" style={[styles.cardDescription, style]} {...props} />
  )
}

export type CardActionProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const CardAction = ({ children, style }: CardActionProps) => {
  const styles = useStyles(cardStyles)

  return <View style={[styles.cardAction, style]}>{children}</View>
}

export type CardContentProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const CardContent = ({ children, style }: CardContentProps) => {
  const styles = useStyles(cardStyles)

  return <View style={[styles.cardContent, style]}>{children}</View>
}

export type CardFooterProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const CardFooter = ({ children, style }: CardFooterProps) => {
  const styles = useStyles(cardStyles)

  return <View style={[styles.cardFooter, style]}>{children}</View>
}

const cardStyles = createStyleSheet(({ theme }) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.border,
    borderRadius: theme.radius(),
    padding: theme.space(3),
    gap: theme.space(3)
  },
  cardHeader: {
    gap: theme.space(1)
  },
  cardTitle: {},
  cardDescription: {},
  cardAction: {
    alignSelf: "flex-start"
  },
  cardContent: {},
  cardFooter: {
    flexDirection: "row",
    alignItems: "center"
  }
}))

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
