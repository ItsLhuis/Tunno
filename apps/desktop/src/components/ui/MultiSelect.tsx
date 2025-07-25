import {
  type ButtonHTMLAttributes,
  type ComponentType,
  forwardRef,
  Fragment,
  type KeyboardEvent,
  useState
} from "react"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { cva, type VariantProps } from "class-variance-authority"

import { Badge } from "@components/ui/Badge"
import { Button } from "@components/ui/Button"
import { Checkbox } from "@components/ui/Checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@components/ui/Command"
import { Icon } from "@components/ui/Icon"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/Popover"
import { Separator } from "@components/ui/Separator"

const multiSelectVariants = cva("", {
  variants: {
    variant: {
      default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      secondary:
        "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

type MultiSelectProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof multiSelectVariants> & {
    options: {
      label: string
      value: string
      icon?: ComponentType<{ className?: string }>
    }[]
    onValueChange: (value: string[]) => void
    defaultValue?: string[]
    placeholder?: string
    maxCount?: number
    modalPopover?: boolean
    asChild?: boolean
    className?: string
  }

const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation()

    const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true)
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues]
        newSelectedValues.pop()
        setSelectedValues(newSelectedValues)
        onValueChange(newSelectedValues)
      }
    }

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option]
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }

    const handleClear = () => {
      setSelectedValues([])
      onValueChange([])
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev)
    }

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount)
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear()
      } else {
        const allValues = options.map((option) => option.value)
        setSelectedValues(allValues)
        onValueChange(allValues)
      }
    }

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            variant="outline"
            onClick={handleTogglePopover}
            asChild
            style={{ backgroundColor: "transparent" }}
            className={cn(
              "flex h-auto min-h-9 w-full items-center justify-between rounded-md border p-1 transition-colors focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background focus-visible:outline-none [&_svg]:pointer-events-auto",
              className
            )}
          >
            <button>
              {selectedValues.length > 0 ? (
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1">
                    {selectedValues.slice(0, maxCount).map((value) => {
                      const option = options.find((o) => o.value === value)
                      const IconComponent = option?.icon
                      return (
                        <Badge key={value} className={cn(multiSelectVariants({ variant }))}>
                          {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                          {option?.label}
                          <span
                            onClick={(event) => {
                              event.stopPropagation()
                              toggleOption(value)
                            }}
                          >
                            <Icon
                              name="XCircle"
                              className="ml-2 h-4 w-4 text-muted-foreground opacity-50"
                            />
                          </span>
                        </Badge>
                      )
                    })}
                    {selectedValues.length > maxCount && (
                      <Badge
                        className={cn(
                          "border-foreground/1 bg-transparent text-foreground hover:bg-transparent",
                          multiSelectVariants({ variant })
                        )}
                      >
                        {`+ ${selectedValues.length - maxCount} ${t("common.more")}`}
                        <span
                          onClick={(event) => {
                            event.stopPropagation()
                            clearExtraOptions()
                          }}
                        >
                          <Icon
                            name="XCircle"
                            className="ml-2 h-4 w-4 text-muted-foreground opacity-50"
                          />
                        </span>
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      onClick={(event) => {
                        event.stopPropagation()
                        handleClear()
                      }}
                    >
                      <Icon name="XIcon" className="mx-2 h-4 text-muted-foreground opacity-50" />
                    </span>
                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                    <Icon
                      name="ChevronDown"
                      className="mx-2 h-4 text-muted-foreground opacity-50"
                    />
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex w-full items-center justify-between">
                  <span className="mx-2 text-sm text-muted-foreground">{placeholder}</span>
                  <Icon name="ChevronDown" className="mx-2 h-4 text-muted-foreground opacity-50" />
                </div>
              )}
            </button>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput placeholder={t("common.search")} onKeyDown={handleInputKeyDown} />
            <CommandList>
              <CommandEmpty>{t("common.noResultsFound")}</CommandEmpty>
              <CommandGroup>
                <CommandItem key="all" onSelect={toggleAll}>
                  <Checkbox checked={selectedValues.length === options.length} />
                  <span>{t("common.selectAll")}</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className=""
                    >
                      <Checkbox checked={isSelected} />
                      {option.icon && <option.icon className="h-4 w-4 text-muted-foreground" />}
                      <span>{option.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <Fragment>
                    <CommandItem onSelect={handleClear} className="flex-1 justify-center">
                      {t("common.clear")}
                    </CommandItem>
                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                  </Fragment>
                )}
                <CommandItem
                  onSelect={() => setIsPopoverOpen(false)}
                  className="max-w-full flex-1 justify-center"
                >
                  {t("common.cancel")}
                </CommandItem>
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

export { MultiSelect }
