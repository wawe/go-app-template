# Go App Template

A template for simple web applications written in Go and JavaScript.

## Features

* Basic package structure based on [golang-standards/project-layout](https://github.com/golang-standards/project-layout)
* Live reloading static assets during development using [lrserver](https://github.com/jaschaephraim/lrserver)
* Minimal reactive UI framework based on [lit-html](https://github.com/lit/lit/tree/main/packages/lit-html)
* [Dockerfile](Dockerfile) for creating a container
* Unit tests for Go with [testing](https://pkg.go.dev/testing)
* Unit tests for JavaScript code with [deno](https://deno.com/runtime)

## Usage

* Create a new repo from this template
* Replace the module name `github.com/wawe/go-app-template` with the name of your own module in all files
* Run `go run ./cmd/dev-server` and begin developing

## Tests

* Go code with [testing](https://pkg.go.dev/testing): Run `go test ./...` to test Go code
* JavaScript code with [deno](https://deno.com/runtime): Run `deno test` to test JavaScript code