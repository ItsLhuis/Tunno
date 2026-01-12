import { useCallback, useEffect, useState, type ReactNode } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useTranslation } from "@repo/i18n"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldErrors } from "react-hook-form"

import { createAddToPlaylistSchema, type AddToPlaylistType } from "@repo/schemas"

import { useAddSongsToPlaylist } from "../hooks/useAddSongsToPlaylist"

import { useFetchPlaylists } from "../hooks/useFetchPlaylists"

import { FlashList, type ListRenderItemInfo } from "@shopify/flash-list"

import {
  AsyncState,
  BottomSheetFlashList,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  KeyboardSpacer,
  NotFound,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Spinner
} from "@components/ui"

import { PlaylistItemSelect } from "../components/PlaylistItem"

import { type Playlist } from "@repo/api"

export type AddToPlaylistFormRenderProps = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<AddToPlaylistType>
  reset: () => void
  submit: () => void
}

type AddToPlaylistFormProps = {
  songIds: number[]
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: AddToPlaylistType) => void | Promise<void>
  children?: (props: AddToPlaylistFormRenderProps) => ReactNode
  asSheet?: boolean
  open?: boolean
  onOpen?: (open: boolean) => void
}

const AddToPlaylistForm = ({
  songIds,
  trigger,
  title,
  onSubmit,
  children,
  asSheet = true,
  open,
  onOpen
}: AddToPlaylistFormProps) => {
  const styles = useStyles(addToPlaylistFormStyles)

  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const addSongsToPlaylistMutation = useAddSongsToPlaylist()

  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    isError: isPlaylistsError
  } = useFetchPlaylists({
    orderBy: { column: "name", direction: "asc" }
  })

  const form = useForm<AddToPlaylistType>({
    resolver: zodResolver(createAddToPlaylistSchema(t)),
    mode: "onChange",
    defaultValues: {
      playlistIds: []
    }
  })

  const handleFormSubmit = async (values: AddToPlaylistType) => {
    if (onSubmit) {
      await onSubmit(values)
    } else {
      await addSongsToPlaylistMutation.mutateAsync({
        songIds,
        playlistIds: values.playlistIds
      })
    }

    if (asSheet) {
      setIsOpen(false)
    }
  }

  const handleToggle = useCallback((playlistId: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(playlistId)) {
        newSet.delete(playlistId)
      } else {
        newSet.add(playlistId)
      }
      return newSet
    })
  }, [])

  useEffect(() => {
    const playlistIds = Array.from(selectedIds)
    form.setValue("playlistIds", playlistIds, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [selectedIds, form])

  useEffect(() => {
    if (form.formState.isSubmitted && form.formState.isSubmitSuccessful && form.formState.isValid) {
      form.reset()
      setSelectedIds(new Set())
    }
  }, [form.formState.isSubmitted, form.formState.isSubmitSuccessful, form.formState.isValid])

  useEffect(() => {
    if (!isOpen && asSheet) {
      form.reset()
      setSelectedIds(new Set())
    }
  }, [isOpen, asSheet])

  const { isSubmitting, isDirty, isValid, errors } = form.formState

  const renderProps = {
    isSubmitting: isSubmitting || addSongsToPlaylistMutation.isPending,
    isDirty,
    isValid,
    errors,
    reset: () => {
      form.reset()
      setSelectedIds(new Set())
    },
    submit: () => form.handleSubmit(handleFormSubmit)()
  } as AddToPlaylistFormRenderProps

  const keyExtractor = useCallback((item: Playlist) => item.id.toString(), [])

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Playlist>) => {
      const isSelected = selectedIds.has(item.id)
      const isLastItem = index === (playlists?.length ?? 0) - 1

      return (
        <View style={styles.listItem(isLastItem)}>
          <PlaylistItemSelect
            playlist={item}
            selected={isSelected}
            onToggle={() => handleToggle(item.id)}
          />
        </View>
      )
    },
    [selectedIds, handleToggle, playlists?.length, styles]
  )

  const ListEmptyComponent = useCallback(
    () =>
      isPlaylistsLoading ? (
        <View style={styles.emptyContainer}>
          <Spinner />
        </View>
      ) : (
        <NotFound />
      ),
    [isPlaylistsLoading, styles]
  )

  const FormContent = (
    <AsyncState
      data={playlists}
      isLoading={isPlaylistsLoading}
      isError={isPlaylistsError}
      LoadingComponent={
        <View style={styles.loadingContainer}>
          <Spinner />
        </View>
      }
    >
      {(data) => (
        <Form {...form}>
          <View style={styles.fill}>
            <FormField
              control={form.control}
              name="playlistIds"
              render={() => (
                <FormItem style={styles.fill}>
                  <FormControl style={styles.fill}>
                    <View style={styles.fill}>
                      {asSheet ? (
                        <BottomSheetFlashList
                          data={data}
                          keyExtractor={keyExtractor}
                          renderItem={renderItem}
                          ListEmptyComponent={ListEmptyComponent}
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={styles.listContent(data.length === 0)}
                          keyboardShouldPersistTaps="handled"
                        />
                      ) : (
                        <FlashList
                          data={data}
                          keyExtractor={keyExtractor}
                          renderItem={renderItem}
                          ListEmptyComponent={ListEmptyComponent}
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={styles.listContent(data.length === 0)}
                          keyboardShouldPersistTaps="handled"
                        />
                      )}
                    </View>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </View>
          {children?.(renderProps)}
        </Form>
      )}
    </AsyncState>
  )

  if (!asSheet) return FormContent

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!renderProps.isSubmitting) setIsOpen(open)
      }}
    >
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent enableDynamicSizing={false} snapPoints={["100%"]}>
        <View style={styles.sheetContainer}>
          <SheetHeader>
            <SheetTitle>{title ?? t("form.titles.addToPlaylist")}</SheetTitle>
          </SheetHeader>
          <Separator />
          <View style={styles.fill}>{FormContent}</View>
          <Separator />
          <SheetFooter>
            <Button
              title={t("form.buttons.cancel")}
              variant="outline"
              isLoading={renderProps.isSubmitting}
              onPress={() => setIsOpen(false)}
            />
            <Button
              title={t("form.buttons.add")}
              disabled={!renderProps.isValid || !renderProps.isDirty || renderProps.isSubmitting}
              isLoading={renderProps.isSubmitting}
              onPress={() => form.handleSubmit(handleFormSubmit)()}
            />
          </SheetFooter>
        </View>
        <KeyboardSpacer />
      </SheetContent>
    </Sheet>
  )
}

const addToPlaylistFormStyles = createStyleSheet(({ theme, runtime }) => ({
  fill: {
    flex: 1
  },
  sheetContainer: {
    flex: 1,
    paddingBottom: theme.space("lg") + runtime.insets.bottom
  },
  listContent: (isEmpty: boolean) =>
    viewStyle({
      padding: theme.space(3),
      ...(isEmpty && {
        flex: 1
      })
    }),
  listItem: (isLast: boolean) =>
    viewStyle({
      marginBottom: isLast ? 0 : theme.space(2)
    }),
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(8)
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space("lg")
  }
}))

export { AddToPlaylistForm }
