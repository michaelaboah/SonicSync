package database

import (
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func PgInstance() *sqlx.DB {
	pgURL := os.Getenv("PG_DB_URL")

	if len(pgURL) == 0 {
		fmt.Println("PG_DB_URL not specified in .env file")
		log.Fatalln("PG_DB_URL not specified in .env file")
	}

	db, err := sqlx.Connect("postgres", pgURL)
	if err != nil {
		fmt.Println("[PgDB] Error reading schema file: ", err)
		log.Fatalln("[PgDB] Error reading schema file: ", err)
	}

	schemaBytes, err := os.ReadFile("./database/resources/pg_schema.sql")
	if err != nil {
		fmt.Println("[PgDB] Error reading schema file: ", err)
		log.Fatalln("[PgDB] Error reading schema file: ", err)
	}

	pgMigrate(pgURL)

	res := db.MustExec(string(schemaBytes))

	log.Println(res)

	return db
}

func pgMigrate(uri string) {
	m, err := migrate.New("file://database/migrations/", uri)
	if err != nil {
		fmt.Println(err)
	}

	m.Steps(2)
}
