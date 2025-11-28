# Changelog

All notable changes to the Tunno Desktop project will be documented in this file.

## [1.1.1] - 2025-11-28

### Changed

- 🎨 **UI consistency**:
  - Standardized stats cards across all components to use Card, CardTitle, and CardDescription
    components for improved visual consistency
  - Updated YourStats, AlbumInfoStats, ArtistInfoStats, and PlaylistInfoStats components
  - Unified typography sizing for section titles and headings throughout the Home page for better
    visual hierarchy
  - Improved consistency in title sizes and spacing across all sections
  - Aligned card background color with secondary color for cohesive visual appearance across light
    and dark themes

## [1.1.0] - 2025-11-19

### Fixed

- 🐛 **Fixed empty entity pages**: Fixed issue where navigating to Albums, Playlists, or Artists
  without songs would show "not found" and hide the entity title and header information. Now the
  page correctly displays the entity details even when empty
- 🔧 Fixed selection state not updating correctly in dropdown selects when values changed externally
- ✅ Improved handling of single vs multiple selection modes in lists and dropdowns
- 🛡️ Added safety checks to prevent errors when list data is empty or unavailable

### Changed

- ⚡ **Performance improvements**:
  - Optimized list selection performance, making it faster to select multiple items
  - Reduced unnecessary recalculations when working with selections through intelligent caching
  - Improved memory usage when working with selections
- 🎨 **UI consistency**:
  - Updated background opacity across all components for better visual consistency
  - Improved hover states and visual feedback throughout the interface
  - Enhanced styling consistency in buttons, inputs, and other UI elements
- 📐 **Design updates**:
  - Unified border radius styling throughout the application for a more cohesive look
  - Standardized visual appearance across all components
- 🔄 **Selection system improvements**:
  - Refactored selection management to be more reliable and consistent
  - Improved selection behavior in Songs, Albums, Artists, and Playlists lists
  - Better synchronization between selection state and UI components
  - Enhanced selection functionality in dropdown selects and multi-select components

## [1.0.0] - 2025-11-14

### Added

- 🎵 Complete music library organization with automatic categorization into Songs, Albums, Artists,
  and Playlists
- 🎨 Beautiful interface with automatic display of track metadata and cover art
- 🔍 Powerful search functionality to instantly find any track, album, or artist
- ⭐ Favorites system for songs, albums, and artists
- 📊 Listening history tracking to discover patterns and rediscover favorites
- 📋 Unlimited playlist creation with intuitive organization tools
- 🖼️ Custom cover image support for playlists
- 💾 One-click save queue as playlist functionality
- 🎧 Professional-quality audio playback engine
- 🎛️ Built-in 10-band equalizer with genre presets and custom profiles
- 🎤 Time-synced lyrics display for supported tracks
- 🔀 Shuffle and repeat modes for flexible playback
- 🔊 Precise volume control with mute capability
- 📝 Smart queue system for building listening sessions
- 🎨 Light and dark theme support
- 🚀 Lightning-fast performance optimized for collections of any size
- 📦 Quick import tool integration with Tunno CLI for bulk folder scanning
- 🗂️ Automatic library organization based on music file metadata
- 🔒 Complete local storage with no internet connection required
- 🛡️ Privacy-first approach with no accounts, tracking, or data collection
- 💻 Native support for Windows, macOS, and Linux platforms
