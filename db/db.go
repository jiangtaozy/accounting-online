package db

import (
    "fmt"
    "log"
    // import GORM-related packages
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
)

// 资产负债表
type BalanceSheet struct {
    gorm.Model
    Alipay float64 // 支付宝
    Wechat float64 // 微信
    Cmb float64 // 招行
    Cash float64 // 现金
    Funds float64 // 资金合计
    AccountsReceivable float64 // 应收账款
    PrepaidExpenses float64 // 待摊费用
    Assets float64 // 总资产

    AccountsPayable float64 // 应付票据
    Liabilities float64 // 负债合计
    OriginalInvestment float64 // 初始投资
    RetainedEarnings float64 // 留存收益
    Earnings float64 // 本期收益
    OwnersEquity float64 // 所有者权益合计
    Equities float64 // 负债及所有者权益合计
}

// 利润表
type IncomeStatement struct {
    gorm.Model
    Item string // 项目名称
    Category string // 类别
    Income float64 // 收入
    Expenses float64 // 费用
    Profit float64 // 利润
    PaymentMethod string // 支付方式
}

// 现金流量表
type CashFlow struct {
    gorm.Model
    Item string // 项目名称
    Category string // 类别
    CashInflow float64 // 现金流入
    CashOutflow float64 // 现金流出
    NetCashFlow float64 // 现金净额
    CashBalance float64 // 现金余额
}

func InitDb() {
    // connect to the "accounting" database as
    // the "dest" user.
    const addr = "postgresql://dest@localhost:26257/accounting?sslmode=disable"
    db, err := gorm.Open("postgres", addr)
    if err != nil {
	log.Fatal(err)
    }
    defer db.Close()

    // automatically create table based on model.
    db.AutoMigrate(&BalanceSheet{}, &IncomeStatement{}, &CashFlow{})
}
