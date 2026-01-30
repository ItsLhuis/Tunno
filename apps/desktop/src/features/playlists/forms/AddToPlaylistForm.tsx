import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { cn } from "@lib/utils"

import { useTranslation } from "@repo/i18n"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldErrors } from "react-hook-form"

import { createAddToPlaylistSchema, type AddToPlaylistType } from "@repo/schemas"

import { useAddSongsToPlaylist } from "../hooks/useAddSongsToPlaylist"

import { useFetchPlaylists } from "../hooks/useFetchPlaylists"

import { debounce } from "lodash"

import {
  AsyncState,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  ScrollArea,
  TextInput,
  Typography,
  VirtualizedList,
  type VirtualizedListController
} from "@components/ui"

import { PlaylistItemSelect } from "../components/PlaylistItem"

import { type Playlist } from "@repo/api"

export type AddToPlaylistFormRenderProps = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  errors: FieldErrors<AddToPlaylistType>
  reset: () => void
}

type AddToPlaylistFormProps = {
  songIds: number[]
  trigger?: ReactNode
  title?: string
  onSubmit?: (values: AddToPlaylistType) => void | Promise<void>
  children?: (props: AddToPlaylistFormRenderProps) => ReactNode
  asModal?: boolean
  open?: boolean
  onOpen?: (open: boolean) => void
}

const AddToPlaylistForm = ({
  songIds,
  trigger,
  title,
  onSubmit,
  children,
  asModal = true,
  open,
  onOpen
}: AddToPlaylistFormProps) => {
  const { t } = useTranslation()

  const [internalOpen, setInternalOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpen || setInternalOpen

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

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const listControllerRef = useRef<VirtualizedListController<Playlist> | null>(null)

  const debouncedSetSearchTerm = useMemo(
    () => debounce((term: string) => setDebouncedSearchTerm(term), 300),
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

    if (asModal) {
      setIsOpen(false)
    }
  }

  const keyExtractor = useCallback((item: Playlist) => item.id.toString(), [])

  const handleSelectionChange = useCallback(
    (selectedIds: readonly string[]) => {
      const playlistIds = selectedIds.map(Number)
      form.setValue("playlistIds", playlistIds, { shouldValidate: true, shouldDirty: true })
    },
    [form]
  )

  useEffect(() => {
    if (form.formState.isSubmitted && form.formState.isValid) {
      form.reset()
      listControllerRef.current?.clearSelection()
      setSearchTerm("")
      setDebouncedSearchTerm("")
    }
  }, [form.formState.isSubmitted, form.formState.isValid, form])

  useEffect(() => {
    if (!isOpen && asModal) {
      setSearchTerm("")
      setDebouncedSearchTerm("")
    }
  }, [isOpen, asModal])

  const renderProps = {
    isSubmitting: form.formState.isSubmitting || addSongsToPlaylistMutation.isPending,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    reset: () => form.reset()
  } as AddToPlaylistFormRenderProps

  const FormContent = (
    <AsyncState data={playlists} isLoading={isPlaylistsLoading} isError={isPlaylistsError}>
      {(data) => (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="playlistIds"
              render={() => (
                <FormItem>
                  <FormControl>
                    <VirtualizedList
                      data={data}
                      keyExtractor={keyExtractor}
                      estimateItemHeight={70}
                      gap={8}
                      onSelectionChange={handleSelectionChange}
                      onController={(controller) => {
                        listControllerRef.current = controller
                      }}
                      scrollRef={scrollRef}
                      containerClassName="p-2"
                      renderItem={({ item, index, selected, toggle }) => (
                        <PlaylistItemSelect
                          playlist={item}
                          index={index}
                          selected={selected}
                          onToggle={toggle}
                        />
                      )}
                      ListEmptyComponent={() => (
                        <div className="flex h-full items-center justify-center py-8">
                          <Typography affects={["muted"]}>{t("common.noResultsFound")}</Typography>
                        </div>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit" className="hidden" />
            {children?.(renderProps)}
          </form>
        </Form>
      )}
    </AsyncState>
  )

  if (!asModal) return FormContent

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!renderProps.isSubmitting) setIsOpen(open)
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex flex-col gap-0 p-0">
        <DialogHeader className="shrink-0 space-y-4 border-b p-6">
          <DialogTitle>{title ?? t("form.titles.addToPlaylist")}</DialogTitle>
          <TextInput
            placeholder={t("common.search")}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              debouncedSetSearchTerm(e.target.value)
            }}
            disabled={renderProps.isSubmitting}
          />
        </DialogHeader>
        <ScrollArea ref={scrollRef} className="flex max-h-full flex-col">
          <div className={cn(playlists?.length === 0 && "p-9")}>{FormContent}</div>
        </ScrollArea>
        <DialogFooter className="shrink-0 border-t p-6">
          <DialogClose asChild>
            <Button variant="outline" isLoading={renderProps.isSubmitting}>
              {t("form.buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!renderProps.isValid || !renderProps.isDirty || renderProps.isSubmitting}
            isLoading={renderProps.isSubmitting}
            onClick={() => form.handleSubmit(handleFormSubmit)()}
          >
            {t("form.buttons.add")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AddToPlaylistForm }
