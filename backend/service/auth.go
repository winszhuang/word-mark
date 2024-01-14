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

type LoginResponse struct {
	Token string `json:"token"`
}

func (a *AuthService) Login(c context.Context, req LoginRequest) (LoginResponse, error) {
	// 較驗username或者password是否為空
	if req.Username == "" || req.Password == "" {
		return LoginResponse{}, errors.New("帳號或密碼不得為空")
	}

	// 判斷username是否已取過
	var user model.User
	if err := a.db.Table("users").Where("user_name = ?", req.Username).Find(&user).Error; err != nil {
		return LoginResponse{}, fmt.Errorf("帳號不存在: %v", err)
	}

	// db取user, 判斷密碼是否正確
	if err := utils.CheckPasswordHash(user.Password, req.Password); err != nil {
		return LoginResponse{}, fmt.Errorf("密碼錯誤: %v", err)
	}

	// 產生token
	token, err := utils.CreateJWT(map[string]string{
		"user_name": user.Username,
		"user_id":   user.ID,
	})
	if err != nil {
		return LoginResponse{}, fmt.Errorf("產生token失敗: %v", err)
	}

	return LoginResponse{Token: token}, nil
}
