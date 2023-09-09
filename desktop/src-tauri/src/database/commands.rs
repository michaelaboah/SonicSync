use polodb_core::{bson::doc, Collection, Database, Error};
use serde_json::json;
use tauri::command;

use super::{
    models::{self},
    search_engine::fuzzy_search_many,
};

#[command]
pub fn database_insert(
    db: tauri::State<Database>,
    item: models::Item,
) -> Option<serde_json::Value> {
    let mut session = db.start_session().unwrap();
    session.start_transaction(None).unwrap();
    let inv = db.collection("items");

    let dup = inv
        .insert_one_with_session(item, &mut session)
        .is_err_and(|e| dbg!(matches!(e, Error::DuplicateKey(..))));

    if dup {
        println!("Duplicated Key Found");
        return Some(json!({"error": "duplicate"}));
    }

    session.commit_transaction().unwrap();
    None
}

#[command]
pub fn fuzzy_by_model(db: tauri::State<Database>, model: String) -> Vec<String> {
    let inv: Collection<models::Item> = db.collection("items");

    let models = inv.find(None).unwrap();
    let mut results: Vec<String> = vec![];
    for m in models {
        if let Ok(m) = m {
            results.push(m.model);
        }
    }

    let lookup: Vec<&str> = results.iter().map(|s| s.as_str()).collect();

    fuzzy_search_many(&model, &lookup, 0.1 / model.len() as f64)
        .iter()
        .map(|s| dbg!(s.to_string()))
        .collect()
}

#[command]
pub fn find_by_model(db: tauri::State<Database>, model: String) -> Option<serde_json::Value> {
    // let mut session = db.start_session().unwrap();

    let inv: Collection<serde_json::Value> = db.collection("items");
    let found_item = inv.find_one(doc! { "model": model }).unwrap();

    found_item
}

#[command]
pub fn update_by_model(
    db: tauri::State<Database>,
    model: String,
    item: models::Item,
) -> Option<serde_json::Value> {
    let mut session = db.start_session().unwrap();
    session.start_transaction(None).unwrap();
    let inv = db.collection("items");

    let deleted_result = inv
        .delete_one_with_session(doc! {"model": model}, &mut session)
        .unwrap();

    dbg!(deleted_result);

    let dup = inv
        .insert_one_with_session(item, &mut session)
        .is_err_and(|e| dbg!(matches!(e, Error::DuplicateKey(..))));

    if dup {
        println!("Duplicated Key Found");
        return Some(json!({"error": "duplicate"}));
    }

    session.commit_transaction().unwrap();

    None
}

#[command]
pub fn delete_all(db: tauri::State<Database>) {
    let mut session = db.start_session().unwrap();

    let inv: Collection<models::Item> = db.collection("items");
    let deleted_result = inv.delete_many_with_session(doc! {}, &mut session).unwrap();
    dbg!(deleted_result);
}

#[command]
pub fn delete_by_model(db: tauri::State<Database>, model: String) {
    let inv: Collection<models::Item> = db.collection("items");

    let deleted_result = inv.delete_one(doc! {"model": model}).unwrap();
    dbg!(deleted_result);
}

#[command]
pub fn get_all_items(db: tauri::State<Database>) -> Vec<models::Item> {
    let inv: Collection<models::Item> = db.collection("items");
    let all_items = inv.find(None).unwrap();

    let mut items = vec![];

    for i in all_items {
        items.push(i.unwrap());
    }

    // dbg!(&items);

    items
}

#[tokio::test]
async fn inside() {
    let mut db =
        Database::open_file("/home/michaelaboah/.local/share/com.sonic-sync.dev/primary-polo.db")
            .unwrap();

    super::runtime::setup_indicies(&mut db);

    let item = reqwest::get("http://localhost:8080/queries/find-model/QL5")
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    let item = serde_json::from_value::<models::Item>(item.get("data").unwrap().clone());

    let mut session = db.start_session().unwrap();
    session.start_transaction(None).unwrap();

    let collection = db.collection::<models::Item>("items");

    // Handle duplicate insertion
    let f = collection
        .insert_one_with_session(&item.unwrap(), &mut session)
        .is_err_and(|e| matches!(e, Error::DuplicateKey(..)));

    if f {
        let cursor = collection.find(None).unwrap();

        dbg!(cursor.count());

        return;
    }

    session.commit_transaction().unwrap();

    let cursor = collection.find(None).unwrap();

    dbg!(cursor.count());
}
