package db

import (
    "time"
    "fmt"
    "log"
    // import GORM-related packages
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
)

func InitDb() {
    // connect to the "accounting" database as
    // the "dest" user.
    const addr = "postgresql://dest@localhost:26257/accounting?sslmode=disable"
    db, err := gorm.Open("postgres", addr)
    if err != nil {
	log.Fatal(err)
    }
    fmt.Println(db);
    defer db.Close()

    // automatically create table based on model.
    db.AutoMigrate(&JournalAccount{}, &BalanceSheet{}, &IncomeStatement{}, &CashFlow{})
    fmt.Println("db auto migrate is done")
}

type JournalAccount struct {
    gorm.Model
    Name string // 名称
    Category string // 类别
    PaymentMethod string // 支付方式
    Amount float64 // 金额，区分正负
}

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
    Beginning time.Time // 期初时间
    Ending time.Time // 期末时间
    Salary float64 // 工资
    Interest float64 // 利息
    OtherIncome float64 // 其他收入
    Income float64 // 总收入
    Food float64 // 饭费
    House float64 // 住房
    Transport float64 // 交通
    Communication float64 // 通讯
    Entertainment float64 // 娱乐
    Clothing float64 // 衣服鞋帽
    Invest float64 // 投资
    CashGift float64 // 礼金
    Family float64 // 亲属
    Medical float64 // 医疗
    OtherExpense float64 // 其他费用
    Expense float64 // 总费用
    Profit float64 // 利润
}

// 现金流量表
type CashFlow struct {
    gorm.Model
    Beginning time.Time // 期初时间
    Ending time.Time // 期末时间
    CashInflow float64 // 现金流入
    CashOutflow float64 // 现金流出
    NetCashFlow float64 // 现金流量净额
    BeginningCashBalance float64 // 期初现金余额
    EndingCashBalance float64 // 期末现金余额
}
