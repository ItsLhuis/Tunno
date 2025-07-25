"use client"

import { Button } from "@components/ui/Button"
import { SafeLink } from "@components/ui/SafeLink"
import { Typography, type TypographyProps } from "@components/ui/Typography"

export type LinkifyProps = TypographyProps & {
  text: string
}

const Linkify = ({ text, ...props }: LinkifyProps) => {
  const linkRegex = /(https?:\/\/[^\s]+)/gi

  const parts = text ? text.split(linkRegex) : [""]

  return (
    <Typography variant="span" {...props}>
      {parts.map((part, index) =>
        linkRegex.test(part) ? (
          <Button key={index} variant="link" className="whitespace-normal" asChild>
            <SafeLink to={part}>{part}</SafeLink>
          </Button>
        ) : (
          part
        )
      )}
    </Typography>
  )
}

export { Linkify }
