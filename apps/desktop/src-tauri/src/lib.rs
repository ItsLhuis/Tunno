use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};

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
                let overlay_window = app.get_webview_window("overlay").unwrap();

                #[cfg(target_os = "windows")]
                apply_mica(&main_window, None)
                    .expect("Unsupported platform! 'apply_mica' is only supported on Windows");
                apply_mica(&overlay_window, None)
                    .expect("Unsupported platform! 'apply_mica' is only supported on Windows");

                let quit_item = MenuItem::with_id(app, "quit", "&Quit", true, None::<&str>)?;

                let menu = Menu::with_items(app, &[&quit_item])?;

                TrayIconBuilder::new()
                    .icon(app.default_window_icon().unwrap().clone())
                    .tooltip(main_window.title().unwrap_or_else(|_| "Wave".to_string()))
                    .menu(&menu)
                    .menu_on_left_click(false)
                    .on_tray_icon_event(|tray_handle: &tauri::tray::TrayIcon, event| match event {
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
                        _ => {}
                    })
                    .on_menu_event(|app, event| match event.id.as_ref() {
                        "minimize" => {
                            if let Some(window) = app.get_webview_window("main") {
                                if window.is_visible().unwrap_or(false) {
                                    let _ = window.hide();
                                } else {
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                }
                            }
                        }
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
            tauri::WindowEvent::CloseRequested { .. } => {
                let app = window.app_handle();
                for (_, win) in app.webview_windows() {
                    let _ = win.close();
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
