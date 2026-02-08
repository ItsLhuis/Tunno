import En from "../assets/en.svg"

import { type Language } from "../types"

/**
 * English language configuration.
 */
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
      thisWeek: "This week",
      thisMonth: "This month",
      yesterday: "Yesterday",
      years: "{count} year{count, plural, one {} other{s}}",
      weeks: "{count} week{count, plural, one {} other{s}}",
      days: "{count} day{count, plural, one {} other{s}}",
      hours: "{count} hour{count, plural, one {} other{s}}",
      minutes: "{count} minute{count, plural, one {} other{s}}",
      seconds: "{count} second{count, plural, one {} other{s}}",
      goBack: "Go back",
      goForward: "Go forward",
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
      added: "Added",
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
      removeFromQueue: "Remove from queue",
      removeFromPlaylist: "Remove from playlist",
      nowPlaying: "Now playing",
      noSongPlaying: "Nothing playing",
      upNext: "Up next",
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
      goToPlaylist: "Go to playlist",
      goToArtist: "Go to artist",
      shuffleAndPlay: "Shuffle and play",
      unknown: "Unknown",
      unknownAlbum: "Unknown album",
      unknownArtist: "Unknown artist",
      listenTime: "Listen time",
      averageListenTime: "Average listen time",
      retentionRate: "Retention rate",
      totalPlays: "Total plays",
      lastPlayed: "Last played",
      neverPlayed: "Never played",
      streak: "Streak",
      refresh: "Refresh",
      showingOfTotal: "Showing {showing} of {total}",
      start: "Start",
      completed: "Completed",
      songsPlayed: "{count} song{count, plural, one {} other{s}}",
      appearsIn: "Appears in",
      addToSidebar: "Add to sidebar",
      removeFromSidebar: "Remove from sidebar",
      featured: "Featured",
      stats: "Stats",
      openToStart: "Open Tunno to start"
    },
    form: {
      titles: {
        createSong: "Create song",
        updateSong: "Update song",
        deleteSong: "Delete song",
        createArtist: "Create artist",
        updateArtist: "Update artist",
        deleteArtist: "Delete artist",
        createAlbum: "Create album",
        updateAlbum: "Update album",
        deleteAlbum: "Delete album",
        createPlaylist: "Create playlist",
        updatePlaylist: "Update playlist",
        deletePlaylist: "Delete playlist",
        addToPlaylist: "Add to playlist",
        confirmation: "Confirmation",
        warning: "Warning",
        lyricsPreview: "Lyrics preview"
      },
      labels: {
        name: "Name",
        thumbnail: "Thumbnail",
        file: "File",
        releaseYear: "Release year",
        album: "Album",
        albumType: "Album type",
        artists: "Artists",
        folder: "Folder",
        lyrics: "Lyrics"
      },
      buttons: {
        cancel: "Cancel",
        delete: "Delete",
        update: "Update",
        create: "Create",
        add: "Add"
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
      },
      albumType: {
        invalid: "Invalid album type"
      },
      playlistIds: {
        invalid: "Invalid playlists"
      },
      album: {
        duplicate: "An album with this name already exists",
        integrity:
          "Cannot remove artist from album because there are songs that belong to both this album and artist"
      },
      artist: {
        duplicate: "An artist with this name already exists",
        integrity:
          "Cannot delete artist because there are songs that belong to both this artist and albums featuring this artist"
      },
      playlist: {
        duplicate: "A playlist with this name already exists"
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
        title: "Fast upload"
      },
      settings: {
        title: "Settings",
        appearance: {
          title: "Appearance"
        },
        language: {
          title: "Language"
        },
        equalizer: {
          title: "Equalizer"
        },
        sync: {
          title: "Sync"
        },
        about: {
          title: "About"
        }
      },
      lyrics: {
        title: "Lyrics"
      }
    },
    home: {
      title: "Home",
      jumpBackIn: {
        title: "Jump back in",
        description: "Pick up where you left off"
      },
      newReleases: {
        title: "New releases",
        description: "Fresh additions to your collection"
      },
      onRepeat: {
        title: "On repeat",
        description: "Songs you can't stop playing"
      },
      discover: {
        title: "Discover",
        description: "New music recommendations for you"
      },
      favoriteArtists: {
        title: "Your artists",
        description: "Artists you love most"
      },
      yourPlaylists: {
        title: "Made for you",
        description: "Your personal playlists"
      },
      topAlbums: {
        title: "Top albums",
        description: "Your most played albums"
      },
      recentlyAdded: {
        title: "Recently added",
        description: "New additions to your library"
      },
      empty: {
        title: "Your library is empty",
        description:
          "Welcome to Tunno. To get started, you'll need to add some music to your personal library.",
        getStarted: "Get started",
        songs: {
          title: "Import songs",
          description: "Add music files from your device to start building your library"
        },
        albums: {
          title: "Create albums",
          description: "Organize your music by creating albums with artwork and details"
        },
        playlists: {
          title: "Create playlist",
          description: "Curate your own mixes for any mood or activity"
        },
        artists: {
          title: "Add artists",
          description: "Create artist profiles to organize and manage their music"
        }
      }
    },
    songs: {
      title: "Songs",
      createdTitle: "Song created successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to create song",
      updatedTitle: "Song updated successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to update song",
      deletedTitle: "Song deleted successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to delete song",
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
      createdTitle: "Playlist created successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to create playlist",
      updatedTitle: "Playlist updated successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to update playlist",
      songsAddedTitle: "Songs added successfully",
      songsAddedFailedTitle: "Failed to add songs",
      deletedTitle: "Playlist deleted successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to delete playlist",
      filters: {
        title: "Filters",
        clear: "Clear active filters",
        sortBy: "Sort by",
        favorites: "Favorites only",
        favoritesDescription: "Show only favorite playlists",
        playCount: "Play count",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        totalTracks: "Total songs",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maximum",
        totalDuration: "Total duration",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maximum",
        lastPlayed: "Last played",
        lastPlayedAfter: "After",
        lastPlayedBefore: "Before",
        selectDate: "Select date",
        sortOptions: {
          name: "Name",
          favorites: "Favorites",
          playCount: "Play count",
          totalTracks: "Total songs",
          totalDuration: "Total duration",
          lastPlayed: "Last played",
          createdAt: "Creation date",
          updatedAt: "Update date"
        }
      }
    },
    albums: {
      title: "Albums",
      createdTitle: "Album created successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to create album",
      updatedTitle: "Album updated successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to update album",
      deletedTitle: "Album deleted successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to delete album",
      filters: {
        title: "Filters",
        clear: "Clear active filters",
        sortBy: "Sort by",
        favorites: "Favorites only",
        favoritesDescription: "Show only favorite albums",
        albumType: "Album type",
        all: "All types",
        single: "Single",
        album: "Album",
        compilation: "Compilation",
        releaseYear: "Release year",
        releaseYearMin: "Minimum",
        releaseYearMax: "Maximum",
        playCount: "Play count",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        totalTracks: "Total songs",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maximum",
        totalDuration: "Total duration",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maximum",
        lastPlayed: "Last played",
        lastPlayedAfter: "After",
        lastPlayedBefore: "Before",
        selectDate: "Select date",
        sortOptions: {
          name: "Name",
          favorites: "Favorites",
          playCount: "Play count",
          totalTracks: "Total songs",
          totalDuration: "Total duration",
          lastPlayed: "Last played",
          createdAt: "Creation date",
          updatedAt: "Update date",
          releaseYear: "Release year"
        }
      }
    },
    artists: {
      title: "Artists",
      createdTitle: "Artist created successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to create artist",
      updatedTitle: "Artist updated successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to update artist",
      deletedTitle: "Artist deleted successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to delete artist",
      filters: {
        title: "Filters",
        clear: "Clear active filters",
        sortBy: "Sort by",
        favorites: "Favorites only",
        favoritesDescription: "Show only favorite artists",
        playCount: "Play count",
        playCountMin: "Minimum",
        playCountMax: "Maximum",
        totalTracks: "Total songs",
        totalTracksMin: "Minimum",
        totalTracksMax: "Maximum",
        totalDuration: "Total duration",
        totalDurationMin: "Minimum",
        totalDurationMax: "Maximum",
        lastPlayed: "Last played",
        lastPlayedAfter: "After",
        lastPlayedBefore: "Before",
        selectDate: "Select date",
        sortOptions: {
          name: "Name",
          favorites: "Favorites",
          playCount: "Play count",
          totalTracks: "Total songs",
          totalDuration: "Total duration",
          lastPlayed: "Last played",
          createdAt: "Creation date",
          updatedAt: "Update date"
        }
      }
    },
    favorites: {
      createdTitle: "Added to favorites",
      createdDescription: "{name} has been added to favorites",
      createdFailedTitle: "Failed to add to favorites",
      deletedTitle: "Removed from favorites",
      deletedDescription: "{name} has been removed from favorites",
      deletedFailedTitle: "Failed to remove from favorites"
    },
    sidebar: {
      addedTitle: "Added to sidebar",
      addedDescription: "{name} has been added to sidebar",
      addedFailedTitle: "Failed to add to sidebar",
      removedTitle: "Removed from sidebar",
      removedDescription: "{name} has been removed from sidebar"
    },
    settings: {
      title: "Settings",
      appearance: {
        title: "Appearance",
        description: "Define the application's appearance preferences",
        theme: {
          title: "Theme",
          description: "Select the application theme",
          light: "Light",
          dark: "Dark",
          system: "System"
        },
        zoom: {
          title: "Zoom",
          description: "Adjust the application zoom level"
        }
      },
      language: {
        title: "Language",
        description: "Choose your preferred language"
      },
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Enable equalizer",
          description: "Enable or disable the audio equalizer",
          enabled: "Enabled",
          disabled: "Disabled"
        },
        presets: {
          title: "Equalizer presets",
          description: "Choose from predefined equalizer settings",
          flat: {
            label: "Flat",
            description: "No adjustments"
          },
          rock: {
            label: "Rock",
            description: "Enhanced bass and treble"
          },
          pop: {
            label: "Pop",
            description: "Balanced with slight boost"
          },
          jazz: {
            label: "Jazz",
            description: "Smooth mid-range emphasis"
          },
          classical: {
            label: "Classical",
            description: "Natural sound"
          },
          electronic: {
            label: "Electronic",
            description: "Heavy bass and crisp highs"
          },
          vocal: {
            label: "Vocal",
            description: "Mid-range boost for clarity"
          },
          bass: {
            label: "Bass",
            description: "Heavy low-frequency emphasis"
          },
          treble: {
            label: "Treble",
            description: "High-frequency emphasis"
          }
        },
        bands: {
          title: "Frequency bands",
          description: "Adjust individual frequency bands"
        },
        reset: {
          title: "Reset equalizer",
          description: "Reset all bands to flat (0 dB)",
          button: "Reset to flat"
        }
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices",
        export: {
          title: "Export library",
          description:
            "Export your library as a bundle file for backup or to use on another device",
          selectDestination: "Select destination",
          exportingSongs: "Exporting {count} song{count, plural, one {} other{s}}",
          preparingExport: "Preparing export",
          exportingMessage: "This may take a moment",
          exportSuccess: "Library exported successfully",
          showFolder: "Show folder",
          exportAgain: "Export again",
          exportFailed: "Export failed",
          tryAgain: "Try again",
          noSongs: "No songs to export",
          libraryEmpty: "Your library is empty",
          noValidSongs: "No valid songs to export",
          missingAlbumInfo: "All songs are missing album information",
          songsExported: "{count} song{count, plural, one {} other{s}} exported to bundle"
        },
        mobile: {
          title: "Sync with mobile",
          description: "Transfer your library to Tunno Mobile over your local network",
          generateQr: "Generate QR code",
          stopServer: "Stop server",
          waitingConnection: "Waiting for mobile device to connect...",
          deviceConnected: "Device connected",
          syncInProgress: "Sync in progress",
          syncCompleted: "Sync completed successfully",
          serverError: "Failed to start sync server"
        }
      },
      about: {
        title: "About",
        description: "Application information and version details",
        version: "Version",
        whatsNew: {
          title: "What's new",
          description: "Check out the latest features and improvements",
          newRelease: "New release",
          viewChangelog: "View changelog"
        },
        storage: {
          title: "Storage & data",
          description: "Manage application data and settings",
          openDataFolder: "Open data folder"
        },
        legal: {
          title: "Legal & copyright",
          description: "License information and legal documents",
          copyright: "Copyright",
          licensed: "Licensed under MIT license",
          viewLicense: "View license",
          viewOnGitHub: "View on GitHub"
        }
      }
    },
    fastUpload: {
      title: "Fast upload",
      description: "Import bundles from the CLI or exported from",
      cliTooltip: "Open Tunno CLI documentation",
      selectBundle: "Select bundle",
      changeBundle: "Change bundle",
      status: {
        pending: "Pending",
        processing: "Processing",
        success: "Success",
        error: "Error",
        skipped: "Skipped"
      },
      completed: {
        allSuccess: {
          title: "Import Completed!",
          description: "{count} track{count, plural, one {} other{s}} imported successfully"
        },
        withErrors: {
          title: "Import Completed with Errors",
          description: "{successCount} imported, {errorCount} failed, {skippedCount} skipped"
        },
        withSkipped: {
          title: "Import Completed",
          description: "{successCount} imported, {skippedCount} skipped"
        }
      }
    },
    lyrics: {
      title: "Lyrics"
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
