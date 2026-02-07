use super::{
    generate_qr_data as internal_generate_qr_data, get_server_info as internal_get_server_info,
    is_server_running as internal_is_server_running, start_api_server, stop_api_server, ServerInfo,
};

use super::db;

use tauri::command;
use tauri::Manager;

#[command]
pub async fn start_server(app: tauri::AppHandle) -> Result<ServerInfo, String> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {}", e))?;

    start_api_server(app_data_dir)
        .await
        .map_err(|e| e.to_string())
}

#[command]
pub async fn stop_server() -> Result<(), String> {
    stop_api_server().await;
    Ok(())
}

#[command]
pub async fn is_server_running() -> bool {
    internal_is_server_running().await
}

#[command]
pub async fn get_server_info() -> Option<ServerInfo> {
    internal_get_server_info().await
}

#[command]
pub async fn get_qr_data() -> Option<String> {
    internal_generate_qr_data().await
}

#[command]
pub async fn backfill_fingerprints(app: tauri::AppHandle) -> Result<u64, String> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {}", e))?;

    let db_path = db::resolve_db_path(&app_data_dir);

    tokio::task::spawn_blocking(move || {
        let conn = db::open_readwrite(&db_path).map_err(|e| e.to_string())?;
        db::backfill_all_fingerprints(&conn)
    })
    .await
    .map_err(|e| format!("Task failed: {}", e))?
}
