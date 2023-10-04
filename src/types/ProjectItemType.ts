import {todoItemType} from "./todoItemType";

export type ProjectItemType = {
    name: string
    id: string
    todoDevelop: todoItemType[]
    todoQueue: todoItemType[]
    todoDone: todoItemType[]
}