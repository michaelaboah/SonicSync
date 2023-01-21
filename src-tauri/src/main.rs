#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use dotenvy;
use essentials::{
    communication::commands::{greet, open_project, save_as_file},
    menu::{menu_bar, menu_events},
};
// #[cfg(test)]
use sqlite_database::{queries::deletions::*, queries::insertions::*, queries::search::*};
use std::env;
use tauri;
use tauri_plugin_persisted_scope;
use tauri_plugin_store::PluginBuilder;
use tauri_plugin_window_state::Builder;
use tokio::runtime;
mod essentials;

fn main() {
    // dotenvy::dotenv().unwrap();
    // let db_path: String = env::var("DATABASE_URL").unwrap();
    let ctx = tauri::generate_context!();
    let menu = menu_bar::generate_menu_bar(&ctx.package_info().name);

    // let mut rt = runtime::Runtime::new().unwrap();
    // rt.
    // let thing = rt.block_on(async move {
    //     println!("Hello from async block");
    //     let db_thread = tokio::spawn(async {
    //         let pool = sqlite_database::database_setup::initialize_db("sqlite:/Users/michaelaboah/Documents/Programming/SoundTools/Deadalus-Tauri/src-tauri/resources/sqlite-internal.db").await.unwrap();
    //         pool
    //     });
    //     db_thread
    // });

    let db_thread = std::thread::spawn(|| {
        let pool = sqlite_database::database_setup::initialize_db("sqlite:/Users/michaelaboah/Documents/Programming/SoundTools/Deadalus-Tauri/src-tauri/resources/sqlite-internal.db").unwrap();
    });

    tauri::Builder::default()
        // .manage(pool)
        .plugin(PluginBuilder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(Builder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_events::menu_event_handler(event))
        .invoke_handler(tauri::generate_handler![
            greet,
            save_as_file,
            open_project,
            // find_single_item,
            // find_all_items,
            // fuzzy_find_single_item,
            // find_similar_item,
            // insert_single_item,
            // delete_all_items,
            // delete_single_item,
            // fuzzy_delete_single_item,
        ])
        .run(ctx)
        .expect("error while running tauri application");
}
