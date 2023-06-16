package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Todo struct {
	Id      int    `json:"id"`
	Content string `json:"content"`
	Done    bool   `json:"done"`
}

type Deletion struct {
	Ids []int `json:"ids"`
}

type TodoList []Todo

func Handler() *http.ServeMux {
	mux := http.NewServeMux()
	storage := TodoList([]Todo{})
	mux.HandleFunc("/api/todo", storage.todo)
	return mux
}

func (l *TodoList) todo(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		l.getTodo(w, r)
	case http.MethodPut:
		l.putTodo(w, r)
	case http.MethodDelete:
		l.deleteTodo(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte(fmt.Sprintf(
			"%d Method Not Allowed: %s",
			http.StatusMethodNotAllowed,
			r.Method)))
	}
}

func (l *TodoList) getTodo(w http.ResponseWriter, r *http.Request) {
	bytes, err := json.Marshal(*l)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(bytes)
}

func (l *TodoList) putTodo(w http.ResponseWriter, r *http.Request) {
	var newTodo Todo

	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&newTodo)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	if !l.updateTodo(newTodo) {
		*l = append(*l, newTodo)
	}
	w.WriteHeader(http.StatusNoContent)
}

func (l *TodoList) updateTodo(updated Todo) bool {
	for i, item := range *l {
		if item.Id == updated.Id {
			[]Todo(*l)[i] = updated
			return true
		}
	}
	return false
}

func (l *TodoList) deleteTodo(w http.ResponseWriter, r *http.Request) {
	var deletion Deletion

	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&deletion)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	var newList []Todo

item:
	for _, item := range *l {
		for _, id := range deletion.Ids {
			if item.Id == id {
				continue item
			}
		}
		newList = append(newList, item)
	}
	*l = newList
	w.WriteHeader(http.StatusNoContent)
}
