use crate::database_setup::DatabasePool;
use crate::error_handling::*;
use crate::sql::entities::{creation_structs::*, enums::*, structs::*};
use sqlx::{Pool, Sqlite};
use tauri::{self, State};

#[tauri::command]
pub async fn delete_all_items(db_state: State<'_, DatabasePool>) -> Result<(), bool> {
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;
    sqlx::query!("DELETE FROM item;").execute(pool).await;
    Ok(())
}

#[tauri::command]
pub async fn delete_single_item(id: i64, db_state: State<'_, DatabasePool>) -> Result<(), bool> {
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;
    sqlx::query!("DELETE FROM item WHERE id = ?", id)
        .execute(pool)
        .await;
    Ok(())
}

#[tauri::command]
pub async fn fuzzy_delete_single_item(
    model: &str,
    db_state: State<'_, DatabasePool>,
) -> Result<(), bool> {
    let mutex_lock = db_state.0.lock().await;
    let ref pool = *mutex_lock;

    let formatted = format!("%{model}%");
    sqlx::query!("DELETE FROM item WHERE model LIKE ?", formatted)
        .execute(pool)
        .await;
    Ok(())
}
