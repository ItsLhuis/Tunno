import { useCallback, useMemo } from "react"

import { View, type ViewProps } from "react-native"

import { createStyleSheet, responsive, useBreakpoint, useStyles } from "@styles"

import { Button, type ButtonProps } from "@components/ui/Button"
import { Icon } from "@components/ui/Icon"

type PaginationProps = ViewProps & {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

type ResponsivePageConfig = Partial<Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", number>>

const MAX_VISIBLE_PAGES: ResponsivePageConfig = {
  xs: 5,
  sm: 7,
  md: 9,
  lg: 11,
  xl: 13,
  "2xl": 15
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  style,
  ...props
}: PaginationProps) => {
  const styles = useStyles(paginationStyles)

  const breakpoint = useBreakpoint()

  const maxVisiblePages = useMemo(
    () => responsive(MAX_VISIBLE_PAGES, breakpoint) ?? 3,
    [breakpoint]
  )

  const pages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []
    const leftSideCount = Math.floor(maxVisiblePages / 2)
    const rightSideCount = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(1, currentPage - leftSideCount)
    let endPage = Math.min(totalPages, currentPage + rightSideCount)

    if (currentPage <= leftSideCount) {
      endPage = Math.min(totalPages, maxVisiblePages)
    }
    if (currentPage > totalPages - rightSideCount) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push("ellipsis-start")
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("ellipsis-end")
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, totalPages, maxVisiblePages])

  const handlePreviousPress = useCallback(() => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1)
    }
  }, [currentPage, onPageChange])

  const handleNextPress = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1)
    }
  }, [currentPage, totalPages, onPageChange])

  const handlePagePress = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        onPageChange?.(page)
      }
    },
    [currentPage, onPageChange]
  )

  return (
    <View style={[styles.pagination, style]} {...props}>
      <View style={styles.content}>
        <PaginationPrevious disabled={currentPage === 1} onPress={handlePreviousPress} />
        {pages.map((page, index) => {
          if (typeof page === "string") {
            return <PaginationEllipsis key={`${page}-${index}`} />
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === currentPage} onPress={() => handlePagePress(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationNext disabled={currentPage === totalPages} onPress={handleNextPress} />
      </View>
    </View>
  )
}

export type PaginationContentProps = ViewProps

const PaginationContent = ({ style, ...props }: PaginationContentProps) => {
  const styles = useStyles(paginationStyles)

  return <View style={[styles.content, style]} {...props} />
}

export type PaginationItemProps = ViewProps

const PaginationItem = ({ style, ...props }: PaginationItemProps) => {
  return <View style={style} {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  children?: number | string
} & Omit<ButtonProps, "variant" | "title"> &
  ViewProps

const PaginationLink = ({ isActive, children, style, ...props }: PaginationLinkProps) => {
  const styles = useStyles(paginationStyles)

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      title={String(children)}
      style={[styles.link, style]}
      {...props}
    />
  )
}

type PaginationPreviousProps = Omit<ButtonProps, "title" | "children">

const PaginationPrevious = ({ style, ...props }: PaginationPreviousProps) => {
  const styles = useStyles(paginationStyles)

  return (
    <Button size="sm" variant="ghost" style={[styles.navButton, style]} {...props}>
      <Icon name="ChevronLeft" size="sm" />
    </Button>
  )
}

type PaginationNextProps = Omit<ButtonProps, "title" | "children">

const PaginationNext = ({ style, ...props }: PaginationNextProps) => {
  const styles = useStyles(paginationStyles)

  return (
    <Button size="sm" variant="ghost" style={[styles.navButton, style]} {...props}>
      <Icon name="ChevronRight" size="sm" />
    </Button>
  )
}

type PaginationEllipsisProps = ViewProps

const PaginationEllipsis = ({ style, ...props }: PaginationEllipsisProps) => {
  const styles = useStyles(paginationStyles)

  return (
    <View style={[styles.ellipsis, style]} {...props}>
      <Icon name="Ellipsis" size="sm" />
    </View>
  )
}

const paginationStyles = createStyleSheet(({ theme, runtime }) => {
  const isSmallScreen = runtime.breakpoints.xs
  const isMediumScreen = runtime.breakpoints.md

  const linkGap = isSmallScreen
    ? theme.space(0.5)
    : isMediumScreen
      ? theme.space(1)
      : theme.space(1.5)
  const linkSize = isSmallScreen ? theme.space(7) : theme.space(8)

  return {
    pagination: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      flexDirection: "row",
      gap: linkGap,
      alignItems: "center",
      justifyContent: "center",
      flexWrap: isSmallScreen ? "wrap" : "nowrap"
    },
    link: {
      minWidth: linkSize
    },
    navButton: {
      paddingHorizontal: theme.space(1)
    },
    ellipsis: {
      width: linkSize,
      height: linkSize,
      alignItems: "center",
      justifyContent: "center"
    }
  }
})

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
