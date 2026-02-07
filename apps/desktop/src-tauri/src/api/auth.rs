use std::sync::Arc;

use uuid::Uuid;

use warp::http::StatusCode;
use warp::{reject, Filter, Rejection};

pub fn generate_token() -> String {
    Uuid::new_v4().to_string()
}

#[derive(Debug)]
struct Unauthorized;

impl reject::Reject for Unauthorized {}

pub fn with_auth(token: Arc<String>) -> impl Filter<Extract = (), Error = Rejection> + Clone {
    warp::header::optional::<String>("authorization")
        .and_then(move |auth_header: Option<String>| {
            let expected = token.clone();
            async move {
                match auth_header {
                    Some(header) if header.starts_with("Bearer ") => {
                        let provided = &header[7..];
                        if provided == expected.as_str() {
                            Ok(())
                        } else {
                            Err(reject::custom(Unauthorized))
                        }
                    }
                    _ => Err(reject::custom(Unauthorized)),
                }
            }
        })
        .untuple_one()
}

pub async fn handle_rejection(err: Rejection) -> Result<impl warp::Reply, Rejection> {
    if err.find::<Unauthorized>().is_some() {
        Ok(warp::reply::with_status(
            warp::reply::json(&serde_json::json!({
                "error": "Unauthorized",
                "message": "Invalid or missing Bearer token"
            })),
            StatusCode::UNAUTHORIZED,
        ))
    } else {
        Err(err)
    }
}
