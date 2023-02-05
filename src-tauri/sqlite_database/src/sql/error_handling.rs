use std::ops::Not;

use sqlx::sqlite::SqliteQueryResult;

#[derive(Debug)]
pub enum SqliteErrorKind<'a> {
    ItemAlreadyExists,
    ConstraintViolation,
    NotFound,
    MissingDatabaseFile,
    Unknown(&'a str),
}

#[derive(Debug)]
pub enum SqlResult<'a> {
    QuerySuccess(SqliteQueryResult),
    AcceptableError(&'a str),
    UnacceptableError(&'a str),
}

impl Not for SqlResult<'_> {
    type Output = bool;

    fn not(self) -> Self::Output {
        match self {
            SqlResult::QuerySuccess(_) => true,
            SqlResult::AcceptableError(_) => true,
            SqlResult::UnacceptableError(_) => false,
        }
    }
}

#[derive(Debug)]
pub struct SqliteCustomError<'a> {
    pub code: u16,
    pub message: &'a str,
    pub error_kind: SqliteErrorKind<'a>,
}

impl std::convert::From<sqlx::Error> for SqliteCustomError<'_> {
    fn from(err: sqlx::Error) -> Self {
        let db_err = err.into_database_error().unwrap();
        let cow_str = db_err.code().unwrap();
        let code = cow_str.as_ref();
        match code {
            "1555" => SqliteCustomError {
                code: code.parse::<u16>().unwrap_or(1555),
                message: "This item already exists in the database.",
                error_kind: SqliteErrorKind::ItemAlreadyExists,
            },
            "14" => SqliteCustomError {
                code: 14,
                message: "Missing Database file at:",
                error_kind: SqliteErrorKind::MissingDatabaseFile,
            },
            "19" => SqliteCustomError {
                code: code.parse::<u16>().unwrap_or(19),
                message: "A constraint violation has occured.",
                error_kind: SqliteErrorKind::ConstraintViolation,
            },
            "1" => SqliteCustomError {
                code: code.parse::<u16>().unwrap_or(1),
                message: "This item was not found in the database.",
                error_kind: SqliteErrorKind::NotFound,
            },
            // other matches for other error codes
            _ => SqliteCustomError {
                code: code.parse::<u16>().unwrap(),
                message: "Unknown, should better implement the err code",
                error_kind: SqliteErrorKind::Unknown(""),
            },
        }
    }
}

impl<'a> SqliteCustomError<'a> {
    pub fn new(code: u16, message: &'a str, error_kind: SqliteErrorKind<'a>) -> Self {
        Self {
            code,
            message,
            error_kind,
        }
    }
}

pub fn sqlite_error_handler(
    query_result: Result<SqliteQueryResult, sqlx::Error>,
) -> Result<SqlResult<'static>, SqliteCustomError<'static>> {
    match query_result {
        Ok(res) => Ok(SqlResult::QuerySuccess(res)),
        Err(err) => match SqliteCustomError::from(err) {
            e if e.code == 1555 => Ok(SqlResult::AcceptableError(e.message)),
            e if e.code == 19 => Ok(SqlResult::UnacceptableError(e.message)),
            e if e.code == 1 => Ok(SqlResult::AcceptableError(e.message)),
            e => Err(e),
        },
    }
}
