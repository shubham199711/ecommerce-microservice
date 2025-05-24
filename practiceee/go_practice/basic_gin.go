package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	g := gin.Default()

	g.GET("/users", func(c *gin.Context) {
		c.JSON(200, gin.H{"msg": "Hello world!"})
	})

	g.Run(":8080")
}
