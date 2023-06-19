package api

import (
	"fmt"
	"io"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAPI(t *testing.T) {
	todo1 := `{"id":1,"content":"get milk","done":true}`
	todo2 := `{"id":12,"content":"buy cookies","done":false}`
	todo2Done := `{"id":12,"content":"buy cookies","done":true}`
	todo3 := `{"id":399,"content":"write tests","done":false}`
	sequence := []struct {
		method             string
		path               string
		body               string
		expectedStatusCode int
		expectedBody       string
	}{
		{"GET", "/api/todo", "", 200, `[]`},
		{"PUT", "/api/todo", todo1, 204, ``},
		{"GET", "/api/todo", "", 200, fmt.Sprintf(`[%s]`, todo1)},
		{"PUT", "/api/todo", todo2, 204, ``},
		{"PUT", "/api/todo", todo2, 204, ``},
		{"GET", "/api/todo", "", 200, fmt.Sprintf(`[%s,%s]`, todo1, todo2)},
		{"PUT", "/api/todo", todo3, 204, ``},
		{"GET", "/api/todo", "", 200, fmt.Sprintf(`[%s,%s,%s]`, todo1, todo2, todo3)},
		{"PUT", "/api/todo", todo2Done, 204, ``},
		{"GET", "/api/todo", "", 200, fmt.Sprintf(`[%s,%s,%s]`, todo1, todo2Done, todo3)},
		{"DELETE", "/api/todo", `{"ids": [12]}`, 204, ``},
		{"GET", "/api/todo", "", 200, fmt.Sprintf(`[%s,%s]`, todo1, todo3)},
		{"DELETE", "/api/todo", `{"ids": [12, 10, 399, 1]}`, 204, ``},
		{"GET", "/api/todo", "", 200, `[]`},
	}

	api := &APIServer{}

	for i, testCase := range sequence {
		w := httptest.NewRecorder()
		r := httptest.NewRequest(testCase.method, testCase.path, strings.NewReader(testCase.body))
		api.ServeHTTP(w, r)

		assert.Equal(t, testCase.expectedStatusCode, w.Result().StatusCode, "Testcase %d: HTTP status code", i)
		body, err := io.ReadAll(w.Result().Body)
		require.NoError(t, err, "Testcase %d: unable to read body", i)
		assert.Equal(t, testCase.expectedBody, string(body), "Testcase %d: Body", i)
		if testCase.expectedBody != "" {
			assert.Equal(t, "application/json", w.Result().Header.Get("Content-Type"))
		}
	}
}
