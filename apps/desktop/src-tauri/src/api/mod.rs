use warp::Filter;

use serde::{Deserialize, Serialize};
use serde_json::json;

use local_ip_address::local_ip;

use std::net::{SocketAddr, TcpListener};
use std::path::PathBuf;
use std::sync::Arc;
use std::sync::LazyLock;

use tokio::sync::{oneshot, Mutex};

pub mod auth;
pub mod commands;
pub mod db;
pub mod file_routes;
pub mod sync_routes;

pub struct ApiServer {
    shutdown_tx: Option<oneshot::Sender<()>>,
    server_info: Option<ServerInfo>,
    token: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ServerInfo {
    pub ip: std::net::IpAddr,
    pub port: u16,
    pub url: String,
    pub endpoints: Vec<String>,
    pub token: Option<String>,
}

impl ApiServer {
    pub fn new() -> Self {
        Self {
            shutdown_tx: None,
            server_info: None,
            token: None,
        }
    }

    fn find_available_port(start_port: u16) -> Result<u16, String> {
        for port in start_port..start_port + 100 {
            if TcpListener::bind(SocketAddr::from(([0, 0, 0, 0], port))).is_ok() {
                return Ok(port);
            }
        }
        Err(format!(
            "All ports {}-{} are in use",
            start_port,
            start_port + 99
        ))
    }

    pub async fn start(
        &mut self,
        app_data_dir: PathBuf,
    ) -> Result<ServerInfo, String> {
        let port = Self::find_available_port(3030)?;

        let local_ip = local_ip().map_err(|e| {
            format!("Failed to detect local network IP: {}", e)
        })?;

        let db_path = db::resolve_db_path(&app_data_dir);
        if !db_path.exists() {
            return Err(format!("Database not found at {:?}", db_path));
        }

        let token = auth::generate_token();
        let server_url = format!("http://{}:{}", local_ip, port);

        let endpoints = vec![
            "/ping".to_string(),
            "/connection".to_string(),
            "/api/sync/compare".to_string(),
            "/api/sync/batch".to_string(),
            "/api/files/audio/:fingerprint".to_string(),
            "/api/files/thumbnail/:fingerprint/:type".to_string(),
        ];

        let server_info = ServerInfo {
            ip: local_ip,
            port,
            url: server_url.clone(),
            endpoints: endpoints.clone(),
            token: Some(token.clone()),
        };

        let info_for_routes = server_info.clone();

        let ping = warp::path("ping").and(warp::get()).map(|| {
            warp::reply::json(&json!({
                "message": "pong",
                "status": "ok",
                "timestamp": chrono::Utc::now().to_rfc3339()
            }))
        });

        let connection_info = warp::path("connection").and(warp::get()).map(move || {
            warp::reply::json(&json!({
                "ip": info_for_routes.ip,
                "port": info_for_routes.port,
                "url": info_for_routes.url,
                "endpoints": info_for_routes.endpoints
            }))
        });

        let token_arc = Arc::new(token.clone());
        let db_path_arc = Arc::new(db_path);
        let app_data_arc = Arc::new(app_data_dir);

        let sync = sync_routes::sync_routes(token_arc.clone(), db_path_arc.clone());
        let files = file_routes::file_routes(token_arc, db_path_arc, app_data_arc);

        let cors = warp::cors()
            .allow_any_origin()
            .allow_headers(vec!["content-type", "authorization"])
            .allow_methods(vec!["GET", "POST"]);

        let routes = ping
            .or(connection_info)
            .or(sync)
            .or(files)
            .recover(auth::handle_rejection)
            .with(cors)
            .with(warp::log("api"));

        let (shutdown_tx, shutdown_rx) = oneshot::channel();

        let server_addr: SocketAddr = ([0, 0, 0, 0], port).into();

        let (_addr, server) = warp::serve(routes)
            .try_bind_with_graceful_shutdown(server_addr, async {
                shutdown_rx.await.ok();
            })
            .map_err(|e| format!("Port {} already in use: {}", port, e))?;

        tokio::spawn(server);

        self.shutdown_tx = Some(shutdown_tx);
        self.token = Some(token);
        self.server_info = Some(server_info.clone());

        Ok(server_info)
    }

    pub fn stop(&mut self) {
        if let Some(shutdown_tx) = self.shutdown_tx.take() {
            let _ = shutdown_tx.send(());
        }
        self.server_info = None;
        self.token = None;
    }

    pub fn is_running(&self) -> bool {
        self.server_info.is_some()
    }

    pub fn get_server_info(&self) -> Option<&ServerInfo> {
        self.server_info.as_ref()
    }

    pub fn generate_qr_data(&self) -> Option<String> {
        self.server_info.as_ref().map(|info| {
            json!({
                "version": "1.0",
                "host": info.ip,
                "port": info.port,
                "token": info.token,
                "url": info.url
            })
            .to_string()
        })
    }
}

static API_SERVER: LazyLock<Arc<Mutex<ApiServer>>> =
    LazyLock::new(|| Arc::new(Mutex::new(ApiServer::new())));

pub async fn start_api_server(app_data_dir: PathBuf) -> Result<ServerInfo, String> {
    let mut server = API_SERVER.lock().await;
    server.start(app_data_dir).await
}

pub async fn stop_api_server() {
    let mut server = API_SERVER.lock().await;
    server.stop();
}

pub async fn is_server_running() -> bool {
    let server = API_SERVER.lock().await;
    server.is_running()
}

pub async fn get_server_info() -> Option<ServerInfo> {
    let server = API_SERVER.lock().await;
    server.get_server_info().cloned()
}

pub async fn generate_qr_data() -> Option<String> {
    let server = API_SERVER.lock().await;
    server.generate_qr_data()
}
