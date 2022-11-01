#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use essentials::communication::commands::{greet, open_project, save_as_file};
use essentials::menu::menu_bar::{generate_menu_bar, menu_event_handler};
use tauri;
use tauri_plugin_store::PluginBuilder;
mod essentials;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    let ctx = tauri::generate_context!();
    let menu = generate_menu_bar(&ctx.package_info().name);

    tauri::Builder::default()
        .plugin(PluginBuilder::default().build())
        .menu(menu)
        .on_menu_event(|event| menu_event_handler(event))
        .invoke_handler(tauri::generate_handler![greet, save_as_file, open_project])
        .run(ctx)
        .expect("error while running tauri application");
}
