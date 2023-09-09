// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use database::{database_insert, find_by_model, fuzzy_by_model, start_db};
use tauri::Manager;
use tauri_plugin_log::LogTarget;
mod database;
mod menus;

fn main() {
    let ctx = tauri::generate_context!();

    let menu = menus::bar::generate_menu_bar();

    tauri::Builder::default()
        .setup(move |app| {
            let app_data_dir = app.path_resolver().app_local_data_dir().expect(
                "A 'Local App Data Directory' was not found on your system. Cannot run program",
            );

            let db = start_db(&app_data_dir);
            app.manage(db);
            Ok(())
        })
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .menu(menu)
        .on_menu_event(menus::events::menu_event_handler)
        .invoke_handler(tauri::generate_handler![
            database_insert,
            fuzzy_by_model,
            find_by_model,
            database::get_all_items,
            database::delete_all,
            database::delete_by_model,
            database::update_by_model,
            menus::events::save
        ])
        .run(ctx)
        .expect("error while running tauri application");
}
