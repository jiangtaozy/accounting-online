package balances

import (
	"../../database"
	"github.com/gin-gonic/gin"
	"strconv"
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
			ID_str:       id_str,
		}
		balanceStrs = append(balanceStrs, balanceStr)
	}
	// get accounts
	var accounts []database.JournalAccount
	db.Find(&accounts)
	length := len(balanceStrs)
	balanceNow := balanceStrs[length-1]
	balanceNow.RetainedEarnings = balanceStrs[length-1].RetainedEarnings + balanceStrs[length-1].Earnings
	balanceNow.Earnings = 0
	for i := 0; i < len(accounts); i++ {
		account := accounts[i]
		switch account.PayMethod {
		case "Alipay":
			balanceNow.Alipay += account.Value
		case "Wechat":
			balanceNow.Wechat += account.Value
		case "Cmb":
			balanceNow.Cmb += account.Value
		case "Cash":
			balanceNow.Cash += account.Value
		}
		balanceNow.Earnings += account.Value
	}
	balanceNow.Funds = balanceNow.Alipay + balanceNow.Wechat + balanceNow.Cmb + balanceNow.Cash
	balanceNow.Assets = balanceNow.Funds + balanceNow.AccountsReceivable + balanceNow.PrepaidExpenses
	balanceNow.Liabilities = balanceNow.AccountsPayable
	balanceNow.OwnersEquity = balanceNow.OriginalInvestment + balanceNow.RetainedEarnings + balanceNow.Earnings
	balanceNow.Equities = balanceNow.Liabilities + balanceNow.OwnersEquity
	balanceStrs = append(balanceStrs, balanceNow)
	context.JSON(200, gin.H{
		"balances": balanceStrs,
	})
}
