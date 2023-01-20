#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use dotenvy;
use essentials::{
    communication::commands::{greet, open_project, save_as_file},
    menu::{menu_bar, menu_events},
};
use std::{env, path::PathBuf, sync::Mutex};
use tauri::{self, State};
use tauri_plugin_persisted_scope;
use tauri_plugin_store::PluginBuilder;
use tauri_plugin_window_state::Builder;
mod essentials;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

struct Note(Mutex<String>);

fn test_state(path: &str, note: State<Note>) -> String {
    let mut nt = note.0.lock().unwrap();
    let mut base = PathBuf::from(path);
    *nt = base.display().to_string();
    format!("")
}

fn main() {
    dotenvy::dotenv();
    let db_path: String = env::var("DATABASE_URL").unwrap();
    let ctx = tauri::generate_context!();
    let menu = menu_bar::generate_menu_bar(&ctx.package_info().name);
    sqlite_database::database_setup::sql_setup::initialize_db(&db_path)
        .expect("failed to initialize database");

    tauri::Builder::default()
        .setup(|app| Ok(()))
        .manage(Note(Default::default()))
        .plugin(PluginBuilder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(Builder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_events::menu_event_handler(event))
        .invoke_handler(tauri::generate_handler![greet, save_as_file, open_project])
        .run(ctx)
        .expect("error while running tauri application");
}
