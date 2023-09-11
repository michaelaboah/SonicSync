package crypt

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func GenerateToken(user_id uint) (string, error) {
	life := os.Getenv("TOKEN_HOUR_LIFESPAN")
	if life == "" {
		log.Println("Enviroment variable TOKEN_HOUR_LIFESPAN not provided. Defaulting to '2 hours'")
		life = "2"
	}

	token_lifespan, err := strconv.Atoi(life)
	if err != nil {
		return "", err
	}

	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["user_id"] = user_id
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(token_lifespan)).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secret := os.Getenv("API_SECRET")

	if len(secret) < 10 {
		log.Fatalln("Unsatisfactory API_SECRET provided. Must be greater than 10 characters")
	}

	return token.SignedString([]byte(secret))
}

func TokenValid(c *gin.Context) error {
	secret := os.Getenv("API_SECRET")
	if len(secret) < 10 {
		log.Fatalln("Unsatisfactory API_SECRET provided. Must be greater than 10 characters")
	}

	tokenString := ExtractToken(c)
	_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return err
	}
	return nil
}

func ExtractToken(c *gin.Context) string {
	token, err := c.Cookie("sonic-sync-token")
	if err != nil {
		log.Println(err)
	}

	if token != "" {
		return token
	}

	bearerToken := c.Request.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}

func ExtractTokenID(c *gin.Context) (uint, error) {
	secret := os.Getenv("API_SECRET")
	if len(secret) < 10 {
		log.Fatalln("Unsatisfactory API_SECRET provided. Must be greater than 10 characters")
	}

	tokenString := ExtractToken(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return 0, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		uid, err := strconv.ParseUint(fmt.Sprintf("%.0f", claims["user_id"]), 10, 32)
		if err != nil {
			return 0, err
		}
		return uint(uid), nil
	}
	return 0, nil
}
