package accounts

import (
	"../../database"
	"fmt"
	"github.com/gin-gonic/gin"
	"math"
	"strconv"
)

func AccountsRegister(router *gin.RouterGroup) {
	router.POST("/accounts", AccountsCreate)
	router.GET("/accounts", AccountsGet)
	router.DELETE("/accounts/:id", AccountDelete)
	router.PATCH("/accounts/:id", AccountUpdate)
}

func AccountsGet(context *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		context.JSON(500, gin.H{
			"message": "db error",
		})
	}
	defer db.Close()
	var accounts []database.JournalAccount
	db.Find(&accounts)
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
	context.JSON(200, gin.H{
		"accounts": accountStrs,
	})
}

func AccountsCreate(context *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		context.JSON(500, gin.H{
			"message": "db error",
		})
	}
	defer db.Close()
	var account database.JournalAccount
	context.Bind(&account)
	switch account.Category {
	case "Salary", "Interest", "OtherIncome":
		account.Value = math.Abs(account.Value)
	default:
		account.Value = -math.Abs(account.Value)
	}
	db.Create(&account)
	if !db.NewRecord(account) {
		context.JSON(200, gin.H{
			"status": "success",
		})
	} else {
		context.JSON(200, gin.H{
			"status": "fail",
		})
	}
}

func AccountDelete(context *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		context.JSON(500, gin.H{
			"message": "db error",
		})
	}
	defer db.Close()
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
	db.Delete(&account)
	context.JSON(200, gin.H{
		"status": "success",
	})
}

func AccountUpdate(context *gin.Context) {
	db, err := database.GetDB()
	if err != nil {
		context.JSON(500, gin.H{
			"message": "db error",
		})
	}
	defer db.Close()
	id, err := strconv.ParseUint(context.Param("id"), 10, 0)
	if err != nil {
		fmt.Printf("error: %v", err)
		context.JSON(400, gin.H{
			"status": "fail",
		})
		return
	}
	var account database.JournalAccount
	context.Bind(&account)
	account.ID = uint(id)
	switch account.Category {
	case "Salary", "Interest", "OtherIncome":
		account.Value = math.Abs(account.Value)
	default:
		account.Value = -math.Abs(account.Value)
	}
	db.Model(&account).Updates(&account)
	context.JSON(200, gin.H{
		"status": "success",
	})
}
