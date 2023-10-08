import * as React from 'react';
import {useState} from 'react';
import S from './FormCreateTodo.module.scss'
import {Portal} from "../../../UI/portal/Portal";
import FormCreateContainer from "./createForm/FormCreate";
import {MyButton} from '../../../UI/button/MyButton';


export const FormCreateTodo = () => {
    const [isModal, setIsModal] = useState(false)
    const openModal = () => {
        setIsModal(true)
    }
    return (
        <div className={S.body}>
            <MyButton onClick={(e: any) => {
                e.preventDefault()
                openModal()
            }}>Создать задачу</MyButton>
            {isModal && <Portal exitModal={setIsModal}>
                <FormCreateContainer setIsModal={setIsModal} create={true}/>
            </Portal>

            }
        </div>
    );
};

