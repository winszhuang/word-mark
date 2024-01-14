package service

import (
	"context"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
	"testing"
	"word-mark/model"
	tc "word-mark/testcontainer"
)

func TestAuthService_Register(t *testing.T) {
	t.Run("註冊確認DB有更新該筆", tc.MysqlSuite.WrapTest(func(t *testing.T, db *gorm.DB) {
		expectUsername := "test"
		srv := NewAuthService(db)
		err := srv.Register(context.Background(), RegisterRequest{
			Username: expectUsername,
			Password: "test",
		})
		assert.NoError(t, err)

		// 實際查詢DB是否有更新該資料
		var user model.User
		err = db.Table("users").Where("user_name = ?", expectUsername).Find(&user).Error
		assert.NoError(t, err)
	}))

	t.Run("帳號或密碼為空", tc.MysqlSuite.WrapTest(func(t *testing.T, db *gorm.DB) {
		srv := NewAuthService(db)
		err := srv.Register(context.Background(), RegisterRequest{
			Username: "",
			Password: "",
		})
		assert.Error(t, err)
	}))

	t.Run("帳戶名稱已存在, 註冊失敗", tc.MysqlSuite.WrapTest(func(t *testing.T, db *gorm.DB) {
		createTestUser(t, db)

		srv := NewAuthService(db)
		err := srv.Register(context.Background(), RegisterRequest{
			Username: "test",
			Password: "test",
		})
		assert.Error(t, err)
	}))
}

func TestAuthService_Login(t *testing.T) {
	t.Run("帳號或密碼為空", tc.MysqlSuite.WrapTest(func(t *testing.T, db *gorm.DB) {
		srv := NewAuthService(db)
		_, err := srv.Login(context.Background(), LoginRequest{
			Username: "",
			Password: "",
		})
		assert.Error(t, err)
	}))

	t.Run("沒有發現該用戶", tc.MysqlSuite.WrapTest(func(t *testing.T, db *gorm.DB) {
		srv := NewAuthService(db)
		loginResponse, err := srv.Login(context.Background(), LoginRequest{
			Username: "test",
			Password: "test",
		})
		assert.Error(t, err)
		assert.True(t, loginResponse.Token == "")
	}))

	t.Run("密碼錯誤", tc.MysqlSuite.WrapTest(func(t *testing.T, db *gorm.DB) {
		createTestUser(t, db)

		srv := NewAuthService(db)
		loginResponse, err := srv.Login(context.Background(), LoginRequest{
			Username: "test",
			Password: "test1",
		})
		assert.Error(t, err)
		assert.True(t, loginResponse.Token == "")
	}))

	t.Run("登入成功", tc.MysqlSuite.WrapTest(func(t *testing.T, db *gorm.DB) {
		srv := NewAuthService(db)
		err := srv.Register(context.Background(), RegisterRequest{
			Username: "test",
			Password: "test",
		})
		assert.NoError(t, err)

		loginResponse, err := srv.Login(context.Background(), LoginRequest{
			Username: "test",
			Password: "test",
		})
		assert.NoError(t, err)
		assert.True(t, loginResponse.Token != "")
	}))
}

func createTestUser(t *testing.T, db *gorm.DB) {
	err := db.Table("users").Create(&model.User{
		Username: "test",
		Password: "test",
	}).Error
	assert.NoError(t, err)
}
