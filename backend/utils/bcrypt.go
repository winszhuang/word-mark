package utils

import "golang.org/x/crypto/bcrypt"

const HashCost = 14

func HashPassword(pass string) (string, error) {
	password, err := bcrypt.GenerateFromPassword([]byte(pass), HashCost)
	if err != nil {
		return "", err
	}
	return string(password), nil
}
