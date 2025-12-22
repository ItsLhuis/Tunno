use tauri::command;
use tauri::Manager;

use chrono::Utc;

use serde::Deserialize;

use std::fs::File;
use std::io::{BufReader, Read, Write};
use std::path::PathBuf;

use zip::write::FileOptions;
use zip::ZipWriter;

#[derive(Debug, Deserialize, Clone)]
pub struct TrackExportData {
    pub dir_name: String,
    pub audio_file: String,
    pub thumbnails: Vec<String>,
    pub metadata_json: String,
}

fn create_bundle_sync(
    zip_path: PathBuf,
    songs_dir: PathBuf,
    thumbnails_dir: PathBuf,
    manifest_json: String,
    tracks_data: Vec<TrackExportData>,
) -> Result<String, String> {
    let zip_file =
        File::create(&zip_path).map_err(|e| format!("Failed to create ZIP file: {}", e))?;

    let mut zip = ZipWriter::new(zip_file);

    let options: FileOptions<'_, ()> = FileOptions::default()
        .compression_method(zip::CompressionMethod::Stored);

    zip.start_file("manifest.json", options.clone())
        .map_err(|e| format!("Failed to add manifest.json: {}", e))?;
    zip.write_all(manifest_json.as_bytes())
        .map_err(|e| format!("Failed to write manifest.json: {}", e))?;

    zip.add_directory("tracks/", options.clone())
        .map_err(|e| format!("Failed to add tracks directory: {}", e))?;

    for track in tracks_data {
        let track_dir = format!("tracks/{}", track.dir_name);

        zip.add_directory(format!("{}/", track_dir), options.clone())
            .map_err(|e| format!("Failed to add track directory {}: {}", track.dir_name, e))?;

        let metadata_path = format!("{}/metadata.json", track_dir);
        zip.start_file(&metadata_path, options.clone())
            .map_err(|e| format!("Failed to add metadata for {}: {}", track.dir_name, e))?;
        zip.write_all(track.metadata_json.as_bytes())
            .map_err(|e| format!("Failed to write metadata for {}: {}", track.dir_name, e))?;

        let audio_source = songs_dir.join(&track.audio_file);
        if audio_source.exists() {
            let audio_path = format!("{}/{}", track_dir, track.audio_file);

            let file = File::open(&audio_source)
                .map_err(|e| format!("Failed to open audio file {}: {}", track.audio_file, e))?;
            let mut reader = BufReader::new(file);
            let mut audio_data = Vec::new();
            reader
                .read_to_end(&mut audio_data)
                .map_err(|e| format!("Failed to read audio file {}: {}", track.audio_file, e))?;

            zip.start_file(&audio_path, options.clone())
                .map_err(|e| format!("Failed to add audio file {}: {}", track.audio_file, e))?;
            zip.write_all(&audio_data)
                .map_err(|e| format!("Failed to write audio file {}: {}", track.audio_file, e))?;
        } else {
            return Err(format!("Audio file not found: {}", track.audio_file));
        }

        for thumbnail in &track.thumbnails {
            if thumbnail.is_empty() {
                continue;
            }

            let thumb_source = thumbnails_dir.join(thumbnail);
            if thumb_source.exists() {
                let thumb_path = format!("{}/{}", track_dir, thumbnail);

                let file = File::open(&thumb_source)
                    .map_err(|e| format!("Failed to open thumbnail {}: {}", thumbnail, e))?;
                let mut reader = BufReader::new(file);
                let mut thumb_data = Vec::new();
                reader
                    .read_to_end(&mut thumb_data)
                    .map_err(|e| format!("Failed to read thumbnail {}: {}", thumbnail, e))?;

                zip.start_file(&thumb_path, options.clone())
                    .map_err(|e| format!("Failed to add thumbnail {}: {}", thumbnail, e))?;
                zip.write_all(&thumb_data)
                    .map_err(|e| format!("Failed to write thumbnail {}: {}", thumbnail, e))?;
            }
        }
    }

    zip.finish()
        .map_err(|e| format!("Failed to finalize ZIP: {}", e))?;

    zip_path
        .to_str()
        .ok_or_else(|| "Failed to convert path to string".to_string())
        .map(|s| s.to_string())
}

#[command]
pub async fn sync_create_bundle(
    app: tauri::AppHandle,
    output_dir: String,
    manifest_json: String,
    tracks_data: Vec<TrackExportData>,
) -> Result<String, String> {
    let timestamp = Utc::now().format("%Y%m%d_%H%M%S").to_string();
    let zip_filename = format!("Tunno_FastUpload_{}.zip", timestamp);

    let output_path = PathBuf::from(&output_dir);
    if !output_path.exists() {
        return Err("Output directory does not exist".to_string());
    }

    let zip_path = output_path.join(&zip_filename);

    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {}", e))?;

    let songs_dir = app_data_dir.join("songs");
    let thumbnails_dir = app_data_dir.join("thumbnails");

    tokio::task::spawn_blocking(move || {
        create_bundle_sync(zip_path, songs_dir, thumbnails_dir, manifest_json, tracks_data)
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}
