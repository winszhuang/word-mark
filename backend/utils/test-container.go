package utils

import (
	"context"
	"fmt"
	"github.com/testcontainers/testcontainers-go"
	testcontainermysql "github.com/testcontainers/testcontainers-go/modules/mysql"
	"github.com/testcontainers/testcontainers-go/wait"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"testing"
	"time"
)

func TestInMysqlContainer(t *testing.T, testName string, fn func(t *testing.T, db *gorm.DB)) {
	ctx := context.Background()
	mySQLContainer, err := testcontainermysql.RunContainer(
		ctx,
		testcontainers.WithImage("mysql"),
		testcontainermysql.WithUsername("root"),
		testcontainermysql.WithPassword("root"),
		testcontainermysql.WithDatabase("test"),
		testcontainers.WithWaitStrategy(
			wait.ForLog("mysqld: ready for connections.").
				WithOccurrence(2).
				WithStartupTimeout(2*time.Minute),
		),
	)
	if err != nil {
		log.Fatalf("Failed to start container: %s", err)
	}
	defer func() {
		if err := mySQLContainer.Terminate(ctx); err != nil {
			panic(err)
		}
	}()

	host, err := mySQLContainer.Host(ctx)
	if err != nil {
		log.Fatalf("Failed to get container host: %s", err)
	}
	mappedPort, _ := mySQLContainer.MappedPort(ctx, "3306/tcp")
	dsn := fmt.Sprintf("root:root@tcp(%s:%s)/test?parseTime=true", host, mappedPort.Port())
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{Logger: logger.Default.LogMode(logger.Silent)})
	if err != nil {
		log.Fatalf("Failed to connect to MySQL: %s", err)
	}

	source, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get database source: %s", err)
	}
	defer source.Close()

	// 實際的測試
	t.Run(testName, func(tt *testing.T) {
		fn(tt, db)
	})
}
