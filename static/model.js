// @ts-check
/**
 * @typedef {import("./types.d.ts").TodoItem} TodoItem
 * @typedef {import("./types.d.ts").State} State
 * @typedef {import("./types.d.ts").SideEffectResult} SideEffectResult
 * @typedef {import("./types.d.ts").Action} Action
 * @typedef {import("./types.d.ts").ParameterizedAction<string>} ParameterizedActionS
 * @typedef {import("./types.d.ts").ParameterizedAction<Array<TodoItem>>} ParameterizedActionT
 * @typedef {import("./types.d.ts").ParameterizedAction<number>} ParameterizedActionN
 */

/* SIDE EFFECTS */

/**
 * @template {any[]} ARGS
 */
class SideEffect {

    /**
     * @param {(...args: ARGS) => SideEffectResult} func
     * @param {ARGS} args
     */
    constructor(func, args) {
        this.func = func
        this.args = args
    }

    execute() {
        return this.func(...this.args)
    }
}

/**
 *
 * @param {string} method
 * @param {string} [body]
 * @returns {Promise<?>}
 */
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

const fetchTodos = new SideEffect(fetchTodos0, [])

/** @param {TodoItem} item */
function putTodo(item) {
    return new SideEffect(apiCall, ["PUT", JSON.stringify(item)])
}

/** @param {Array<number>} ids */
function deleteTodos(ids) {
    return new SideEffect(apiCall, ["DELETE", JSON.stringify({ids})])
}

/* ACTIONS */

/**
 * @param {Record<string, ?>} state
 * @returns {SideEffect<?>}
 */
function initState(state) {
    state.todos = []
    state.newInput = ''
    return fetchTodos
}

/** @type {ParameterizedActionT} */
function setTodos(todos) {
    return function(state) {
        state.todos = todos
    }
}

/** @type {ParameterizedActionS} */
function setNewInput(value) {
    return function(state) {
        state.newInput = value
    }
}

/** @type {Action} */
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

/** @type {ParameterizedActionN} */
function toggleDone(id) {
    return function(state) {
        const todo = state.todos.find(e => e.id === id)
        if (todo) {
            todo.done = !todo.done
            return putTodo(todo)
        }
    }
}

/** @type {ParameterizedActionN} */
function deleteTodo(id) {
    return function(state) {
        state.todos = state.todos.filter( e => e.id !== id)
        return deleteTodos([id])
    }
}

/** @type {Action} */
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
    SideEffect,
}
