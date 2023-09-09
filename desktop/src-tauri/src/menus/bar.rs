use tauri::{CustomMenuItem, Menu, MenuEntry, MenuItem, Submenu};

pub fn generate_menu_bar() -> Menu {
    let save = CustomMenuItem::new("save", "Save File").accelerator("cmdOrControl+S");
    let save_as =
        CustomMenuItem::new("save_as", "Save As File").accelerator("cmdOrControl+shift+S");
    let open = CustomMenuItem::new("open", "Open File").accelerator("cmdOrControl+O");
    let load = CustomMenuItem::new("load_project", "Load Project");
    let new = CustomMenuItem::new("new", "New Project").accelerator("cmdOrControl+N");
    let open_preferences =
        CustomMenuItem::new("preferences", "Preferences").accelerator("cmdOrControl+,");
    let open_palette =
        CustomMenuItem::new("palette", "Open Command Palette").accelerator("cmdOrControl+L");
    let database_load_json = CustomMenuItem::new("db_json_load", "Import database items from file");
    let database_submenu = Submenu::new("Database", Menu::new().add_item(database_load_json));

    Menu::with_items([
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
            .add_submenu(database_submenu)
            .add_item(open_preferences),
        )),
        #[cfg(target_os = "macos")]
        MenuEntry::Submenu(Submenu::new(
            "File",
            Menu::with_items([MenuItem::CloseWindow.into()])
                .add_item(new)
                .add_item(save)
                .add_item(load)
                .add_item(save_as)
                .add_item(open),
        )),
        #[cfg(not(target_os = "macos"))]
        MenuEntry::Submenu(Submenu::new(
            "File",
            Menu::with_items([MenuItem::CloseWindow.into()])
                .add_item(new)
                .add_item(save)
                .add_item(save_as)
                .add_item(load)
                .add_item(open)
                .add_submenu(database_submenu)
                .add_item(open_preferences),
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
    ])
}
