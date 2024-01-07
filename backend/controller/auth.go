package controller

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthController struct {
	db *gorm.DB
}

func NewAuthController(db *gorm.DB) *AuthController {
	return &AuthController{db: db}
}

func (a *AuthController) Register(c *gin.Context) {
	// #TODO
}

func (a *AuthController) Login(c *gin.Context) {
	// #TODO
}
