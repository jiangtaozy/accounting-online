package balances

import (
  "fmt"
  "github.com/gin-gonic/gin"
  "../../database"
)

func BalancesRegister(router *gin.RouterGroup) {
  router.POST("/balances", BalanceCreate)
}

func BalanceCreate(context *gin.Context) {
  db, err := database.GetDB()
  if err != nil {
    context.JSON(500, gin.H{
      "message": "db error",
    })
  }
  defer db.Close()
  var balance database.BalanceSheet
  context.Bind(&balance)
  fmt.Printf("bind-balance: %v\n", balance)
  db.Create(&balance)
  if !db.NewRecord(balance) {
    context.JSON(200, gin.H{
      "message": "success",
    })
  } else {
    context.JSON(500, gin.H{
      "message": "fail",
    })
  }
}

