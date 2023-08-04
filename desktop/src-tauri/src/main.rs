// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use database::start_db;
use tauri_plugin_log::LogTarget;
mod database;

fn main() {
    // let handler = start_db();

    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
