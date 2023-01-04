#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::{error, fs, io, path::PathBuf};

use essentials::{
    communication::commands::{greet, open_project, save_as_file},
    menu::{menu_bar, menu_events},
};

use tauri::{self, api::path::data_dir};
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
            setup_database(app)?;

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

fn setup_database(app: &mut tauri::App) -> Result<(), Box<dyn error::Error>> {
    find_resource("resources/sqlite-internal.db", app);

    let db_path: Result<PathBuf, io::Error> = app
        .path_resolver()
        .resolve_resource("resources/sqlite-internal.db")
        .map(|path| match path.try_exists() {
            Ok(true) => Ok(path),
            Ok(false) => Ok(path),
            Err(path_err) => Err(path_err),
        })
        .unwrap();

    let data_dir = app
        .path_resolver()
        .app_data_dir()
        .map(|mut path| match path.try_exists() {
            Ok(false) => {
                path.push("sqlite-internal.db");
                println!("Full Path {}", path.to_str().unwrap());
                Ok(path)
            }
            Ok(true) => {
                path.push("sqlite-internal.db");
                println!("Full Path {}", path.to_str().unwrap());
                Ok(path)
            }
            Err(path_err) => Err(path_err),
        })
        .unwrap();
    fs::copy(db_path?, data_dir?).expect("Copy Error");
    Ok(())
}

fn find_resource(resource_path: &str, app: &mut tauri::App) -> Result<PathBuf, io::Error> {
    match app.path_resolver().resolve_resource(resource_path) {
        Some(path) => match path.try_exists() {
            Ok(true) => {
                println!("Path does exist: {}", path.to_str().unwrap());
                Ok(path)
            }
            Ok(false) => {
                println!("Path doesn't exist: {}", path.to_str().unwrap());
                Ok(path)
            }
            Err(path_err) => Err(path_err),
        },
        None => Err(io::Error::new(
            io::ErrorKind::NotFound,
            "Resource Not Found!: path = resources/sqlite-internal.db",
        )),
    }
}
