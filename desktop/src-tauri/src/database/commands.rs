use polodb_core::{bson::doc, Collection, Database};
use tauri::command;

use super::models;

#[command]
pub fn database_insert(db: tauri::State<Database>, item: models::Item) {
    let inv = db.collection("items");
    let res = inv.insert_one(item).unwrap();
    dbg!(res);
    println!("Inserted into database")
}

#[command]
pub fn fuzzy_by_model(db: tauri::State<Database>, model: String) -> Vec<String> {
    let inv: Collection<models::Item> = db.collection("items");
    println!("{}", &model);

    let fuzzy_filter = doc! {
        "model": { "$regex": polodb_core::bson::Regex {
            pattern: format!("\\w*{}\\w*", &model),
            options: "i".into(),
        }}
    };
    let models = inv.find(doc! {"model": model }).unwrap();
    let mut results: Vec<String> = vec![];
    for m in models {
        if let Ok(m) = m {
            dbg!(&m);
            // let s = serde_json::from_value::<String>(model.to_owned());
            results.push(m.model);
        }
    }
    results
}

#[command]
pub fn find_by_model(db: tauri::State<Database>, model: String) -> Option<serde_json::Value> {
    let inv: Collection<serde_json::Value> = db.collection("items");
    let found_item = inv.find_one(doc! { "model": model }).unwrap();

    found_item
}

#[test]
fn test_fuzzy() {
    let db =
        Database::open_file("/home/michaelaboah/.local/share/com.sonic-sync.dev/primary-polo.db")
            .unwrap();

    let inv: Collection<models::Item> = db.collection("items");
    // println!("{}", &model);

    let models = inv
        .find(doc! {
            "model": { "$regex": polodb_core::bson::Regex {
                pattern: "\\w*q\\w*".into(),
                options: "i".into(),
            }}
        })
        .unwrap();

    for m in models {
        dbg!(m);
    }
}
