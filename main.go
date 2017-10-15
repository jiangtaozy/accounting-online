package main

import (
    "fmt"
    "log"
    "strconv"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/static"
    "./database"
    // import GORM-related packages
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
)

func main () {

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

    // serving static files
    router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

    // get journal account
    router.GET("/api/account", func(context *gin.Context) {
        var accounts []database.JournalAccount
        db.Find(&accounts)
	context.JSON(200, gin.H{
	    "status": "success",
	    "data": accounts,
	})
    })

    // record journal account
    router.POST("/api/account", func(context *gin.Context) {
	name := context.PostForm("name")
	category := context.PostForm("category")
	paymethod := context.PostForm("paymethod")
	value, err := strconv.ParseFloat(context.PostForm("value"), 64)
        if(err != nil) {
            fmt.Println(err)
        }
        account := database.JournalAccount {
            Name: name,
            Category: category,
            PayMethod: paymethod,
            Value: value,
        }
        db.Create(&account)
        //fmt.Println(db.NewRecord(account))
        if(!db.NewRecord(account)) {
	    context.JSON(200, gin.H{
	        "status": "success",
	    })
        } else {
	    context.JSON(200, gin.H{
	        "status": "fail",
	    })
        }
    })

    router.Run(":1025")
}
