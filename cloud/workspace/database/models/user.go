package models

type User struct {
	ID           int    `db:"id"            json:"id"`
	Username     string `db:"username"      json:"username"`
	PasswordHash string `db:"password_hash" json:"password_hash"`
	Email        string `db:"email"         json:"email"`
	CreatedAt    string `db:"created_at"    json:"created_at"`
}
