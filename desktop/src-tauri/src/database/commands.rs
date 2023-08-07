use tauri::command;

#[command]
pub fn database_insert() {
    println!("Inserted into database")
}
