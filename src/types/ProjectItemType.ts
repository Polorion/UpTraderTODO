import {todoItemType} from "./todoItemType";

export type ProjectTodo = {
    title: string,
    id: number,
    todo: todoItemType[],
}

export type ProjectItemType = {
    name: string
    id: string
    todo: ProjectTodo[]

}