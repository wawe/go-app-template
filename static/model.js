/* SIDE EFFECTS */

class SideEffect {
    constructor(func, ...args) {
        this.func = func
        this.args = args
    }

    execute() {
        return this.func(...this.args)
    }
}

async function apiCall(method, body) {
    const response = await fetch("/api/todo", {method, body})
    if (response.ok) {
        if (response.headers.get("Content-Type") == "application/json") {
            return response.json()
        } else {
            return Promise.resolve("")
        }
    } else {
        return Promise.reject(await response.text())
    }
}

function fetchTodos0() {
    return apiCall("GET").then(setTodos)
}

const fetchTodos = new SideEffect(fetchTodos0)

function putTodo(item) {
    return new SideEffect(apiCall, "PUT", JSON.stringify(item))
}

function deleteTodos(ids) {
    return new SideEffect(apiCall, "DELETE", JSON.stringify({ids}))
}

/* ACTIONS */

function initState(state) {
    state.todos = []
    state.newInput = ''
    return fetchTodos
}

function setTodos(todos) {
    return function(state) {
        state.todos = todos
    }
}

function setNewInput(value) {
    return function(state) {
        state.newInput = value
    }
}

function createTodo(state) {
    const item = {
        id: generateId(),
        done: false,
        content: state.newInput,
    }
    state.todos.push(item)
    state.newInput = ''
    return putTodo(item)
}

function toggleDone(id) {
    return function(state) {
        const todo = state.todos.find(e => e.id === id)
        todo.done = !todo.done
        return putTodo(todo)
    }
}

function deleteTodo(id) {
    return function(state) {
        state.todos = state.todos.filter( e => e.id !== id)
        return deleteTodos([id])
    }
}

function clearCompleted(state) {
    const deleted = state.todos.filter(e => e.done).map(e => e.id)
    state.todos = state.todos.filter(e => !e.done)
    return deleteTodos(deleted)
}

function generateId() {
    return Math.floor(Math.random() * 10000000)
}

export {
    initState,
    setTodos,
    setNewInput,
    createTodo,
    deleteTodo,
    toggleDone,
    clearCompleted,
    fetchTodos,
    putTodo,
    deleteTodos,
}
