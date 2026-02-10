# Changelog

All notable changes to the Tunno Mobile project will be documented in this file.

## [1.0.2] - 2026-02-10

### Changed

- ⚡ **Action Menus**: Context and dropdown menus for songs, albums, artists, and playlists now open
  instantly with core actions (play, queue, add to playlist) available immediately, instead of
  blocking the entire menu with a loading spinner while fetching entity details.
- 🎤 **Artist Actions**: Artist action menu now displays total duration alongside track count in the
  header.

## [1.0.1] - 2026-02-09

### Changed

- 🔄 **Sync Progress**: The sync progress bar now tracks only songs instead of all entities (songs,
  artists, albums, playlists), providing a clearer indication of sync completion.
- 📷 **QR Scanner**: The QR code scanner modal now uses a scoped dark theme for consistent
  readability over the camera overlay, and replaced the manual close button with an IconButton
  component.

## [1.0.0] - 2026-02-09

### Added

- 🔄 **Sync**: Connect to the Tunno Desktop sync server and sync your entire music library to your
  phone. Pair devices instantly by scanning a QR code over the local network, with real-time
  progress tracking during the sync process.
- 🎵 **Music Library**: Complete music library organization with automatic categorization into
  Songs, Albums, Artists, and Playlists, all stored locally on-device with Drizzle ORM and SQLite.
- 🎧 **Audio Playback**: Full-featured music playback with shuffle and repeat modes.
- 📝 **Queue Management**: Smart queue system for building and managing listening sessions.
- 🏠 **Home Screen**: Curated home experience with Quick Access, Jump Back In, On Repeat, New
  Releases, Discover, Favorite Artists, Top Albums, and Your Playlists sections.
- 🔍 **Search**: Search functionality to instantly find any track, album, or artist across the
  library.
- ⭐ **Favorites**: Favorites system for songs, albums, artists, and playlists.
- 📊 **Listening Statistics**: Listening history tracking with optimized statistics recording using
  transaction-based writes and metadata caching.
- 📋 **Playlists**: Complete playlist feature with custom cover image support and intuitive
  organization tools.
- 🎤 **Lyrics**: Time-synced lyrics display with tap-to-seek for supported tracks.
- 📱 **Android Widget**: Mini player home screen widget with multiple sizes that updates with
  playback state changes for at-a-glance control.
- 🌐 **Internationalization**: Multi-language support via i18next.
- 🎨 **Themes**: Light and dark theme support with a custom design token and variant styling system.
- 🎨 **Color Extraction**: Dynamic color palettes derived from album artwork using Skia-based
  extraction.
- 🔒 **Privacy-First**: Complete local storage with no accounts, tracking, or data collection.
