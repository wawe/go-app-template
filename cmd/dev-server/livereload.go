package main

import (
	"log"
	"os"

	"github.com/fsnotify/fsnotify"
	"github.com/jaschaephraim/lrserver"
)

func LRWatcher(lr *lrserver.Server) {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatalln(err)
	}
	defer watcher.Close()

	err = watchRecursively(watcher, "./static")
	if err != nil {
		log.Fatalln(err)
	}

	for {
		select {
		case event := <-watcher.Events:
			lr.Reload(event.Name)
		case err := <-watcher.Errors:
			log.Println(err)
		}
	}
}

func watchRecursively(watcher *fsnotify.Watcher, path string) error {
	log.Printf("Watching %s for changes", path)
	err := watcher.Add(path)
	if err != nil {
		return err
	}

	children, err := os.ReadDir(path)
	if err != nil {
		return err
	}

	for _, child := range children {
		if child.IsDir() && child.Name() != ".git" {
			err := watchRecursively(watcher, path+"/"+child.Name())
			if err != nil {
				return err
			}
		}
	}

	return nil
}
