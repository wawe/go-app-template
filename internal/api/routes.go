package api

import (
	"fmt"
	"net/http"

	"github.com/wawe/go-app-template/internal/todo"
)

type APIServer struct {
	todos todo.List
}

func Handler() *APIServer {
	return &APIServer{}
}

func (s *APIServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		s.getTodo(w, r)
	case http.MethodPut:
		s.putTodo(w, r)
	case http.MethodDelete:
		s.deleteTodo(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte(fmt.Sprintf(
			"%d Method Not Allowed: %s",
			http.StatusMethodNotAllowed,
			r.Method)))
	}
}
