use std::path::PathBuf;
use std::sync::Arc;

use warp::http::StatusCode;
use warp::Filter;

use super::auth::with_auth;
use super::db;

fn content_type_for_extension(ext: &str) -> &'static str {
    match ext {
        "mp3" => "audio/mpeg",
        "m4a" | "aac" => "audio/mp4",
        "ogg" | "oga" => "audio/ogg",
        "flac" => "audio/flac",
        "wav" => "audio/wav",
        "wma" => "audio/x-ms-wma",
        "opus" => "audio/opus",
        "webm" => "audio/webm",
        "jpg" | "jpeg" => "image/jpeg",
        "png" => "image/png",
        "webp" => "image/webp",
        _ => "application/octet-stream",
    }
}

async fn handle_audio(
    fingerprint: String,
    db_path: Arc<PathBuf>,
    app_data_dir: Arc<PathBuf>,
) -> Result<impl warp::Reply, warp::Rejection> {
    let songs_dir = app_data_dir.join("songs");

    let result = tokio::task::spawn_blocking(move || {
        let conn = db::open_readonly(&db_path).map_err(|e| e.to_string())?;
        db::get_song_file_path(&conn, &fingerprint, &songs_dir).map_err(|e| e.to_string())
    })
    .await
    .map_err(|_| warp::reject::reject())?;

    match result {
        Ok(Some(file_path)) if file_path.exists() => {
            let data = tokio::fs::read(&file_path)
                .await
                .map_err(|_| warp::reject::reject())?;

            let ext = file_path
                .extension()
                .and_then(|e| e.to_str())
                .unwrap_or("");
            let content_type = content_type_for_extension(ext);

            Ok(warp::reply::with_status(
                warp::reply::with_header(data, "Content-Type", content_type),
                StatusCode::OK,
            ))
        }
        Ok(_) => Ok(warp::reply::with_status(
            warp::reply::with_header(
                Vec::new(),
                "Content-Type",
                "application/json",
            ),
            StatusCode::NOT_FOUND,
        )),
        Err(_) => Ok(warp::reply::with_status(
            warp::reply::with_header(
                Vec::new(),
                "Content-Type",
                "application/json",
            ),
            StatusCode::INTERNAL_SERVER_ERROR,
        )),
    }
}

async fn handle_thumbnail(
    fingerprint: String,
    entity_type: String,
    db_path: Arc<PathBuf>,
    app_data_dir: Arc<PathBuf>,
) -> Result<impl warp::Reply, warp::Rejection> {
    let thumbnails_dir = app_data_dir.join("thumbnails");

    let result = tokio::task::spawn_blocking(move || {
        let conn = db::open_readonly(&db_path).map_err(|e| e.to_string())?;
        db::get_thumbnail_path(&conn, &fingerprint, &entity_type, &thumbnails_dir)
            .map_err(|e| e.to_string())
    })
    .await
    .map_err(|_| warp::reject::reject())?;

    match result {
        Ok(Some(file_path)) if file_path.exists() => {
            let data = tokio::fs::read(&file_path)
                .await
                .map_err(|_| warp::reject::reject())?;

            let ext = file_path
                .extension()
                .and_then(|e| e.to_str())
                .unwrap_or("");
            let content_type = content_type_for_extension(ext);

            Ok(warp::reply::with_status(
                warp::reply::with_header(data, "Content-Type", content_type),
                StatusCode::OK,
            ))
        }
        Ok(_) => Ok(warp::reply::with_status(
            warp::reply::with_header(
                Vec::new(),
                "Content-Type",
                "application/json",
            ),
            StatusCode::NOT_FOUND,
        )),
        Err(_) => Ok(warp::reply::with_status(
            warp::reply::with_header(
                Vec::new(),
                "Content-Type",
                "application/json",
            ),
            StatusCode::INTERNAL_SERVER_ERROR,
        )),
    }
}

pub fn file_routes(
    token: Arc<String>,
    db_path: Arc<PathBuf>,
    app_data_dir: Arc<PathBuf>,
) -> impl Filter<Extract = (impl warp::Reply,), Error = warp::Rejection> + Clone {
    let db_audio = db_path.clone();
    let app_audio = app_data_dir.clone();
    let db_thumb = db_path;
    let app_thumb = app_data_dir;

    let audio = warp::path!("api" / "files" / "audio" / String)
        .and(warp::get())
        .and(with_auth(token.clone()))
        .and(warp::any().map(move || db_audio.clone()))
        .and(warp::any().map(move || app_audio.clone()))
        .and_then(handle_audio);

    let thumbnail = warp::path!("api" / "files" / "thumbnail" / String / String)
        .and(warp::get())
        .and(with_auth(token))
        .and(warp::any().map(move || db_thumb.clone()))
        .and(warp::any().map(move || app_thumb.clone()))
        .and_then(handle_thumbnail);

    audio.or(thumbnail)
}
