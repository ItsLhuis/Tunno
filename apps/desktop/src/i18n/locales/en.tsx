import En from "@assets/images/flags/en.svg"

import { type Language } from "../types"

export const english: Language = {
  code: "en",
  name: "English",
  flag: En,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "No results found"
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
      title: "Favorites"
    },
    playlists: {
      title: "Playlists"
    },
    artists: {
      title: "Artists"
    },
    settings: {
      title: "Settings"
    }
  }
}
