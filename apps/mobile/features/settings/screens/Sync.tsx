import { useEffect, useMemo, useState } from "react"

import { View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { BackButton } from "@components/navigation"
import {
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Header,
  Icon,
  LargeHeader,
  NotFound,
  ScrollViewWithHeaders,
  Select,
  SelectCheckboxItem,
  SelectContent,
  SelectFlashList,
  SelectGroupHeader,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Spinner,
  Text
} from "@components/ui"

import { SettingButton } from "@features/settings/components"

// =============================================================================
// EXAMPLE DATA
// =============================================================================

type SyncProvider = {
  value: string
  label: string
}

type Genre = {
  value: string
  label: string
  group?: string
}

const SYNC_PROVIDERS: SyncProvider[] = [
  { value: "google-drive", label: "Google Drive" },
  { value: "dropbox", label: "Dropbox" },
  { value: "onedrive", label: "OneDrive" },
  { value: "icloud", label: "iCloud" },
  { value: "local", label: "Local Storage" }
]

const SYNC_INTERVALS = [
  { value: "5", label: "5 minutes" },
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "manual", label: "Manual only" }
]

const GENRES: Genre[] = [
  // Popular genres
  { value: "pop", label: "Pop", group: "Popular" },
  { value: "rock", label: "Rock", group: "Popular" },
  { value: "hip-hop", label: "Hip Hop", group: "Popular" },
  { value: "r-and-b", label: "R&B", group: "Popular" },
  { value: "electronic", label: "Electronic", group: "Popular" },
  // Classical genres
  { value: "classical", label: "Classical", group: "Classical" },
  { value: "opera", label: "Opera", group: "Classical" },
  { value: "symphony", label: "Symphony", group: "Classical" },
  { value: "chamber", label: "Chamber Music", group: "Classical" },
  // Jazz genres
  { value: "jazz", label: "Jazz", group: "Jazz" },
  { value: "blues", label: "Blues", group: "Jazz" },
  { value: "soul", label: "Soul", group: "Jazz" },
  { value: "funk", label: "Funk", group: "Jazz" },
  // World genres
  { value: "latin", label: "Latin", group: "World" },
  { value: "reggae", label: "Reggae", group: "World" },
  { value: "afrobeat", label: "Afrobeat", group: "World" },
  { value: "k-pop", label: "K-Pop", group: "World" },
  { value: "j-pop", label: "J-Pop", group: "World" }
]

const AUDIO_FORMATS = [
  { value: "mp3", label: "MP3" },
  { value: "flac", label: "FLAC" },
  { value: "wav", label: "WAV" },
  { value: "aac", label: "AAC" },
  { value: "ogg", label: "OGG" },
  { value: "m4a", label: "M4A" }
]

const PLAYLISTS = Array.from({ length: 50 }, (_, i) => ({
  value: `playlist-${i + 1}`,
  label: `Playlist ${i + 1}`
}))

type CarouselSlide = {
  id: string
  title: string
  color: string
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  { id: "1", title: "Slide 1", color: "#3b82f6" },
  { id: "2", title: "Slide 2", color: "#ef4444" },
  { id: "3", title: "Slide 3", color: "#22c55e" },
  { id: "4", title: "Slide 4", color: "#f59e0b" },
  { id: "5", title: "Slide 5", color: "#8b5cf6" }
]

// Test data for simulating React Query behavior
const MOCK_ARTISTS = [
  { value: "1", label: "Artist 1" },
  { value: "2", label: "Artist 2" },
  { value: "3", label: "Artist 3" },
  { value: "4", label: "Artist 4" },
  { value: "5", label: "Artist 5" }
]

// =============================================================================
// COMPONENT
// =============================================================================

const Sync = () => {
  const styles = useStyles(syncStyles)

  const { t } = useTranslation()

  // ---------------------------------------------------------------------------
  // State for examples
  // ---------------------------------------------------------------------------

  // Example 1: Single Select (basic)
  const [syncProvider, setSyncProvider] = useState<string>("google-drive")

  // Example 2: Single Select with custom content
  const [syncInterval, setSyncInterval] = useState<string>("15")

  // Example 3: Multiple Select (simple)
  const [audioFormats, setAudioFormats] = useState<string[]>(["mp3", "flac"])

  // Example 4: Multiple Select with groups (virtualized)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["pop", "rock", "jazz"])

  // Example 5: Multiple Select with large dataset (virtualized)
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([])

  // Example: Carousel
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)

  // ---------------------------------------------------------------------------
  // React Query Simulation Test
  // ---------------------------------------------------------------------------

  // Test scenario: "data" = will show data after loading, "empty" = will show NotFound after loading
  const [testScenario, setTestScenario] = useState<"data" | "empty">("data")
  const [isTestLoading, setIsTestLoading] = useState(false)
  const [testData, setTestData] = useState<typeof MOCK_ARTISTS | null>(null)
  const [selectedTestArtists, setSelectedTestArtists] = useState<string[]>([])

  const startLoadingTest = () => {
    setIsTestLoading(true)
    setTestData(null)
    setSelectedTestArtists([])

    setTimeout(() => {
      setIsTestLoading(false)
      setTestData(testScenario === "data" ? MOCK_ARTISTS : [])
    }, 5000)
  }

  // Reset when scenario changes
  useEffect(() => {
    setTestData(null)
    setIsTestLoading(false)
    setSelectedTestArtists([])
  }, [testScenario])

  const testArtistOptions = useMemo(() => {
    return testData ?? []
  }, [testData])

  // ---------------------------------------------------------------------------
  // Prepare grouped data for virtualized list
  // ---------------------------------------------------------------------------

  type GroupedItem = { type: "group"; title: string } | { type: "item"; data: Genre }

  const groupedGenres = useMemo((): GroupedItem[] => {
    const groups: Record<string, Genre[]> = {}

    GENRES.forEach((genre) => {
      const group = genre.group ?? "Other"
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(genre)
    })

    const items: GroupedItem[] = []
    Object.entries(groups).forEach(([groupName, genres]) => {
      items.push({ type: "group", title: groupName })
      genres.forEach((genre) => {
        items.push({ type: "item", data: genre })
      })
    })

    return items
  }, [])

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("settings.sync.title")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("settings.sync.title")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionsContainer}>
          {/* ================================================================= */}
          {/* CAROUSEL TEST */}
          {/* ================================================================= */}
          <View style={styles.testSection}>
            <Text variant="h6" color="mutedForeground">
              Carousel Test
            </Text>
            <Carousel setApi={setCarouselApi}>
              <CarouselContent<CarouselSlide>
                data={CAROUSEL_SLIDES}
                showFade
                renderItem={({ item }) => (
                  <CarouselItem style={styles.carouselItem}>
                    <View style={styles.carouselSlide(item.color)}>
                      <Text variant="h3" style={styles.carouselSlideText}>
                        {item.title}
                      </Text>
                    </View>
                  </CarouselItem>
                )}
              />
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <View style={styles.carouselControls}>
              <Button
                title="Go to First"
                size="sm"
                variant="outline"
                onPress={() => carouselApi?.scrollTo(0)}
              />
              <Button
                title="Go to Last"
                size="sm"
                variant="outline"
                onPress={() => carouselApi?.scrollTo(CAROUSEL_SLIDES.length - 1)}
              />
            </View>
          </View>

          <Separator />

          {/* ================================================================= */}
          {/* DIALOG TEST */}
          {/* ================================================================= */}
          <View style={styles.testSection}>
            <Text variant="h6" color="mutedForeground">
              Dialog Test
            </Text>
            <Dialog>
              <DialogTrigger asChild>
                <Button title="Open Dialog" variant="outline" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Test Dialog</DialogTitle>
                  <DialogDescription>
                    This is a test dialog to verify the Portal is working correctly.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button title="Close" variant="outline" />
                  </DialogClose>
                  <Button title="Confirm" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>

          <Separator />

          {/* ================================================================= */}
          {/* EXAMPLE 1: Single Select (Basic) */}
          {/* ================================================================= */}
          <SettingButton
            title="Sync Provider"
            description="Choose where to store your synced data"
            renderLeft={() => <Icon name="Cloud" size="lg" color="mutedForeground" />}
          >
            <Select value={syncProvider} onValueChange={setSyncProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {SYNC_PROVIDERS.map((provider) => (
                  <SelectItem key={provider.value} value={provider.value} title={provider.label} />
                ))}
              </SelectContent>
            </Select>
          </SettingButton>

          <Separator />

          {/* ================================================================= */}
          {/* EXAMPLE 2: Single Select with custom item content */}
          {/* ================================================================= */}
          <SettingButton
            title="Sync Interval"
            description="How often should we sync your data?"
            renderLeft={() => <Icon name="Clock" size="lg" color="mutedForeground" />}
          >
            <Select value={syncInterval} onValueChange={setSyncInterval}>
              <SelectTrigger>
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                {SYNC_INTERVALS.map((interval) => (
                  <SelectItem key={interval.value} value={interval.value}>
                    <View style={styles.intervalItem}>
                      <Icon
                        name={interval.value === "manual" ? "Hand" : "Timer"}
                        size="sm"
                        color="mutedForeground"
                      />
                      <Text size="sm">{interval.label}</Text>
                    </View>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SettingButton>

          <Separator />

          {/* ================================================================= */}
          {/* EXAMPLE 3: Multiple Select (Simple) */}
          {/* ================================================================= */}
          <SettingButton
            title="Audio Formats"
            description="Select which audio formats to include in sync"
            renderLeft={() => <Icon name="File" size="lg" color="mutedForeground" />}
          >
            <Select multiple value={audioFormats} onValueChange={setAudioFormats} maxCount={3}>
              <SelectTrigger>
                <SelectValue placeholder="Select formats" />
              </SelectTrigger>
              <SelectContent>
                {AUDIO_FORMATS.map((format) => (
                  <SelectCheckboxItem
                    key={format.value}
                    value={format.value}
                    title={format.label}
                  />
                ))}
              </SelectContent>
            </Select>
          </SettingButton>

          <Separator />

          {/* ================================================================= */}
          {/* EXAMPLE 4: Multiple Select with Groups (Virtualized) */}
          {/* ================================================================= */}
          <SettingButton
            title="Preferred Genres"
            description="Select your favorite music genres for recommendations"
            renderLeft={() => <Icon name="Music" size="lg" color="mutedForeground" />}
          >
            <Select multiple value={selectedGenres} onValueChange={setSelectedGenres} maxCount={2}>
              <SelectTrigger>
                <SelectValue placeholder="Select genres" />
              </SelectTrigger>
              <SelectContent virtualized enableDynamicSizing={false} snapPoints={["50%"]}>
                <SelectFlashList
                  data={groupedGenres}
                  keyExtractor={(item, index) =>
                    item.type === "group" ? `group-${index}` : item.data.value
                  }
                  renderItem={({ item }) =>
                    item.type === "group" ? (
                      <SelectGroupHeader title={item.title} />
                    ) : (
                      <SelectCheckboxItem value={item.data.value} title={item.data.label} />
                    )
                  }
                />
              </SelectContent>
            </Select>
          </SettingButton>

          <Separator />

          {/* ================================================================= */}
          {/* EXAMPLE 5: Multiple Select with Large Dataset (Virtualized) */}
          {/* ================================================================= */}
          <SettingButton
            title="Playlists to Sync"
            description="Select which playlists to include in cloud sync (50 available)"
            renderLeft={() => <Icon name="ListMusic" size="lg" color="mutedForeground" />}
          >
            <Select
              multiple
              value={selectedPlaylists}
              onValueChange={setSelectedPlaylists}
              maxCount={3}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select playlists" />
              </SelectTrigger>
              <SelectContent virtualized enableDynamicSizing={false} snapPoints={["60%"]}>
                <SelectFlashList
                  data={PLAYLISTS}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <SelectCheckboxItem value={item.value}>
                      <View style={styles.playlistItem}>
                        <Icon name="ListMusic" size="sm" color="mutedForeground" />
                        <Text size="sm">{item.label}</Text>
                      </View>
                    </SelectCheckboxItem>
                  )}
                />
              </SelectContent>
            </Select>
          </SettingButton>

          <Separator />

          {/* ================================================================= */}
          {/* EXAMPLE 6: React Query Simulation Test */}
          {/* ================================================================= */}
          <View style={styles.testSection}>
            <Text variant="h6" color="mutedForeground">
              React Query Simulation Test
            </Text>
            <Text size="xs" color="mutedForeground">
              Tests bottom sheet auto-resize when content changes from loading to data/empty
            </Text>

            <View style={styles.testControls}>
              <View style={styles.scenarioButtons}>
                <Button
                  title="Data Scenario"
                  variant={testScenario === "data" ? "default" : "outline"}
                  size="sm"
                  onPress={() => setTestScenario("data")}
                />
                <Button
                  title="Empty Scenario"
                  variant={testScenario === "empty" ? "default" : "outline"}
                  size="sm"
                  onPress={() => setTestScenario("empty")}
                />
              </View>

              <Button
                title={isTestLoading ? "Loading... (5s)" : "Start Test"}
                variant="secondary"
                size="sm"
                disabled={isTestLoading}
                onPress={startLoadingTest}
              />
            </View>

            <SettingButton
              title="Test Artists Select"
              description={`Scenario: ${testScenario} | Status: ${isTestLoading ? "loading" : testData ? "loaded" : "idle"}`}
              renderLeft={() => <Icon name="FlaskConical" size="lg" color="mutedForeground" />}
            >
              <Select multiple value={selectedTestArtists} onValueChange={setSelectedTestArtists}>
                <SelectTrigger>
                  <SelectValue placeholder="Select artists" />
                </SelectTrigger>
                <SelectContent virtualized>
                  <SelectFlashList
                    data={testArtistOptions}
                    keyExtractor={(item) => item.value}
                    contentContainerStyle={styles.selectContent(testArtistOptions.length === 0)}
                    renderItem={({ item }) => (
                      <SelectCheckboxItem value={item.value} title={item.label} />
                    )}
                    ListEmptyComponent={
                      isTestLoading ? (
                        <View style={styles.emptySelect}>
                          <Spinner />
                        </View>
                      ) : (
                        <NotFound />
                      )
                    }
                  />
                </SelectContent>
              </Select>
            </SettingButton>
          </View>

          <Separator />

          {/* ================================================================= */}
          {/* DEBUG: Current State */}
          {/* ================================================================= */}
          <View style={styles.debugSection}>
            <Text variant="h6" color="mutedForeground">
              Current Selection State
            </Text>
            <View style={styles.debugContent}>
              <Text size="xs" color="mutedForeground">
                Provider: {syncProvider}
              </Text>
              <Text size="xs" color="mutedForeground">
                Interval: {syncInterval}
              </Text>
              <Text size="xs" color="mutedForeground">
                Formats: {audioFormats.join(", ") || "none"}
              </Text>
              <Text size="xs" color="mutedForeground">
                Genres: {selectedGenres.join(", ") || "none"}
              </Text>
              <Text size="xs" color="mutedForeground">
                Playlists: {selectedPlaylists.length} selected
              </Text>
              <Text size="xs" color="mutedForeground">
                Test Artists: {selectedTestArtists.join(", ") || "none"} (scenario: {testScenario},
                loading: {isTestLoading ? "yes" : "no"})
              </Text>
            </View>
          </View>
        </View>
      </ScrollViewWithHeaders>
    </View>
  )
}

const syncStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    padding: theme.space("lg"),
    paddingBottom: runtime.insets.bottom + theme.space("lg")
  },
  sectionsContainer: {
    gap: theme.space("xl")
  },
  intervalItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2)
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2)
  },
  debugSection: {
    padding: theme.space(),
    borderRadius: theme.radius(),
    backgroundColor: theme.colors.muted,
    gap: theme.space(2)
  },
  debugContent: {
    gap: theme.space(1)
  },
  testSection: {
    gap: theme.space(3)
  },
  carouselItem: {
    width: 280
  },
  carouselSlide: (color: string) =>
    viewStyle({
      height: 180,
      borderRadius: theme.radius("lg"),
      backgroundColor: color,
      alignItems: "center",
      justifyContent: "center"
    }),
  carouselSlideText: {
    color: "#fff"
  },
  carouselControls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.space(2)
  },
  testControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space(2)
  },
  scenarioButtons: {
    flexDirection: "row",
    gap: theme.space(2)
  },
  emptySelect: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(6)
  },
  selectContent: (isEmpty: boolean) =>
    viewStyle({
      ...(isEmpty && {
        flex: 1,
        paddingVertical: theme.space("lg"),
        paddingBottom: runtime.insets.bottom + theme.space("lg")
      })
    })
}))

export { Sync }
