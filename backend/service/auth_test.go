package service

import (
	"context"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
	"testing"
	"word-mark/utils"
)

func TestAuthService_Register(t *testing.T) {
	utils.TestInMysqlContainer(t, "test", func(t *testing.T, db *gorm.DB) {
		srv := NewAuthService(db)
		_, err := srv.Register(context.Background(), RegisterRequest{
			Username: "test",
			Password: "test",
		})
		require.NoError(t, err)
	})
}
