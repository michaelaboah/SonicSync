package handlers

import (
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"time"
	"unicode"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"

	"github.com/michaelaboah/sonic-sync-cloud/crypt"
	"github.com/michaelaboah/sonic-sync-cloud/database/models"
)

const TOKEN_NAME = "sonic-sync-token"

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
	InvalidEmailFormat errorKind = "Invalid Email Format"
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

	if !isEmailValid(input.Email) {
		ctx.JSON(http.StatusBadRequest, AuthError{Kind: InvalidEmailFormat})
		return
	}

	if input.Password == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Empty Password Field"})
	}

	seven, number, upper := verifyPassword(input.Password)

	if !seven {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": "Password must be greater than 7 characters"},
		)
		return
	} else if !number {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Password must contain one or more numbers"})
		return
	} else if !upper {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Password must contain one or more Uppercase characters"})
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
	if err != nil && strings.Contains(err.Error(), "duplicate") {
		ctx.JSON(http.StatusBadRequest, AuthError{Kind: UserExists})
		return
	} else if err != nil {

		fmt.Println(err)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successfully Registered"})
}

func Reset(ctx *gin.Context) {
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

	if !isEmailValid(input.Email) {
		ctx.JSON(http.StatusBadRequest, AuthError{Kind: InvalidEmailFormat})
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

	// ctx.SetCookie(TOKEN_NAME, token, int(time.Hour)*2, "/", "*", false, false)
	// Production Use
	ctx.SetCookie(TOKEN_NAME, token, int(time.Hour)*2, "/", "*.sonic-sync.com", true, true)
}

func Refresh(ctx *gin.Context) {
	// If we reach this point we know that our token is valid
	id, err := crypt.ExtractTokenID(ctx)
	if err != nil {
		panic(err)
	}

	newToken, err := crypt.GenerateToken(id)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	// ctx.SetCookie(TOKEN_NAME, newToken, int(time.Hour)*2, "/", "*", false, false)
	// Production Use
	ctx.SetCookie(
		"sonic-sync-token",
		newToken,
		int(time.Hour)*2,
		"/",
		"*.sonic-sync.com",
		true,
		true,
	)
}

func Logout(ctx *gin.Context) {
	ctx.SetCookie(TOKEN_NAME, "", 0, "/", "*.sonic-sync.com", true, true)
}

func isEmailValid(e string) bool {
	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	return emailRegex.MatchString(e)
}

func verifyPassword(s string) (sevenOrMore, number, upper bool) {
	letters := 0
	for _, c := range s {
		switch {
		case unicode.IsNumber(c):
			number = true
		case unicode.IsUpper(c):
			upper = true
			letters++
		// case unicode.IsPunct(c) || unicode.IsSymbol(c):
		//     special = true
		case unicode.IsLetter(c) || c == ' ':
			letters++
		default:
			// return false, false, false, false
		}
	}
	sevenOrMore = letters >= 7
	return
}
