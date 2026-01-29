# Architecture

## Data Flow

```
UI Components (routes/, app/)
    ↓ use hooks from features/[entity]/hooks/
React Query Hooks (useFetch*, useInfinite*)
    ↓ call query functions
Query Functions (features/[entity]/api/queries.ts)
    ↓ use Drizzle ORM
Database Client (database/client.ts)
    ↓
SQLite (local file per device)
```

## Package Responsibilities

| Package          | Purpose                                   | Does NOT contain       |
| ---------------- | ----------------------------------------- | ---------------------- |
| `@repo/api`      | Query keys, types, invalidation utilities | Hooks, query functions |
| `@repo/database` | Schema, relations, pagination helpers     | Database client        |
| `@repo/schemas`  | Zod validation schemas                    | Database types         |
| `@repo/utils`    | Colors, formatting, cache, selection      | App-specific logic     |
| `@repo/i18n`     | i18next setup, translation types          | App translation files  |

## Query Architecture

Each app implements its own query layer:

```
features/songs/
├── api/
│   ├── queries.ts      # getSongsWithMainRelationsPaginated, getSongById, etc.
│   ├── mutations.ts    # insertSong, updateSong, deleteSong
│   ├── validations.ts  # Business validation (duplicates, integrity)
│   └── stats/          # Stats update functions per entity
└── hooks/
    ├── useFetchSongsInfiniteWithMainRelations.ts
    ├── useFetchSongByIdWithMainRelations.ts
    └── useInsertSong.ts, useUpdateSong.ts, etc.
```

Reference: `apps/desktop/src/features/songs/` and `apps/mobile/features/songs/`

## State Management

| Type             | Tool                | Location                  | Example                 |
| ---------------- | ------------------- | ------------------------- | ----------------------- |
| Database queries | React Query         | `features/*/hooks/`       | `useFetchSongsInfinite` |
| UI/App settings  | Zustand (persisted) | `stores/`                 | `useSettingsStore`      |
| Player state     | Zustand             | `features/player/stores/` | `usePlayerStore`        |
| Forms            | React Hook Form     | Component-level           | Create/Edit forms       |

### Zustand Stores

Desktop (`apps/desktop/src/stores/useSettingsStore.ts`):

- Theme, language, zoom level
- Equalizer settings (enabled, preset, band gains)
- Persisted via Tauri plugin-store

Mobile (`apps/mobile/stores/useSettingsStore.ts`):

- Theme, language
- Persisted via react-native-mmkv

## Feature Module Pattern

All entities follow the same structure in both apps:

```
features/[entity]/
├── api/
│   ├── queries.ts       # Read operations with Drizzle
│   ├── mutations.ts     # Write operations with Drizzle
│   └── validations.ts   # Business rules, duplicate checks
├── hooks/
│   ├── useFetch*.ts     # React Query hooks using keys from @repo/api
│   └── use[Action]*.ts  # Mutation hooks (insert, update, delete)
├── stores/
│   └── use[Entity]Store.ts  # Zustand store for UI state
├── components/
│   └── [Entity]Item/    # Entity display components
└── forms/               # Form schemas and components
```

## Cross-App Shared Code

Both desktop and mobile apps:

- Import query keys and types from `@repo/api`
- Import schema and helpers from `@repo/database`
- Import validation schemas from `@repo/schemas`
- Have identical query function signatures in `features/*/api/queries.ts`
- Share the same database schema (SQLite via Drizzle)

The query implementations are nearly identical - compare:

- `apps/desktop/src/features/songs/api/queries.ts`
- `apps/mobile/features/songs/api/queries.ts`
