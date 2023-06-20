interface TodoItem {
    id: number
    content: string
    done: boolean
}

interface State {
    todos: TodoItem[]
    newInput: string
}

type Action = (state: State) => (SideEffect) | void

type ParameterizedAction<T> = (argument: T) => Action

type DispatchFunction = (action: Action) => void

type SideEffectResult = Promise<Action | void>

interface SideEffect {
    execute: () => Promise<Action | void>
}

export {
    TodoItem,
    State,
    Action,
    ParameterizedAction,
    DispatchFunction,
    SideEffectResult,
}
