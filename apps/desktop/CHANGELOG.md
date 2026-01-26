# Changelog

All notable changes to the Tunno Desktop project will be documented in this file.

## [1.5.4] - 2026-01-26

### Changed

- ⚡ **Statistics Manager Performance**: Optimized play count recording with transaction-based
  database writes to minimize disk syncs, song metadata caching to eliminate redundant queries, and
  batch artist updates using WHERE IN instead of loops

- ⚡ **Virtualization Performance**: Improved grid rendering with dynamic overscan calculation (1
  for grid, 5 for list)

## [1.5.3] - 2026-01-24

### Changed

- 🎵 **Queue Reordering**: Drag and drop is now limited to upcoming songs only for a more intuitive
  experience
- ⚡ **Queue Performance**: Reduced maximum displayed queue items for improved performance

## [1.5.2] - 2026-01-23

### Added

- 🎵 **Queue Reordering**: Drag and drop songs in the queue to reorder them

## [1.5.1] - 2026-01-23

### Fixed

- 🐛 **Titlebar Navigation**: Fixed back/forward button states not updating reactively by using
  TanStack Router's `useCanGoBack` hook and adding fallback for undefined history index

## [1.5.0] - 2026-01-22

### Added

- 🏠 **Home Page Redesign**: Complete overhaul of the home page
- 🎬 **Staggered Rendering**: Items now render progressively with a staggered animation effect for
  improved perceived performance in home and fast upload pages

### Changed

- 🎨 **Color Extraction**: Replaced ColorThief with a custom Canvas API-based color extraction for
  better performance and smaller bundle size
- ⚡ **Performance Improvements**:
  - Optimized menu and list components for faster rendering
  - Reduced unnecessary re-renders throughout the application
- 🔧 **Error Handling**: Enhanced API error handling with automatic retry logic
- 🎨 **UI Polish**:
  - Refined component styles and spacing across the application
  - Adjusted icon sizes in headers and playback controls for better consistency
  - Polished empty home page state

## [1.4.5] - 2026-01-07

### Added

- ✨ **Empty Home Page**: The home page now features a welcoming empty state with a call-to-action
  to get started.

## [1.4.4] - 2025-12-31

### Changed

- 📱 **Fast Upload**: Track list now adapts to window size, hiding album column on smaller screens
  for better responsiveness.

## [1.4.3] - 2025-12-27

### Fixed

- 🐛 **Sync Export**: Songs without direct artist associations now correctly use album artists as
  fallback, preventing "must have at least one artist" validation errors during Fast Upload import.
- 🔧 **Fast Upload Logging**: Added error logging when bundle validation fails for easier debugging.

## [1.4.2] - 2025-12-26

### Changed

- 📱 **Responsive Layouts**: Improved layout adaptability across all pages. Elements now reorganize
  gracefully on smaller windows, with titles that shorten when needed without hiding important
  controls.
- 🎛️ **Player Adaptability**: Player controls now adapt to available space, showing essential
  controls on smaller windows while keeping the full set on larger ones.
- ⚙️ **Settings Navigation**: Redesigned settings menu that transforms into a slide-out panel on
  smaller windows for easier navigation.
- 🎨 **Visual Consistency**: Refined button sizes and spacing throughout the app for a more polished
  look.
- 📐 **Smaller Minimum Window**: The app now supports even smaller window sizes for better
  flexibility.
- 🎵 **Playlist Details**: Playlist headers now display the total number of songs alongside the
  duration.

## [1.4.1] - 2025-12-26

### Changed

- 🎨 **Stats Sheets**: Improved header styling in stats sheets for better visual consistency.

## [1.4.0] - 2025-12-25

### Added

- 🔍 **Window Zoom**: Zoom in/out of the application window using keyboard shortcuts (Ctrl+/-,
  Ctrl+0) or via Settings → Appearance. Customize your viewing experience with adjustable zoom
  levels.
- 📊 **Stats Sheets**: View detailed statistics for songs, albums, artists, and playlists in a
  dedicated sheet modal. Access via the new stats button in entity headers.
- 🎨 **Featured Album**: The home page now showcases a featured album at the top with dynamic
  background colors based on album artwork.

### Changed

- 🏠 **Home Page Redesign**: Streamlined home page with a cleaner layout focused on what matters
  most: Featured Album, On Repeat, Favorite Artists, New Releases, and Your Playlists.
- 🎵 **On Repeat Section**: Redesigned with a new list layout for improved browsing experience.
- 🎛️ **MiniPlayer**: Improved track info display in both compact and expanded layouts.

## [1.3.0] - 2025-12-23

### Added

- 📌 **Sidebar Pinning**: Pin your favorite albums, artists, and playlists to the sidebar for quick
  access. Right-click any item and select "Add to sidebar" to pin it. Pinned items appear below the
  navigation icons with thumbnails for instant recognition.
  ([#5](https://github.com/ItsLhuis/Tunno/issues/5))

## [1.2.1] - 2025-12-22

### Fixed

- 🐛 **Toast Duration**: Removed infinite toast duration that was accidentally left from testing,
  toasts now auto-dismiss as expected

## [1.2.0] - 2025-12-22

### Added

- 📦 **Library Export**: Export your entire music library as a bundle file for backup or to transfer
  to another device. Access via Settings → Sync. ([#4](https://github.com/ItsLhuis/Tunno/issues/4))

### Changed

- 🎨 **UI improvements**: Refined component styles and standardized spacing across item cards,
  actions, and settings pages
- ⚡ **Fast Upload**: Improved UX with Fade transitions and added link to export settings

## [1.1.6] - 2025-12-18

### Fixed

- 🐛 **Fullscreen Player Controls**: Auto-hide controls and cursor after inactivity in fullscreen
  mode for an immersive viewing experience. Controls fade in smoothly when the mouse moves.
  ([#2](https://github.com/ItsLhuis/Tunno/issues/2))
- 🐛 **Layout Animation**: Fixed motion layout animation conflicts in fullscreen player
- 🐛 **Player navigation & repeat**: Fixed repeat mode behavior and corrected track navigation logic
- 🐛 **Song form loading**: Prevented race conditions during song form initialization

### Changed

- ⚡ **Performance improvements**:
  - Significantly improved rendering performance of action components throughout the application
  - Optimized thumbnail component rendering for faster load times and smoother scrolling
  - Reduced unnecessary re-renders in frequently used UI components
  - Virtualized player queue sheet for improved performance with large queues
  - Corrected play interaction handling in the player
- 🎨 **UI improvements**:
  - Restructured item components for better maintainability
  - Updated track player dependency with styling improvements
  - Removed unnecessary disabled cursor styles
  - Added new container component and player colors utility
  - Adjusted layout and spacing across desktop components for improved visual consistency
- 🔧 **Internal improvements**:
  - Moved player hooks and utilities to common directories for better reusability
  - Updated core application files and utilities

## [1.1.5] - 2025-12-09

### Fixed

- 🐛 **Badge Text Overflow**: Resolved an issue where badge components did not properly handle text
  overflow, especially in the "Update Song" dialog, leading to text extending beyond badge
  boundaries. The UI now gracefully truncates long text with an ellipsis.
  ([#3](https://github.com/ItsLhuis/Tunno/issues/3))

## [1.1.4] - 2025-12-08

### Fixed

- 🎨 **Fullscreen Player Transition**: Resolved a visual "rainbow" artifact during background
  transitions in the fullscreen player. This fix implements a cross-fade animation, ensuring smooth
  and natural color shifts between different album art palettes without inconsistent intermediate
  states. ([#1](https://github.com/ItsLhuis/Tunno/issues/1))

## [1.1.3] - 2025-12-03

### Fixed

- 🐛 **Duplicate Songs Issue**: Resolved a bug where songs were duplicated in the project's data
  folder during the fast upload process.

### Changed

- 🔧 **Internal Refactoring**: Streamlined the track processing logic by decoupling file-saving
  operations.

## [1.1.2] - 2025-11-28

### Added

- 🎬 **Fullscreen player auto-hide controls**: Controls now automatically hide when the mouse is
  inactive in fullscreen mode for a cleaner, more immersive viewing experience. Move the mouse to
  reveal controls with smooth fade animations

### Changed

- 🎨 **UI improvements**:
  - Enhanced Choicebox component description styling with improved text color and weight for better
    readability
  - Refined volume control slider dimensions in fullscreen player for better responsiveness

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
