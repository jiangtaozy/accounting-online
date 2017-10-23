package main

import (
	"./database"
	"fmt"
	//"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"log"
	//"strconv"
	// import GORM-related packages
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

	// serving static files
	// router.Use(static.Serve("/client", static.LocalFile("./client/build", true)))
	// router.Static("/client", "./client/build");
	// get journal account
	router.GET("/api/account", func(context *gin.Context) {
                // allow CORS
		context.Header("Access-Control-Allow-Origin", "*")
		var accounts []database.JournalAccount
		db.Find(&accounts)
		fmt.Printf("accounts: %v", accounts)
		context.JSON(200, gin.H{
			"status": "success",
			"data":   accounts,
		})
	})

        // allow CORS
	router.OPTIONS("/api/account", func(context *gin.Context) {
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Methods", "POST")
		context.Header("Access-Control-Allow-Headers", "Content-Type")
		context.JSON(200, gin.H{
			"status": "success",
		})
        })

	// record journal account
	router.POST("/api/account", func(context *gin.Context) {
                // allow CORS
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Methods", "POST")
		context.Header("Access-Control-Allow-Headers", "Content-Type")
		//Name := context.PostForm("Name")
		//name := context.PostForm("name")
		//fmt.Println("Name: " + Name)
		//fmt.Println("name: " + name)
		//Category := context.PostForm("Category")
		//Paymethod := context.PostForm("Paymethod")
		//Value, err := strconv.ParseFloat(context.PostForm("Value"), 64)
		//if err != nil {
		//	fmt.Println(err)
		//}
		//account := database.JournalAccount{
		//	Name:      Name,
		//	Category:  Category,
		//	PayMethod: Paymethod,
		//	Value:     Value,
		//}
		//type ValueStruct struct {
		//	Value string `form:"Value" json:"Value" binding:"required"`
		//}
		//var valueStruct ValueStruct
		//context.Bind(&valueStruct)
		//fmt.Printf("valueStruct: %v", valueStruct)
		var account database.JournalAccount
		context.Bind(&account)
		fmt.Printf("bind-account: %v", account)
		//Value, err := strconv.ParseFloat(valueStruct.Value, 64)
		//if err != nil {
		//	fmt.Println(err)
		//}
		//account.Value = Value
		//fmt.Printf("strconv-account: %v", account)
		db.Create(&account)
		fmt.Println(db.NewRecord(account))
		if !db.NewRecord(account) {
			context.JSON(200, gin.H{
				"status": "success",
			})
		} else {
			context.JSON(200, gin.H{
				"status": "fail",
			})
		}
	})

	router.Run(":1026")
}
