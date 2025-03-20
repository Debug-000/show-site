package config

import (
	"fmt"

	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
)

type Config struct {
	DBHost               string `env:"DB_HOST,required"`
	DBPort               string `env:"DB_PORT,required"`
	DBUser               string `env:"DB_USER,required"`
	DBDBName             string `env:"DB_NAME,required"`
	DBPassword           string `env:"DB_PASSWORD,required"`
	DBSSLMode            string `env:"DB_SSLMODE,required"`
	ServerPort           string `env:"SERVER_PORT,required"`
	EntSchemaPath        string `env:"ENT_SCHEMA_PATH,required"`
	SecretKey            string `env:"SECRET_KEY,required"`
	CentrifugoApiAddress string `env:"CENTRIFUGO_API_ADDRESS,required"`
	CentrifugoKey        string `env:"CENTRIFUGO_API_KEY,required"`
}

func New() (*Config, error) {
	// err := godotenv.Load()
	// if err != nil {
	// 	return nil, fmt.Errorf("unable to load .env file: %w", err)
	// }

	_ = godotenv.Load()

	var cfg = &Config{}

	err := env.Parse(cfg)
	if err != nil {
		return nil, fmt.Errorf("unable to parse environment variables: %w", err)
	}

	return cfg, nil
}
