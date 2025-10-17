import {
  forwardRef,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ComponentType
} from "react"

import { cn } from "@lib/utils"

import { type VariantProps } from "class-variance-authority"

import { useVirtualizer } from "@tanstack/react-virtual"

import { useTranslation } from "@repo/i18n"

import { Badge, badgeVariants } from "@components/ui/Badge"
import { Button, buttonVariants } from "@components/ui/Button"
import { Checkbox } from "@components/ui/Checkbox"
import { Fade } from "@components/ui/Fade"
import { Icon } from "@components/ui/Icon"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/Popover"
import { ScrollArea } from "@components/ui/ScrollArea"
import { Separator } from "@components/ui/Separator"
import { Spinner } from "@components/ui/Spinner"
import { Typography } from "@components/ui/Typography"

const virtualizedSelectVariants = badgeVariants

export type VirtualizedSelectOption = {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
  disabled?: boolean
  group?: string
}

type VirtualItem = {
  type: "group" | "option"
  group?: string
  option?: VirtualizedSelectOption
  index?: number
}

type VirtualizedSelectBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> &
  VariantProps<typeof virtualizedSelectVariants> & {
    options: VirtualizedSelectOption[]
    placeholder?: string
    maxCount?: number
    disabled?: boolean
    loading?: boolean
    modalPopover?: boolean
    className?: string
    popoverClassName?: string
    contentClassName?: string
    itemHeight?: number
    groupHeaderHeight?: number
    maxHeight?: number
    minWidth?: number
    overscan?: number
  }

type VirtualizedSelectSingleProps = VirtualizedSelectBaseProps & {
  multiple?: false
  value?: string
  onValueChange: (value: string) => void
}

type VirtualizedSelectMultiProps = VirtualizedSelectBaseProps & {
  multiple: true
  value?: string[]
  onValueChange: (value: string[]) => void
}

export type VirtualizedSelectProps = VirtualizedSelectSingleProps | VirtualizedSelectMultiProps

const VirtualizedSelect = forwardRef<HTMLButtonElement, VirtualizedSelectProps>(
  (
    {
      options = [],
      value,
      onValueChange,
      placeholder,
      maxCount = 3,
      multiple = false,
      disabled = false,
      loading = false,
      modalPopover = false,
      className,
      popoverClassName,
      contentClassName,
      variant = "muted",
      itemHeight = 40,
      groupHeaderHeight = 32,
      maxHeight = 300,
      minWidth = 200,
      overscan = 5,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation()

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const normalizedValue = useMemo((): string[] => {
      if (multiple) {
        return Array.isArray(value) ? value : []
      }
      return value !== undefined && value !== null && value !== "" ? [String(value)] : []
    }, [value, multiple])

    const groupedOptions = useMemo(() => {
      const groups: Record<string, VirtualizedSelectOption[]> = {}
      const ungroupedOptions: VirtualizedSelectOption[] = []

      options.forEach((option) => {
        if (option.group) {
          if (!groups[option.group]) {
            groups[option.group] = []
          }
          groups[option.group].push(option)
        } else {
          ungroupedOptions.push(option)
        }
      })

      return { groups, ungroupedOptions }
    }, [options])

    const virtualItems = useMemo((): VirtualItem[] => {
      const items: VirtualItem[] = []

      if (groupedOptions.ungroupedOptions.length > 0) {
        groupedOptions.ungroupedOptions.forEach((option, index) => {
          items.push({ type: "option", option, index })
        })
      }

      Object.entries(groupedOptions.groups).forEach(([groupName, groupOptions]) => {
        items.push({ type: "group", group: groupName })
        groupOptions.forEach((option, index) => {
          items.push({ type: "option", option, index })
        })
      })

      return items
    }, [groupedOptions])

    const emitValue = (values: string[]) => {
      if (multiple) {
        ;(onValueChange as (value: string[]) => void)(values)
      } else {
        const singleValue = values.length > 0 ? values[0] : ""
        ;(onValueChange as (value: string) => void)(singleValue)
      }
    }

    const scrollRef = useRef<HTMLDivElement | null>(null)

    const enabledValues = useMemo(
      () => options.filter((o) => !o.disabled).map((o) => o.value),
      [options]
    )

    const isAllSelected =
      multiple &&
      enabledValues.length > 0 &&
      enabledValues.every((val) => normalizedValue.includes(val))

    const isIndeterminate =
      multiple &&
      normalizedValue.length > 0 &&
      normalizedValue.length < enabledValues.length &&
      !isAllSelected

    const handleClear = () => {
      emitValue([])
      setIsPopoverOpen(false)
    }

    const handleSelectAll = () => {
      if (!multiple) return
      emitValue(isAllSelected ? [] : enabledValues)
    }

    const clearExtraOptions = () => {
      if (!multiple) return
      emitValue(normalizedValue.slice(0, maxCount))
      setIsPopoverOpen(false)
    }

    const isOptionSelected = (optionValue: string) => normalizedValue.includes(optionValue)

    const toggleOption = (optionValue: string) => {
      if (multiple) {
        const newValues = normalizedValue.includes(optionValue)
          ? normalizedValue.filter((v) => v !== optionValue)
          : [...normalizedValue, optionValue]
        emitValue(newValues)
      } else {
        const isCurrentlySelected = normalizedValue.includes(optionValue)
        const newValues = isCurrentlySelected ? [] : [optionValue]
        emitValue(newValues)

        setIsPopoverOpen(false)
      }
    }

    const estimateSize = (index: number) => {
      const item = virtualItems[index]
      if (item?.type === "group") {
        return groupHeaderHeight
      }
      return itemHeight
    }

    const rowVirtualizer = useVirtualizer({
      count: virtualItems.length,
      estimateSize,
      getScrollElement: () => scrollRef.current,
      overscan
    })

    useEffect(() => {
      if (isPopoverOpen) {
        const id = setTimeout(() => rowVirtualizer.measure(), 0)
        return () => clearTimeout(id)
      }
    }, [isPopoverOpen, virtualItems.length, itemHeight, groupHeaderHeight, rowVirtualizer])

    const renderRow = (index: number) => {
      const item = virtualItems[index]

      if (item.type === "group") {
        return (
          <div className="flex items-center self-center px-3">
            <Typography affects={["small", "muted"]} className="tracking-wide">
              {item.group}
            </Typography>
          </div>
        )
      }

      if (item.type === "option" && item.option) {
        const option = item.option
        const isSelected = isOptionSelected(option.value)

        const IconComponent = option.icon

        return (
          <button
            key={option.value}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex w-full items-center justify-start gap-2 rounded-sm px-3 py-2 text-left"
            )}
            disabled={option.disabled}
            onClick={() => toggleOption(option.value)}
          >
            {multiple && <Checkbox checked={isSelected} />}
            {!multiple && isSelected && <Icon name="Check" />}
            {IconComponent && <IconComponent className="text-muted-foreground" />}
            <Typography className="truncate">{option.label}</Typography>
          </button>
        )
      }

      return null
    }

    const renderTriggerContent = () => {
      const hasSelection = normalizedValue.length > 0

      if (!hasSelection) {
        return (
          <div className="mx-auto flex w-full items-center justify-between">
            <Typography className="mx-2 text-sm text-muted-foreground">{placeholder}</Typography>
            <Icon name="ChevronDown" className="mx-2 h-4 text-muted-foreground opacity-50" />
          </div>
        )
      }

      const visibleValues = normalizedValue.slice(0, maxCount)
      const extraCount = normalizedValue.length - maxCount

      return (
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {visibleValues.map((value) => {
              const option = options.find((option) => option.value === value)

              const IconComponent = option?.icon

              return (
                <Badge key={value} className={cn(virtualizedSelectVariants({ variant }))}>
                  {IconComponent && <IconComponent className="mr-2" />}
                  {option?.label}
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOption(value)
                    }}
                  >
                    <Icon name="XCircle" className="ml-1 text-muted-foreground opacity-50" />
                  </span>
                </Badge>
              )
            })}
            {extraCount > 0 && (
              <Badge
                className={cn(
                  "border-foreground/1 bg-transparent text-foreground hover:bg-transparent",
                  virtualizedSelectVariants({ variant })
                )}
              >
                {`+ ${extraCount} ${t("common.more")}`}
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    clearExtraOptions()
                  }}
                >
                  <Icon name="XCircle" className="ml-1 text-muted-foreground opacity-50" />
                </span>
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
            >
              <Icon name="X" className="mx-2 h-4 text-muted-foreground opacity-50" />
            </span>
            <Separator orientation="vertical" className="flex h-full min-h-6" />
            <Icon name="ChevronDown" className="mx-2 h-4 text-muted-foreground opacity-50" />
          </div>
        </div>
      )
    }

    const hasSelection = normalizedValue.length > 0

    const contentHeight = loading
      ? "auto"
      : rowVirtualizer.getTotalSize() > 0
        ? rowVirtualizer.getTotalSize()
        : "auto"

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            variant="outline"
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            asChild
            style={{ backgroundColor: "transparent" }}
            className={cn(
              "flex h-auto min-h-9 w-full items-center justify-between rounded-md border p-1 transition-colors focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background focus-visible:outline-none [&_svg]:pointer-events-auto",
              className
            )}
          >
            <button>{renderTriggerContent()}</button>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-[--radix-popover-trigger-width] p-1", contentClassName)}
          align="start"
          style={{ minWidth: `${minWidth}px` }}
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Fade key={String(loading)} className="w-full">
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Spinner />
              </div>
            ) : (
              <div className={cn("flex flex-col", popoverClassName)}>
                {multiple && (
                  <Fragment>
                    <button
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "flex w-full items-center justify-start gap-2 rounded-sm px-3 py-2 text-left"
                      )}
                      onClick={handleSelectAll}
                    >
                      <Checkbox
                        checked={isAllSelected ? true : isIndeterminate ? "indeterminate" : false}
                      />
                      <Typography className="truncate">{t("common.selectAll")}</Typography>
                    </button>
                    <Separator className="my-1" />
                  </Fragment>
                )}
                <ScrollArea
                  ref={scrollRef}
                  className="w-full"
                  style={{
                    height: contentHeight,
                    maxHeight
                  }}
                >
                  <div
                    style={{
                      height: contentHeight,
                      position: "relative"
                    }}
                  >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                      <div
                        key={virtualRow.key}
                        className="absolute left-0 right-0 flex items-center justify-start"
                        style={{
                          transform: `translateY(${virtualRow.start}px)`,
                          height: virtualRow.size
                        }}
                      >
                        {renderRow(virtualRow.index)}
                      </div>
                    ))}
                    {options.length === 0 && (
                      <Typography
                        affects={["muted"]}
                        className="flex h-full items-center justify-center py-6"
                      >
                        {t("common.noResultsFound")}
                      </Typography>
                    )}
                  </div>
                </ScrollArea>
                <Separator className="my-1" />
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="max-w-full flex-1 rounded-sm"
                    onClick={() => setIsPopoverOpen(false)}
                  >
                    {t("common.cancel")}
                  </Button>
                  {hasSelection && (
                    <Separator orientation="vertical" className="mx-1 flex h-full min-h-6" />
                  )}
                  {hasSelection && (
                    <Button variant="ghost" className="flex-1 rounded-sm" onClick={handleClear}>
                      {t("common.clear")}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Fade>
        </PopoverContent>
      </Popover>
    )
  }
)

export { VirtualizedSelect, virtualizedSelectVariants }
