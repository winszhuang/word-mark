package service

import (
	"os"
	"testing"
	"word-mark/model"
	"word-mark/testcontainer"
)

func TestMain(m *testing.M) {
	setup()
	code := m.Run()
	teardown()
	os.Exit(code)
}

func setup() {
	testcontainer.InitMySql()
	testcontainer.MigrateMySql(&model.User{})
}

func teardown() {
	testcontainer.TeardownMySql()
}
