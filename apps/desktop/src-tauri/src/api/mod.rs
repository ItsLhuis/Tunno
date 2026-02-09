use warp::Filter;

use serde::{Deserialize, Serialize};
use serde_json::json;

use local_ip_address::local_ip;

use std::net::{SocketAddr, TcpListener};
use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::sync::LazyLock;
use std::time::{Duration, Instant};

use tokio::sync::{oneshot, Mutex};

pub struct SyncStatusData {
    pub status: String,
    pub last_activity: Instant,
}

pub type SyncStatus = Arc<std::sync::Mutex<SyncStatusData>>;

pub mod auth;
pub mod commands;
pub mod db;
pub mod file_routes;
pub mod sync_routes;

pub struct ApiServer {
    shutdown_tx: Option<oneshot::Sender<()>>,
    server_info: Option<ServerInfo>,
    token: Option<String>,
    sync_status: SyncStatus,
    timeout_running: Option<Arc<AtomicBool>>,
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
            sync_status: Arc::new(std::sync::Mutex::new(SyncStatusData {
                status: "waiting".to_string(),
                last_activity: Instant::now(),
            })),
            timeout_running: None,
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

        let sync_status = self.sync_status.clone();
        {
            let mut data = sync_status.lock().unwrap();
            data.status = "waiting".to_string();
            data.last_activity = Instant::now();
        }

        let ping_status = sync_status.clone();
        let ping = warp::path("ping").and(warp::get()).map(move || {
            let mut data = ping_status.lock().unwrap();
            if data.status == "waiting" {
                data.status = "connected".to_string();
            }
            data.last_activity = Instant::now();
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

        let sync = sync_routes::sync_routes(token_arc.clone(), db_path_arc.clone(), sync_status.clone());
        let files = file_routes::file_routes(token_arc, db_path_arc, app_data_arc, sync_status.clone());

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

        let timeout_running = Arc::new(AtomicBool::new(true));
        let timeout_flag = timeout_running.clone();
        let timeout_status = sync_status;

        tokio::spawn(async move {
            loop {
                tokio::time::sleep(Duration::from_secs(5)).await;

                if !timeout_flag.load(Ordering::Relaxed) {
                    break;
                }

                let mut data = timeout_status.lock().unwrap();
                let is_active = data.status == "syncing" || data.status == "connected";

                if is_active && data.last_activity.elapsed() > Duration::from_secs(15) {
                    data.status = "timedOut".to_string();
                }
            }
        });

        self.shutdown_tx = Some(shutdown_tx);
        self.token = Some(token);
        self.timeout_running = Some(timeout_running);
        self.server_info = Some(server_info.clone());

        Ok(server_info)
    }

    pub fn stop(&mut self) {
        if let Some(running) = self.timeout_running.take() {
            running.store(false, Ordering::Relaxed);
        }
        if let Some(shutdown_tx) = self.shutdown_tx.take() {
            let _ = shutdown_tx.send(());
        }
        self.server_info = None;
        self.token = None;
        let mut data = self.sync_status.lock().unwrap();
        data.status = "waiting".to_string();
        data.last_activity = Instant::now();
    }

    pub fn is_running(&self) -> bool {
        self.server_info.is_some()
    }

    pub fn get_server_info(&self) -> Option<&ServerInfo> {
        self.server_info.as_ref()
    }

    pub fn get_sync_status(&self) -> String {
        self.sync_status.lock().unwrap().status.clone()
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

pub async fn get_sync_status() -> String {
    let server = API_SERVER.lock().await;
    server.get_sync_status()
}
