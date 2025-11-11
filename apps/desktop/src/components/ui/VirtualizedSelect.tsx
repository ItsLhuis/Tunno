import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ComponentType
} from "react"

import { cn } from "@lib/utils"

import { type VariantProps } from "class-variance-authority"

import { useVirtualizer } from "@tanstack/react-virtual"

import { useTranslation } from "@repo/i18n"

import { Badge, badgeVariants } from "@components/ui/Badge"
import { Button } from "@components/ui/Button"
import { Checkbox } from "@components/ui/Checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@components/ui/DropdownMenu"
import { Fade } from "@components/ui/Fade"
import { Icon } from "@components/ui/Icon"
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

type VirtualizedSelectBaseProps = Omit<ComponentProps<"button">, "onSelect"> &
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

const VirtualizedSelect = ({
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
}: VirtualizedSelectProps) => {
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
        <DropdownMenuLabel inset={false} className="w-full data-inset:pl-2">
          <Typography affects={["small", "muted"]} className="tracking-wide">
            {item.group}
          </Typography>
        </DropdownMenuLabel>
      )
    }

    if (item.type === "option" && item.option) {
      const option = item.option
      const isSelected = isOptionSelected(option.value)

      const IconComponent = option.icon

      if (multiple) {
        return (
          <DropdownMenuItem
            key={option.value}
            disabled={option.disabled}
            className="w-full"
            onSelect={(e) => {
              e.preventDefault()
              toggleOption(option.value)
            }}
          >
            <Checkbox checked={isSelected} />
            {IconComponent && <IconComponent />}
            {option.label}
          </DropdownMenuItem>
        )
      }

      return (
        <DropdownMenuItem
          key={option.value}
          disabled={option.disabled}
          className="w-full"
          onSelect={() => toggleOption(option.value)}
        >
          {isSelected && <Icon name="Check" />}
          {IconComponent && <IconComponent />}
          {option.label}
        </DropdownMenuItem>
      )
    }

    return null
  }

  const renderTriggerContent = () => {
    const hasSelection = normalizedValue.length > 0

    if (!hasSelection) {
      return (
        <div className="mx-auto flex w-full items-center justify-between">
          <Typography className="text-muted-foreground mx-2 text-sm">{placeholder}</Typography>
          <Icon name="ChevronDown" className="text-muted-foreground mx-2 h-4 opacity-50" />
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
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleOption(value)
                  }}
                >
                  <Icon name="XCircle" className="text-muted-foreground ml-1 opacity-50" />
                </span>
              </Badge>
            )
          })}
          {extraCount > 0 && (
            <Badge
              className={cn(
                "border-foreground/1 text-foreground bg-transparent hover:bg-transparent",
                virtualizedSelectVariants({ variant })
              )}
            >
              {`+ ${extraCount} ${t("common.more")}`}
              <span
                onClick={(event) => {
                  event.stopPropagation()
                  clearExtraOptions()
                }}
              >
                <Icon name="XCircle" className="text-muted-foreground ml-1 opacity-50" />
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
            <Icon name="X" className="text-muted-foreground mx-2 h-4 opacity-50" />
          </span>
          <Separator orientation="vertical" className="flex h-full min-h-6" />
          <Icon name="ChevronDown" className="text-muted-foreground mx-2 h-4 opacity-50" />
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
    <DropdownMenu open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
      <DropdownMenuTrigger asChild>
        <Button
          {...props}
          variant="outline"
          asChild
          className={cn(
            "border-input focus-within:border-primary bg-sidebar hover:bg-input/80 flex h-auto min-h-9 w-full items-center justify-between rounded-md border p-1 transition-colors focus-visible:outline-hidden [&_svg]:pointer-events-auto",
            className
          )}
        >
          <button>{renderTriggerContent()}</button>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={contentClassName}
        align="start"
        style={{
          minWidth: `${minWidth}px`,
          width: "var(--radix-dropdown-menu-trigger-width, auto)"
        }}
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
                  <DropdownMenuItem
                    className="w-full"
                    onSelect={(e) => {
                      e.preventDefault()
                      handleSelectAll()
                    }}
                  >
                    <Checkbox
                      checked={isAllSelected ? true : isIndeterminate ? "indeterminate" : false}
                    />
                    {t("common.selectAll")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
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
                      className="absolute right-0 left-0 w-full"
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                        height: virtualRow.size
                      }}
                    >
                      {renderRow(virtualRow.index)}
                    </div>
                  ))}
                  {options.length === 0 && (
                    <div className="flex h-full items-center justify-center py-6">
                      <Typography affects={["muted"]}>{t("common.noResultsFound")}</Typography>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <DropdownMenuSeparator />
              <div className="flex items-center justify-between px-1">
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                    setIsPopoverOpen(false)
                  }}
                  className="max-w-full flex-1 justify-center"
                >
                  {t("common.cancel")}
                </DropdownMenuItem>
                {hasSelection && (
                  <Fragment>
                    <Separator orientation="vertical" className="mx-1 flex h-full min-h-6" />
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault()
                        handleClear()
                      }}
                      className="flex-1 justify-center"
                    >
                      {t("common.clear")}
                    </DropdownMenuItem>
                  </Fragment>
                )}
              </div>
            </div>
          )}
        </Fade>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { VirtualizedSelect, virtualizedSelectVariants }
