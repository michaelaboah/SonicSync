#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use menus::menu::menu_bar::generate_menu_bar;

use tauri::{api::shell, Manager};

mod menus;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let ctx = tauri::generate_context!();
    let menu = generate_menu_bar(&ctx.package_info().name);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "Learn More" => {
                let url = "https://github.com/probablykasper/tauri-template".to_string();
                shell::open(&event.window().shell_scope(), url, None).unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(ctx)
        .expect("error while running tauri application");
}
