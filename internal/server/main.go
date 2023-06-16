package server

import (
	"log"
	"net/http"
)

func Main() {
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("./static")))
	log.Print("Starting server on localhost:8080")
	err := http.ListenAndServe("localhost:8080", mux)
	log.Fatal(err)
}
