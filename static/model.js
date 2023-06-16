function initState(state) {
    state.todos = []
    state.newInput = ''
}

function setNewInput(value) {
    return function(state) {
        state.newInput = value
    }
}

function createTodo(state) {
    const ordinal = state.todos.slice(-1) || 1
    const item = {
        id: generateId(),
        done: false,
        content: state.newInput,
        ordinal,
    }
    state.todos.push(item)
    state.newInput = ''
}

function toggleDone(id) {
    return function(state) {
        const todo = state.todos.find(e => e.id === id)
        todo.done = !todo.done
    }
}

function deleteTodo(id) {
    return function(state) {
        state.todos = state.todos.filter( e => e.id !== id)
    }
}

function clearCompleted(state) {
    state.todos = state.todos.filter(e => !e.done)
}

function generateId() {
    return Math.floor(Math.random() * 10000000)
}

export {
    initState,
    setNewInput,
    createTodo,
    deleteTodo,
    toggleDone,
    clearCompleted,
}
