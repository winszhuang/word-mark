package main

import (
	"fmt"
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"word-mark/config"
	"word-mark/controller"
	"word-mark/model"
	"word-mark/service"
)

var (
	DB             *gorm.DB
	AuthController *controller.AuthController
)

func initViper() {
	if err := config.Init(""); err != nil {
		panic(err)
	}
}

func initDB() {
	fmt.Println("資料庫初始化")
	var err error
	conf := &model.DBConf{
		Host:     viper.GetString("database.host"),
		User:     viper.GetString("database.username"),
		Password: viper.GetString("database.password"),
		DbName:   viper.GetString("database.name"),
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true&charset=utf8&parseTime=%t&loc=%s",
		conf.User,
		conf.Password,
		conf.Host,
		conf.DbName,
		true,
		"Local")

	DB, err = gorm.Open(mysql.Open(dsn))
	if err != nil {
		log.Fatalf("connect error: %v\n", err)
	}

	fmt.Println("資料庫初始化結束")
}

func initHandler() {
	// #NOTICE 先不抽service和repository
	AuthController = controller.NewAuthController(
		service.NewAuthService(DB),
	)
	// add more controller

}

func init() {
	initViper()
	initDB()
	initHandler()
}
