package model

import "time"

type User struct {
	ID        string    `json:"userId" gorm:"column:id"`
	Username  string    `json:"nickName" gorm:"column:user_name"`
	Password  string    `json:"password" gorm:"column:password"`
	IsDeleted bool      `json:"isDeleted" gorm:"column:is_deleted"`
	CreateAt  time.Time `json:"createAt" gorm:"column:create_at;default:null"`
	UpdateAt  time.Time `json:"updateAt" gorm:"column:update_at;default:null"`
}
