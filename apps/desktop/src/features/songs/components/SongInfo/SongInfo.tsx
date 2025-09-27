import { Fragment, useMemo } from "react"

import { useParams } from "@tanstack/react-router"

import { useFetchSongByIdWithAllRelations } from "../../hooks/useFetchSongByIdWithAllRelations"

import { NotFound, ScrollAreaWithHeaders, Spinner } from "@components/ui"

import { SongItem } from "../SongItem"
import { SongInfoHeader } from "./SongInfoHeader"
import { SongInfoStickyHeader } from "./SongInfoStickyHeader"
import { SongInfoSubHeader } from "./SongInfoSubHeader"

const SongInfo = () => {
  const { id } = useParams({ from: "/songs/$id" })

  const { data, isLoading, isError } = useFetchSongByIdWithAllRelations(Number(id))

  const song = useMemo(() => {
    if (!data) return null
    return data
  }, [data])

  const songId = useMemo(() => {
    if (!song) return []
    return [song.id]
  }, [song])

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isError || !song) {
    return <NotFound />
  }

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => <SongInfoHeader song={song} />}
      StickyHeaderComponent={() => (
        <Fragment>
          <SongInfoStickyHeader song={song} />
          <div className="pt-6">
            <SongInfoSubHeader />
          </div>
        </Fragment>
      )}
      ListHeaderComponent={() => (
        <div className="px-9 pb-0 pt-6">
          <SongInfoSubHeader className="border-b" />
        </div>
      )}
    >
      <SongItem song={song} allSongIds={songId} />
    </ScrollAreaWithHeaders>
  )
}

export { SongInfo }
