// @ts-check
/// <reference types="./types.d.ts">
import { html } from './lit-html.js'
import { clearCompleted, createTodo, deleteTodo, setNewInput, toggleDone } from './model.js'

 /**
 * @param {State} state
 * @param {DispatchFunction} dispatch
 * @returns {import('https://cdn.skypack.dev/lit-html@2.7.4?dts').TemplateResult}
 */
function render(state, dispatch) {

    /** @param {SubmitEvent} evt */
    const submitHandler = evt => { evt.preventDefault(); dispatch(createTodo) }

    /** @param {KeyboardEvent} evt */
    const keyTypedHandler = evt => {
        const inputField = /** @type {HTMLInputElement?} */ (evt?.target)
        dispatch(setNewInput(inputField?.value || ""))
    }

    return html`
        <h1>todos</h1>
        <div class="todo-app">
        <form @submit=${submitHandler}>
            <input
                class="new-todo"
                type="text"
                placeholder="What needs to be done?"
                .value=${state.newInput}
                @keydown=${keyTypedHandler}>
        </form>
        <ul>
            ${state.todos.map(e => renderTodo(e, dispatch))}
        </ul>
        <button class="clear" @click=${() => dispatch(clearCompleted)}>Clear completed</button>
        </div>
    `
}

/**
 * @param {TodoItem} item
 * @param {DispatchFunction} dispatch
 */
function renderTodo(item, dispatch) {
    return html`<li>
        <input type="checkbox" .checked=${item.done} @click=${() => dispatch(toggleDone(item.id))}>
        ${item.content}
        <button class="delete" @click=${() => dispatch(deleteTodo(item.id))}>X</button>
    </li>`
}

export { render }
