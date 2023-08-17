package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"

	"github.com/michaelaboah/sonic-sync-cloud/database"
	"github.com/michaelaboah/sonic-sync-cloud/handlers"
	"github.com/michaelaboah/sonic-sync-cloud/internal"
	"github.com/michaelaboah/sonic-sync-cloud/middleware"
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
	r.Use(middleware.Db(mongoClient, pgClient))

	// Graphql Routes
	r.POST("/graphql", handlers.Grapqhl(mongoClient))
	r.GET("/graphql-playground", handlers.GraphqlPlayground())

	h := handlers.NewAuthHandle(pgClient)

	// Authentication Routes
	r.POST("/register", h.Register)
	// r.POST("/reset-password", h.Register)
	r.POST("/login", h.Login)

	secured := r.Group("/secure")
	secured.Use(middleware.JWTAuth())

	secured.GET("/logout", handlers.Logout)
	secured.GET("/refresh", handlers.Refresh)

	fmt.Println("Server Running")
	log.Fatal(r.Run(":" + port))
}
