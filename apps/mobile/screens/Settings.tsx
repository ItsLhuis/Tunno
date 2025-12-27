import { useState } from "react"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { View } from "react-native"

import { BackButton } from "@components/navigation"
import {
  AsyncState,
  Badge,
  Button,
  Checkbox,
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
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
  Label,
  LargeHeader,
  type Lyric,
  LyricsEditor,
  NotFound,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
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

  const { t } = useTranslation()

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
  const [sheetOpen, setSheetOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  const [choiceboxValue, setChoiceboxValue] = useState("choice1")
  const [dropdownCheckbox1, setDropdownCheckbox1] = useState(false)
  const [dropdownCheckbox2, setDropdownCheckbox2] = useState(true)
  const [dropdownRadio, setDropdownRadio] = useState("radio1")
  const [numberValue, setNumberValue] = useState<number | undefined>(50)
  const [lyrics, setLyrics] = useState<Lyric[]>([
    { text: "Hello, world!", startTime: 0 },
    { text: "This is a lyrics editor", startTime: 5 },
    { text: "You can edit time and text", startTime: 10 }
  ])

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
            <SelectContent snapPoints={["40%"]}>
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
            <DropdownMenuContent snapPoints={["50%"]}>
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

        {/* Popover Demo */}
        <DemoSection title="Popover">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger title="Open Popover" variant="outline" />
            <PopoverContent snapPoints={["30%"]}>
              <Text variant="h4">Popover Title</Text>
              <Text size="sm" color="mutedForeground" style={styles.popoverText}>
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
            <SheetContent snapPoints={["50%"]}>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  This is a sheet description. It can contain helpful information about the sheet
                  content.
                </SheetDescription>
              </SheetHeader>
              <View style={styles.sheetContent}>
                <Text size="sm">
                  Sheets are useful for displaying additional content or actions without leaving the
                  current screen.
                </Text>
              </View>
              <SheetFooter>
                <SheetClose title="Cancel" variant="outline" />
                <Button title="Confirm" onPress={() => setSheetOpen(false)} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </DemoSection>

        <Separator />

        {/* Choicebox Demo */}
        <DemoSection title="Choicebox">
          <Choicebox value={choiceboxValue} onValueChange={setChoiceboxValue}>
            <ChoiceboxItem value="choice1">
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>Free Plan</ChoiceboxItemTitle>
                <ChoiceboxItemDescription>Basic features for personal use</ChoiceboxItemDescription>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value="choice1" />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
            <ChoiceboxItem value="choice2">
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>Pro Plan</ChoiceboxItemTitle>
                <ChoiceboxItemDescription>
                  Advanced features for professionals
                </ChoiceboxItemDescription>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value="choice2" />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
            <ChoiceboxItem value="choice3">
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>Enterprise Plan</ChoiceboxItemTitle>
                <ChoiceboxItemDescription>Full features for large teams</ChoiceboxItemDescription>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value="choice3" />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
          </Choicebox>
          <Text size="xs" color="mutedForeground">
            Selected: {choiceboxValue}
          </Text>
        </DemoSection>

        <Separator />

        {/* NumberInput Demo */}
        <DemoSection title="NumberInput">
          <View style={styles.row}>
            <Label>Volume</Label>
            <NumberInput
              value={numberValue}
              onChange={setNumberValue}
              min={0}
              max={100}
              step={5}
              style={styles.numberInput}
            />
          </View>
          <Text size="xs" color="mutedForeground">
            Value: {numberValue ?? "undefined"}
          </Text>
          <View style={styles.demoSectionContent}>
            <Text size="sm" color="mutedForeground">
              With time format:
            </Text>
            <NumberInput
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
                    <DialogContent snapPoints={["30%"]}>
                      <DialogHeader>
                        <DialogTitle>Confirm Save</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to save the form data? This action will submit your
                          changes.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose
                          isLoading={isLoading}
                          title="Cancel"
                          variant="outline"
                          onPress={() => setDialogOpen(false)}
                        />
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
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.space("sm")
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
    flex: 1,
    maxWidth: 150
  },
  tabContent: {
    padding: theme.space("md"),
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius(),
    marginTop: theme.space("sm")
  },
  popoverText: {
    marginTop: theme.space("sm")
  },
  popoverButton: {
    marginTop: theme.space("md"),
    alignSelf: "flex-end"
  },
  sheetContent: {
    flex: 1,
    padding: theme.space("lg")
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
