package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"

	"github.com/michaelaboah/sonic-sync-cloud/crypt"
	"github.com/michaelaboah/sonic-sync-cloud/database/models"
)

type AuthHandle struct {
	db *sqlx.DB
}

func NewAuthHandle(db *sqlx.DB) *AuthHandle {
	return &AuthHandle{
		db: db,
	}
}

type RegisterInput struct {
	Email    string `json:"email"    binding:"required"`
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type errorKind string

const (
	MalJson            errorKind = "Malformatted JSON"
	UserExists         errorKind = "Username Already Exists"
	InvalidCredentials errorKind = "Invalid Credentials"
)

type AuthError struct {
	Kind    errorKind `json:"kind"    binding:"required"`
	Details string    `json:"details"`
}

func (h *AuthHandle) Register(ctx *gin.Context) {
	var input RegisterInput

	if err := ctx.ShouldBindJSON(&input); err != nil {

		ctx.JSON(http.StatusBadRequest, AuthError{Kind: MalJson})

		return
	}

	hash, err := crypt.GenerateHash(input.Email + input.Password)

	_, err = h.db.NamedExec(
		"INSERT INTO users (username, password_hash, email, created_at) VALUES (:username, :password_hash, :email, :created_at)",
		&models.User{
			Username:     input.Username,
			PasswordHash: hash,
			Email:        input.Email,
			CreatedAt:    time.Now(),
		},
	)

	if strings.Contains(err.Error(), "duplicate") {

		ctx.JSON(http.StatusBadRequest, AuthError{Kind: UserExists})

		return
	} else if err != nil {

		fmt.Println(err)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successfully Registered"})
}

type LoginInput struct {
	Email    string `json:"email"    binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *AuthHandle) Login(ctx *gin.Context) {
	var input LoginInput
	var user models.User

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, AuthError{Kind: MalJson})
		return
	}

	h.db.Get(
		&user.PasswordHash,
		"SELECT users.password_hash FROM users WHERE users.email=$1",
		input.Email,
	)

	match, err := crypt.CompareHash(input.Email+input.Password, user.PasswordHash)
	if err != nil {
		fmt.Println(err)
	}

	if !match {
		ctx.JSON(http.StatusBadRequest, AuthError{Kind: InvalidCredentials})
		return
	}

	token, err := crypt.GenerateToken(uint(user.ID))
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	// ctx.JSON(http.StatusOK, gin.H{"token": token})
	ctx.SetCookie("sonic-sync-token", token, int(time.Hour)*2, "/login", "*", false, false)
	// Production Use
	// ctx.SetCookie("sonic-sync-token", token, int(time.Hour) * 2, path string, "*.sonic-sync.com", true, true)
}
