package middleware

import (
	"context"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"go.mongodb.org/mongo-driver/mongo"
)

func Db(mongoClient *mongo.Client, pgClient *sqlx.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), "mongoClient", mongoClient)
		ctx = context.WithValue(ctx, "pgClient", pgClient)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
