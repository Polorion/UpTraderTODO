import * as React from 'react';
import {useState} from 'react';
import S from './EditTodo.module.scss'
import {Portal} from "../../../../../UI/portal/Portal";
import FormCreateContainer from "../../../formCreateTodo/createForm/FormCreate";
import {todoItemType} from "../../../../../types/todoItemType";
import {ReactComponent as Edit} from "../../../../../access/edit.svg";

interface IEditTodo {
    item: todoItemType
}

export const EditTodo = (props: IEditTodo) => {
    const [isModal, setIsModal] = useState(false)
    const openModal = () => {
        setIsModal(true)
    }
    return (
        <div className={S.body}>
            <button className={S.edit} onClick={openModal}><Edit/></button>
            {isModal && <Portal exitModal={setIsModal}>
                <FormCreateContainer item={props.item} create={false} setIsModal={setIsModal}/>
            </Portal>

            }
        </div>
    );
};