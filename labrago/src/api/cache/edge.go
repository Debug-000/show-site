package cache

import (
	"errors"
	"github.com/GoLabra/labrago/src/api/entgql/entity"
	"time"
)

var (
	ErrEdgesNotFound = errors.New("edges not found in cache")
)

var Edge Cache[string, []entity.Edge]

func NewEdgeCache(ttl time.Duration) {
	Edge = NewCache[string, []entity.Edge](ttl)
}
