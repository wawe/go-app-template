import { html } from './lit-html.js'
import { clearCompleted, createTodo, deleteTodo, setNewInput, toggleDone } from './model.js'

function render(state, dispatch) {
    
    return html`
        <h1>todos</h1>
        <form @submit=${evt => { evt.preventDefault(); dispatch(createTodo) }}>
            <input type="text" placeholder="What needs to be done?" .value=${state.newInput} @keydown=${evt => dispatch(setNewInput(evt.target.value))}>
        </form>
        <ul>
            ${state.todos.map(e => renderTodo(e, dispatch))}
        </ul>
        <button @click=${() => dispatch(clearCompleted)}>Clear completed</button>
    `
}

function renderTodo(item, dispatch) {
    return html`<li>
        <input type="checkbox" .checked=${item.done} @click=${() => dispatch(toggleDone(item.id))}>
        ${item.content}
        <button @click=${() => dispatch(deleteTodo(item.id))}>X</button>
    </li>`
}

export { render }