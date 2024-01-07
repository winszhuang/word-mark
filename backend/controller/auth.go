package controller

import (
	"github.com/gin-gonic/gin"
	"word-mark/service"
)

type AuthController struct {
	srv service.IAuthService
}

func NewAuthController(srv service.IAuthService) *AuthController {
	return &AuthController{srv: srv}
}

func (a *AuthController) Register(c *gin.Context) {
	// #TODO
}

func (a *AuthController) Login(c *gin.Context) {
	// #TODO
}
