use std;

#[cfg(test)]
mod sqlite_db_tests {
    use sqlite_database::database_setup::init_db;
    use sqlite_database::error_handling::{SqliteCustomError, SqliteErrorKind};
    use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
    #[test]
    fn test_find_db() {
        let resource_path = "tests/testing_resources/test.db";
        let find_db = std::path::Path::new(resource_path).exists();
        assert!(find_db);
    }

    //inprogress
    #[tokio::test]
    async fn test_recover_wrong_db() {
        let resource_path = "tests/testing_resources/test.db";
        let db_path = "tests/testing_resources/wrong.db";
        let built_pool = init_db(db_path, resource_path).await;
        assert!(built_pool.is_ok());
    }

    #[tokio::test]
    async fn test_bad_path() {
        let resource_path = "tests/testing_resources/test.db";
        let db_path = "test/testing_resources/wrong.db";
        //                     ^^^This is incorrect
        let built_pool = init_db(db_path, resource_path).await;
        assert!(built_pool.is_err());
        let match_kind = matches!(
            built_pool.expect_err("expected").error_kind,
            SqliteErrorKind::MissingDatabaseFile
        );
        assert!(match_kind);
    }

    #[tokio::test]
    async fn test_equal_err_kind() {
        let db_path = "tests/testing_resources/wrong.db";

        let _ = SqlitePoolOptions::new()
            .max_connections(1)
            .connect(db_path)
            .await
            .map_err(|e| {
                let does_match = matches!(
                    SqliteCustomError::from(e).error_kind,
                    SqliteErrorKind::MissingDatabaseFile
                );
                assert!(does_match);
            });
    }

    #[tokio::test]
    async fn test_missing_err() {
        let db_path = "tests/testing_resources/wrong.db";

        let _ = SqlitePoolOptions::new()
            .max_connections(1)
            .connect(db_path)
            .await
            .map_err(|e| {
                let does_match = matches!(
                    SqliteCustomError::from(e).error_kind,
                    SqliteErrorKind::MissingDatabaseFile
                );
                assert!(does_match);
            });
    }
}

#[cfg(test)]
mod s3_resource_tests {
    use reqwest::Error;
    use serde::Deserialize;
    use tokio::io::AsyncWriteExt;

    #[derive(Deserialize)]
    struct S3Resource {
        resource_data: Vec<u8>,
    }

    async fn fetch_resource() -> Result<S3Resource, Error> {
        let resource =
            reqwest::get("https://im31veb0e3.execute-api.us-east-1.amazonaws.com/testRust")
                .await
                .unwrap()
                .json::<S3Resource>()
                .await;
        resource
    }

    /// As of 1/30/23 the test.db byte size should be 98304
    #[tokio::test]
    async fn test_fetch_resource() {
        let response = fetch_resource().await;
        assert!(response.is_ok());
        let local_db = tokio::fs::read("tests/testing_resources/test.db")
            .await
            .unwrap();
        let remote_db = &response.unwrap().resource_data;

        assert!(local_db.len() <= remote_db.len())
    }

    #[tokio::test]
    async fn test_write_resource() {
        const new_db_path: &str = "tests/testing_resources/downloaded.db";
        let response = fetch_resource().await;

        assert!(response.is_ok());

        let local_db = tokio::fs::read("tests/testing_resources/test.db")
            .await
            .unwrap();

        let mut new_file = tokio::fs::File::create(new_db_path).await.unwrap();

        new_file
            .write_all(&response.unwrap().resource_data)
            .await
            .unwrap();

        let new_db = tokio::fs::read(new_db_path).await.unwrap();

        assert_eq!(local_db, new_db);

        tokio::fs::remove_file(new_db_path).await.unwrap();
    }
}

// enum TestError<'a> {
//     SqlError(SqliteCustomError<'a>),
//     IOError(Err),
// }
