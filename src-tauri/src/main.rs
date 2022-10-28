#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use features::communication::commands::{greet, save_as_file};
use features::menu::menu_bar::{generate_menu_bar, menu_event_handler};
use serde;
use tauri::{self, Manager};
mod features;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn main() {
    let ctx = tauri::generate_context!();
    let menu = generate_menu_bar(&ctx.package_info().name);

    tauri::Builder::default()
        .setup(|app| {
            let id = app.listen_global("click", |event| {
                println!("got event-name with payload {:?}", event.payload());
            });
            // unlisten to the event using the `id` returned on the `listen_global` function
            // an `once_global` API is also exposed on the `App` struct
            app.unlisten(id);

            // emit the `event-name` event to all webview windows on the frontend
            app.emit_all("event-name", "test").unwrap();

            Ok(())
        })
        .menu(menu)
        .on_menu_event(|event| menu_event_handler(event))
        .invoke_handler(tauri::generate_handler![greet, save_as_file])
        .run(ctx)
        .expect("error while running tauri application");
}
