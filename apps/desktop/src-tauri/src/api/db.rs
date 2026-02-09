use rusqlite::{params, Connection, OpenFlags, Result as SqliteResult};

use serde::Serialize;

use sha2::{Digest, Sha256};

use std::collections::HashMap;
use std::path::{Path, PathBuf};

const DATABASE_FILENAME: &str = "database.db";

pub fn resolve_db_path(app_data_dir: &Path) -> PathBuf {
    app_data_dir.join(DATABASE_FILENAME)
}

pub fn open_readonly(db_path: &Path) -> SqliteResult<Connection> {
    Connection::open_with_flags(db_path, OpenFlags::SQLITE_OPEN_READ_ONLY)
}

pub fn open_readwrite(db_path: &Path) -> SqliteResult<Connection> {
    Connection::open(db_path)
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SongRow {
    pub fingerprint: String,
    pub name: String,
    pub duration: i64,
    pub release_year: Option<i64>,
    pub is_favorite: bool,
    pub lyrics: Option<String>,
    pub file: String,
    pub has_thumbnail: bool,
    pub album_fingerprint: Option<String>,
    pub artist_fingerprints: Vec<ArtistOrder>,
    pub playlist_fingerprints: Vec<String>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ArtistOrder {
    pub fingerprint: String,
    pub artist_order: i64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AlbumRow {
    pub fingerprint: String,
    pub name: String,
    pub album_type: String,
    pub release_year: Option<i64>,
    pub is_favorite: bool,
    pub has_thumbnail: bool,
    pub artist_fingerprints: Vec<ArtistOrder>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ArtistRow {
    pub fingerprint: String,
    pub name: String,
    pub is_favorite: bool,
    pub has_thumbnail: bool,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistRow {
    pub fingerprint: String,
    pub name: String,
    pub is_favorite: bool,
    pub has_thumbnail: bool,
    pub song_fingerprints: Vec<String>,
}

pub fn get_all_fingerprints(conn: &Connection, table_name: &str) -> SqliteResult<Vec<String>> {
    let sql = format!(
        "SELECT fingerprint FROM {} WHERE fingerprint IS NOT NULL",
        table_name
    );
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map([], |row| row.get::<_, String>(0))?;
    rows.collect()
}

pub fn get_songs_by_fingerprints(
    conn: &Connection,
    fingerprints: &[String],
) -> SqliteResult<Vec<SongRow>> {
    if fingerprints.is_empty() {
        return Ok(vec![]);
    }

    let placeholders = vec!["?"; fingerprints.len()].join(",");
    let sql = format!(
        "SELECT s.id, s.fingerprint, s.name, s.duration, s.release_year, \
         s.is_favorite, s.lyrics, s.file, s.thumbnail, \
         a.fingerprint as album_fingerprint \
         FROM songs s \
         LEFT JOIN albums a ON s.album_id = a.id \
         WHERE s.fingerprint IN ({})",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = fingerprints
        .iter()
        .map(|f| f as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;

    struct RawSong {
        id: i64,
        fingerprint: String,
        name: String,
        duration: i64,
        release_year: Option<i64>,
        is_favorite: bool,
        lyrics: Option<String>,
        file: String,
        thumbnail: Option<String>,
        album_fingerprint: Option<String>,
    }

    let raw_rows: Vec<RawSong> = stmt
        .query_map(sql_params.as_slice(), |row| {
            Ok(RawSong {
                id: row.get(0)?,
                fingerprint: row.get(1)?,
                name: row.get(2)?,
                duration: row.get(3)?,
                release_year: row.get(4)?,
                is_favorite: row.get::<_, i64>(5).map(|v| v != 0)?,
                lyrics: row.get(6)?,
                file: row.get(7)?,
                thumbnail: row.get(8)?,
                album_fingerprint: row.get(9)?,
            })
        })?
        .collect::<SqliteResult<Vec<_>>>()?;

    let song_ids: Vec<i64> = raw_rows.iter().map(|r| r.id).collect();
    let artist_map = get_song_artist_map(conn, &song_ids)?;
    let playlist_map = get_song_playlist_map(conn, &song_ids)?;

    let songs = raw_rows
        .into_iter()
        .map(|r| SongRow {
            fingerprint: r.fingerprint,
            name: r.name,
            duration: r.duration,
            release_year: r.release_year,
            is_favorite: r.is_favorite,
            lyrics: r.lyrics,
            file: r.file,
            has_thumbnail: r.thumbnail.is_some(),
            album_fingerprint: r.album_fingerprint,
            artist_fingerprints: artist_map.get(&r.id).cloned().unwrap_or_default(),
            playlist_fingerprints: playlist_map.get(&r.id).cloned().unwrap_or_default(),
        })
        .collect();

    Ok(songs)
}

fn get_song_artist_map(
    conn: &Connection,
    song_ids: &[i64],
) -> SqliteResult<HashMap<i64, Vec<ArtistOrder>>> {
    if song_ids.is_empty() {
        return Ok(HashMap::new());
    }

    let placeholders = vec!["?"; song_ids.len()].join(",");
    let sql = format!(
        "SELECT sa.song_id, ar.fingerprint, sa.artist_order \
         FROM song_artists sa \
         JOIN artists ar ON sa.artist_id = ar.id \
         WHERE sa.song_id IN ({}) AND ar.fingerprint IS NOT NULL \
         ORDER BY sa.artist_order",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = song_ids
        .iter()
        .map(|id| id as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;
    let mut map: HashMap<i64, Vec<ArtistOrder>> = HashMap::new();

    stmt.query_map(sql_params.as_slice(), |row| {
        Ok((
            row.get::<_, i64>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, i64>(2)?,
        ))
    })?
    .for_each(|result| {
        if let Ok((song_id, fingerprint, artist_order)) = result {
            map.entry(song_id).or_default().push(ArtistOrder {
                fingerprint,
                artist_order,
            });
        }
    });

    Ok(map)
}

fn get_song_playlist_map(
    conn: &Connection,
    song_ids: &[i64],
) -> SqliteResult<HashMap<i64, Vec<String>>> {
    if song_ids.is_empty() {
        return Ok(HashMap::new());
    }

    let placeholders = vec!["?"; song_ids.len()].join(",");
    let sql = format!(
        "SELECT ps.song_id, p.fingerprint \
         FROM playlist_songs ps \
         JOIN playlists p ON ps.playlist_id = p.id \
         WHERE ps.song_id IN ({}) AND p.fingerprint IS NOT NULL",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = song_ids
        .iter()
        .map(|id| id as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;
    let mut map: HashMap<i64, Vec<String>> = HashMap::new();

    stmt.query_map(sql_params.as_slice(), |row| {
        Ok((row.get::<_, i64>(0)?, row.get::<_, String>(1)?))
    })?
    .for_each(|result| {
        if let Ok((song_id, fingerprint)) = result {
            map.entry(song_id).or_default().push(fingerprint);
        }
    });

    Ok(map)
}

pub fn get_albums_by_fingerprints(
    conn: &Connection,
    fingerprints: &[String],
) -> SqliteResult<Vec<AlbumRow>> {
    if fingerprints.is_empty() {
        return Ok(vec![]);
    }

    let placeholders = vec!["?"; fingerprints.len()].join(",");
    let sql = format!(
        "SELECT id, fingerprint, name, album_type, release_year, is_favorite, thumbnail \
         FROM albums \
         WHERE fingerprint IN ({})",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = fingerprints
        .iter()
        .map(|f| f as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;

    struct RawAlbum {
        id: i64,
        fingerprint: String,
        name: String,
        album_type: String,
        release_year: Option<i64>,
        is_favorite: bool,
        thumbnail: Option<String>,
    }

    let raw_rows: Vec<RawAlbum> = stmt
        .query_map(sql_params.as_slice(), |row| {
            Ok(RawAlbum {
                id: row.get(0)?,
                fingerprint: row.get(1)?,
                name: row.get(2)?,
                album_type: row.get(3)?,
                release_year: row.get(4)?,
                is_favorite: row.get::<_, i64>(5).map(|v| v != 0)?,
                thumbnail: row.get(6)?,
            })
        })?
        .collect::<SqliteResult<Vec<_>>>()?;

    let album_ids: Vec<i64> = raw_rows.iter().map(|r| r.id).collect();
    let artist_map = get_album_artist_map(conn, &album_ids)?;

    let albums = raw_rows
        .into_iter()
        .map(|r| AlbumRow {
            fingerprint: r.fingerprint,
            name: r.name,
            album_type: r.album_type,
            release_year: r.release_year,
            is_favorite: r.is_favorite,
            has_thumbnail: r.thumbnail.is_some(),
            artist_fingerprints: artist_map.get(&r.id).cloned().unwrap_or_default(),
        })
        .collect();

    Ok(albums)
}

fn get_album_artist_map(
    conn: &Connection,
    album_ids: &[i64],
) -> SqliteResult<HashMap<i64, Vec<ArtistOrder>>> {
    if album_ids.is_empty() {
        return Ok(HashMap::new());
    }

    let placeholders = vec!["?"; album_ids.len()].join(",");
    let sql = format!(
        "SELECT aa.album_id, ar.fingerprint, aa.artist_order \
         FROM album_artists aa \
         JOIN artists ar ON aa.artist_id = ar.id \
         WHERE aa.album_id IN ({}) AND ar.fingerprint IS NOT NULL \
         ORDER BY aa.artist_order",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = album_ids
        .iter()
        .map(|id| id as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;
    let mut map: HashMap<i64, Vec<ArtistOrder>> = HashMap::new();

    stmt.query_map(sql_params.as_slice(), |row| {
        Ok((
            row.get::<_, i64>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, i64>(2)?,
        ))
    })?
    .for_each(|result| {
        if let Ok((album_id, fingerprint, artist_order)) = result {
            map.entry(album_id).or_default().push(ArtistOrder {
                fingerprint,
                artist_order,
            });
        }
    });

    Ok(map)
}

pub fn get_artists_by_fingerprints(
    conn: &Connection,
    fingerprints: &[String],
) -> SqliteResult<Vec<ArtistRow>> {
    if fingerprints.is_empty() {
        return Ok(vec![]);
    }

    let placeholders = vec!["?"; fingerprints.len()].join(",");
    let sql = format!(
        "SELECT fingerprint, name, is_favorite, thumbnail \
         FROM artists \
         WHERE fingerprint IN ({})",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = fingerprints
        .iter()
        .map(|f| f as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;
    let artists = stmt
        .query_map(sql_params.as_slice(), |row| {
            let thumbnail: Option<String> = row.get(3)?;
            Ok(ArtistRow {
                fingerprint: row.get(0)?,
                name: row.get(1)?,
                is_favorite: row.get::<_, i64>(2).map(|v| v != 0)?,
                has_thumbnail: thumbnail.is_some(),
            })
        })?
        .collect::<SqliteResult<Vec<_>>>()?;

    Ok(artists)
}

pub fn get_playlists_by_fingerprints(
    conn: &Connection,
    fingerprints: &[String],
) -> SqliteResult<Vec<PlaylistRow>> {
    if fingerprints.is_empty() {
        return Ok(vec![]);
    }

    let placeholders = vec!["?"; fingerprints.len()].join(",");
    let sql = format!(
        "SELECT id, fingerprint, name, is_favorite, thumbnail \
         FROM playlists \
         WHERE fingerprint IN ({})",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = fingerprints
        .iter()
        .map(|f| f as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;
    let raw_rows: Vec<(i64, String, String, bool, Option<String>)> = stmt
        .query_map(sql_params.as_slice(), |row| {
            Ok((
                row.get(0)?,
                row.get(1)?,
                row.get(2)?,
                row.get::<_, i64>(3).map(|v| v != 0)?,
                row.get(4)?,
            ))
        })?
        .collect::<SqliteResult<Vec<_>>>()?;

    let playlist_ids: Vec<i64> = raw_rows.iter().map(|r| r.0).collect();
    let song_map = get_playlist_song_map(conn, &playlist_ids)?;

    let playlists = raw_rows
        .into_iter()
        .map(
            |(id, fingerprint, name, is_favorite, thumbnail)| PlaylistRow {
                fingerprint,
                name,
                is_favorite,
                has_thumbnail: thumbnail.is_some(),
                song_fingerprints: song_map.get(&id).cloned().unwrap_or_default(),
            },
        )
        .collect();

    Ok(playlists)
}

fn get_playlist_song_map(
    conn: &Connection,
    playlist_ids: &[i64],
) -> SqliteResult<HashMap<i64, Vec<String>>> {
    if playlist_ids.is_empty() {
        return Ok(HashMap::new());
    }

    let placeholders = vec!["?"; playlist_ids.len()].join(",");
    let sql = format!(
        "SELECT ps.playlist_id, s.fingerprint \
         FROM playlist_songs ps \
         JOIN songs s ON ps.song_id = s.id \
         WHERE ps.playlist_id IN ({}) AND s.fingerprint IS NOT NULL",
        placeholders
    );

    let sql_params: Vec<&dyn rusqlite::types::ToSql> = playlist_ids
        .iter()
        .map(|id| id as &dyn rusqlite::types::ToSql)
        .collect();

    let mut stmt = conn.prepare(&sql)?;
    let mut map: HashMap<i64, Vec<String>> = HashMap::new();

    stmt.query_map(sql_params.as_slice(), |row| {
        Ok((row.get::<_, i64>(0)?, row.get::<_, String>(1)?))
    })?
    .for_each(|result| {
        if let Ok((playlist_id, fingerprint)) = result {
            map.entry(playlist_id).or_default().push(fingerprint);
        }
    });

    Ok(map)
}

pub fn get_song_file_path(
    conn: &Connection,
    fingerprint: &str,
    songs_dir: &Path,
) -> SqliteResult<Option<PathBuf>> {
    let mut stmt = conn.prepare("SELECT file FROM songs WHERE fingerprint = ?1")?;
    let result: Option<String> = stmt.query_row(params![fingerprint], |row| row.get(0)).ok();

    Ok(result.map(|filename| songs_dir.join(filename)))
}

pub fn get_thumbnail_path(
    conn: &Connection,
    fingerprint: &str,
    entity_type: &str,
    thumbnails_dir: &Path,
) -> SqliteResult<Option<PathBuf>> {
    let sql = match entity_type {
        "song" => "SELECT thumbnail FROM songs WHERE fingerprint = ?1",
        "album" => "SELECT thumbnail FROM albums WHERE fingerprint = ?1",
        "artist" => "SELECT thumbnail FROM artists WHERE fingerprint = ?1",
        "playlist" => "SELECT thumbnail FROM playlists WHERE fingerprint = ?1",
        _ => return Ok(None),
    };

    let mut stmt = conn.prepare(sql)?;
    let result: Option<String> = stmt
        .query_row(params![fingerprint], |row| row.get::<_, Option<String>>(0))
        .ok()
        .flatten();

    Ok(result.map(|filename| thumbnails_dir.join(filename)))
}

fn normalize_string(s: &str) -> String {
    let trimmed = s.trim().to_lowercase();
    let mut result = String::with_capacity(trimmed.len());
    let mut prev_was_space = false;

    for ch in trimmed.chars() {
        if ch.is_whitespace() {
            if !prev_was_space {
                result.push(' ');
                prev_was_space = true;
            }
        } else {
            result.push(ch);
            prev_was_space = false;
        }
    }

    result
}

fn hash_string(input: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    format!("{:x}", hasher.finalize())
}

pub fn generate_song_fingerprint(
    name: &str,
    duration: i64,
    artist_names: &[String],
    album_name: Option<&str>,
) -> String {
    let normalized_name = normalize_string(name);
    let mut sorted_artists: Vec<String> =
        artist_names.iter().map(|a| normalize_string(a)).collect();
    sorted_artists.sort();
    let artists_str = sorted_artists.join(",");
    let normalized_album = album_name.map(normalize_string).unwrap_or_default();

    let input = format!(
        "song:{}:{}:{}:{}",
        normalized_name, duration, artists_str, normalized_album
    );
    hash_string(&input)
}

pub fn generate_album_fingerprint(name: &str, album_type: &str, artist_names: &[String]) -> String {
    let normalized_name = normalize_string(name);
    let normalized_type = normalize_string(album_type);
    let mut sorted_artists: Vec<String> =
        artist_names.iter().map(|a| normalize_string(a)).collect();
    sorted_artists.sort();
    let artists_str = sorted_artists.join(",");

    let input = format!(
        "album:{}:{}:{}",
        normalized_name, normalized_type, artists_str
    );
    hash_string(&input)
}

pub fn generate_artist_fingerprint(name: &str) -> String {
    let normalized_name = normalize_string(name);
    let input = format!("artist:{}", normalized_name);
    hash_string(&input)
}

pub fn generate_playlist_fingerprint(name: &str) -> String {
    let normalized_name = normalize_string(name);
    let input = format!("playlist:{}", normalized_name);
    hash_string(&input)
}

pub fn backfill_all_fingerprints(conn: &Connection) -> Result<u64, String> {
    let mut total_updated: u64 = 0;

    total_updated += backfill_artist_fingerprints(conn)?;
    total_updated += backfill_album_fingerprints(conn)?;
    total_updated += backfill_playlist_fingerprints(conn)?;
    total_updated += backfill_song_fingerprints(conn)?;

    Ok(total_updated)
}

fn backfill_artist_fingerprints(conn: &Connection) -> Result<u64, String> {
    let mut stmt = conn
        .prepare("SELECT id, name FROM artists WHERE fingerprint IS NULL")
        .map_err(|e| e.to_string())?;

    let rows: Vec<(i64, String)> = stmt
        .query_map([], |row| Ok((row.get(0)?, row.get(1)?)))
        .map_err(|e| e.to_string())?
        .collect::<SqliteResult<Vec<_>>>()
        .map_err(|e| e.to_string())?;

    let mut count = 0u64;
    for (id, name) in &rows {
        let fp = generate_artist_fingerprint(name);
        conn.execute(
            "UPDATE artists SET fingerprint = ?1 WHERE id = ?2",
            params![fp, id],
        )
        .map_err(|e| e.to_string())?;
        count += 1;
    }

    Ok(count)
}

fn backfill_album_fingerprints(conn: &Connection) -> Result<u64, String> {
    let mut stmt = conn
        .prepare("SELECT id, name, album_type FROM albums WHERE fingerprint IS NULL")
        .map_err(|e| e.to_string())?;

    let rows: Vec<(i64, String, String)> = stmt
        .query_map([], |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?)))
        .map_err(|e| e.to_string())?
        .collect::<SqliteResult<Vec<_>>>()
        .map_err(|e| e.to_string())?;

    let mut count = 0u64;
    for (id, name, album_type) in &rows {
        let artist_names = get_album_artist_names(conn, *id).map_err(|e| e.to_string())?;
        let fp = generate_album_fingerprint(name, album_type, &artist_names);
        conn.execute(
            "UPDATE albums SET fingerprint = ?1 WHERE id = ?2",
            params![fp, id],
        )
        .map_err(|e| e.to_string())?;
        count += 1;
    }

    Ok(count)
}

fn backfill_playlist_fingerprints(conn: &Connection) -> Result<u64, String> {
    let mut stmt = conn
        .prepare("SELECT id, name FROM playlists WHERE fingerprint IS NULL")
        .map_err(|e| e.to_string())?;

    let rows: Vec<(i64, String)> = stmt
        .query_map([], |row| Ok((row.get(0)?, row.get(1)?)))
        .map_err(|e| e.to_string())?
        .collect::<SqliteResult<Vec<_>>>()
        .map_err(|e| e.to_string())?;

    let mut count = 0u64;
    for (id, name) in &rows {
        let fp = generate_playlist_fingerprint(name);
        conn.execute(
            "UPDATE playlists SET fingerprint = ?1 WHERE id = ?2",
            params![fp, id],
        )
        .map_err(|e| e.to_string())?;
        count += 1;
    }

    Ok(count)
}

fn backfill_song_fingerprints(conn: &Connection) -> Result<u64, String> {
    let mut stmt = conn
        .prepare(
            "SELECT s.id, s.name, s.duration, a.name as album_name \
             FROM songs s \
             LEFT JOIN albums a ON s.album_id = a.id \
             WHERE s.fingerprint IS NULL",
        )
        .map_err(|e| e.to_string())?;

    let rows: Vec<(i64, String, i64, Option<String>)> = stmt
        .query_map([], |row| {
            Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?))
        })
        .map_err(|e| e.to_string())?
        .collect::<SqliteResult<Vec<_>>>()
        .map_err(|e| e.to_string())?;

    let mut count = 0u64;
    for (id, name, duration, album_name) in &rows {
        let artist_names = get_song_artist_names(conn, *id).map_err(|e| e.to_string())?;
        let fp = generate_song_fingerprint(name, *duration, &artist_names, album_name.as_deref());
        conn.execute(
            "UPDATE songs SET fingerprint = ?1 WHERE id = ?2",
            params![fp, id],
        )
        .map_err(|e| e.to_string())?;
        count += 1;
    }

    Ok(count)
}

fn get_song_artist_names(conn: &Connection, song_id: i64) -> SqliteResult<Vec<String>> {
    let mut stmt = conn.prepare(
        "SELECT ar.name FROM song_artists sa \
         JOIN artists ar ON sa.artist_id = ar.id \
         WHERE sa.song_id = ?1 \
         ORDER BY sa.artist_order",
    )?;

    let names = stmt
        .query_map(params![song_id], |row| row.get::<_, String>(0))?
        .collect::<SqliteResult<Vec<_>>>()?;

    Ok(names)
}

fn get_album_artist_names(conn: &Connection, album_id: i64) -> SqliteResult<Vec<String>> {
    let mut stmt = conn.prepare(
        "SELECT ar.name FROM album_artists aa \
         JOIN artists ar ON aa.artist_id = ar.id \
         WHERE aa.album_id = ?1 \
         ORDER BY aa.artist_order",
    )?;

    let names = stmt
        .query_map(params![album_id], |row| row.get::<_, String>(0))?
        .collect::<SqliteResult<Vec<_>>>()?;

    Ok(names)
}
