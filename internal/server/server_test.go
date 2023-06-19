package server

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

var testServer = routes("../../static")

func TestAPI(t *testing.T) {
	assert.HTTPStatusCode(t,
		testServer.ServeHTTP, "GET", "/api/todo", nil, http.StatusOK)
	assert.HTTPBodyContains(t,
		testServer.ServeHTTP, "GET", "/api/todo", nil, "[]")
}

func TestStaticFile(t *testing.T) {
	assert.HTTPStatusCode(t,
		testServer.ServeHTTP, "GET", "/style.css", nil, http.StatusOK)
	assert.HTTPBodyContains(t,
		testServer.ServeHTTP, "GET", "/style.css", nil, ".todo-app {")
}

func TestRoot(t *testing.T) {
	assert.HTTPStatusCode(t,
		testServer.ServeHTTP, "GET", "/", nil, http.StatusOK)
	assert.HTTPBodyContains(t,
		testServer.ServeHTTP, "GET", "/", nil, `<body id="appRoot"></body>`)
}
