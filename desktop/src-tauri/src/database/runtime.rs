use polodb_core::{bson::doc, Collection, Database};
use std::{thread, time};

const DATABASE_FILE_NAME: &'static str = "database/primary-polo.db";

/// Starts Database
///
/// If db file doesn't exist in normal location, create one
///     else
/// open database and return
pub fn start_db(app_data_dir: &std::path::PathBuf) -> Database {
    if !app_data_dir.is_dir() {
        // Tell the user that the resolved app directory isn't a directory
        println!("Resolved App data directory isn't a directory. Aborting program in 60 seconds");
        thread::sleep(time::Duration::from_secs(60));
        panic!()
    }

    let path = app_data_dir.join(DATABASE_FILE_NAME);

    dbg!("{:?}", path.as_os_str());

    if !path.exists() {
        println!("Generated new database");
    }

    let mut db = Database::open_file(path).unwrap();
    setup_indicies(&mut db);

    db
}

pub fn setup_indicies(db: &mut Database) {
    let items_inv: Collection<serde_json::Value> = db.collection("items");

    items_inv
        .create_index(polodb_core::IndexModel {
            keys: doc! {
                "model": 1
            },
            options: Some(polodb_core::IndexOptions {
                unique: Some(true),
                ..Default::default()
            }),
        })
        .unwrap();

    dbg!(items_inv.name());
}
