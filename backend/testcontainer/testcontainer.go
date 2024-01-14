package testcontainer

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/stretchr/testify/suite"
	"github.com/testcontainers/testcontainers-go"
	testcontainermysql "github.com/testcontainers/testcontainers-go/modules/mysql"
	"github.com/testcontainers/testcontainers-go/wait"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"strconv"
	"testing"
	"time"
)

var (
	MysqlSuite *MysqlTestSuite
)

func InitMySql() {
	MysqlSuite = &MysqlTestSuite{}
	MysqlSuite.SetupSuite()
}

func MigrateMySql(dst ...interface{}) {
	gormDB := MysqlSuite.ConnGorm()
	err := gormDB.AutoMigrate(dst...)
	if err != nil {
		log.Fatalf("Failed to migrate database: %s", err)
	}
}

func TeardownMySql() {
	MysqlSuite.TearDownSuite()
}

type MysqlTestSuite struct {
	suite.Suite
	dbUser         string
	dbPassword     string
	dbName         string
	dbHost         string
	dbPort         string
	sqlDB          *sql.DB
	mySQLContainer *testcontainermysql.MySQLContainer
	ctx            context.Context
}

func (suite *MysqlTestSuite) initMySQLConfig() {
	suite.dbUser = "root"
	suite.dbPassword = "root"
	suite.dbName = "test"
}

func (suite *MysqlTestSuite) SetupSuite() {
	// https://golang.testcontainers.org/modules/mysql/
	suite.initMySQLConfig()
	suite.ctx = context.Background()
	mySQLContainer, err := testcontainermysql.RunContainer(
		suite.ctx,
		testcontainers.WithImage("mysql:8"),
		testcontainermysql.WithUsername(suite.dbUser),
		testcontainermysql.WithPassword(suite.dbPassword),
		testcontainermysql.WithDatabase(suite.dbName),
		testcontainers.WithWaitStrategy(
			wait.ForLog("mysqld: ready for connections.").
				WithOccurrence(2).
				WithStartupTimeout(2*time.Minute),
		),
	)

	if err != nil {
		log.Fatal("Failed to start mysqlDB container: ", err)
	}

	suite.dbHost, err = mySQLContainer.Host(suite.ctx)
	if err != nil {
		log.Fatal("Failed to get mysqlDB container host: ", err)
	}
	mappedPort, _ := mySQLContainer.MappedPort(suite.ctx, "3306/tcp")
	suite.mySQLContainer = mySQLContainer
	suite.dbPort = strconv.Itoa(mappedPort.Int())

	if err != nil {
		log.Fatal("Failed to get mysqlDB container port: ", err)
	}

	suite.sqlDB, err = sql.Open("mysql", suite.getDsn())
	if err != nil {
		log.Fatal("Failed to connect to mysqlDB: ", err)
	}
}

func (suite *MysqlTestSuite) ConnGorm() *gorm.DB {
	gormDB, err := gorm.Open(mysql.New(mysql.Config{Conn: MysqlSuite.sqlDB}), &gorm.Config{Logger: logger.Default.LogMode(logger.Silent)})
	if err != nil {
		log.Fatalf("Failed to connect to gormDB: %s", err)
	}
	return gormDB
}

func (suite *MysqlTestSuite) TearDownSuite() {
	err := suite.sqlDB.Close()
	if err != nil {
		log.Fatal("Failed to close mysqlDB: ", err)
	}
	err = suite.mySQLContainer.Terminate(suite.ctx)
	if err != nil {
		panic(err)
	}
}

func (suite *MysqlTestSuite) WrapTest(fn func(t *testing.T, tx *gorm.DB)) func(t *testing.T) {
	return func(t *testing.T) {
		var tx *gorm.DB

		defer func() {
			tx.Rollback()
		}()

		gormDB := suite.ConnGorm()
		tx = gormDB.Begin()
		fn(t, tx)
	}
}

func (suite *MysqlTestSuite) getDsn() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?multiStatements=true&parseTime=true&charset=utf8mb4", suite.dbUser, suite.dbPassword, suite.dbHost, suite.dbPort, suite.dbName)
}
