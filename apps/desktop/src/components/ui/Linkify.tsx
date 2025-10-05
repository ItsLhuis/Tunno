"use client"

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
          <span key={index} className="whitespace-normal">
            <SafeLink to={part as any}>{part}</SafeLink>
          </span>
        ) : (
          part
        )
      )}
    </Typography>
  )
}

export { Linkify }
