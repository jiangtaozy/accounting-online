package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"log"
	// import GORM-related packages
	"./controller/accounts"
	"./controller/balances"
	"./database"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {

	// connect to the "accounting" database as the "dest" user.
	const addr = "postgresql://dest@localhost:26257/accounting?sslmode=disable"
	db, err := gorm.Open("postgres", addr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// init database
	database.InitDb(db)

	router := gin.Default()
	// allow all origin cors
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AddAllowMethods("PATCH", "DELETE")
	router.Use(cors.New(config))

	// serving static files
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))
	apiRouter := router.Group("/api")
	accounts.AccountsRegister(apiRouter)
	balances.BalancesRegister(apiRouter)

	router.Run(":1026")

}
