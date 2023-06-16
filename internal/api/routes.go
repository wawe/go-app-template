package api

import "net/http"

func Handler() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/test", test)
	return mux
}

func test(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "text/plain; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("API Test"))
}
