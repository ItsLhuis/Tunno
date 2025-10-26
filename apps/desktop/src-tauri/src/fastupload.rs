use tauri::command;
use tauri::Manager;

use std::fs::{self, File};
use std::path::Path;
use zip::ZipArchive;
use chrono::Utc;

#[command]
pub async fn fast_upload_copy_bundle_to_cache(
    app: tauri::AppHandle,
    bundle_path: String,
) -> Result<String, String> {
    let timestamp = Utc::now().timestamp();

    let cache_base = app
        .path()
        .app_cache_dir()
        .map_err(|e| format!("Failed to get cache directory: {}", e))?;

    let cache_dir = cache_base.join("FastUpload").join(timestamp.to_string());

    fs::create_dir_all(&cache_dir)
        .map_err(|e| format!("Failed to create cache directory: {}", e))?;

    let bundle_source = Path::new(&bundle_path);
    if !bundle_source.exists() {
        return Err("Bundle file does not exist".to_string());
    }

    let bundle_dest = cache_dir.join("bundle.zip");
    fs::copy(bundle_source, &bundle_dest)
        .map_err(|e| format!("Failed to copy bundle to cache: {}", e))?;

    extract_bundle(&bundle_dest, &cache_dir)?;

    fs::remove_file(&bundle_dest)
        .map_err(|e| format!("Failed to remove bundle ZIP: {}", e))?;

    cache_dir
        .to_str()
        .ok_or_else(|| "Failed to convert path to string".to_string())
        .map(|s| s.to_string())
}

fn extract_bundle(zip_path: &Path, output_dir: &Path) -> Result<(), String> {
    let file = File::open(zip_path)
        .map_err(|e| format!("Failed to open bundle: {}", e))?;

    let mut archive = ZipArchive::new(file)
        .map_err(|e| format!("Bundle file is corrupted: {}", e))?;

    for i in 0..archive.len() {
        let mut file = archive
            .by_index(i)
            .map_err(|e| format!("Failed to read file from bundle: {}", e))?;

        let outpath = match file.enclosed_name() {
            Some(path) => output_dir.join(path),
            None => continue,
        };

        if file.name().ends_with('/') {
            fs::create_dir_all(&outpath)
                .map_err(|e| format!("Failed to create directory: {}", e))?;
        } else {
            if let Some(p) = outpath.parent() {
                if !p.exists() {
                    fs::create_dir_all(p)
                        .map_err(|e| format!("Failed to create parent directory: {}", e))?;
                }
            }
            let mut outfile = File::create(&outpath)
                .map_err(|e| format!("Failed to create output file: {}", e))?;
            std::io::copy(&mut file, &mut outfile)
                .map_err(|e| format!("Failed to write file: {}", e))?;
        }
    }

    Ok(())
}

#[command]
pub async fn fast_upload_extract_manifest(cache_path: String) -> Result<String, String> {
    let manifest_path = Path::new(&cache_path).join("manifest.json");

    if !manifest_path.exists() {
        return Err("Invalid bundle - missing manifest.json".to_string());
    }

    fs::read_to_string(&manifest_path)
        .map_err(|e| format!("Failed to read manifest: {}", e))
}

#[command]
pub async fn fast_upload_cleanup_cache_directory(cache_path: String) -> Result<(), String> {
    let path = Path::new(&cache_path);

    if !cache_path.contains("FastUpload") {
        return Err("Invalid cache path - security check failed".to_string());
    }

    if path.exists() {
        fs::remove_dir_all(path)
            .map_err(|e| format!("Failed to cleanup cache directory: {}", e))?;
    }

    Ok(())
}

#[command]
pub async fn fast_upload_check_cache_exists(cache_path: String) -> bool {
    let path = Path::new(&cache_path);
    path.exists()
}

#[command]
pub async fn fast_upload_cleanup_all_cache(app: tauri::AppHandle) -> Result<(), String> {
    let cache_base = app
        .path()
        .app_cache_dir()
        .map_err(|e| format!("Failed to get cache directory: {}", e))?;

    let fast_upload_dir = cache_base.join("FastUpload");

    if fast_upload_dir.exists() {
        fs::remove_dir_all(&fast_upload_dir)
            .map_err(|e| format!("Failed to cleanup FastUpload cache: {}", e))?;
    }

    Ok(())
}

