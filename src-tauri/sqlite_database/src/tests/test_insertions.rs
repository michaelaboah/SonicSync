#[cfg(test)]
use mockall::{automock, mock, predicate::*};

#[cfg_attr(test, automock)]
trait SqlConvert<T> {
    fn convert_query(&self) -> T;
}

#[cfg_attr(test, automock)]
pub trait StructConvert<T> {
    fn to_query(&self) -> T;
}

#[cfg(test)]
mod insertion_mocking {
    use super::*;
    use crate::{
        entities::{creation_structs::CreateItem, enums::*, structs::Item},
        error_handling::SqlResult,
        queries::insertions::insert_single_item,
    };
    use sqlx::{sqlite::SqliteQueryResult, *};
    use tokio;

    use crate::error_handling::SqliteCustomError;
    use sqlx::Pool;
    use sqlx::Sqlite;

    #[tokio::test]
    /// - check if insertion is Ok
    /// - check if query and insertion are equal
    /// - async traits are only in nightly build
    async fn test_simple_item_insertion() {
        let ref test_db = gen_test_db().await;
        let res = insert_single_item(serde_json::to_value(Item::default()), test_db).await;
        assert!(&res.is_ok());
    }

    async fn gen_test_db() -> Pool<Sqlite> {
        dotenvy::dotenv();
        let schema = std::fs::read_to_string(std::env::var("SCHEMA_PATH").unwrap()).unwrap();
        let test_db_pool = sqlite::SqlitePoolOptions::new()
            .max_connections(5)
            .connect(":memory:")
            .await
            .expect("Err at gen_test_db");
        sqlx::query(&schema).execute(&test_db_pool).await;
        test_db_pool
    }
}
#[test]
fn test_path() {
    dotenvy::dotenv();
    let path = std::env::var("SCHEMA_PATH").unwrap();
    println!("{}", &path);
    let schema = std::fs::read_to_string(&path).unwrap();
    println!("{schema}");
}
