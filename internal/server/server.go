package server

import (
	"log"
	"net/http"

	"github.com/wawe/go-app-template/internal/api"
)

func Main() {
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("./static")))
	mux.Handle("/api/", api.Handler())
	log.Print("Starting server on localhost:8080")
	err := http.ListenAndServe("localhost:8080", mux)
	log.Fatal(err)
}
