import { render as renderHTML } from './lit-html.js'
import { render } from './view.js'
import { initState } from './model.js'

function dispatch(action) {
    const sideEffect = action(window.state)
    renderView(window.state)
    if (sideEffect) {
        sideEffect.execute()
            .then(action => { if (action) { dispatch(action) }})
            .catch(console.log)
    }
}

function renderView(state) {
    const tpl = render(state, dispatch)
    renderHTML(tpl, document.getElementById('appRoot'))
}

window.state = {}

document.addEventListener('DOMContentLoaded', () => dispatch(initState))