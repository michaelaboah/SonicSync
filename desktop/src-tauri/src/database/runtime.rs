use polodb_core::{bson::doc, Collection, Database};
use std::{
    fs,
    path::{self, PathBuf},
    thread, time,
};

const DATABASE_FILE_NAME: &'static str = "primary-polo.db";

/// Starts Database
///
/// If db file doesn't exist in normal location, create one
///     else
/// open database and return
pub fn start_db(app_data_dir: &std::path::PathBuf) -> Database {
    if !app_data_dir.is_dir() {
        // Tell the user that the resolved app directory isn't a directory
        dbg!(app_data_dir);
        println!("Resolved App data directory isn't a directory. Aborting program in 60 seconds");
        thread::sleep(time::Duration::from_secs(60));
        panic!()
    }

    let path = app_data_dir.join(DATABASE_FILE_NAME);

    println!("{:?}", path.as_os_str());

    if !path.exists() {
        println!("Generated new database");
        return Database::open_file(path).unwrap();
    }

    let db = Database::open_file(path).unwrap();
    // let db = Database::open_memory().unwrap();

    db
}

fn setup_indicies(db: Database) -> Database {
    let items_inv: Collection<serde_json::Value> = db.collection("items");
    items_inv
        .create_index(polodb_core::IndexModel {
            keys: doc! {
                "model": 1
            },
            options: Some(polodb_core::IndexOptions {
                name: None,
                unique: Some(true),
            }),
        })
        .unwrap();
    // items_inv
    //     .create_index(polodb_core::IndexModel {
    //         keys: doc! {
    //             "_id": 1
    //         },
    //         options: Some(polodb_core::IndexOptions {
    //             name: None,
    //             unique: Some(true),
    //         }),
    //     })
    //     .unwrap();

    db
}
