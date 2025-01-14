"use client"

import { Typography, type TypographyProps, Button } from "@components/ui"

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
            <a href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          </Button>
        ) : (
          part
        )
      )}
    </Typography>
  )
}
Linkify.displayName = "Linkify"

export { Linkify }
