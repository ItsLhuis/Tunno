# Mobile App

## Tech Stack

- **Framework**: Expo 54 (React Native 0.81)
- **Navigation**: expo-router (file-based in `app/`)
- **Database**: Drizzle ORM + expo-sqlite
- **Audio**: react-native-track-player (patched)
- **Animations**: Reanimated 4, react-native-skia

## Project Structure

```
apps/mobile/
├── app/                 # expo-router pages (file-based routing)
│   ├── _layout.tsx      # Root layout with providers
│   ├── (tabs)/          # Tab navigator group
│   │   ├── _layout.tsx  # Tab bar configuration
│   │   ├── index.tsx    # Home tab
│   │   ├── songs.tsx    # Songs tab
│   │   ├── albums.tsx   # Albums tab
│   │   ├── artists.tsx  # Artists tab
│   │   └── playlists.tsx# Playlists tab
│   ├── songs/           # /songs/[id], /songs/insert, /songs/[id]/update
│   ├── albums/          # /albums/[id], /albums/insert, etc.
│   ├── artists/         # /artists/[id], etc.
│   ├── playlists/       # /playlists/[id], etc.
│   ├── settings/        # /settings/*
│   ├── queue.tsx        # Queue screen
│   └── lyrics.tsx       # Lyrics screen
├── features/            # Feature modules (same structure as desktop)
├── components/          # Shared UI components
├── stores/              # Zustand stores
├── database/            # Database client and migrations
├── services/            # Track player, storage
├── hooks/               # Shared hooks
└── lib/                 # Third-party configs
```

## Navigation (expo-router)

File-based routing with groups:

```
app/
├── (tabs)/              # Tab group (shows tab bar)
├── songs/[id].tsx       # Dynamic route: /songs/123
├── songs/[id]/update.tsx# Nested: /songs/123/update
└── songs/insert.tsx     # Static: /songs/insert
```

## Styling System

Custom styling system built on React Native's StyleSheet (`styles/` aliased as `@styles`).

### Core APIs

```typescript
import {
  createStyleSheet,
  createVariant,
  useStyles,
  useStyle,
  useBreakpoint,
  useAnimatedTheme
} from "@styles"

// Create stylesheet with theme access
const styles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    padding: theme.space("md"),
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius()
  },
  // Variant-based styling (like CVA)
  button: createVariant({
    base: { borderRadius: theme.radius() },
    variants: {
      size: {
        sm: { padding: theme.space(2) },
        md: { padding: theme.space(3) },
        lg: { padding: theme.space(4) }
      },
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary }
      }
    },
    defaultVariants: { size: "md", variant: "primary" }
  })
}))

// In component
const MyComponent = () => {
  const styles = useStyles(myStyles)
  return (
    <View style={styles.container}>
      <View style={styles.button({ size: "lg", variant: "primary" })} />
    </View>
  )
}
```

### Design Tokens

Location: `styles/tokens/`

| Token       | File             | Values                                          |
| ----------- | ---------------- | ----------------------------------------------- |
| Spacing     | `spacing.ts`     | xs, sm, md, lg, xl, 2xl, 3xl, 4xl               |
| Typography  | `typography.ts`  | fontSize, lineHeight, fontWeight, letterSpacing |
| Borders     | `borders.ts`     | borderWidth, radius                             |
| Shadows     | `shadows.ts`     | Shadow presets                                  |
| Colors      | `palette.ts`     | Base color palette                              |
| Animations  | `animations.ts`  | duration, easing                                |
| Breakpoints | `breakpoints.ts` | xs, sm, md, lg, xl, 2xl                         |

### Themes

Location: `styles/themes/`

- `dark.ts` - Dark theme with semantic colors
- `light.ts` - Light theme

Theme provides: colors, space(), size(), fontSize(), radius(), shadow(), withOpacity(), etc.

### Responsive & Animation Hooks

```typescript
// Breakpoints
const breakpoint = useBreakpoint() // 'xs' | 'sm' | 'md' | etc.
const { md, lg } = useBreakpoints() // Boolean map

// Orientation
const orientation = useOrientation() // 'portrait' | 'landscape'

// Animated theme for Reanimated worklets
const animatedTheme = useAnimatedTheme()
const animatedColor = useAnimatedPaletteColor("primary")
```

Reference: `components/ui/Button.tsx` for comprehensive variant example

## UI Components

Custom React Native components (not web Radix):

| Component     | Package                                  |
| ------------- | ---------------------------------------- |
| Bottom sheets | `@gorhom/bottom-sheet`                   |
| Lists         | `@shopify/flash-list`, `@legendapp/list` |
| Animations    | `react-native-reanimated`                |
| Graphics      | `@shopify/react-native-skia`             |
| Slider        | `@miblanchard/react-native-slider`       |
| Toasts        | `sonner-native`                          |

## Audio Playback

Uses patched `react-native-track-player`:

```typescript
// features/player/stores/usePlayerStore.ts
import TrackPlayer from "react-native-track-player"

await TrackPlayer.setupPlayer()
await TrackPlayer.add(tracks)
await TrackPlayer.play()
```

## Settings Persistence

Zustand with MMKV storage:

```typescript
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

export const useSettingsStore = create(
  persist((set) => ({ theme: "system", language: "en" }), {
    name: "settings",
    storage: createJSONStorage(() => ({
      getItem: (key) => storage.getString(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key)
    }))
  })
)
```

## Commands

```bash
# Development
pnpm dev:mobile                                # Start with dev client

# Database
pnpm --filter @tunno/mobile db:generate        # Generate migrations
pnpm --filter @tunno/mobile db:migrate         # Apply migrations
pnpm --filter @tunno/mobile db:studio          # Drizzle Studio (dev client only)

# Build locally
pnpm --filter @tunno/mobile android            # Build and run on Android
pnpm --filter @tunno/mobile ios                # Build and run on iOS

# EAS Build (cloud)
pnpm --filter @tunno/mobile build:android:development
pnpm --filter @tunno/mobile build:android:preview
pnpm --filter @tunno/mobile build:android:production
```

## Config Files

- `app.json` / `app.config.ts` - Expo configuration
- `eas.json` - EAS Build profiles
- `drizzle.config.ts` - Database migrations config
- `babel.config.js` - Babel configuration

## Key Features

- Offline-first: All data stored locally in SQLite
- Background playback: Via react-native-track-player
- Sync: Import from desktop via document picker
- Widgets: Android home screen widget (`react-native-android-widget`)
- Drizzle Studio: Debug database in dev client
