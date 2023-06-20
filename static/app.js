// @ts-check
/// <reference types="./types.d.ts">
import { render as renderHTML } from './lit-html.js'
import { render } from './view.js'
import { initState } from './model.js'

/**
 * @param {Action} action
 */
function dispatch(action) {
    const sideEffect = action(state)
    renderView(state)
    sideEffect?.execute()
        .then(action => { if (action) { dispatch(action) }})
        .catch(console.log)
}

/**
 * @param {State} state
 */
function renderView(state) {
    const tpl = render(state, dispatch)
    renderHTML(tpl, document.body)
}

/** @type {State} */
const state = /** @type {State} */ ({})

// @ts-ignore: assignment just used for debugging in the browser console
window.state = state

document.addEventListener('DOMContentLoaded', () => dispatch(initState))
