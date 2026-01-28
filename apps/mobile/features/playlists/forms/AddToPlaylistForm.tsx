import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useTranslation } from "@repo/i18n"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldErrors } from "react-hook-form"

import { createAddToPlaylistSchema, type AddToPlaylistType } from "@repo/schemas"

import { useAddSongsToPlaylist } from "../hooks/useAddSongsToPlaylist"

import { useFetchPlaylists } from "../hooks/useFetchPlaylists"

import { FlashList } from "@shopify/flash-list"

import { debounce } from "lodash"

import {
  AsyncState,
  BottomSheetFlashList,
  BottomSheetTextInput,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  KeyboardSpacer,
  Pagination,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Spinner
} from "@components/ui"

import { type Playlist } from "@repo/api"
import { PlaylistItemSelect } from "../components/PlaylistItem"

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

  const [currentPage, setCurrentPage] = useState(1)

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

  const itemsPerPage = 25

  const addSongsToPlaylistMutation = useAddSongsToPlaylist()

  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    isError: isPlaylistsError
  } = useFetchPlaylists({
    filters: debouncedSearchTerm ? { search: debouncedSearchTerm } : undefined,
    orderBy: { column: "name", direction: "asc" }
  })

  const form = useForm<AddToPlaylistType>({
    resolver: zodResolver(createAddToPlaylistSchema(t)),
    mode: "onChange",
    defaultValues: {
      playlistIds: []
    }
  })

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((term: string) => {
        setDebouncedSearchTerm(term)
        setCurrentPage(1)
      }, 300),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel()
    }
  }, [debouncedSetSearchTerm])

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
      setCurrentPage(1)
      setSearchTerm("")
      setDebouncedSearchTerm("")
    }
  }, [form.formState.isSubmitted, form.formState.isSubmitSuccessful, form.formState.isValid])

  useEffect(() => {
    if (!isOpen && asSheet) {
      form.reset()
      setSelectedIds(new Set())
      setCurrentPage(1)
      setSearchTerm("")
      setDebouncedSearchTerm("")
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
      setSearchTerm("")
      setDebouncedSearchTerm("")
    },
    submit: () => form.handleSubmit(handleFormSubmit)()
  } as AddToPlaylistFormRenderProps

  const paginatedData = useCallback(() => {
    if (!playlists) return []
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return playlists.slice(startIndex, endIndex)
  }, [playlists, currentPage, itemsPerPage])()

  const totalPages = Math.ceil((playlists?.length ?? 0) / itemsPerPage)

  const keyExtractor = useCallback((item: Playlist) => item.id.toString(), [])

  const renderItem = useCallback(
    ({ item, index }: { item: Playlist; index: number }) => {
      const isSelected = selectedIds.has(item.id)
      const isLastItem = index === (paginatedData?.length ?? 0) - 1

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
    [selectedIds, handleToggle, paginatedData?.length, styles]
  )

  const SearchInputContent = (
    <View style={styles.searchContainer}>
      <BottomSheetTextInput
        placeholder={t("common.search")}
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text)
          debouncedSetSearchTerm(text)
        }}
      />
    </View>
  )

  const FormContent = (
    <Form {...form}>
      <View style={styles.fill}>
        {!asSheet && SearchInputContent}
        <AsyncState
          data={paginatedData}
          isLoading={isPlaylistsLoading}
          isError={isPlaylistsError}
          LoadingComponent={
            <View style={styles.loadingContainer}>
              <Spinner />
            </View>
          }
        >
          {(data) => (
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
                          extraData={selectedIds}
                          keyExtractor={keyExtractor}
                          renderItem={renderItem}
                          contentContainerStyle={styles.listContent}
                        />
                      ) : (
                        <FlashList
                          data={data}
                          keyExtractor={keyExtractor}
                          renderItem={renderItem}
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={styles.listContent}
                        />
                      )}
                    </View>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </AsyncState>
      </View>
      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </View>
      )}
      {children?.(renderProps)}
      {!asSheet && <KeyboardSpacer />}
    </Form>
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
          {SearchInputContent}
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
  searchContainer: {
    paddingHorizontal: theme.space(3),
    paddingTop: theme.space(3),
    paddingBottom: theme.space(3),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  listContent: {
    flexGrow: 1,
    padding: theme.space(3)
  },
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
  paginationContainer: {
    paddingVertical: theme.space(3),
    paddingHorizontal: theme.space(3),
    borderTopWidth: 1,
    borderTopColor: theme.colors.border
  }
}))

export { AddToPlaylistForm }
