import {todoItemType} from "./todoItemType";

export type ProjectItemType = {
    name: string
    id: string
    boards: {
        title: string,
        id: number
        todo: todoItemType[]

    }[]

}