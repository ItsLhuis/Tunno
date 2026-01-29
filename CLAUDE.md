# Tunno

Personal music library management ecosystem - organize, browse, and play music across desktop,
mobile, and CLI.

## Structure

```
apps/
  desktop/   # Tauri + React + Vite + TailwindCSS + Drizzle/SQLite
  mobile/    # Expo + React Native + Drizzle/SQLite
  cli/       # Node.js CLI (Commander) - downloads from YouTube, enriches via Spotify
  web/       # Next.js landing page

packages/
  api/       # React Query keys, types, and cache invalidation utilities
  database/  # Drizzle ORM schema, relations, and cursor pagination helpers
  schemas/   # Zod validation schemas
  shared/    # Constants (file extensions, UI)
  utils/     # Utilities (cache, colors, formatting, selection)
  i18n/      # Internationalization (i18next)
```

## Commands

All commands run from monorepo root via turbo:

```bash
pnpm install                           # Install all dependencies
pnpm dev:desktop                       # Run desktop app (Tauri dev mode)
pnpm dev:mobile                        # Run mobile app (requires dev client)
pnpm dev:web                           # Run web landing page
pnpm typecheck                         # Type-check all packages
pnpm format                            # Format with Prettier

# App-specific (use --filter)
pnpm --filter @tunno/desktop db:generate   # Generate migrations
pnpm --filter @tunno/desktop db:migrate    # Apply migrations
pnpm --filter @tunno/desktop db:studio     # Open Drizzle Studio
pnpm --filter @tunno/mobile db:studio      # Mobile Drizzle Studio
```

## Key Patterns

- **State**: Zustand for UI state (persisted), React Query for server/database state
- **Database**: Drizzle ORM + SQLite with cursor-based pagination
- **Styling**:
  - Desktop: TailwindCSS + Radix UI + shadcn/ui
  - Mobile: Custom `@styles` system with design tokens, themes, and variants
- **Routing**: TanStack Router (desktop `routes/`), expo-router (mobile `app/`)
- **Feature structure**: `features/[name]/{api,hooks,stores,components,forms}`

## Documentation

See `.agents/` for detailed guides:

| File              | When to read                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `architecture.md` | Understanding data flow, state management, or package relationships |
| `database.md`     | Working with Drizzle schema, migrations, or queries                 |
| `api-patterns.md` | Creating React Query hooks or understanding cache invalidation      |
| `desktop.md`      | Tauri-specific features, IPC, or desktop-only components            |
| `mobile.md`       | Expo/React Native patterns, navigation, or native features          |
| `cli.md`          | CLI commands, YouTube/Spotify integration                           |
