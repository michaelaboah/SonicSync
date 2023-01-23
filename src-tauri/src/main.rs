#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use dotenvy;
use essentials::{
    communication::commands::*,
    menu::{menu_bar, menu_events},
};
// #[cfg(test)]
use log::{log, Level};
use sqlite_database::{queries::deletions::*, queries::insertions::*, queries::search::*};
use std::{env, fs, io, path};
use tauri::{self, Manager};
use tauri_plugin_log::{Builder as LogBuilder, LogTarget};
use tauri_plugin_persisted_scope;
use tauri_plugin_store::PluginBuilder;
use tauri_plugin_window_state::Builder;
mod essentials;

fn main() {
    let ctx = tauri::generate_context!();
    let menu = menu_bar::generate_menu_bar(&ctx.package_info().name);

    tauri::Builder::default()
        .setup(|app| {
            let app_db_path = find_resource("resources/sqlite-internal.db", app)?;
            let schema_path = find_resource("resources/internal-schema.sql", app)?;
            let pool = sqlite_database::database_setup::initialize_db(
                app_db_path.to_str().unwrap(),
                schema_path.to_str().unwrap(),
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
        // .plugin(
        //     LogBuilder::default()
        //         .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
        //         .build(),
        // )
        .plugin(PluginBuilder::default().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(Builder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_events::menu_event_handler(event))
        .run(ctx)
        .expect("error while running tauri application");
}
/// Inserts a path into the application data directory.
/// # Arguments
/// * `insert_path` - The path to insert into the application data directory.
/// * `app` - A mutable reference to the Tauri application object.
/// # Returns
/// * `Ok(path)` if the path was inserted successfully, where `path` is the modified `PathBuf`.
/// * `Err(err)` if there was an error inserting the path, where `err` is the error value.
/// # Examples
/// ```
/// let mut app = tauri::App::new();
/// let inserted_path = app_dir_insert("test_path", &mut app)
///     .expect("Error inserting path into application data directory");
/// assert_eq!(inserted_path.to_str().unwrap(), "application_data_dir/test_path");
/// ```
pub fn app_dir_insert(insert_path: &str, app: &mut tauri::App) -> Result<path::PathBuf, io::Error> {
    match app
        .path_resolver()
        .app_data_dir()
        .map(|path| match path.try_exists() {
            Ok(true) => {
                let appended_path = path.join(insert_path);
                println!("Full Path {}", appended_path.to_str().unwrap());
                Ok(appended_path)
            }
            Ok(false) => match fs::create_dir(&path) {
                Ok(()) => {
                    let appended_path = path.join(insert_path);
                    println!("Full Path {}", appended_path.to_str().unwrap());
                    Ok(appended_path)
                }
                Err(dir_err) => Err(dir_err),
            },

            Err(path_err) => Err(path_err),
        }) {
        Some(generated_path) => generated_path,
        None => Err(io::Error::new(
            io::ErrorKind::NotFound,
            format!("Insert Failed!: path = {insert_path}"),
        )),
    }
}

/// Finds the specified resource.
/// # Arguments
/// * `resource_path` - The path of the resource to find.
/// * `app` - A mutable reference to the Tauri application object.
/// # Returns
/// * `Ok(path)` if the resource was found, where `path` is the `PathBuf` of the resource.
/// * `Err(err)` if there was an error finding the resource, where `err` is the error value.
/// # Examples
/// ```
/// let mut app = tauri::App::new();
/// let resource_path = find_resource("resources/example.txt", &mut app)
///     .expect("Error finding resource");
/// assert_eq!(resource_path.to_str().unwrap(), "application_resources_dir/test_resource");
/// ```
pub fn find_resource(
    resource_path: &str,
    app: &mut tauri::App,
) -> Result<path::PathBuf, io::Error> {
    match app.path_resolver().resolve_resource(resource_path) {
        Some(path) => match path.try_exists() {
            Ok(_) => {
                println!("Path does exist: {}", path.to_str().unwrap());
                Ok(path)
            }
            Err(path_err) => Err(path_err),
        },
        None => {
            //try to download from server.
            Err(io::Error::new(
                io::ErrorKind::NotFound,
                format!("Resource Not Found!: path = {resource_path}"),
            ))
        }
    }
}
