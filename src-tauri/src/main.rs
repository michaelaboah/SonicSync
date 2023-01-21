#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use dotenvy;
use essentials::{
    communication::commands::{greet, open_project, save_as_file},
    menu::{menu_bar, menu_events},
};
use sqlite_database::{queries::deletions::*, queries::insertions::*, queries::search::*};
use std::env;
use tauri;
use tauri_plugin_persisted_scope;
use tauri_plugin_store::PluginBuilder;
use tauri_plugin_window_state::Builder;
mod essentials;

fn main() {
    dotenvy::dotenv().unwrap();
    let db_path: String = env::var("DATABASE_URL").unwrap();
    let ctx = tauri::generate_context!();
    let menu = menu_bar::generate_menu_bar(&ctx.package_info().name);
    let pool = sqlite_database::database_setup::initialize_db(&db_path)
        .expect("failed to initialize database");

    tauri::Builder::default()
        .manage(pool)
        .plugin(PluginBuilder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(Builder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_events::menu_event_handler(event))
        .invoke_handler(tauri::generate_handler![
            greet,
            save_as_file,
            open_project,
            find_single_item,
            find_all_items,
            fuzzy_find_single_item,
            find_similar_item,
            insert_single_item,
            delete_all_items,
            delete_single_item,
            fuzzy_delete_single_item,
        ])
        .run(ctx)
        .expect("error while running tauri application");
}
