use tauri::{api::dialog, api::dialog::blocking, Manager};

pub fn menu_event_handler(event: tauri::WindowMenuEvent) {
    match event.menu_item_id() {
        "new" => new_project(event),
        "save" => unimplemented!(),
        "save_as" => save_project("save", event),
        // "open" => unimplemented!(), // create a new window
        "load_project" => load_project("load-project", event),
        "palette" => unimplemented!(),
        "preferences" => unimplemented!(),
        "Learn More" => {
            let _url = "to be implemented".to_string();
        }
        _ => unimplemented!(),
    }
}

fn new_project(event: tauri::WindowMenuEvent) {
    let handle = &event.window().app_handle();
    let num = &event.window().windows().len();

    tauri::WindowBuilder::new(
        handle,
        num.to_string(),
        tauri::WindowUrl::App("index.html".into()),
    )
    .title("New Windows")
    .build()
    .unwrap();
}

fn load_project(event_name: &str, event: tauri::WindowMenuEvent) {
    std::thread::spawn(move || {
        let path = blocking::FileDialogBuilder::new()
            .set_title("Load Project")
            .add_filter("Project File Extensions", &["syn"])
            .pick_file();

        if path.is_none() {
            return;
        }

        let path = path.unwrap();

        let file_string = std::fs::read_to_string(&path).expect("");

        if let Ok(value) = serde_json::from_str::<serde_json::Value>(&file_string) {
            event.window().emit("load-project", (&path, value)).unwrap();
        } else {
            dialog::MessageDialogBuilder::new(
                "Parsing Error",
                "Invalid file format. Must be valid JSON",
            )
            .kind(dialog::MessageDialogKind::Error)
            .show(|_| ());
        }
    });
}

fn save_project(event_name: &str, event: tauri::WindowMenuEvent) {
    std::thread::spawn(move || {
        let path = blocking::FileDialogBuilder::new()
            .set_title("Save Project")
            .set_file_name("Untitled-Project.syn")
            // .add_filter("Project File Extensions", &["syn"])
            .save_file();

        if path.is_none() {
            return;
        }

        event
            .window()
            .emit("save-project-fetch", path.unwrap())
            .unwrap();
    });
}

#[tauri::command]
pub fn save(path: &str, object: Option<serde_json::Value>) {
    if object.is_none() {
        panic!("Why are you saving empty data?")
    }

    let contents =
        serde_json::to_string(&object).expect("Invalid json causes problem in UI first, maybe");

    if std::fs::write(&path, contents).is_err() {
        dialog::MessageDialogBuilder::new(
            "File Saving Error",
            format!("Couldn't Save Project at: {}", path),
        )
        .kind(dialog::MessageDialogKind::Error)
        .show(|_| ());
    }
}
