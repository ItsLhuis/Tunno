import { Fragment, useCallback, useMemo, useRef, useState } from "react"

import { useParams } from "@tanstack/react-router"

import { useFetchSongsByIdsWithMainRelations } from "../../../songs/hooks/useFetchSongsByIdsWithMainRelations"

import { useFetchArtistByIdWithAllRelations } from "../../hooks/useFetchArtistByIdWithAllRelations"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import {
  AsyncState,
  ScrollAreaWithHeaders,
  VirtualizedList,
  type VirtualizedListController
} from "@components/ui"

import { SongItemList } from "@features/songs/components"

import { ArtistInfoHeader } from "./ArtistInfoHeader"
import { ArtistInfoStickyHeader } from "./ArtistInfoStickyHeader"
import { ArtistInfoSubHeader } from "./ArtistInfoSubHeader"

import { type SongWithMainRelations } from "@repo/api"

const ArtistInfo = () => {
  const { id } = useParams({ from: "/artists/$id" })

  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    data: artistData,
    isLoading: isArtistLoading,
    isError: isArtistError,
    refetch: refetchArtist
  } = useFetchArtistByIdWithAllRelations(Number(id))

  const songIds = useMemo(() => {
    if (!artistData?.songs) return []
    return artistData.songs.map((relation) => relation.songId)
  }, [artistData?.songs])

  const {
    data: songsData,
    isLoading: isSongsLoading,
    isError: isSongsError,
    refetch: refetchSongs
  } = useFetchSongsByIdsWithMainRelations(songIds.length > 0 ? songIds : null)

  const artist = artistData

  const songs = songsData ?? []

  const allSongIds = useMemo(() => songs.map((song) => song.id), [songs])

  const [listController, setListController] =
    useState<VirtualizedListController<SongWithMainRelations> | null>(null)

  const keyExtractor = useCallback((song: SongWithMainRelations) => song.id.toString(), [])

  const Header = useCallback(() => {
    if (!artist) return null
    return <ArtistInfoHeader artist={artist} list={listController} />
  }, [artist, listController])

  const StickyHeader = useCallback(() => {
    if (!artist) return null
    return (
      <Fragment>
        <ArtistInfoStickyHeader className="pb-6" artist={artist} list={listController} />
        <ArtistInfoSubHeader list={listController} />
      </Fragment>
    )
  }, [artist, listController])

  const ListHeader = useCallback(
    () =>
      artist ? (
        <div className="px-9 pt-6 pb-0">
          <ArtistInfoSubHeader list={listController} className="border-b" />
        </div>
      ) : null,
    [artist, listController]
  )

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchArtist(), refetchSongs()])
  }, [refetchArtist, refetchSongs])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <AsyncState data={artist} isLoading={isArtistLoading} isError={isArtistError}>
      <ScrollAreaWithHeaders
        scrollRef={scrollRef}
        HeaderComponent={Header}
        StickyHeaderComponent={StickyHeader}
        ListHeaderComponent={ListHeader}
        className={cn(!songs.length && "h-full", "space-y-6")}
      >
        <AsyncState
          data={songs}
          isLoading={isSongsLoading}
          isError={isSongsError}
          className={cn(!songs.length && "h-full min-h-44")}
        >
          {(data) => (
            <VirtualizedList
              data={data}
              keyExtractor={keyExtractor}
              estimateItemHeight={70}
              gap={8}
              scrollRef={scrollRef}
              onController={setListController}
              renderItem={({ item, index, selected, toggle }) => (
                <SongItemList
                  song={item}
                  index={index}
                  allSongIds={allSongIds}
                  selected={selected}
                  onToggle={toggle}
                />
              )}
            />
          )}
        </AsyncState>
      </ScrollAreaWithHeaders>
    </AsyncState>
  )
}

export { ArtistInfo }
