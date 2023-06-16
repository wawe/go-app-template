package main

import (
	"fmt"
	"log"
	"os/exec"
	"path/filepath"
	"runtime"
)

func openBrowser(file string) {
	absFile, err := filepath.Abs(file)
	if err != nil {
		log.Fatal(err)
	}

	fileURL := "file://" + absFile
	log.Print(fileURL)

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", fileURL).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", fileURL).Start()
	case "darwin":
		err = exec.Command("open", fileURL).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}

}
