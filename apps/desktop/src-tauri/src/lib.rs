use tauri::{
    menu::{Menu, MenuItem},
    plugin::TauriPlugin,
    tray::{MouseButton, MouseButtonState, TrayIcon, TrayIconBuilder, TrayIconEvent},
    Manager, WebviewWindow, WindowEvent,
};

use tauri_plugin_window_state::StateFlags;

mod api;
mod fastupload;
mod utils;

use api::commands::*;
use fastupload::*;
use utils::*;

#[cfg(debug_assertions)]
fn prevent_default() -> TauriPlugin<tauri::Wry> {
    use tauri_plugin_prevent_default::Flags;
    tauri_plugin_prevent_default::Builder::new()
        .with_flags(Flags::all().difference(Flags::DEV_TOOLS | Flags::RELOAD))
        .build()
}

#[cfg(not(debug_assertions))]
fn prevent_default() -> TauriPlugin<tauri::Wry> {
    tauri_plugin_prevent_default::Builder::new().build()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(prevent_default())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_window_state::Builder::default()
                .with_state_flags(
                    StateFlags::all().difference(StateFlags::VISIBLE | StateFlags::DECORATIONS),
                )
                .build(),
        )
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(main_window) = app.get_webview_window("main") {
                let _ = main_window.show();
                let _ = main_window.set_focus();
            }
        }))
        .invoke_handler(tauri::generate_handler![
            start_server,
            stop_server,
            is_server_running,
            get_server_info,
            get_qr_data,
            get_audio_duration,
            fast_upload_copy_bundle_to_cache,
            fast_upload_extract_manifest,
            fast_upload_cleanup_cache_directory,
            fast_upload_check_cache_exists,
            fast_upload_cleanup_all_cache
        ])
        .setup(|app| {
            #[cfg(desktop)]
            {
                let main_window: WebviewWindow = app.get_webview_window("main").unwrap();

                let quit_item = MenuItem::with_id(app, "quit", "&Quit", true, None::<&str>)?;

                let menu = Menu::with_items(app, &[&quit_item])?;

                TrayIconBuilder::new()
                    .icon(app.default_window_icon().unwrap().clone())
                    .tooltip(main_window.title().unwrap_or_else(|_| "Tunno".to_string()))
                    .menu(&menu)
                    .show_menu_on_left_click(false)
                    .on_tray_icon_event(|tray_handle: &TrayIcon, event| match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } => {
                            let app = tray_handle.app_handle();
                            if let Some(window) = app.get_webview_window("main") {
                                if !window.is_focused().unwrap_or(false) {
                                    let _ = window.unminimize();
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                }
                            }
                        }
                        _ => {}
                    })
                    .on_menu_event(|app, event| match event.id.as_ref() {
                        "quit" => {
                            for (_, win) in app.webview_windows() {
                                let _ = win.close();
                            }
                        }
                        _ => {
                            println!("menu item {:?} not handled", event.id);
                        }
                    })
                    .build(app)?;

                Ok(())
            }
        })
        .on_window_event(|window, event| match event {
            WindowEvent::CloseRequested { .. } => {
                let app = window.app_handle();
                for (_, win) in app.webview_windows() {
                    let _ = win.close();
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
