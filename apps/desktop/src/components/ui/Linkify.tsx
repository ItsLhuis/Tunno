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
          // eslint-disable-next-line react/no-array-index-key -- Parts from text split have no unique ID, index ensures uniqueness for duplicate URLs
          <span key={`${part}-${index}`} className="whitespace-normal">
            <SafeLink to={part as unknown as "/"}>{part}</SafeLink>
          </span>
        ) : (
          part
        )
      )}
    </Typography>
  )
}

export { Linkify }
