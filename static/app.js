// @ts-check
/**
 * @typedef {import("./types.d.ts").State} State
 * @typedef {import("./types.d.ts").DispatchFunction} DispatchFunction
 */
import { render as renderHTML } from './lit-html.js'
import { render } from './view.js'
import { initState } from './model.js'

/**
 * @type {DispatchFunction}
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
globalThis.state = state

document.addEventListener('DOMContentLoaded', () => dispatch(initState))
