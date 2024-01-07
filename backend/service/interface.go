package service

import (
	"context"
)

type RegisterRequest struct {
	Username string
	Password string
}

type LoginRequest struct {
	Username string
	Password string
}

type IAuthService interface {
	Register(c context.Context, req RegisterRequest) (interface{}, error)
	Login(c context.Context, req LoginRequest) (interface{}, error)
}
