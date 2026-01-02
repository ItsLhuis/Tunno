import { useCallback, useMemo, useState } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles, useTheme, type Theme } from "@styles"

import { useTranslation } from "@repo/i18n"

import {
  LocaleConfig,
  Calendar as RNCalendar,
  CalendarList as RNCalendarList,
  type DateData,
  type CalendarProps as RNCalendarProps
} from "react-native-calendars"

import {
  type Theme as CalendarTheme,
  type DayState,
  type MarkedDates
} from "react-native-calendars/src/types"

import { type BasicDayProps } from "react-native-calendars/src/calendar/day/basic"
import { type CalendarHeaderProps } from "react-native-calendars/src/calendar/header"

import { Icon } from "@components/ui/Icon"
import { Pressable } from "@components/ui/Pressable"
import { Text } from "@components/ui/Text"

export type CalendarProps = Omit<RNCalendarProps, "theme" | "style"> & {
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  selected?: Date | string
  onSelect?: (date: Date | undefined) => void
}

export type CalendarListProps = {
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  onDateSelect?: (date: string) => void
  pastScrollRange?: number
  futureScrollRange?: number
  horizontal?: boolean
  pagingEnabled?: boolean
  markedDates?: MarkedDates
  minDate?: string
  maxDate?: string
}

const localeMap: Record<string, string> = {
  da: "da",
  de: "de",
  en: "en",
  es: "es",
  fi: "fi",
  fr: "fr",
  hi: "hi",
  it: "it",
  ja: "ja",
  ko: "ko",
  nl: "nl",
  no: "no",
  pl: "pl",
  pt: "pt",
  ru: "ru",
  sv: "sv",
  tr: "tr",
  uk: "uk",
  vi: "vi",
  zh: "zh"
}

const configureLocale = (language: string) => {
  const locale = localeMap[language] || "en"

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(language, { month: "long" }).format(new Date(2024, i, 1))
  )

  const monthNamesShort = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(language, { month: "short" }).format(new Date(2024, i, 1))
  )

  const dayNames = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(language, { weekday: "long" }).format(new Date(2024, 0, i + 1))
  )

  const dayNamesShort = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(language, { weekday: "short" }).format(new Date(2024, 0, i + 1))
  )

  LocaleConfig.locales[locale] = {
    monthNames,
    monthNamesShort,
    dayNames,
    dayNamesShort,
    today: new Intl.DateTimeFormat(language, { weekday: "long" }).format(new Date())
  }

  LocaleConfig.defaultLocale = locale
}

const CustomHeader = ({ month, addMonth, firstDay = 0 }: CalendarHeaderProps) => {
  const styles = useStyles(headerStyles)
  const { i18n } = useTranslation()

  const monthTitle = useMemo(() => {
    if (!month) return ""
    return month.toString("MMMM yyyy")
  }, [month])

  const handlePrevMonth = useCallback(() => {
    addMonth?.(-1)
  }, [addMonth])

  const handleNextMonth = useCallback(() => {
    addMonth?.(1)
  }, [addMonth])

  const weekDays = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const dayIndex = (i + firstDay) % 7

      return new Intl.DateTimeFormat(i18n.language, { weekday: "short" }).format(
        new Date(2024, 0, 7 + dayIndex)
      )
    })
    return days
  }, [i18n.language, firstDay])

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Pressable onPress={handlePrevMonth} style={styles.arrowButton}>
          <Icon name="ChevronLeft" size="xl" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text weight="medium" style={styles.title}>
            {monthTitle}
          </Text>
        </View>
        <Pressable onPress={handleNextMonth} style={styles.arrowButton}>
          <Icon name="ChevronRight" size="xl" />
        </Pressable>
      </View>
      <View style={styles.weekDaysRow}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text size="xs" color="mutedForeground" style={styles.weekDayText}>
              {day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const headerStyles = createStyleSheet(({ theme }) => ({
  headerContainer: {
    gap: theme.space(2)
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.space(2),
    paddingHorizontal: theme.space(1)
  },
  arrowButton: {
    padding: theme.space(2),
    borderRadius: theme.radius()
  },
  titleContainer: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    textTransform: "capitalize"
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: theme.space(1)
  },
  weekDayCell: {
    flex: 1,
    alignItems: "center"
  },
  weekDayText: {
    textTransform: "capitalize"
  }
}))

const CustomDay = ({
  date,
  state,
  marking,
  onPress,
  onLongPress,
  theme
}: BasicDayProps & { date?: DateData; theme: Theme }) => {
  const styles = useStyles(dayStyles)

  const isSelected = marking?.selected || state === "selected"
  const isDisabled = (marking?.disabled || state === "disabled") && !isSelected
  const isToday = state === "today"
  const isInactive = state === "inactive"

  const shouldDisableTouch = marking?.disableTouchEvent || isDisabled

  const handlePress = useCallback(() => {
    if (!shouldDisableTouch && date) {
      onPress?.(date)
    }
  }, [onPress, date, shouldDisableTouch])

  const handleLongPress = useCallback(() => {
    if (!shouldDisableTouch && date) {
      onLongPress?.(date)
    }
  }, [onLongPress, date, shouldDisableTouch])

  const containerStyle = useMemo(() => {
    const baseStyles = [styles.dayContainer]

    if (isSelected) {
      baseStyles.push(styles.selectedContainer)
    } else if (isToday) {
      baseStyles.push(styles.todayContainer)
    }

    return baseStyles
  }, [isSelected, isToday, styles])

  const textColor = useMemo(() => {
    if (isSelected) {
      return marking?.selectedTextColor || theme.colors.primaryForeground
    }
    if (isDisabled || isInactive) {
      return theme.withOpacity(theme.colors.mutedForeground, theme.opacity(50))
    }
    if (isToday) {
      return theme.colors.primary
    }
    return theme.colors.foreground
  }, [isSelected, isDisabled, isInactive, isToday, marking?.selectedTextColor, theme])

  const renderDot = () => {
    if (!marking?.marked) return null

    const dotColor = isSelected
      ? theme.colors.primaryForeground
      : marking.dotColor || theme.colors.primary

    return <View style={[styles.dot, { backgroundColor: dotColor }]} />
  }

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      disabled={isDisabled}
      style={containerStyle}
    >
      <Text size="sm" style={{ color: textColor }}>
        {date?.day}
      </Text>
      {renderDot()}
    </Pressable>
  )
}

const dayStyles = createStyleSheet(({ theme }) => ({
  dayContainer: {
    width: theme.space(9),
    height: theme.space(9),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius("full")
  },
  selectedContainer: {
    backgroundColor: theme.colors.primary
  },
  todayContainer: {
    backgroundColor: theme.colors.accent
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: "absolute",
    bottom: theme.space(1)
  }
}))

const dateToString = (date: Date | string | undefined): string => {
  if (!date) return ""
  if (typeof date === "string") return date.split("T")[0]
  return date.toISOString().split("T")[0]
}

const stringToDate = (dateString: string): Date | undefined => {
  if (!dateString) return undefined
  return new Date(dateString)
}

const Calendar = ({
  style,
  containerStyle,
  selected: selectedProp,
  onSelect,
  markedDates: externalMarkedDates,
  ...props
}: CalendarProps) => {
  const styles = useStyles(calendarStyles)

  const { theme, themeMode } = useTheme()

  const { i18n } = useTranslation()

  const [selectedInternal, setSelectedInternal] = useState<string>("")

  const selected = selectedProp ? dateToString(selectedProp) : selectedInternal

  useMemo(() => {
    configureLocale(i18n.language)
  }, [i18n.language])

  const calendarTheme = useMemo<CalendarTheme>(
    () => ({
      backgroundColor: theme.colors.background,
      calendarBackground: theme.colors.background,
      textSectionTitleColor: theme.colors.mutedForeground,
      textSectionTitleDisabledColor: theme.withOpacity(
        theme.colors.mutedForeground,
        theme.opacity(50)
      ),
      selectedDayBackgroundColor: theme.colors.primary,
      selectedDayTextColor: theme.colors.primaryForeground,
      todayTextColor: theme.colors.primary,
      dayTextColor: theme.colors.foreground,
      textDisabledColor: theme.withOpacity(theme.colors.mutedForeground, theme.opacity(50)),
      dotColor: theme.colors.primary,
      selectedDotColor: theme.colors.primaryForeground,
      arrowColor: theme.colors.foreground,
      disabledArrowColor: theme.withOpacity(theme.colors.mutedForeground, theme.opacity(50)),
      monthTextColor: theme.colors.foreground,
      indicatorColor: theme.colors.primary,
      textDayFontFamily: "SpaceGrotesk-Regular",
      textMonthFontFamily: "SpaceGrotesk-Medium",
      textDayHeaderFontFamily: "SpaceGrotesk-Medium",
      textDayFontWeight: "400",
      textMonthFontWeight: "500",
      textDayHeaderFontWeight: "500",
      textDayFontSize: theme.fontSize("sm"),
      textMonthFontSize: theme.fontSize("base"),
      textDayHeaderFontSize: theme.fontSize("xs")
    }),
    [theme]
  )

  const handleDayPress = useCallback(
    (day: DateData) => {
      setSelectedInternal(day.dateString)
      onSelect?.(stringToDate(day.dateString))
    },
    [onSelect]
  )

  const markedDates = useMemo<MarkedDates>(() => {
    const dates: MarkedDates = { ...externalMarkedDates }

    if (selected) {
      dates[selected] = {
        ...dates[selected],
        selected: true,
        disableTouchEvent: true,
        selectedColor: theme.colors.primary,
        selectedTextColor: theme.colors.primaryForeground
      }
    }

    return dates
  }, [selected, externalMarkedDates, theme])

  const renderCustomHeader = useCallback(
    (headerProps: CalendarHeaderProps) => <CustomHeader {...headerProps} />,
    [i18n.language]
  )

  const renderCustomDay = useCallback(
    (dayProps: BasicDayProps & { date?: DateData; state?: DayState }) => (
      <CustomDay {...dayProps} theme={theme} />
    ),
    [theme]
  )

  const calendarKey = `${themeMode}-${theme.colors.background}-${i18n.language}`

  return (
    <View style={[styles.container, containerStyle]}>
      <RNCalendar
        key={calendarKey}
        style={[styles.calendar, style]}
        theme={calendarTheme}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        customHeader={renderCustomHeader}
        dayComponent={renderCustomDay}
        hideDayNames
        enableSwipeMonths
        {...props}
      />
    </View>
  )
}

const CalendarList = ({
  style,
  containerStyle,
  onDateSelect,
  pastScrollRange = 12,
  futureScrollRange = 12,
  horizontal = false,
  pagingEnabled = true,
  markedDates: externalMarkedDates,
  ...props
}: CalendarListProps) => {
  const styles = useStyles(calendarStyles)

  const { theme, themeMode } = useTheme()

  const { i18n } = useTranslation()

  const [selected, setSelected] = useState<string>("")

  useMemo(() => {
    configureLocale(i18n.language)
  }, [i18n.language])

  const calendarTheme = useMemo<CalendarTheme>(
    () => ({
      backgroundColor: theme.colors.background,
      calendarBackground: theme.colors.background,
      textSectionTitleColor: theme.colors.mutedForeground,
      textSectionTitleDisabledColor: theme.withOpacity(
        theme.colors.mutedForeground,
        theme.opacity(50)
      ),
      selectedDayBackgroundColor: theme.colors.primary,
      selectedDayTextColor: theme.colors.primaryForeground,
      todayTextColor: theme.colors.primary,
      dayTextColor: theme.colors.foreground,
      textDisabledColor: theme.withOpacity(theme.colors.mutedForeground, theme.opacity(50)),
      dotColor: theme.colors.primary,
      selectedDotColor: theme.colors.primaryForeground,
      arrowColor: theme.colors.foreground,
      disabledArrowColor: theme.withOpacity(theme.colors.mutedForeground, theme.opacity(50)),
      monthTextColor: theme.colors.foreground,
      indicatorColor: theme.colors.primary,
      textDayFontFamily: "SpaceGrotesk-Regular",
      textMonthFontFamily: "SpaceGrotesk-Medium",
      textDayHeaderFontFamily: "SpaceGrotesk-Medium",
      textDayFontWeight: "400",
      textMonthFontWeight: "500",
      textDayHeaderFontWeight: "500",
      textDayFontSize: theme.fontSize("sm"),
      textMonthFontSize: theme.fontSize("base"),
      textDayHeaderFontSize: theme.fontSize("xs")
    }),
    [theme]
  )

  const handleDayPress = useCallback(
    (day: DateData) => {
      setSelected(day.dateString)
      onDateSelect?.(day.dateString)
    },
    [onDateSelect]
  )

  const markedDates = useMemo<MarkedDates>(() => {
    const dates: MarkedDates = { ...externalMarkedDates }

    if (selected) {
      dates[selected] = {
        ...dates[selected],
        selected: true,
        disableTouchEvent: true,
        selectedColor: theme.colors.primary,
        selectedTextColor: theme.colors.primaryForeground
      }
    }

    return dates
  }, [selected, externalMarkedDates, theme])

  const renderCustomDay = useCallback(
    (dayProps: BasicDayProps & { date?: DateData; state?: DayState }) => (
      <CustomDay {...dayProps} theme={theme} />
    ),
    [theme]
  )

  const calendarKey = `${themeMode}-${theme.colors.background}-${i18n.language}`

  return (
    <View style={[styles.container, containerStyle]}>
      <RNCalendarList
        key={calendarKey}
        style={[styles.calendar, style]}
        theme={calendarTheme}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        dayComponent={renderCustomDay}
        pastScrollRange={pastScrollRange}
        futureScrollRange={futureScrollRange}
        horizontal={horizontal}
        pagingEnabled={pagingEnabled}
        {...props}
      />
    </View>
  )
}

const calendarStyles = createStyleSheet(({ theme }) => ({
  container: {
    borderRadius: theme.radius(),
    overflow: "hidden"
  },
  calendar: {
    borderRadius: theme.radius()
  }
}))

export { Calendar, CalendarList }
