export type miniTodoType = {
    name: string | undefined,
    done: boolean
    id: string
}

export type todoItemType = {
    name: string,
    done?: string,
    time?: string | {},
    id?: string,
    text: string,
    timeEnd?: string | number,
    refFile?: string,
    miniTodo?: miniTodoType[]
}