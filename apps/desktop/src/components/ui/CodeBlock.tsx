"use client"

import { useState } from "react"

import { cn } from "@lib/utils"

import { useTheme } from "@contexts/ThemeContext"

import { Highlight, themes } from "prism-react-renderer"

import { Button, Icon, Typography } from "@components/ui"

type CodeBlockProps = {
  language: string
  children: string
  className?: string
}

const CodeBlock = ({ language, children, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const { resolvedTheme } = useTheme()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className={cn("group border-border relative mt-6 rounded border", className)}>
      <div className="bg-muted/50 text-muted-foreground flex items-center justify-between p-2">
        <Typography className="font-mono" affects={["small"]}>
          {language}
        </Typography>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="relative size-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <div
            className={cn(
              "transition-all",
              !copied ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
            )}
          >
            <Icon name="Copy" className="size-3" />
          </div>
          <Icon
            name="Check"
            className={cn(
              "absolute transition-all",
              copied ? "text-success scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
            )}
          />
        </Button>
      </div>
      <Highlight
        theme={isDark ? themes.oneDark : themes.oneLight}
        code={children.trim()}
        language={language}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={highlightClassName}
            style={{
              ...style,
              backgroundColor: "transparent",
              marginTop: 0,
              borderRadius: 0,
              borderBottomLeftRadius: "calc(var(--radius) - 2px)",
              borderBottomRightRadius: "calc(var(--radius) - 2px)",
              padding: "1rem",
              overflow: "auto"
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-4 inline-block w-8 text-right opacity-50">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export { CodeBlock }
