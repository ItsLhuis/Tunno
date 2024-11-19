use tauri::{
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};

use tauri_plugin_positioner::{Position, WindowExt};

use window_vibrancy::apply_mica;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_prevent_default::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            #[cfg(desktop)]
            {
                let main_window = app.get_webview_window("main").unwrap();
                let tray_window = app.get_webview_window("tray").unwrap();

                #[cfg(target_os = "windows")]
                apply_mica(&main_window, None)
                    .expect("Unsupported platform! 'apply_mica' is only supported on Windows");
                apply_mica(&tray_window, None)
                    .expect("Unsupported platform! 'apply_mica' is only supported on Windows");

                app.handle().plugin(tauri_plugin_positioner::init())?;

                TrayIconBuilder::new()
                    .icon(app.default_window_icon().unwrap().clone())
                    .menu_on_left_click(false)
                    .on_tray_icon_event(|tray_handle: &tauri::tray::TrayIcon, event| {
                        tauri_plugin_positioner::on_tray_event(tray_handle.app_handle(), &event);
                        match event {
                            TrayIconEvent::Click {
                                button: MouseButton::Left,
                                button_state: MouseButtonState::Up,
                                ..
                            } => {
                                let app = tray_handle.app_handle();
                                if let Some(window) = app.get_webview_window("main") {
                                    if !window.is_focused().unwrap_or(false) {
                                        let _ = window.show();
                                        let _ = window.set_focus();
                                    }
                                }
                            }
                            TrayIconEvent::Click {
                                button: MouseButton::Right,
                                button_state: MouseButtonState::Up,
                                ..
                            } => {
                                let app = tray_handle.app_handle();
                                if let Some(window) = app.get_webview_window("tray") {
                                    let _ =
                                        window.as_ref().window().move_window(Position::TrayCenter);
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                }
                            }
                            _ => {}
                        }
                    })
                    .build(app)?;
            }
            Ok(())
        })
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::CloseRequested { .. } => {
                let app = window.app_handle();
                for (_, win) in app.webview_windows() {
                    let _ = win.close();
                }
            }
            tauri::WindowEvent::Focused(false) => {
                if let Some(tray_window) = window.app_handle().get_webview_window("tray") {
                    let _ = tray_window.hide();
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
