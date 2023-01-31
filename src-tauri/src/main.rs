#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::path::PathBuf;

use essentials::{
    communication::commands::*,
    menu::{menu_bar, menu_events},
    resolver_utils::*,
};

// use log::{log, Level};
use sqlite_database::{queries::deletions::*, queries::insertions::*, queries::search::*};
use tauri::{self, Manager};
// use tauri_plugin_log::LogTarget;
use tauri_plugin_persisted_scope;
use tauri_plugin_store::PluginBuilder;
use tauri_plugin_window_state::Builder;
mod essentials;

fn main() {
    // dotenvy::from_filename(".env").unwrap();
    let ctx = tauri::generate_context!();
    let menu = menu_bar::generate_menu_bar(&ctx.package_info().name);
    tauri::Builder::default()
        .setup(|app| {
            app_dir_insert("sqlite-internal.db", app)?;
            let db_resource_path = find_resource("resources/sqlite-internal.db", app)?;
            let db_prod_path = find_prod_resource("sqlite-internal.db", app)?;
            let schema_path = find_resource("resources/internal-schema.sql", app)?;
            let pool = sqlite_database::database_setup::initialize_db(
                db_prod_path,
                db_resource_path,
                schema_path,
            )?;
            app.manage(pool);
            Ok(())
        })
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
        .plugin(PluginBuilder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(Builder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_events::menu_event_handler(event))
        .run(ctx)
        .expect("error while running tauri application");
}

#[test]
fn test_env() {
    dotenvy::from_filename(".env").unwrap();
    let env = std::env::var("TEST").unwrap();
    println!("{env}");
}
