use crate::{database_setup::DatabasePool, sql::entities::creation_structs::*};
use serde_json::Value;
use sqlx;
use tauri::State;

#[tauri::command]
pub async fn find_similar_item(
    model: &str,
    db_state: State<'_, DatabasePool>,
) -> Result<Value, ()> {
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;

    let formatted = format!("%{model}%");
    let similar_items = sqlx::query_as!(
        CreateItem,
        "SELECT * from item WHERE model LIKE ?",
        formatted
    )
    .fetch_all(pool)
    .await
    .expect("Fetch error at find_one_item.");

    let mut items = vec![];
    for item in similar_items.iter() {
        items.push(item.query_to_item(pool).await);
    }
    let json_value = serde_json::to_value(items).unwrap_or_default();
    Ok(json_value)
}

#[tauri::command]
pub async fn find_all_items(db_state: State<'_, DatabasePool>) -> Result<Value, ()> {
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;
    let all_queries = sqlx::query_as!(CreateItem, "SELECT * FROM item;")
        .fetch_all(pool)
        .await
        .expect("Fetch error at find_all_items;");
    let mut all_items = vec![];
    for item in all_queries.iter() {
        let converted = item.query_to_item(pool).await;
        all_items.push(converted);
    }
    let json_value = serde_json::to_value(all_items).unwrap_or_default();
    Ok(json_value)
}

#[tauri::command]
pub async fn find_single_item(id: i64, db_state: State<'_, DatabasePool>) -> Result<Value, ()> {
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;
    let single_item = sqlx::query_as!(CreateItem, "SELECT * FROM item WHERE id = ?", id)
        .fetch_one(pool)
        .await
        .expect("msg");
    let converted_item = single_item.query_to_item(pool).await;
    let json_value = serde_json::to_value(converted_item).unwrap_or_default();
    //Export as serde_json::Value
    Ok(json_value)
}

#[tauri::command]
pub async fn fuzzy_find_single_item(
    model: &str,
    db_state: State<'_, DatabasePool>,
) -> Result<Value, ()> {
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;

    let formatted = format!("%{model}%");
    let single_item = sqlx::query_as!(
        CreateItem,
        "SELECT * FROM item WHERE model LIKE ?",
        formatted
    )
    .fetch_one(pool)
    .await
    .expect("Fetch error at fuzzy_find_one_item;");

    let converted_item = single_item.query_to_item(pool).await;
    let json_value = serde_json::to_value(converted_item).unwrap_or_default();
    //Export as serde_json::Value
    Ok(json_value)
}
