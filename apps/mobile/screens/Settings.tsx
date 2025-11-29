import { useState } from "react"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { View } from "react-native"

import { BackButton } from "@components/navigation"
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Header,
  LargeHeader,
  ScrollViewWithHeaders,
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

const Settings = () => {
  const styles = useStyles(settingsStyles)

  const { t } = useTranslation()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
  formContainer: {
    paddingTop: theme.space("lg"),
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
