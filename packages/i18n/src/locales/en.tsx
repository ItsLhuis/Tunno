import En from "../assets/en.svg"

import { type Language } from "../types"

export const english: Language = {
  code: "en",
  name: "English",
  flag: En,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "No results found",
      lessThanAnHourAgo: "Less than an hour ago",
      hoursAgo: "{{count}} hour{{count, plural, one {} other{s}}} ago",
      today: "Today",
      yesterday: "Yesterday"
    },
    songs: {
      title: "Songs",
      createdTitle: "Song Created Successfully",
      createdDescription: "{{name}} has been created",
      createdFailedTitle: "Failed to Create Song",
      updatedTitle: "Song Updated Successfully",
      updatedDescription: "{{name}} has been updated",
      updatedFailedTitle: "Failed to Update Song",
      deletedTitle: "Song Deleted Successfully",
      deletedDescription: "{{name}} has been deleted",
      deletedFailedTitle: "Failed to Delete Song"
    },
    favorites: {
      title: "Favorites",
      addedTitle: "Added to Favorites",
      addedDescription: "{{name}} has been added to favorites",
      addedFailedTitle: "Failed to Add to Favorites",
      removedTitle: "Removed from Favorites",
      removedDescription: "{{name}} has been removed from favorites",
      removedFailedTitle: "Failed to Remove from Favorites"
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist Created Successfully",
      createdDescription: "{{name}} has been created",
      createdFailedTitle: "Failed to Create Playlist",
      updatedTitle: "Playlist Updated Successfully",
      updatedDescription: "{{name}} has been updated",
      updatedFailedTitle: "Failed to Update Playlist",
      deletedTitle: "Playlist Deleted Successfully",
      deletedDescription: "{{name}} has been deleted",
      deletedFailedTitle: "Failed to Delete Playlist"
    },
    artists: {
      title: "Artists",
      createdTitle: "Artist Created Successfully",
      createdDescription: "{{name}} has been created",
      createdFailedTitle: "Failed to Create Artist",
      updatedTitle: "Artist Updated Successfully",
      updatedDescription: "{{name}} has been updated",
      updatedFailedTitle: "Failed to Update Artist",
      deletedTitle: "Artist Deleted Successfully",
      deletedDescription: "{{name}} has been deleted",
      deletedFailedTitle: "Failed to Delete Artist"
    },
    settings: {
      title: "Settings",
      theme: {
        title: "Theme",
        description: "Select your preferred appearance mode",
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      language: {
        title: "Language",
        description: "Choose your preferred language"
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices"
      }
    }
  }
}
