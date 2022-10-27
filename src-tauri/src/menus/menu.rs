pub mod menu_bar {
    use tauri::{AboutMetadata, CustomMenuItem, Menu, MenuEntry, MenuItem, Submenu};

    pub fn generate_menu_bar(app_name: &str) -> Menu {
        let quit = CustomMenuItem::new("quit".to_string(), "Quit");
        let close = CustomMenuItem::new("close".to_string(), "Close");
        let sub_menu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
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
                ]),
            )),
            MenuEntry::Submenu(Submenu::new(
                "File",
                Menu::with_items([MenuItem::CloseWindow.into()]),
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
                Menu::with_items([MenuItem::EnterFullScreen.into()]),
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
