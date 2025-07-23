use tauri::command;

use super::{
    generate_qr_data, get_server_info, is_server_running, start_api_server, stop_api_server,
    ServerInfo,
};

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
pub async fn is_server_running_cmd() -> bool {
    is_server_running().await
}

#[command]
pub async fn get_server_info_cmd() -> Option<ServerInfo> {
    get_server_info().await
}

#[command]
pub async fn get_qr_data_cmd() -> Option<String> {
    generate_qr_data().await
}
