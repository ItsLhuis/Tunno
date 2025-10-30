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
      removeFromPlaylist: "Remove from Playlist",
      nowPlaying: "Now playing",
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
      completed: "Completed"
    },
    form: {
      titles: {
        createSong: "Create Song",
        updateSong: "Update Song",
        deleteSong: "Delete Song",
        createArtist: "Create Artist",
        updateArtist: "Update Artist",
        deleteArtist: "Delete Artist",
        createAlbum: "Create Album",
        updateAlbum: "Update Album",
        deleteAlbum: "Delete Album",
        createPlaylist: "Create Playlist",
        updatePlaylist: "Update Playlist",
        deletePlaylist: "Delete Playlist",
        addToPlaylist: "Add to Playlist",
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
        title: "Jump Back In",
        description: "Pick up where you left off"
      },
      yourPlaylists: {
        title: "Made For You",
        description: "Your personal playlists"
      },
      onRepeat: {
        title: "On Repeat",
        description: "Songs you can't stop playing"
      },
      newReleases: {
        title: "New Releases",
        description: "Fresh music from artists you follow"
      },
      favoriteArtists: {
        title: "Your Artists",
        description: "Artists you love most"
      },
      topAlbums: {
        title: "Top Albums",
        description: "Your most played albums"
      },
      recentlyAdded: {
        title: "Recently Added",
        description: "Latest additions to your library"
      },
      hiddenGems: {
        title: "Hidden Gems",
        description: "Rediscover forgotten favorites"
      },
      discover: {
        title: "Discover",
        description: "New music recommendations for you"
      },
      yourStats: {
        title: "Your Music",
        description: "Your listening statistics and insights"
      }
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
      deletedFailedTitle: "Failed to Delete Playlist",
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
      createdTitle: "Album Created Successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to Create Album",
      updatedTitle: "Album Updated Successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to Update Album",
      deletedTitle: "Album Deleted Successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to Delete Album",
      filters: {
        title: "Filters",
        clear: "Clear active filters",
        sortBy: "Sort by",
        favorites: "Favorites only",
        favoritesDescription: "Show only favorite albums",
        albumType: "Album type",
        all: "All Types",
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
      createdTitle: "Artist Created Successfully",
      createdDescription: "{name} has been created",
      createdFailedTitle: "Failed to Create Artist",
      updatedTitle: "Artist Updated Successfully",
      updatedDescription: "{name} has been updated",
      updatedFailedTitle: "Failed to Update Artist",
      deletedTitle: "Artist Deleted Successfully",
      deletedDescription: "{name} has been deleted",
      deletedFailedTitle: "Failed to Delete Artist",
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
      equalizer: {
        title: "Equalizer",
        enable: {
          title: "Enable Equalizer",
          description: "Enable or disable the audio equalizer",
          enabled: "Enabled",
          disabled: "Disabled"
        },
        presets: {
          title: "Equalizer Presets",
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
          title: "Frequency Bands",
          description: "Adjust individual frequency bands"
        },
        reset: {
          title: "Reset Equalizer",
          description: "Reset all bands to flat (0 dB)",
          button: "Reset to Flat"
        }
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices"
      },
      about: {
        title: "About",
        identity: {
          title: "About",
          description: "Application information and version details"
        },
        whatsNew: {
          title: "What's New",
          newRelease: "New release",
          viewChangelog: "View changelog",
          dialog: {
            title: "Changelog"
          }
        },
        storage: {
          title: "Storage & Data",
          description: "Manage application data and settings",
          openDataFolder: "Open data folder"
        },
        legal: {
          title: "Legal & Copyright",
          description: "License information and legal documents",
          copyright: "Copyright",
          licensed: "Licensed under MIT license",
          viewLicense: "View license",
          viewOnGitHub: "View on GitHub"
        }
      }
    },
    fastUpload: {
      title: "Fast Upload",
      description: "Create a bundle using the Tunno CLI, then import it here",
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
