package server

import (
	"log"
	"net/http"

	"github.com/wawe/go-app-template/internal/api"
)

func Main(address string) {
	mux := routes()
	log.Printf("Starting server on %s", address)
	err := http.ListenAndServe(address, mux)
	log.Fatal(err)
}

func routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("./static")))
	mux.Handle("/api/", api.Handler())
	return mux
}
