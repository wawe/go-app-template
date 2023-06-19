package api

import (
	"encoding/json"
	"net/http"

	"github.com/wawe/go-app-template/internal/todo"
)

func (s *APIServer) getTodo(w http.ResponseWriter, r *http.Request) {
	bytes, err := json.Marshal(s.todos)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(bytes)
}

func (s *APIServer) putTodo(w http.ResponseWriter, r *http.Request) {
	var newTodo todo.Item

	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&newTodo)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	s.todos.AddOrUpdateTodo(newTodo)
	w.WriteHeader(http.StatusNoContent)
}

func (s *APIServer) deleteTodo(w http.ResponseWriter, r *http.Request) {
	var deletion todo.Deletion

	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&deletion)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	s.todos.DeleteTodos(deletion)
	w.WriteHeader(http.StatusNoContent)
}
