use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Item {
    pub id: String,
    pub created_at: String,
    pub updated_at: String,
    pub cost: u64,
    pub model: String,
    pub manufacturer: String,
    pub category: String,
    pub detail: Option<serde_json::Value>,
    pub notes: Option<String>,
    pub dimensions: Option<Dimension>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Dimension {
    length: f64,
    width: f64,
    height: f64,
}
