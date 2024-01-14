package main

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

func teardown() {
	testcontainer.TeardownMySql()
}

func setup() {
	testcontainer.InitMySql()
	testcontainer.MigrateMySql(&model.User{})
}
