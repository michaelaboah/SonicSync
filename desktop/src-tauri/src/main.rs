// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use database::{database_insert, start_db};
use tauri_plugin_log::LogTarget;
mod database;
mod menus;

fn main() {
    let db = start_db();
    // database_insert()
    tauri::Builder::default()
        .manage(db)
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .invoke_handler(tauri::generate_handler![database_insert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
