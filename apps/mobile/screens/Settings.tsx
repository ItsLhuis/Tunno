import { useState } from "react"

import { createStyleSheet, useStyles, useTheme, type ThemeMode } from "@styles"

import { useTranslation } from "@repo/i18n"

import { View } from "react-native"

import { BackButton } from "@components/navigation"
import {
  AsyncState,
  Badge,
  Button,
  Calendar,
  Checkbox,
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Header,
  Icon,
  Image,
  Label,
  LargeHeader,
  type Lyric,
  LyricsEditor,
  NotFound,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Pressable,
  RadioGroup,
  RadioGroupItem,
  ScrollViewWithHeaders,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  TextInput
} from "@components/ui"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const testFormSchema = z.object({
  username: z.string().optional(),
  name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email"),
  bio: z.string().optional()
})

import { useKeyboardHandler } from "react-native-keyboard-controller"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

const useGradualAnimation = () => {
  const height = useSharedValue(0)

  useKeyboardHandler(
    {
      onMove: (event) => {
        "worklet"
        height.value = Math.max(event.height, 0)
      }
    },
    []
  )
  return { height }
}

type TestFormValues = z.infer<typeof testFormSchema>

// Demo Section Component
const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const styles = useStyles(settingsStyles)

  return (
    <View style={styles.demoSection}>
      <Text variant="h4" style={styles.demoSectionTitle}>
        {title}
      </Text>
      <View style={styles.demoSectionContent}>{children}</View>
    </View>
  )
}

const Settings = () => {
  const styles = useStyles(settingsStyles)

  const { t, i18n, locales } = useTranslation()
  const { themeMode, setThemeMode } = useTheme()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Demo states
  const [asyncStateMode, setAsyncStateMode] = useState<"loading" | "error" | "empty" | "data">(
    "data"
  )
  const [switchValue, setSwitchValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState("option1")
  const [tabValue, setTabValue] = useState("tab1")
  const [imageTabValue, setImageTabValue] = useState("img1")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  const [dropdownCheckbox1, setDropdownCheckbox1] = useState(false)
  const [dropdownCheckbox2, setDropdownCheckbox2] = useState(true)
  const [dropdownRadio, setDropdownRadio] = useState("radio1")
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [contextMenuCheckbox, setContextMenuCheckbox] = useState(false)
  const [contextMenuRadio, setContextMenuRadio] = useState("option1")
  const [contextMenuButtonOpen, setContextMenuButtonOpen] = useState(false)
  const [lyrics, setLyrics] = useState<Lyric[]>([
    { text: "Hello, world!", startTime: 0 },
    { text: "This is a lyrics editor", startTime: 5 },
    { text: "You can edit time and text", startTime: 10 }
  ])
  const [selectedDate, setSelectedDate] = useState<string>("")

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      name: "",
      email: "",
      bio: ""
    }
  })

  const onSubmit = async (values: TestFormValues) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    console.log("Form values:", values)
    setDialogOpen(false)
  }

  const { height } = useGradualAnimation()

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value)
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("settings.title")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("settings.title")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        {/* AsyncState Demo */}
        <DemoSection title="AsyncState">
          <View style={styles.badgeRow}>
            <Button
              title="Loading"
              size="sm"
              variant={asyncStateMode === "loading" ? "default" : "outline"}
              onPress={() => setAsyncStateMode("loading")}
            />
            <Button
              title="Error"
              size="sm"
              variant={asyncStateMode === "error" ? "default" : "outline"}
              onPress={() => setAsyncStateMode("error")}
            />
            <Button
              title="Empty"
              size="sm"
              variant={asyncStateMode === "empty" ? "default" : "outline"}
              onPress={() => setAsyncStateMode("empty")}
            />
            <Button
              title="Data"
              size="sm"
              variant={asyncStateMode === "data" ? "default" : "outline"}
              onPress={() => setAsyncStateMode("data")}
            />
          </View>
          <View style={styles.asyncStateContainer}>
            <AsyncState
              data={asyncStateMode === "data" ? { name: "John Doe" } : undefined}
              isLoading={asyncStateMode === "loading"}
              isError={asyncStateMode === "error"}
            >
              {(data) => (
                <View style={styles.asyncStateContent}>
                  <Text>Data loaded: {data.name}</Text>
                </View>
              )}
            </AsyncState>
          </View>
        </DemoSection>

        <Separator />

        {/* NotFound Demo */}
        <DemoSection title="NotFound">
          <View style={styles.notFoundContainer}>
            <NotFound />
          </View>
        </DemoSection>

        <Separator />

        {/* Image Demo */}
        <DemoSection title="Image">
          <View style={styles.imageTabsContainer}>
            <Image
              source={{
                uri:
                  imageTabValue === "img1"
                    ? "https://picsum.photos/seed/nature/400/300"
                    : imageTabValue === "img2"
                      ? "https://picsum.photos/seed/city/400/300"
                      : imageTabValue === "img3"
                        ? "https://picsum.photos/seed/ocean/400/300"
                        : imageTabValue === "img4"
                          ? "https://picsum.photos/seed/mountain/400/300"
                          : "https://picsum.photos/seed/forest/400/300"
              }}
              style={styles.demoImage}
            />
          </View>
          <View style={styles.imageButtonsRow}>
            <Button
              title="Nature"
              size="sm"
              variant={imageTabValue === "img1" ? "default" : "outline"}
              onPress={() => setImageTabValue("img1")}
            />
            <Button
              title="City"
              size="sm"
              variant={imageTabValue === "img2" ? "default" : "outline"}
              onPress={() => setImageTabValue("img2")}
            />
            <Button
              title="Ocean"
              size="sm"
              variant={imageTabValue === "img3" ? "default" : "outline"}
              onPress={() => setImageTabValue("img3")}
            />
            <Button
              title="Mountain"
              size="sm"
              variant={imageTabValue === "img4" ? "default" : "outline"}
              onPress={() => setImageTabValue("img4")}
            />
            <Button
              title="Forest"
              size="sm"
              variant={imageTabValue === "img5" ? "default" : "outline"}
              onPress={() => setImageTabValue("img5")}
            />
          </View>
        </DemoSection>

        <Separator />

        {/* Calendar Demo */}
        <DemoSection title="Calendar">
          <Calendar onDateSelect={setSelectedDate} />
          <Text size="xs" color="mutedForeground">
            Selected date: {selectedDate || "none"}
          </Text>
        </DemoSection>

        <Separator />

        {/* Badge Demo */}
        <DemoSection title="Badge">
          <View style={styles.badgeRow}>
            <Badge title="Default" />
            <Badge title="Secondary" variant="secondary" />
            <Badge title="Muted" variant="muted" />
            <Badge title="Destructive" variant="destructive" />
          </View>
          <View style={styles.badgeRow}>
            <Badge title="Outline" variant="outline" />
            <Badge title="Info" variant="info" />
            <Badge title="Warning" variant="warning" />
            <Badge title="Success" variant="success" />
          </View>
        </DemoSection>

        <Separator />

        {/* Separator Demo */}
        <DemoSection title="Separator">
          <Text size="sm" color="mutedForeground">
            Horizontal separator above and below this text
          </Text>
          <Separator />
          <View style={styles.separatorRow}>
            <Text size="sm">Left</Text>
            <Separator orientation="vertical" style={styles.verticalSeparator} />
            <Text size="sm">Right</Text>
          </View>
        </DemoSection>

        <Separator />

        {/* Switch Demo */}
        <DemoSection title="Switch">
          <View style={styles.row}>
            <Label>Enable notifications</Label>
            <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
          </View>
          <View style={styles.row}>
            <Label disabled>Disabled switch</Label>
            <Switch checked={true} disabled />
          </View>
        </DemoSection>

        <Separator />

        {/* Checkbox Demo */}
        <DemoSection title="Checkbox">
          <View style={styles.row}>
            <Checkbox checked={checkboxValue} onCheckedChange={setCheckboxValue} />
            <Label>Accept terms and conditions</Label>
          </View>
          <View style={styles.row}>
            <Checkbox checked={true} disabled />
            <Label disabled>Disabled checkbox</Label>
          </View>
        </DemoSection>

        <Separator />

        {/* RadioGroup Demo */}
        <DemoSection title="RadioGroup">
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <View style={styles.row}>
              <RadioGroupItem value="option1" />
              <Label>Option 1</Label>
            </View>
            <View style={styles.row}>
              <RadioGroupItem value="option2" />
              <Label>Option 2</Label>
            </View>
            <View style={styles.row}>
              <RadioGroupItem value="option3" />
              <Label>Option 3</Label>
            </View>
          </RadioGroup>
          <Text size="xs" color="mutedForeground">
            Selected: {radioValue}
          </Text>
        </DemoSection>

        <Separator />

        {/* Tabs Demo */}
        <DemoSection title="Tabs">
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList>
              <TabsTrigger value="tab1" title="Account" />
              <TabsTrigger value="tab2" title="Password" />
              <TabsTrigger value="tab3" title="Settings" />
            </TabsList>
            <TabsContent value="tab1">
              <View style={styles.tabContent}>
                <Text size="sm">Account settings content goes here.</Text>
              </View>
            </TabsContent>
            <TabsContent value="tab2">
              <View style={styles.tabContent}>
                <Text size="sm">Password settings content goes here.</Text>
              </View>
            </TabsContent>
            <TabsContent value="tab3">
              <View style={styles.tabContent}>
                <Text size="sm">General settings content goes here.</Text>
              </View>
            </TabsContent>
          </Tabs>
        </DemoSection>

        <Separator />

        {/* Select Demo */}
        <DemoSection title="Select">
          <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple" title="Apple" />
                <SelectItem value="banana" title="Banana" />
                <SelectItem value="orange" title="Orange" />
                <SelectItem value="grape" title="Grape" />
                <SelectItem value="mango" title="Mango" />
              </SelectGroup>
            </SelectContent>
          </Select>
          <Text size="xs" color="mutedForeground">
            Selected: {selectValue || "none"}
          </Text>
        </DemoSection>

        <Separator />

        {/* DropdownMenu Demo */}
        <DemoSection title="DropdownMenu">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger title="Open Menu" variant="outline" />
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem title="Profile">
                  <Icon name="User" size="sm" color="mutedForeground" />
                  <Text size="sm">Profile</Text>
                </DropdownMenuItem>
                <DropdownMenuItem title="Settings">
                  <Icon name="Settings" size="sm" color="mutedForeground" />
                  <Text size="sm">Settings</Text>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Icon name="Share" size="sm" color="mutedForeground" />
                    <Text size="sm">Share</Text>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Icon name="Mail" size="sm" color="mutedForeground" />
                      <Text size="sm">Email</Text>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="MessageCircle" size="sm" color="mutedForeground" />
                      <Text size="sm">Message</Text>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="Globe" size="sm" color="mutedForeground" />
                      <Text size="sm">Social Media</Text>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Preferences</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={dropdownCheckbox1}
                onCheckedChange={setDropdownCheckbox1}
                title="Show notifications"
              />
              <DropdownMenuCheckboxItem
                checked={dropdownCheckbox2}
                onCheckedChange={setDropdownCheckbox2}
                title="Enable sounds"
              />
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={dropdownRadio} onValueChange={setDropdownRadio}>
                <DropdownMenuRadioItem value="radio1" title="Light" />
                <DropdownMenuRadioItem value="radio2" title="Dark" />
                <DropdownMenuRadioItem value="radio3" title="System" />
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem closeOnPress>
                <Icon name="LogOut" size="sm" color="destructive" />
                <Text size="sm" color="destructive">
                  Log out
                </Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DemoSection>

        <Separator />

        {/* ContextMenu Demo */}
        <DemoSection title="ContextMenu">
          <Text size="xs" color="mutedForeground" style={styles.contextMenuHint}>
            Long press the box below to open the context menu
          </Text>
          <ContextMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
            <ContextMenuTrigger style={styles.contextMenuTrigger} asChild>
              <Pressable style={styles.contextMenuBox}>
                <Icon name="Image" size="lg" color="mutedForeground" />
                <Text size="sm" color="mutedForeground">
                  Long press me
                </Text>
              </Pressable>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem onPress={() => console.log("Edit pressed")}>
                <Icon name="Pencil" size="sm" color="mutedForeground" />
                <Text size="sm">Edit</Text>
              </ContextMenuItem>
              <ContextMenuItem onPress={() => console.log("Copy pressed")}>
                <Icon name="Copy" size="sm" color="mutedForeground" />
                <Text size="sm">Copy</Text>
              </ContextMenuItem>
              <ContextMenuItem onPress={() => console.log("Share pressed")}>
                <Icon name="Share" size="sm" color="mutedForeground" />
                <Text size="sm">Share</Text>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem
                checked={contextMenuCheckbox}
                onCheckedChange={setContextMenuCheckbox}
                title="Mark as favorite"
              />
              <ContextMenuSeparator />
              <ContextMenuLabel>Quality</ContextMenuLabel>
              <ContextMenuRadioGroup value={contextMenuRadio} onValueChange={setContextMenuRadio}>
                <ContextMenuRadioItem value="option1" title="Low" />
                <ContextMenuRadioItem value="option2" title="Medium" />
                <ContextMenuRadioItem value="option3" title="High" />
              </ContextMenuRadioGroup>
              <ContextMenuSeparator />
              <ContextMenuItem onPress={() => console.log("Delete pressed")}>
                <Icon name="Trash2" size="sm" color="destructive" />
                <Text size="sm" color="destructive">
                  Delete
                </Text>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </DemoSection>

        <Separator />

        {/* ContextMenu with Button Demo */}
        <DemoSection title="ContextMenu with Button">
          <Text size="xs" color="mutedForeground" style={styles.contextMenuHint}>
            Tap for primary action, long press for more options
          </Text>
          <ContextMenu open={contextMenuButtonOpen} onOpenChange={setContextMenuButtonOpen}>
            <ContextMenuTrigger>
              {({ onLongPress }) => (
                <Button
                  title="Play Song"
                  variant="default"
                  onPress={() => console.log("Play button pressed")}
                  onLongPress={onLongPress}
                />
              )}
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>More Options</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem onPress={() => console.log("Play next")}>
                <Icon name="ListEnd" size="sm" color="mutedForeground" />
                <Text size="sm">Play Next</Text>
              </ContextMenuItem>
              <ContextMenuItem onPress={() => console.log("Add to queue")}>
                <Icon name="ListPlus" size="sm" color="mutedForeground" />
                <Text size="sm">Add to Queue</Text>
              </ContextMenuItem>
              <ContextMenuItem onPress={() => console.log("Add to playlist")}>
                <Icon name="Plus" size="sm" color="mutedForeground" />
                <Text size="sm">Add to Playlist</Text>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onPress={() => console.log("Go to artist")}>
                <Icon name="User" size="sm" color="mutedForeground" />
                <Text size="sm">Go to Artist</Text>
              </ContextMenuItem>
              <ContextMenuItem onPress={() => console.log("Go to album")}>
                <Icon name="Disc3" size="sm" color="mutedForeground" />
                <Text size="sm">Go to Album</Text>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </DemoSection>

        <Separator />

        {/* Dialog Demo */}
        <DemoSection title="Dialog">
          <Dialog>
            <DialogTrigger title="Open Dialog" variant="outline" />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog description. Dialogs are useful for displaying important
                  information or requesting user confirmation.
                </DialogDescription>
              </DialogHeader>
              <Text size="sm">
                Dialogs interrupt the user flow and require an action before continuing. Use them
                sparingly for critical information or confirmations.
              </Text>
              <DialogFooter>
                <DialogClose asChild>
                  <Button title="Cancel" variant="outline" />
                </DialogClose>
                <DialogClose asChild>
                  <Button title="Confirm" />
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoSection>

        <Separator />

        {/* Popover Demo */}
        <DemoSection title="Popover">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger title="Open Popover" variant="outline" />
            <PopoverContent>
              <Text variant="h4">Popover Title</Text>
              <Text size="sm" color="mutedForeground">
                This is some popover content. You can put any content here, such as forms,
                information, or actions.
              </Text>
              <Button
                title="Close"
                size="sm"
                onPress={() => setPopoverOpen(false)}
                style={styles.popoverButton}
              />
            </PopoverContent>
          </Popover>
        </DemoSection>

        <Separator />

        {/* Sheet Demo */}
        <DemoSection title="Sheet">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger title="Open Sheet" variant="outline" />
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  This is a sheet description. It can contain helpful information about the sheet
                  content.
                </SheetDescription>
              </SheetHeader>
              <Text size="sm">
                Sheets are useful for displaying additional content or actions without leaving the
                current screen.
              </Text>
              <SheetFooter>
                <SheetClose asChild>
                  <Button title="Cancel" variant="outline" />
                </SheetClose>
                <Button title="Confirm" onPress={() => setSheetOpen(false)} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </DemoSection>

        <Separator />

        {/* Theme Choicebox Demo */}
        <DemoSection title="Theme">
          <Choicebox value={themeMode} onValueChange={(value) => setThemeMode(value as ThemeMode)}>
            <ChoiceboxItem value="light">
              <Icon name="Sun" size="lg" />
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>{t("settings.appearance.theme.light")}</ChoiceboxItemTitle>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value="light" />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
            <ChoiceboxItem value="dark">
              <Icon name="Moon" size="lg" />
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>{t("settings.appearance.theme.dark")}</ChoiceboxItemTitle>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value="dark" />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
            <ChoiceboxItem value="system">
              <Icon name="Laptop" size="lg" />
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>{t("settings.appearance.theme.system")}</ChoiceboxItemTitle>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value="system" />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
          </Choicebox>
        </DemoSection>

        <Separator />

        {/* Language Choicebox Demo */}
        <DemoSection title="Language">
          <Choicebox value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
            {Object.values(locales).map((locale) => (
              <ChoiceboxItem value={locale.code} key={locale.code}>
                <Image source={locale.flag} style={styles.flagImage} contentFit="contain" />
                <ChoiceboxItemHeader>
                  <ChoiceboxItemTitle>{locale.name}</ChoiceboxItemTitle>
                  <ChoiceboxItemDescription>
                    {
                      locales[i18n.language as keyof typeof locales]?.translations.languages[
                        locale.code as keyof typeof locales
                      ]
                    }
                  </ChoiceboxItemDescription>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator value={locale.code} />
                </ChoiceboxItemContent>
              </ChoiceboxItem>
            ))}
          </Choicebox>
        </DemoSection>

        <Separator />

        {/* NumberInput Demo */}
        <DemoSection title="NumberInput">
          <View style={styles.demoSectionContent}>
            <Text size="sm" color="mutedForeground">
              With time format:
            </Text>
            <NumberInput
              placeholder="0:00"
              min={0}
              max={3600}
              step={1}
              format={(v) => {
                const s = v ?? 0
                const mins = Math.floor(s / 60)
                const secs = s % 60
                return `${mins}:${secs.toString().padStart(2, "0")}`
              }}
              parse={(str) => {
                const parts = str.split(":")
                if (parts.length === 2) {
                  return (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0)
                }
                return parseInt(str) || 0
              }}
            />
          </View>
        </DemoSection>

        <Separator />

        {/* LyricsEditor Demo */}
        <DemoSection title="LyricsEditor">
          <LyricsEditor value={lyrics} onChange={setLyrics} placeholder="Enter lyric text..." />
        </DemoSection>

        <Separator />

        {/* LyricsEditor in Dialog Demo */}
        <DemoSection title="LyricsEditor in Dialog">
          <Dialog>
            <DialogTrigger title="Open Lyrics Editor" variant="outline" />
            <DialogContent enableDynamicSizing={false} snapPoints={["100%"]}>
              <DialogHeader>
                <DialogTitle>Edit Lyrics</DialogTitle>
                <DialogDescription>
                  This is a LyricsEditor inside a Dialog with insideBottomSheet prop.
                </DialogDescription>
              </DialogHeader>
              <LyricsEditor
                value={lyrics}
                onChange={setLyrics}
                placeholder="Enter lyric text..."
                insideBottomSheet
              />
            </DialogContent>
          </Dialog>
        </DemoSection>

        <Separator />

        {/* Original Form Demo */}
        <DemoSection title="Form with Dialog">
          <View style={styles.formContainer}>
            <Form {...form}>
              <View style={styles.formFields}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <TextInput
                          placeholder="This field is disabled"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          disabled
                        />
                      </FormControl>
                      <FormDescription>This input cannot be edited.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <TextInput
                          placeholder="Enter your name"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormDescription>This is your display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <TextInput
                          placeholder="Enter your email"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <TextInput
                          placeholder="Tell us about yourself"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                          multiline
                          numberOfLines={4}
                          style={styles.bioInput}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description about yourself (optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <View style={styles.buttonsContainer}>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger
                      title="Save"
                      variant="default"
                      disabled={!form.formState.isValid}
                    />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Save</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to save the form data? This action will submit your
                          changes.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button isLoading={isLoading} title="Cancel" variant="outline" />
                        </DialogClose>
                        <Button
                          isLoading={isLoading}
                          title="Save"
                          onPress={form.handleSubmit(onSubmit)}
                        />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </View>
              </View>
            </Form>
          </View>
        </DemoSection>

        <Animated.View style={[fakeView, styles.fakeView]} />
      </ScrollViewWithHeaders>
    </View>
  )
}

const settingsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    padding: theme.space("lg")
  },
  demoSection: {
    gap: theme.space("md"),
    paddingVertical: theme.space("lg")
  },
  demoSectionTitle: {
    marginBottom: theme.space("xs")
  },
  demoSectionContent: {
    gap: theme.space("sm")
  },
  asyncStateContainer: {
    padding: theme.space("lg"),
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius(),
    overflow: "hidden"
  },
  asyncStateContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space("md")
  },
  notFoundContainer: {
    height: 250,
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius(),
    overflow: "hidden"
  },
  imageTabsContainer: {
    borderRadius: theme.radius(),
    overflow: "hidden"
  },
  demoImage: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: theme.radius()
  },
  imageButtonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.space("sm")
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.space("sm")
  },
  flagImage: {
    width: 24,
    height: 16,
    borderRadius: theme.radius("sm")
  },
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("md")
  },
  verticalSeparator: {
    height: theme.space("lg")
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  numberInput: {
    flex: 1
  },
  tabContent: {
    padding: theme.space("md"),
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius(),
    marginTop: theme.space("sm")
  },
  popoverButton: {
    alignSelf: "flex-end"
  },
  contextMenuHint: {
    marginBottom: theme.space("xs")
  },
  contextMenuTrigger: {
    alignSelf: "flex-start"
  },
  contextMenuBox: {
    padding: theme.space("lg"),
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius(),
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space("sm"),
    minWidth: 120
  },
  formContainer: {
    gap: theme.space()
  },
  formTitle: {
    marginTop: theme.space("lg")
  },
  formFields: {
    gap: theme.space("lg")
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: "top"
  },
  buttonsContainer: {
    gap: theme.space("sm"),
    alignSelf: "flex-end"
  },
  fakeView: {
    marginBottom: theme.space("lg")
  }
}))

export { Settings }
