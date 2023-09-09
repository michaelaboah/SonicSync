package middleware

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/michaelaboah/sonic-sync-cloud/crypt"
)

func JWTAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := crypt.TokenValid(ctx)
		if err != nil {
			log.Println(err)
			ctx.String(http.StatusUnauthorized, "Unauthorized")
			ctx.Abort()
			return
		}

		ctx.Next()
	}
}
