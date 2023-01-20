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
        entities::{creation_structs::CreateItem, structs::Item},
        queries::insertions::insert_single_item,
    };
    use sqlx::*;
    use tokio;

    #[tokio::test]
    async fn test_item_insertion() {
        let ref test_db = gen_test_db().await;
        let mut mock_item = MockStructConvert::<Item>::new();
        mock_item
            .expect_to_query()
            .times(1)
            .returning(|| Item::default());
        let q = mock_item.to_query();
        let t = insert_single_item(&q, test_db).await.expect("msg");
        let thing = query_as!(CreateItem, "SELECT * FROM item WHERE id = 0;")
            .fetch_one(test_db)
            .await
            .expect("msg");
        println!("{:#?}", q);
        // assert!(&t);
        // assert_eq!(5, mock_item.foo(4));
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
