package service

import (
	"context"
	"errors"
	"fmt"
	"gorm.io/gorm"
	"word-mark/model"
	"word-mark/utils"
)

type AuthService struct {
	db *gorm.DB
}

func NewAuthService(db *gorm.DB) *AuthService {
	return &AuthService{db: db}
}

func (a *AuthService) Register(c context.Context, req RegisterRequest) error {
	// 0. 確認帳密是否都有填值
	if req.Username == "" || req.Password == "" {
		return errors.New("帳號或密碼為空")
	}

	// 1. 確認帳號是否重複, 有回傳錯誤
	var user model.User
	if err := a.db.Table("users").Where("user_name = ?", req.Username).Find(&user).Error; err != nil {
		return fmt.Errorf("帳號已存在: %v", err)
	}

	// 2. 密碼加密
	hashPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return fmt.Errorf("密碼加密失敗: %v\n", err)
	}

	// 3. 新增至db
	if err = a.db.Table("users").Create(&model.User{
		Username: req.Username,
		Password: hashPassword,
	}).Error; err != nil {
		return fmt.Errorf("新增帳號失敗: %v\n", err)
	}

	// 4. 回傳
	return nil
}

func (a *AuthService) Login(c context.Context, req LoginRequest) (interface{}, error) {
	return nil, errors.New("implement me")
}
