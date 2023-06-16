package main

import (
	"log"

	"github.com/jaschaephraim/lrserver"
)

func main() {
	lr := lrserver.New(lrserver.DefaultName, lrserver.DefaultPort)
	go LRWatcher(lr)

	log.Printf("LiveReload server listening at :%d", lrserver.DefaultPort)
	lr.ListenAndServe()
}
