# Desktop App

## Tech Stack

- **Framework**: Tauri 2.x (Rust backend, web frontend)
- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: TanStack Router (file-based in `routes/`)
- **Styling**: TailwindCSS 4 + Radix UI + shadcn/ui
- **Audio**: @track-player/web

## Project Structure

```
apps/desktop/src/
├── routes/              # TanStack Router pages (file-based routing)
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page
│   ├── songs/           # /songs, /songs/$id
│   ├── albums/          # /albums, /albums/$id
│   ├── artists/         # /artists/$id
│   ├── playlists/       # /playlists, /playlists/$id
│   ├── settings.tsx     # Settings layout
│   └── settings/        # /settings/appearance, /settings/language, etc.
├── features/            # Feature modules (songs, albums, artists, playlists, player, etc.)
├── components/          # Shared UI components
├── stores/              # Global Zustand stores
├── database/            # Database client and helpers
├── services/            # Audio playback, storage, statistics
├── hooks/               # Shared hooks
└── lib/                 # Third-party configs (queryClient, utils)
```

## Tauri Integration

Tauri APIs are imported from `@tauri-apps/api/*`:

```typescript
// File system
import { readDir, readFile } from "@tauri-apps/plugin-fs"

// Dialogs
import { open } from "@tauri-apps/plugin-dialog"

// Shell
import { Command } from "@tauri-apps/plugin-shell"

// Store (persistence)
import { Store } from "@tauri-apps/plugin-store"

// Events (cross-window)
import { emit, listen } from "@tauri-apps/api/event"
```

Reference: `apps/desktop/src/stores/useSettingsStore.ts` for event emission example

## Audio Playback

Uses `@track-player/web` for audio:

```typescript
import TrackPlayer from "@track-player/web"

// Equalizer
TrackPlayer.setEqualizerEnabled(true)
TrackPlayer.setEqualizerPreset("rock")
TrackPlayer.setEqualizerBandGain(0, 3.5)
```

Reference: `apps/desktop/src/stores/useSettingsStore.ts:85-138`

## Settings Persistence

Zustand store with Tauri plugin-store:

```typescript
// apps/desktop/src/stores/useSettingsStore.ts
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({ /* state and actions */ }),
    {
      name: "settings",
      storage: persistStorage(".settings.json"),  // Tauri plugin-store
      partialize: (state) => ({ theme, language, zoomLevel, equalizer... }),
    }
  )
)
```

## Commands

```bash
# Development
pnpm dev:desktop                              # Start with Tauri dev mode

# Database
pnpm --filter @tunno/desktop db:generate      # Generate migrations
pnpm --filter @tunno/desktop db:migrate       # Apply migrations
pnpm --filter @tunno/desktop db:studio        # Open Drizzle Studio

# Build
pnpm --filter @tunno/desktop build            # Production build (Tauri bundle)
pnpm --filter @tunno/desktop typecheck        # Type check
```

## Config Files

- `vite.config.ts` - Build configuration, path aliases, TanStack Router plugin
- `drizzle.config.ts` - Database migrations config
- `src-tauri/tauri.conf.json` - Tauri production config
- `src-tauri/tauri.conf.dev.json` - Tauri development config

## Key Features

- Fast upload: Import bundles from CLI (`features/fastUpload/`)
- Sync: Mobile sync via QR code (`features/sync/`)
- Equalizer: 10-band equalizer with presets
- Multi-window: Main, mini-player (planned)
- Lyrics: Synced lyrics display (`routes/lyrics.tsx`)
