use warp::Filter;

use serde::{Deserialize, Serialize};
use serde_json::json;

use local_ip_address::local_ip;

use std::net::{SocketAddr, TcpListener};
use std::sync::Arc;
use std::sync::LazyLock;

use tokio::sync::{oneshot, Mutex};

pub struct ApiServer {
    shutdown_tx: Option<oneshot::Sender<()>>,
    server_info: Option<ServerInfo>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ServerInfo {
    pub ip: std::net::IpAddr,
    pub port: u16,
    pub url: String,
    pub endpoints: Vec<String>,
}

impl ApiServer {
    pub fn new() -> Self {
        Self {
            shutdown_tx: None,
            server_info: None,
        }
    }

    fn find_available_port(start_port: u16) -> Result<u16, Box<dyn std::error::Error>> {
        for port in start_port..start_port + 100 {
            if let Ok(_) = TcpListener::bind(format!("127.0.0.1:{}", port)) {
                return Ok(port);
            }
        }
        Err("No available ports found".into())
    }

    pub async fn start(&mut self) -> Result<ServerInfo, Box<dyn std::error::Error>> {
        let port = Self::find_available_port(3030)?;
        let local_ip = local_ip()?;
        let server_url = format!("http://{}:{}", local_ip, port);

        let endpoints = vec!["/ping".to_string(), "/connection".to_string()];

        let server_info = ServerInfo {
            ip: local_ip,
            port,
            url: server_url.clone(),
            endpoints: endpoints.clone(),
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

        let cors = warp::cors()
            .allow_any_origin()
            .allow_headers(vec!["content-type", "authorization"])
            .allow_methods(vec!["GET", "POST"]);

        let routes = ping.or(connection_info).with(cors).with(warp::log("api"));

        let (shutdown_tx, shutdown_rx) = oneshot::channel();
        self.shutdown_tx = Some(shutdown_tx);
        self.server_info = Some(server_info.clone());

        let server_addr: SocketAddr = ([0, 0, 0, 0], port).into();
        let (_addr, server) = warp::serve(routes).bind_with_graceful_shutdown(server_addr, async {
            shutdown_rx.await.ok();
        });

        tokio::spawn(server);

        Ok(server_info)
    }

    pub fn stop(&mut self) {
        if let Some(shutdown_tx) = self.shutdown_tx.take() {
            let _ = shutdown_tx.send(());
        }
        self.server_info = None;
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
                "server": {
                    "ip": info.ip,
                    "port": info.port,
                    "url": info.url,
                    "endpoints": info.endpoints
                },
                "timestamp": chrono::Utc::now().to_rfc3339()
            })
            .to_string()
        })
    }
}

static API_SERVER: LazyLock<Arc<Mutex<ApiServer>>> =
    LazyLock::new(|| Arc::new(Mutex::new(ApiServer::new())));

pub async fn start_api_server() -> Result<ServerInfo, Box<dyn std::error::Error>> {
    let mut server = API_SERVER.lock().await;
    server.start().await
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

pub mod commands;
