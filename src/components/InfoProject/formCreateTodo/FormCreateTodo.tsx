import * as React from 'react';
import {useState} from 'react';
import S from './FormCreateTodo.module.scss'
import {Portal} from "../../../UI/portal/Portal";
import FormCreateContainer from "./createForm/FormCreate";


export const FormCreateTodo = () => {
    const [isModal, setIsModal] = useState(false)
    const openModal = () => {
        setIsModal(true)
    }
    return (
        <div className={S.body}>
            <button onClick={openModal}>createTodo</button>
            {isModal && <Portal exitModal={setIsModal}>
                <FormCreateContainer create={true}/>
            </Portal>

            }
        </div>
    );
};

