package routes

import (
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/michaelaboah/sonic-sync-cloud/graph"
)

func Grapqhl(mongoClient *mongo.Client) gin.HandlerFunc {
	c := graph.Config{Resolvers: &graph.Resolver{DB: mongoClient}}
	c.Directives.OneOf = Directive

	h := handler.NewDefaultServer(graph.NewExecutableSchema(c))

	return func(ctx *gin.Context) {
		h.ServeHTTP(ctx.Writer, ctx.Request)
	}
}

func GraphqlPlayground() gin.HandlerFunc {
	h := playground.Handler("GraphQL playground", "/graphql")

	return func(ctx *gin.Context) {
		h.ServeHTTP(ctx.Writer, ctx.Request)
	}
}

var (
	ErrNoOptionSelected       = errors.New("one option must be selected")
	ErrTooManyOptionsSelected = errors.New("maximum one option can be selected")
	ErrNotValidField          = errors.New("Not a valid input field")
)

func Directive(
	ctx context.Context,
	obj interface{},
	next graphql.Resolver,
) (res interface{}, err error) {
	val, err := next(ctx)
	if err != nil {
		panic(err)
	}

	v := obj.(map[string]interface{})
	// fmt.Println(v)
	c := len(v)
	if c == 0 {
		return nil, ErrNoOptionSelected
	} else if c > 1 {
		return nil, ErrTooManyOptionsSelected
	}

	return val, nil
}
