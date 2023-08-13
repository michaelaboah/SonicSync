package internal

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var defaultLogPath = "./logs/log.log"

// Sets up the Logging and Enviroment variables
func Setup() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	logFile, err := setupLogFile(defaultLogPath)
	if err != nil {
		log.Fatal(err)
	}

	log.SetOutput(logFile)
	log.SetFlags(log.LstdFlags | log.Lshortfile | log.Lmicroseconds)
	log.Println("[Server] Log file created")
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
