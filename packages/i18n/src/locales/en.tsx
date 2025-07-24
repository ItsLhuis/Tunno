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
      yesterday: "Yesterday",
      goBack: "Go Back",
      goFoward: "Go Forward",
      favorite: "Favorite",
      unfavorite: "Unfavorite",
      enableShuffle: "Enable Shuffle",
      disableShuffle: "Disable Shuffle",
      previous: "Previous",
      play: "Play",
      pause: "Pause",
      next: "Next",
      enableRepeat: "Enable Repeat",
      enableRepeatOne: "Enable Repeat One",
      disableRepeat: "Disable Repeat",
      mute: "Mute",
      unmute: "Unmute",
      queue: "Queue",
      title: "Title",
      album: "Album",
      date: "Date",
      duration: "Duration",
      search: "Search",
      selectAll: "Select All",
      visibility: "Visibility",
      columns: "Columns",
      clear: "Clear",
      cancel: "Cancel",
      more: "More",
      select: "Select"
    },
    form: {
      titles: {
        createSong: "Create Song",
        updateSong: "Update Song",
        deleteSong: "Delete Song",
        createArtist: "Create Artist",
        updateArtist: "Update Artist",
        deleteArtist: "Delete Artist",
        createPlaylist: "Create Playlist",
        updatePlaylist: "Update Playlist",
        deletePlaylist: "Delete Playlist",
        confirmation: "Confirmation",
        warning: "Warning"
      },
      labels: {
        name: "Name",
        thumbnail: "Thumbnail",
        file: "File",
        releaseYear: "Release Year",
        album: "Album",
        artists: "Artists",
        isSingle: "Is Single",
        folder: "Folder"
      },
      buttons: {
        cancel: "Cancel",
        delete: "Delete",
        update: "Update",
        create: "Create"
      },
      descriptions: {
        thumbnail: "Background image (optional)",
        fileSize: "Maximum size: {{size}}",
        supportedFormats: "Supported formats: {{formats}}"
      },
      messages: {
        confirmDelete: "Are you sure you want to delete?",
        unsavedChanges: "There are unsaved changes"
      }
    },
    validation: {
      name: {
        required: "Name is required",
        max: "Name must be at most 200 characters"
      },
      file: {
        required: "File is required",
        invalid: "Invalid or corrupted file",
        max: "File exceeds the maximum size of {{maxSize}}"
      },
      duration: {
        required: "Duration is required",
        min: "Duration must be at least 0"
      },
      releaseYear: {
        invalid: "Invalid release year",
        min: "Release year must be at least 0",
        max: "Release year cannot be in the future"
      },
      albumId: {
        invalid: "Invalid album",
        requiredIfNotSingle: "Album is required if not a single"
      },
      artists: {
        min: "At least one artist is required"
      }
    },
    update: {
      downloading: "Downloading and installing update",
      downloadingDescription: "A new update is available and being installed automatically",
      installedSuccess: "Update installed successfully",
      failed: "Failed to install update"
    },
    breadcrumbs: {
      home: {
        title: "Home"
      },
      songs: {
        title: "Songs"
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
      fastUpload: {
        title: "Fast Upload"
      },
      settings: {
        title: "Settings",
        appearance: {
          title: "Appearance"
        },
        language: {
          title: "Language"
        },
        sync: {
          title: "Sync"
        }
      }
    },
    home: {
      title: "Home"
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
      createdTitle: "Added to Favorites",
      createdDescription: "{{name}} has been added to favorites",
      createdFailedTitle: "Failed to Add to Favorites",
      deletedTitle: "Removed from Favorites",
      deletedDescription: "{{name}} has been removed from favorites",
      deletedFailedTitle: "Failed to Remove from Favorites"
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
      appearance: {
        title: "Appearance",
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
    },
    fastUpload: {
      title: "Fast Upload"
    },
    languages: {
      da: "Danish",
      de: "German",
      en: "English",
      es: "Spanish",
      fi: "Finnish",
      fr: "French",
      hi: "Hindi",
      it: "Italian",
      ja: "Japanese",
      ko: "Korean",
      nl: "Dutch",
      no: "Norwegian",
      pl: "Polish",
      pt: "Portuguese",
      ru: "Russian",
      sv: "Swedish",
      tr: "Turkish",
      uk: "Ukrainian",
      vi: "Vietnamese",
      zh: "Chinese"
    }
  }
}
