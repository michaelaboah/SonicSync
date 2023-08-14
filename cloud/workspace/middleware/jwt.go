package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/michaelaboah/sonic-sync-cloud/crypt"
)

func JWTAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := crypt.TokenValid(ctx)
		if err != nil {
			ctx.String(http.StatusUnauthorized, "Unauthorized")
			ctx.Abort()
			return
		}

		ctx.Next()
	}
}
