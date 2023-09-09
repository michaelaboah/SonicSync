package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"

	"github.com/michaelaboah/sonic-sync-cloud/database"
	"github.com/michaelaboah/sonic-sync-cloud/internal"
	"github.com/michaelaboah/sonic-sync-cloud/middleware"
	"github.com/michaelaboah/sonic-sync-cloud/routes"
)

const (
	defaultPort = "8080"
)

func main() {
	internal.Setup()

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("PORT env not found using default: ", defaultPort)
		fmt.Println(port)
		port = defaultPort
	}

	mongoClient, err := database.MongoInstance()

	defer func() {
		if err = mongoClient.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	pgClient := database.PgInstance()

	r := gin.Default()

	r.Use(middleware.CORS())
	// r.Use(middleware.Db(mongoClient, pgClient))

	// Graphql Routes
	r.POST("/graphql", routes.Grapqhl(mongoClient))
	r.GET("/graphql-playground", routes.GraphqlPlayground())

	queries := r.Group("/queries")

	m := routes.NewMongoHandle(mongoClient)

	queries.GET("/fuzzy-find/:model-name", m.FuzzyFind)
	queries.GET("/find-model/:model-name", m.ModelFind)
	queries.GET("/all-models", m.AllModels)

	h := routes.NewAuthHandle(pgClient)

	// Authentication Routes
	r.POST("/register", h.Register)
	// r.POST("/reset-password", h.Register)
	r.POST("/login", h.Login)

	secured := r.Group("/secure")
	secured.Use(middleware.JWTAuth())

	secured.GET("/logout", routes.Logout)
	secured.GET("/refresh", routes.Refresh)

	fmt.Println("Server Running")
	log.Fatal(r.Run(":" + port))
}
