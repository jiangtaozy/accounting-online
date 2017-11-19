package balances

import (
  "fmt"
  "strconv"
  "github.com/gin-gonic/gin"
  "../../database"
)

func BalancesRegister(router *gin.RouterGroup) {
  router.POST("/balances", BalanceCreate)
  router.GET("/balances", BalanceGet)
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

func BalanceGet(context *gin.Context) {
  db, err := database.GetDB()
  if err != nil {
    context.JSON(500, gin.H{
      "message": "db error",
    })
  }
  defer db.Close()
  var balances []database.BalanceSheet
  db.Find(&balances)
  type BalanceSheetStr struct {
    ID_str string
    database.BalanceSheet
  }
  var balanceStrs []BalanceSheetStr
  for i := 0; i < len(balances); i++ {
    id_str := strconv.FormatUint(uint64(balances[i].ID), 10)
    balanceStr := BalanceSheetStr{
      BalanceSheet: balances[i],
      ID_str: id_str,
    }
    balanceStrs = append(balanceStrs, balanceStr)
  }
  context.JSON(200, gin.H{
    "balances": balanceStrs,
  })
}

