package main

import (
    "github.com/gin-gonic/gin"
    "./db"
)

func main () {

    // init database
    db.InitDb()

    // home page
    router := gin.Default()
    router.GET("/", func(c *gin.Context) {
	c.JSON(200, gin.H{
	    "message": "hello",
	})
    })

    // record data
    router.POST("/", func(c *gin.Context) {
	item := c.PostForm("item")
	// todo
    }

    // listen and serve on 0.0.0.0:8080
    router.Run()
}
