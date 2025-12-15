import { useMemo, type ReactNode } from "react"

import { useRouterState } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { useResourceById, type ResourceType } from "./useResourceById"

export type BreadcrumbItem = {
  label: string | ReactNode
  path: string
  isNotClickable?: boolean
  isLoading?: boolean
  isResource?: boolean
}

export function useBreadcrumbs() {
  const routerState = useRouterState()

  const { t } = useTranslation()

  const pathname = routerState.location.pathname
  const pathSegments = pathname.split("/").filter(Boolean)

  const isNumericId = (segment: string): boolean => {
    return /^\d+$/.test(segment)
  }

  const getResourceType = (segments: string[], index: number): ResourceType | null => {
    const currentSegment = segments[index]
    const previousSegment = index > 0 ? segments[index - 1] : null

    if (previousSegment) {
      switch (previousSegment) {
        case "songs":
          return "song"
        case "albums":
          return "album"
        case "artists":
          return "artist"
        case "playlists":
          return "playlist"
      }
    }

    if (pathname.includes("/songs/") && isNumericId(currentSegment)) {
      return "song"
    }
    if (pathname.includes("/albums/") && isNumericId(currentSegment)) {
      return "album"
    }
    if (pathname.includes("/artists/") && isNumericId(currentSegment)) {
      return "artist"
    }
    if (pathname.includes("/playlists/") && isNumericId(currentSegment)) {
      return "playlist"
    }

    return null
  }

  const resourceId = useMemo(() => {
    const lastSegment = pathSegments[pathSegments.length - 1]
    return isNumericId(lastSegment) ? parseInt(lastSegment) : null
  }, [pathSegments])

  const resourceType = useMemo(() => {
    if (!resourceId) return null
    return getResourceType(pathSegments, pathSegments.length - 1)
  }, [pathSegments, resourceId])

  const { data: resourceData, isLoading: isResourceLoading } = useResourceById(
    resourceId,
    resourceType || "song"
  )

  const getTranslatedLabel = (segment: string): string => {
    const segmentMap: Record<string, string> = {
      home: t("breadcrumbs.home.title"),
      songs: t("breadcrumbs.songs.title"),
      playlists: t("breadcrumbs.playlists.title"),
      albums: t("breadcrumbs.albums.title"),
      artists: t("breadcrumbs.artists.title"),
      settings: t("breadcrumbs.settings.title"),
      appearance: t("breadcrumbs.settings.appearance.title"),
      language: t("breadcrumbs.settings.language.title"),
      equalizer: t("breadcrumbs.settings.equalizer.title"),
      sync: t("breadcrumbs.settings.sync.title"),
      about: t("breadcrumbs.settings.about.title"),
      "fast-upload": t("breadcrumbs.fastUpload.title"),
      lyrics: t("breadcrumbs.lyrics.title")
    }

    return (
      segmentMap[segment] ||
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
  }

  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    if (pathSegments.length === 0) {
      return [{ label: t("breadcrumbs.home.title"), path: "/" }]
    }

    const items: BreadcrumbItem[] = [{ label: t("breadcrumbs.home.title"), path: "/" }]

    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/")
      const isLast = index === pathSegments.length - 1
      const isId = isNumericId(segment)

      if (isId && isLast && resourceData) {
        items.push({
          label: resourceData.name,
          path,
          isResource: true,
          isLoading: isResourceLoading,
          isNotClickable: true
        })
      } else if (isId && isLast && isResourceLoading) {
        items.push({
          label: null,
          path,
          isResource: true,
          isLoading: true,
          isNotClickable: true
        })
      } else if (isId && isLast) {
        items.push({
          label: segment,
          path,
          isResource: true,
          isNotClickable: true
        })
      } else {
        items.push({
          label: getTranslatedLabel(segment),
          path,
          isNotClickable: segment === "settings"
        })
      }
    })

    return items
  }, [pathSegments, resourceData, isResourceLoading, t])

  return {
    breadcrumbs,
    isLoading: isResourceLoading
  }
}
