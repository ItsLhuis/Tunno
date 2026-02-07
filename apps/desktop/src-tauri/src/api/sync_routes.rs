use std::collections::HashSet;
use std::path::PathBuf;
use std::sync::Arc;

use serde::{Deserialize, Serialize};

use warp::http::StatusCode;
use warp::Filter;

use super::auth::with_auth;
use super::db;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CompareRequest {
    song_fingerprints: Vec<String>,
    album_fingerprints: Vec<String>,
    artist_fingerprints: Vec<String>,
    playlist_fingerprints: Vec<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct CompareResponse {
    missing_songs: Vec<String>,
    missing_albums: Vec<String>,
    missing_artists: Vec<String>,
    missing_playlists: Vec<String>,
    totals: CompareTotals,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct CompareTotals {
    songs: usize,
    albums: usize,
    artists: usize,
    playlists: usize,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct BatchRequest {
    song_fingerprints: Vec<String>,
    album_fingerprints: Vec<String>,
    artist_fingerprints: Vec<String>,
    playlist_fingerprints: Vec<String>,
    #[allow(dead_code)]
    batch_index: Option<u32>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct BatchResponse {
    songs: Vec<db::SongRow>,
    albums: Vec<db::AlbumRow>,
    artists: Vec<db::ArtistRow>,
    playlists: Vec<db::PlaylistRow>,
}

fn compute_missing(desktop: &[String], mobile: &[String]) -> Vec<String> {
    let mobile_set: HashSet<&String> = mobile.iter().collect();
    desktop
        .iter()
        .filter(|fp| !mobile_set.contains(fp))
        .cloned()
        .collect()
}

async fn handle_compare(
    body: CompareRequest,
    db_path: Arc<PathBuf>,
) -> Result<impl warp::Reply, warp::Rejection> {
    let result = tokio::task::spawn_blocking(move || {
        let conn = db::open_readonly(&db_path).map_err(|e| e.to_string())?;

        let desktop_songs = db::get_all_fingerprints(&conn, "songs").map_err(|e| e.to_string())?;
        let desktop_albums =
            db::get_all_fingerprints(&conn, "albums").map_err(|e| e.to_string())?;
        let desktop_artists =
            db::get_all_fingerprints(&conn, "artists").map_err(|e| e.to_string())?;
        let desktop_playlists =
            db::get_all_fingerprints(&conn, "playlists").map_err(|e| e.to_string())?;

        let missing_songs = compute_missing(&desktop_songs, &body.song_fingerprints);
        let missing_albums = compute_missing(&desktop_albums, &body.album_fingerprints);
        let missing_artists = compute_missing(&desktop_artists, &body.artist_fingerprints);
        let missing_playlists = compute_missing(&desktop_playlists, &body.playlist_fingerprints);

        Ok::<CompareResponse, String>(CompareResponse {
            totals: CompareTotals {
                songs: missing_songs.len(),
                albums: missing_albums.len(),
                artists: missing_artists.len(),
                playlists: missing_playlists.len(),
            },
            missing_songs,
            missing_albums,
            missing_artists,
            missing_playlists,
        })
    })
    .await
    .map_err(|_| warp::reject::reject())?;

    match result {
        Ok(response) => Ok(warp::reply::with_status(
            warp::reply::json(&response),
            StatusCode::OK,
        )),
        Err(err) => Ok(warp::reply::with_status(
            warp::reply::json(&serde_json::json!({ "error": err })),
            StatusCode::INTERNAL_SERVER_ERROR,
        )),
    }
}

async fn handle_batch(
    body: BatchRequest,
    db_path: Arc<PathBuf>,
) -> Result<impl warp::Reply, warp::Rejection> {
    let result = tokio::task::spawn_blocking(move || {
        let conn = db::open_readonly(&db_path).map_err(|e| e.to_string())?;

        let songs = db::get_songs_by_fingerprints(&conn, &body.song_fingerprints)
            .map_err(|e| e.to_string())?;
        let albums = db::get_albums_by_fingerprints(&conn, &body.album_fingerprints)
            .map_err(|e| e.to_string())?;
        let artists = db::get_artists_by_fingerprints(&conn, &body.artist_fingerprints)
            .map_err(|e| e.to_string())?;
        let playlists = db::get_playlists_by_fingerprints(&conn, &body.playlist_fingerprints)
            .map_err(|e| e.to_string())?;

        Ok::<BatchResponse, String>(BatchResponse {
            songs,
            albums,
            artists,
            playlists,
        })
    })
    .await
    .map_err(|_| warp::reject::reject())?;

    match result {
        Ok(response) => Ok(warp::reply::with_status(
            warp::reply::json(&response),
            StatusCode::OK,
        )),
        Err(err) => Ok(warp::reply::with_status(
            warp::reply::json(&serde_json::json!({ "error": err })),
            StatusCode::INTERNAL_SERVER_ERROR,
        )),
    }
}

pub fn sync_routes(
    token: Arc<String>,
    db_path: Arc<PathBuf>,
) -> impl Filter<Extract = (impl warp::Reply,), Error = warp::Rejection> + Clone {
    let db_path_compare = db_path.clone();
    let db_path_batch = db_path;

    let compare = warp::path!("api" / "sync" / "compare")
        .and(warp::post())
        .and(with_auth(token.clone()))
        .and(warp::body::json())
        .and(warp::any().map(move || db_path_compare.clone()))
        .and_then(handle_compare);

    let batch = warp::path!("api" / "sync" / "batch")
        .and(warp::post())
        .and(with_auth(token))
        .and(warp::body::json())
        .and(warp::any().map(move || db_path_batch.clone()))
        .and_then(handle_batch);

    compare.or(batch)
}
