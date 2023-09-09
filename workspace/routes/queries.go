package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	pkgDB "github.com/michaelaboah/sonic-sync-cloud/database"
)

type MongoHandle struct {
	db *mongo.Client
}

func NewMongoHandle(db *mongo.Client) *MongoHandle {
	return &MongoHandle{
		db: db,
	}
}

type QueryParams struct {
	ModelName string `uri:"model-name" binding:"required"`
}

// Use the `modelName` uri binding to search for the list of possible model names in the `items` mongodb collectioon
// Return a []string as json
func (m *MongoHandle) FuzzyFind(ctx *gin.Context) {
	var params QueryParams

	if err := ctx.ShouldBindUri(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	fuzzy := bson.D{
		{"$search", bson.D{
			{"index", "fuzzy_model"},
			{"text", bson.D{
				{"query", params.ModelName},
				{"path", "model"},
				{
					"fuzzy", bson.D{},
				},
			}},
		}},
	}

	itemsCollection := m.db.Database(pkgDB.EquipDB).Collection(pkgDB.ItemsCol)
	itemsCursor, err := itemsCollection.Aggregate(ctx, mongo.Pipeline{fuzzy})
	if err != nil {
		return
	}

	var results []string

	for itemsCursor.Next(ctx) {
		var doc bson.M

		itemsCursor.Decode(&doc)

		results = append(results, doc["model"].(string))
	}

	ctx.JSON(http.StatusOK, gin.H{"data": results})
}

// Find one item that matches the unqiue model name
func (m *MongoHandle) ModelFind(ctx *gin.Context) {
	var params QueryParams

	if err := ctx.ShouldBindUri(&params); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	itemsCollection := m.db.Database(pkgDB.EquipDB).Collection(pkgDB.ItemsCol)
	itemResult := itemsCollection.FindOne(ctx, bson.M{"model": params.ModelName})

	var doc bson.M

	itemResult.Decode(&doc)

	ctx.JSON(http.StatusOK, gin.H{"data": doc})
}

func (m *MongoHandle) AllModels(ctx *gin.Context) {
	itemsCollection := m.db.Database(pkgDB.EquipDB).Collection(pkgDB.ItemsCol)

	itemsCursor, _ := itemsCollection.Find(ctx, bson.M{})

	var doc bson.M
	var models []string

	for itemsCursor.Next(ctx) {

		itemsCursor.Decode(&doc)

		models = append(models, doc["model"].(string))

	}

	ctx.JSON(http.StatusOK, gin.H{"data": models})
}
