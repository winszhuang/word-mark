package service

import (
	"context"
	"errors"
	"gorm.io/gorm"
)

type AuthService struct {
	db *gorm.DB
}

func NewAuthService(db *gorm.DB) *AuthService {
	return &AuthService{db: db}
}

func (a *AuthService) Register(c context.Context, req RegisterRequest) (interface{}, error) {
	return nil, errors.New("implement me")
}

func (a *AuthService) Login(c context.Context, req LoginRequest) (interface{}, error) {
	return nil, errors.New("implement me")
}
