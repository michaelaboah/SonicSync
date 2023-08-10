package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/michaelaboah/sonic-sync-cloud/database"
	"github.com/michaelaboah/sonic-sync-cloud/handlers"
	"github.com/michaelaboah/sonic-sync-cloud/middleware"
)

const (
	defaultPort    = "8080"
	defaultLogPath = "./logs/log.log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("PORT env not found using default: ", defaultPort)
		fmt.Println(port)
		port = defaultPort
	}

	logFile, err := setupLogFile(defaultLogPath)
	if err != nil {
		log.Fatal(err)
	}

	log.SetOutput(logFile)
	log.SetFlags(log.LstdFlags | log.Lshortfile | log.Lmicroseconds)
	log.Println("[Server] Log file created")

	mongoClient, err := database.MongoInstance()

	defer func() {
		if err = mongoClient.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	pgClient := database.PgInstance()

	r := gin.Default()

	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.DbMiddleware(mongoClient, pgClient))

	r.POST("/graphql", handlers.GrapqhlHandler(mongoClient))

	r.GET("/graphql-playground", handlers.PlaygroundHandler())

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"Hello": "World",
		})
	})

	fmt.Println("Server Running")

	log.Fatal(r.Run(":" + port))
}

// create the required folder if necessary
func setupLogFile(path string) (*os.File, error) {
	logFile, err := os.OpenFile(path, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return logFile, err
}
