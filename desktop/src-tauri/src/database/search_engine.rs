/// Returns a decimal to be interpreted as a percentage
pub fn fuzzy_search(query: &str, original: &str) -> f64 {
    let mut positives = vec![];

    for c in query.to_lowercase().chars() {
        for s in original.to_lowercase().chars() {
            if s == c {
                positives.push(s == c);
            }
        }
    }

    positives.len() as f64 / query.len() as f64
}

/// Returns a list of strings that contain an accuracy above 0.0
/// And in order of highest to lowest
pub fn fuzzy_search_many<'a>(query: &'a str, models: &'a [&str], threshold: f64) -> Vec<&'a str> {
    let mut models: Vec<&str> = models
        .into_iter()
        .filter(|s| fuzzy_search(query, s) > threshold)
        .map(|s| *s)
        .collect();

    models.sort_by(|a, b| {
        let first = fuzzy_search(query, a);
        let sec = fuzzy_search(query, b);
        sec.partial_cmp(&first).unwrap()
    });

    models
}

#[test]
fn test_text_search() {
    let original = "QL5";

    let query = "Ql5";

    let accuracy = fuzzy_search(query, &original);

    assert!(accuracy > 0.0);
}

#[test]
fn test_many_models() {
    let models = vec!["Ql5", "X40-Ultra", "QL1"];
    let query = "Q";
    let found = fuzzy_search_many(query, &models, 0.0);

    assert_eq!(["Ql5", "QL1"], found.as_slice());
}
