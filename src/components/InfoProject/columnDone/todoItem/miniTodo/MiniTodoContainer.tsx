import * as React from "react";
import {useState} from "react";
import S from './MiniTodo.module.scss'

import {Portal} from "../../../../../UI/portal/Portal";
import {MiniTodo} from "./MiniTodo";
import {todoItemType} from "../../../../../types/todoItemType";

interface IMiniTodoContainer {
    item: todoItemType
    board: string
}

export const MiniTodoContainer = (props: IMiniTodoContainer) => {
    const [isModal, setIsModal] = useState(false)
    const openModal = () => {
        setIsModal(true)
    }
    return (
        <div className={S.bodyContainer}>
            <button className={S.edit} onClick={openModal}>список подзадач</button>
            {isModal && <Portal exitModal={setIsModal}>
                <MiniTodo board={props.board} item={props.item}/>
            </Portal>

            }
        </div>
    );
};