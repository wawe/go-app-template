export interface TodoItem {
    id: number
    content: string
    done: boolean
}

export interface State {
    todos: TodoItem[]
    newInput: string
}

export type Action = (state: State) => (SideEffect) | void

export interface SideEffect {
    execute: () => Promise<Action | void>
}

export type DispatchFunction = (action: Action) => void
