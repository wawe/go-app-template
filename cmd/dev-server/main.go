package main

import (
	"log"

	"github.com/jaschaephraim/lrserver"
	"github.com/wawe/go-app-template/internal/server"
)

func main() {
	lr := lrserver.New(lrserver.DefaultName, lrserver.DefaultPort)
	go LRWatcher(lr)
	go openBrowser("http://localhost:8080")

	log.Printf("LiveReload server listening at :%d", lrserver.DefaultPort)
	go lr.ListenAndServe()

	server.Main()
}
