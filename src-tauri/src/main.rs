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
        // .setup(|app| {
        //     setup_database(app)?;
        //     Ok(())
        // })
        .plugin(PluginBuilder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(Builder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_events::menu_event_handler(event))
        .invoke_handler(tauri::generate_handler![greet, save_as_file, open_project])
        .run(ctx)
        .expect("error while running tauri application");
}
//
// 1) Does the user's database exist?
//     true => do nothing, exit function
//     false => copy from resource.
// 2) Find SQL db in resource
//     true => get pathbuf of db {find_resource()}
//     false => unimplemented!()
// 3) Copy db resource into App Data dir
// fn setup_database(app: &mut tauri::App) -> Result<(), Box<dyn error::Error>> {
//     let data_dir = app
//         .path_resolver()
//         .app_data_dir()
//         .map(|mut path| match path.try_exists() {
//             Ok(false) => {
//                 path.push("sqlite-internal.db");
//                 println!("Full Path {}", path.to_str().unwrap());
//                 Ok(path)
//             }
//             Ok(true) => {
//                 path.push("sqlite-internal.db");
//                 println!("Full Path {}", path.to_str().unwrap());
//                 Ok(path)
//             }
//             Err(path_err) => Err(path_err),
//         })
//         .unwrap();
//     let db_exists = std::path::Path::new(&data_dir?).exists();
//     println!("DB Found?: {db_exists}");
//     // fs::copy(db_path?, data_dir?).expect("Copy Error");
//     Ok(())
// }

// fn find_resource(resource_path: &str, app: &mut tauri::App) -> Result<PathBuf, io::Error> {
//     match app.path_resolver().resolve_resource(resource_path) {
//         Some(path) => match path.try_exists() {
//             Ok(true) => {
//                 println!("Path does exist: {}", path.to_str().unwrap());
//                 Ok(path)
//             }
//             Ok(false) => {
//                 //Potentially download the database from the server.
//                 unimplemented!("Database resource does not exist");
//             }
//             Err(path_err) => Err(path_err),
//         },
//         None => Err(io::Error::new(
//             io::ErrorKind::NotFound,
//             format!("Resource Not Found!: path = {resource_path}"),
//         )),
//     }
// }
