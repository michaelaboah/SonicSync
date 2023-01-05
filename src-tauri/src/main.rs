#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use essentials::{
    communication::commands::{greet, open_project, save_as_file},
    menu::{menu_bar, menu_events},
};
use sql::database_setup::sql_setup::{self};

use tauri::{self};
use tauri_plugin_persisted_scope;
use tauri_plugin_store::PluginBuilder;
use tauri_plugin_window_state::Builder;
mod essentials;
mod sql;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    let ctx = tauri::generate_context!();
    let menu = menu_bar::generate_menu_bar(&ctx.package_info().name);

    tauri::Builder::default()
        .setup(|app| {
            match sql_setup::setup_database(app) {
                Ok(()) => {
                    // initialize_db()?;
                    ()
                }
                Err(_) => (),
            }
            Ok(())
        })
        .plugin(PluginBuilder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(Builder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_events::menu_event_handler(event))
        .invoke_handler(tauri::generate_handler![greet, save_as_file, open_project])
        .run(ctx)
        .expect("error while running tauri application");
}
