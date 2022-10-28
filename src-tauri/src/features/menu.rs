pub mod menu_bar {

    #[derive(Clone, serde::Serialize)]

    struct Payload {
        message: String,
    }
    use std::fs;
    use tauri::{api::dialog, CustomMenuItem, Manager, Menu, MenuEntry, MenuItem, Submenu};
    pub fn generate_menu_bar(app_name: &str) -> Menu {
        let save = CustomMenuItem::new("save", "Save File").accelerator("cmdOrControl+S");
        let save_as =
            CustomMenuItem::new("save_as", "Save As File").accelerator("cmdOrControl+shift+S");
        let open = CustomMenuItem::new("open", "Open File").accelerator("cmdOrControl+O");
        let new = CustomMenuItem::new("new", "New Project").accelerator("cmdOrControl+N");

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
                Menu::with_items([MenuItem::CloseWindow.into()])
                    .add_item(save)
                    .add_item(save_as)
                    .add_item(open)
                    .add_item(new),
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

    pub fn menu_event_handler(event: tauri::WindowMenuEvent) {
        match event.menu_item_id() {
            "save" => {
                event.window().emit(
                    "save",
                    Payload {
                        message: "hi".into(),
                    },
                );
            }
            "save_as" => dialog::FileDialogBuilder::new()
                .add_filter("Most Common", &["txt", "json", "dae"])
                .save_file(move |f| {
                    event.window().emit("save-as", "payload");
                    if let Some(ref file_path) = f {
                        if let Err(error) = fs::write(file_path, "data") {
                            dialog::MessageDialogBuilder::new(
                                "File Writing Error",
                                format!("File error at menu line: 79. Error: {:?}", error),
                            );
                        }
                    }
                    println!("Saved: {:?}", f);
                }),
            "open" => {}
            "new" => {}
            "Learn More" => {
                let _url = "to be implemented".to_string();
            }
            _ => {}
        }
    }
}
