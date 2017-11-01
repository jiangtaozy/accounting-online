package main

import (
	"./database"
	"fmt"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"log"
	"strconv"
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
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))
	//router.Static("/client", "./client/build")
	// get journal account
	router.GET("/api/accounts", func(context *gin.Context) {
		// allow CORS
		context.Header("Access-Control-Allow-Origin", "*")
		var accounts []database.JournalAccount
		db.Find(&accounts)
		fmt.Printf("accounts: %v\n", accounts)
		type JournalAccountStr struct {
			ID_str string
			database.JournalAccount
		}
		var accountStrs []JournalAccountStr
		for i := 0; i < len(accounts); i++ {
			id_str := strconv.FormatUint(uint64(accounts[i].ID), 10)
			accountStr := JournalAccountStr{
				JournalAccount: accounts[i],
				ID_str:         id_str,
			}
			accountStrs = append(accountStrs, accountStr)
		}
		fmt.Printf("accountStrs: %v\n", accountStrs)
		context.JSON(200, gin.H{
			"accounts": accountStrs,
		})
	})

	// allow CORS
	router.OPTIONS("/api/accounts", func(context *gin.Context) {
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Methods", "POST")
		context.Header("Access-Control-Allow-Headers", "Content-Type")
		context.JSON(200, gin.H{
			"status": "success",
		})
	})

	// allow CORS
	router.OPTIONS("/api/accounts/:id", func(context *gin.Context) {
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Methods", "DELETE")
		context.Header("Access-Control-Allow-Headers", "Content-Type")
		context.JSON(200, gin.H{
			"status": "success",
		})
	})

	// record journal account
	router.POST("/api/accounts", func(context *gin.Context) {
		// allow CORS
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Methods", "POST")
		context.Header("Access-Control-Allow-Headers", "Content-Type")
		var account database.JournalAccount
		context.Bind(&account)
		//fmt.Printf("bind-account: %v", account)
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

	// delete account
	router.DELETE("/api/accounts/:id", func(context *gin.Context) {
		// allow CORS
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Methods", "DELETE")
		context.Header("Access-Control-Allow-Headers", "Content-Type")
		id, err := strconv.ParseUint(context.Param("id"), 10, 0)
		if err != nil {
			fmt.Printf("error: %v", err)
			context.JSON(400, gin.H{
				"status": "fail",
			})
			return
		}
		var account database.JournalAccount
		account.ID = uint(id)
		fmt.Printf("new record: %t \n", db.NewRecord(account))
		db.Delete(&account)
		context.JSON(200, gin.H{
			"status": "success",
		})
	})

	router.Run(":1026")

}
