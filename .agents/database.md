# Database

## Schema Location

`packages/database/src/schema.ts` - single file with all tables and relations

## Tables

| Table              | Purpose                 | Key Fields                                              |
| ------------------ | ----------------------- | ------------------------------------------------------- |
| `songs`            | Music tracks            | name, file, duration, lyrics (JSON), albumId, playCount |
| `albums`           | Album metadata          | name, releaseYear, albumType (single/album/compilation) |
| `artists`          | Artist info             | name, thumbnail                                         |
| `playlists`        | User collections        | name, thumbnail                                         |
| `songsToArtists`   | Song-Artist M:N         | songId, artistId, artistOrder                           |
| `albumsToArtists`  | Album-Artist M:N        | albumId, artistId, artistOrder                          |
| `playlistsToSongs` | Playlist-Song M:N       | playlistId, songId, addedAt                             |
| `songStats`        | Per-song statistics     | songId, totalPlayTime                                   |
| `artistStats`      | Per-artist statistics   | artistId, totalPlayTime                                 |
| `albumStats`       | Per-album statistics    | albumId, totalPlayTime                                  |
| `playlistStats`    | Per-playlist statistics | playlistId, totalPlayTime                               |
| `playHistory`      | Play events             | songId, playedAt, playSource, timeListened              |
| `sidebar`          | Pinned sidebar items    | entityType, entityId, position                          |

## Drizzle Relations

Defined in `packages/database/src/schema.ts` after table definitions:

```typescript
export const songsRelations = relations(songs, ({ one, many }) => ({
  album: one(albums, { fields: [songs.albumId], references: [albums.id] }),
  artists: many(songsToArtists),
  playlists: many(playlistsToSongs),
  stats: one(songStats, { fields: [songs.id], references: [songStats.songId] }),
  playHistory: many(playHistory)
}))
```

## Database Client Setup

Each app creates its own client in `database/client.ts`:

```typescript
// apps/desktop/src/database/client.ts
import { drizzle } from "./driver"
import { schema } from "@repo/database"

const database = drizzle("database.db", { schema })
export { database, schema }
```

## Cursor-Based Pagination

Helper in `packages/database/src/helpers.ts`:

```typescript
import { buildCursorCondition, getOrderByFromColumn } from "@repo/database"

// In query function:
const cursorCondition = buildCursorCondition({
  cursorValues: decodeCursor(cursor),
  columns: [schema.songs.createdAt, schema.songs.id],
  direction: "desc"
})

const songs = await database.query.songs.findMany({
  limit: limit + 1, // Fetch one extra to detect hasNextPage
  where: cursorCondition ? and(filters, cursorCondition) : filters,
  orderBy: [getOrderByFromColumn(schema.songs.createdAt, "desc"), asc(schema.songs.id)]
})
```

Reference: `apps/desktop/src/features/songs/api/queries.ts:48-114`

## Error Handling

SQLite constraint errors are handled via helpers in `packages/database/src/helpers.ts`:

```typescript
import { isUniqueConstraintError, extractConstraintInfo } from "@repo/database"

try {
  await db.insert(albums).values(album)
} catch (err) {
  if (isUniqueConstraintError(err)) {
    const info = extractConstraintInfo(err)
    // info.table, info.column, info.type
  }
}
```

## Migrations

```bash
# Generate migration after schema changes
pnpm --filter @tunno/desktop db:generate

# Apply migrations
pnpm --filter @tunno/desktop db:migrate

# Open Drizzle Studio (GUI)
pnpm --filter @tunno/desktop db:studio
pnpm --filter @tunno/mobile db:studio
```

## Database Locations

Desktop (determined by Tauri):

- **Windows**: `%APPDATA%\com.itslhuis.tunno\database.db`
- **macOS**: `~/Library/Application Support/com.itslhuis.tunno/database.db`
- **Linux**: `~/.config/com.itslhuis.tunno/database.db`

Mobile: Managed by expo-sqlite (app sandbox)
