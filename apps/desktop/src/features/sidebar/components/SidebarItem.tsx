import { memo } from "react"

import { cn } from "@lib/utils"

import { Button, SafeLink, Thumbnail } from "@components/ui"

import { AlbumActions } from "@features/albums/components/AlbumActions"
import { ArtistActions } from "@features/artists/components/ArtistActions"
import { PlaylistActions } from "@features/playlists/components/PlaylistActions"

import { type SidebarItemWithDetails } from "@repo/api"

type SidebarItemProps = {
  item: SidebarItemWithDetails
}

const SidebarItem = memo(function SidebarItem({ item }: SidebarItemProps) {
  const route = {
    album: "/albums/$id",
    artist: "/artists/$id",
    playlist: "/playlists/$id"
  }[item.entityType] as "/albums/$id" | "/artists/$id" | "/playlists/$id"

  const icon = {
    album: "Disc",
    artist: "User",
    playlist: "ListMusic"
  }[item.entityType] as "Disc" | "User" | "ListMusic"

  const content = (
    <Button
      tooltip={{ children: item.name, side: "right" }}
      variant="ghost"
      className="size-14 rounded-none p-1"
      asChild
    >
      <SafeLink to={route} params={{ id: item.entityId.toString() }}>
        <Thumbnail
          placeholderIcon={icon}
          fileName={item.thumbnail}
          className="size-full rounded"
          containerClassName={cn("size-full", item.entityType === "artist" && "rounded-full")}
        />
      </SafeLink>
    </Button>
  )

  if (item.entityType === "album") {
    return (
      <AlbumActions variant="context" albumId={item.entityId}>
        {content}
      </AlbumActions>
    )
  }

  if (item.entityType === "artist") {
    return (
      <ArtistActions variant="context" artistId={item.entityId}>
        {content}
      </ArtistActions>
    )
  }

  if (item.entityType === "playlist") {
    return (
      <PlaylistActions variant="context" playlistId={item.entityId}>
        {content}
      </PlaylistActions>
    )
  }

  return content
})

export { SidebarItem }
