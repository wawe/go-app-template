import { clearCompleted, createTodo, deleteTodo, deleteTodos, fetchTodos, initState, putTodo, setNewInput, setTodos, toggleDone } from "../static/model.js"
import { assertEquals, assertFalse } from "https://deno.land/std@0.192.0/testing/asserts.ts"

Deno.test("model", async (t) => {
    // deno-lint-ignore no-explicit-any
    const state: any = {}
	const todo1 = {"id":1,"content":"get milk","done":true}
	const todo2 = {"id":12,"content":"buy cookies","done":false}
    // deno-lint-ignore no-explicit-any
    let todo3: any = undefined

    await t.step("initState (called on DOMContentLoaded)", () => {
        const sideEffect = initState(state)
        assertEquals(state, {
            todos: [],
            newInput: "",
        })
        assertEquals(sideEffect, fetchTodos)
    })

    await t.step("setState (from server)", () => {
        const sideEffect = setTodos([todo1, todo2])(state)
        assertFalse(sideEffect)
        assertEquals(state, {
            todos: [todo1, todo2],
            newInput: "",
        })
    })

    await t.step("setNewInput (typed by user)", () => {
        const sideEffect = setNewInput("write tests")(state)
        assertFalse(sideEffect)
        assertEquals(state, {
            todos: [todo1, todo2],
            newInput: "write tests",
        })
    })

    await t.step("createTodo (user pressed enter)", () => {
        const sideEffect = createTodo(state)
        const todo3 = state?.todos[2]

        assertEquals(state, {
            todos: [todo1, todo2, todo3],
            newInput: "",
        })
        assertEquals(sideEffect, putTodo(todo3))
    })

    await t.step("toggleDone (user clicked checkbox)", () => {
        const sideEffect1 = toggleDone(1)(state)
        const sideEffect2 = toggleDone(12)(state)
        todo3 = state?.todos[2]

        assertEquals(state.todos[0].done, false)
        assertEquals(state.todos[1].done, true)
        assertEquals(state, {
            todos: [todo1, todo2, todo3],
            newInput: "",
        })
        assertEquals(sideEffect1, putTodo(todo1))
        assertEquals(sideEffect2, putTodo(todo2))
    })

    await t.step("deleteTodo (user clicked button)", () => {
        const sideEffect = deleteTodo(1)(state)

        assertEquals(state, {
            todos: [todo2, todo3],
            newInput: "",
        })
        assertEquals(sideEffect, deleteTodos([1]))
    })

    await t.step("clearCompleted (user clicked button)", () => {
        const sideEffect = clearCompleted(state)

        assertEquals(state, {
            todos: [todo3],
            newInput: "",
        })
        assertEquals(sideEffect, deleteTodos([12]))
    })

})
