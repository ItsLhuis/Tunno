use super::{
    generate_qr_data as internal_generate_qr_data, get_server_info as internal_get_server_info,
    is_server_running as internal_is_server_running, start_api_server, stop_api_server, ServerInfo,
};

use tauri::command;

#[command]
pub async fn start_server() -> Result<ServerInfo, String> {
    start_api_server().await.map_err(|e| e.to_string())
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
