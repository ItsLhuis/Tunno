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
      hoursAgo: "{count} hour{count, plural, one {} other{s}} ago",
      today: "Today",
      yesterday: "Yesterday",
      years: "{count} year{count, plural, one {} other{s}}",
      weeks: "{count} week{count, plural, one {} other{s}}",
      days: "{count} day{count, plural, one {} other{s}}",
      hours: "{count} hour{count, plural, one {} other{s}}",
      minutes: "{count} minute{count, plural, one {} other{s}}",
      seconds: "{count} second{count, plural, one {} other{s}}",
      goBack: "Go back",
      goFoward: "Go forward",
      favorite: "Add to favorites",
      unfavorite: "Remove from favorites",
      enableShuffle: "Enable shuffle",
      disableShuffle: "Disable shuffle",
      previous: "Previous",
      play: "Play",
      pause: "Pause",
      next: "Next",
      enableRepeat: "Enable repeat",
      enableRepeatOne: "Enable repeat one",
      disableRepeat: "Disable repeat",
      mute: "Mute",
      unmute: "Unmute",
      queue: "Queue",
      title: "Title",
      album: "Album",
      artist: "Artist",
      date: "Date",
      createdAt: "Created date",
      duration: "Duration",
      search: "Search",
      selectAll: "Select all",
      clear: "Clear",
      cancel: "Cancel",
      more: "More",
      select: "Select",
      preview: "Preview",
      close: "Close",
      playback: "Playback",
      playNext: "Play next",
      actions: "Actions",
      addTo: "Add to",
      playlist: "Playlist",
      song: "Song",
      lyrics: "Lyrics",
      openMiniplayer: "Open miniplayer",
      enterFullScreen: "Enter full screen",
      exitFullScreen: "Exit full screen",
      goToSong: "Go to song",
      goToAlbum: "Go to album",
      goToArtist: "Go to artist",
      shuffleAndPlay: "Shuffle and play",
      unknown: "Unknown",
      unknownAlbum: "Unknown album",
      unknownArtist: "Unknown artist",
      listenTime: "Listen time",
      averageListenTime: "Average listen time",
      retentionRate: "Retention rate",
      totalPlays: "Total plays",
      lastPlayed: "Last played"
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
        warning: "Warning",
        lyricsPreview: "Lyrics Preview"
      },
      labels: {
        name: "Name",
        thumbnail: "Thumbnail",
        file: "File",
        releaseYear: "Release year",
        album: "Album",
        artists: "Artists",
        folder: "Folder",
        lyrics: "Lyrics"
      },
      buttons: {
        cancel: "Cancel",
        delete: "Delete",
        update: "Update",
        create: "Create"
      },
      descriptions: {
        thumbnail: "Background image (optional)",
        fileSize: "Maximum size: {size}",
        supportedFormats: "Supported formats: {formats}",
        lyricsPreview: "Visualize how the lyrics appear synchronized with the time"
      },
      badges: {
        lines: "{count} line{count, plural, one {} other{s}}",
        duration: "Duration: {time}"
      },
      messages: {
        confirmDelete: "Are you sure you want to delete?",
        unsavedChanges: "There are unsaved changes",
        noLyrics: "No lyrics"
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
        max: "File exceeds the maximum size of {maxSize}"
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
        invalid: "Invalid album"
      },
      artists: {
        invalid: "Invalid artists"
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
      playlists: {
        title: "Playlists"
      },
      albums: {
        title: "Albums"
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
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to Create Song",
      updatedTitle: "Song Updated Successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to Update Song",
      deletedTitle: "Song Deleted Successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to Delete Song",
      filters: {
        title: "Filters",
        clear: "Clear active filters",
        sortBy: "Sort by",
        favorites: "Favorites only",
        favoritesDescription: "Show only favorite songs",
        lyrics: "With lyrics",
        lyricsDescription: "Show only songs with lyrics",
        releaseYear: "Release year",
        duration: "Duration",
        durationMin: "Minimum",
        durationMax: "Maximum",
        playCount: "Play count",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        lastPlayed: "Last played",
        lastPlayedAfter: "After",
        lastPlayedBefore: "Before",
        selectDate: "Select date",
        sortOptions: {
          name: "Name",
          duration: "Duration",
          favorites: "Favorites",
          year: "Year",
          playCount: "Play count",
          lastPlayed: "Last played",
          createdAt: "Creation date",
          updatedAt: "Update date"
        }
      }
    },
    playlists: {
      title: "Playlists",
      createdTitle: "Playlist Created Successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to Create Playlist",
      updatedTitle: "Playlist Updated Successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to Update Playlist",
      deletedTitle: "Playlist Deleted Successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to Delete Playlist"
    },
    albums: {
      title: "Albums",
      createdTitle: "Album Created Successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to Create Album",
      updatedTitle: "Album Updated Successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to Update Album",
      deletedTitle: "Album Deleted Successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to Delete Album"
    },
    artists: {
      title: "Artists",
      createdTitle: "Artist Created Successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to Create Artist",
      updatedTitle: "Artist Updated Successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to Update Artist",
      deletedTitle: "Artist Deleted Successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to Delete Artist"
    },
    favorites: {
      createdTitle: "Added to Favorites",
      createdDescription: "{name} has been added to favorites",
      createdFailedTitle: "Failed to Add to Favorites",
      deletedTitle: "Removed from Favorites",
      deletedDescription: "{name} has been removed from favorites",
      deletedFailedTitle: "Failed to Remove from Favorites"
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
