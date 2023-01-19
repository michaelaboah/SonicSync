use sqlx::{Connection, SqliteConnection};

pub mod sql_setup {

    use crate::sql::entities::structs::Item;
    use sqlx::sqlite::SqlitePoolOptions;
    use std::fs;
    #[tokio::main]
    //Should change path from &str to Path or PathBuf

    pub async fn initialize_db(path: &str) -> Result<(), Box<dyn std::error::Error>> {
        let pool = SqlitePoolOptions::new()
            .max_connections(5)
            .connect(path)
            .await?;

        //Ideally
        // let schema = fs::read_to_string(
        //     "src-tauri/sqlite_database/src/schema_resources/internal-schema.sql",
        // )
        // .unwrap();

        // sqlx::query(&schema).execute(&pool).await;

        sqlx::query!("Select * from item;");
        // let raw_string =
        //     fs::read_to_string("src/test-multiple-items.json").expect("error with string reading");

        // let items: Vec<Item> = serde_json::from_str(&raw_string).expect("Error with json parse");

        // println!("{:#?}", items);
        // let insert_res = insert_multiple_items(items, &pool).await;
        // println!("{:#?}", insert_res);
        Ok(())
    }
}

// #[ignore = "async tests are not allowed"]
#[test]
/// ```compile
///     use sqlx;
///     sqlx::query!("Select * from item;")
/// ```
fn check_query_macro() {}
