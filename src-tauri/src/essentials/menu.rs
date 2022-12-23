pub mod menu_bar {

    #[derive(Clone, serde::Serialize)]
    struct Payload {
        message: String,
    }

    use tauri::{CustomMenuItem, Menu, MenuEntry, MenuItem, Submenu};
    pub fn generate_menu_bar(app_name: &str) -> Menu {
        let save = CustomMenuItem::new("save", "Save File").accelerator("cmdOrControl+S");
        let save_as =
            CustomMenuItem::new("save_as", "Save As File").accelerator("cmdOrControl+shift+S");
        let open = CustomMenuItem::new("open", "Open File").accelerator("cmdOrControl+O");
        let new = CustomMenuItem::new("new", "New Project").accelerator("cmdOrControl+N");
        let open_preferences =
            CustomMenuItem::new("preferences", "Preferences").accelerator("cmdOrControl+,");
        let open_palette =
            CustomMenuItem::new("palette", "Open Command Palette").accelerator("cmdOrControl+P");

        let menu = Menu::with_items([
            #[cfg(target_os = "macos")]
            MenuEntry::Submenu(Submenu::new(
                app_name,
                Menu::with_items([
                    MenuItem::Separator.into(),
                    MenuItem::Services.into(),
                    MenuItem::Separator.into(),
                    MenuItem::Hide.into(),
                    MenuItem::HideOthers.into(),
                    MenuItem::ShowAll.into(),
                    MenuItem::Separator.into(),
                    MenuItem::Quit.into(),
                ])
                .add_item(open_preferences),
            )),
            #[cfg(not(target_os = "macos"))] // AKA windows || linux
            MenuEntry::Submenu(Submenu::new(
                "File",
                Menu::with_items([MenuItem::CloseWindow.into()])
                    .add_item(new)
                    .add_item(save)
                    .add_item(save_as)
                    .add_item(open)
                    .add_item(open_preferences),
            )),
            MenuEntry::Submenu(Submenu::new(
                "File",
                Menu::with_items([MenuItem::CloseWindow.into()])
                    .add_item(new)
                    .add_item(save)
                    .add_item(save_as)
                    .add_item(open),
            )),
            MenuEntry::Submenu(Submenu::new(
                "Edit",
                Menu::with_items([
                    MenuItem::Undo.into(),
                    MenuItem::Redo.into(),
                    MenuItem::Separator.into(),
                    MenuItem::Cut.into(),
                    MenuItem::Copy.into(),
                    MenuItem::Paste.into(),
                    #[cfg(not(target_os = "macos"))]
                    MenuItem::Separator.into(),
                    MenuItem::SelectAll.into(),
                ]),
            )),
            MenuEntry::Submenu(Submenu::new(
                "View",
                Menu::with_items([MenuItem::EnterFullScreen.into()]).add_item(open_palette),
            )),
            MenuEntry::Submenu(Submenu::new(
                "Window",
                Menu::with_items([MenuItem::Minimize.into(), MenuItem::Zoom.into()]),
            )),
            MenuEntry::Submenu(Submenu::new(
                "Help",
                Menu::with_items([CustomMenuItem::new("Learn More", "Learn More").into()]),
            )),
        ]);
        menu
    }
}

pub mod menu_events {
    use crate::essentials::communication;
    pub fn menu_event_handler(event: tauri::WindowMenuEvent) {
        match event.menu_item_id() {
            "save" => communication::events::menu_emit("save", event),
            "save_as" => communication::events::menu_emit("save-as", event),
            "open" => communication::events::menu_emit("open-project-file", event),
            "new" => tauri::api::dialog::MessageDialogBuilder::new(
                "File Open Error",
                format!("File Error: Problem with provided path, .\n Error message: "),
            )
            .kind(tauri::api::dialog::MessageDialogKind::Error)
            .show(|_| ()),
            "palette" => communication::events::menu_emit("toggle-palette", event),
            "preferences" => communication::events::menu_emit("open-preferences", event),
            "Learn More" => {
                let _url = "to be implemented".to_string();
            }
            _ => {}
        }
    }
}
