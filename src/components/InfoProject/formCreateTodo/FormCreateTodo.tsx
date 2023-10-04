import * as React from 'react';
import {useRef, useState} from 'react';
import S from './FormCreateTodo.module.scss'
import {Portal} from "../../../UI/portal/Portal";
import {MyInput} from "../../../UI/Input/MyInput";
import {useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../../store/Store";
import {addNewTodo} from "../../../store/TodoReducer";
import GeneratorRandomString from "../../../utils/generatorRandomString";

export const FormCreateTodo = () => {
    const [isModal, setIsModal] = useState(false)
    const openModal = () => {
        setIsModal(true)
    }
    return (
        <div className={S.body}>
            <button onClick={openModal}>createTodo</button>
            {isModal && <Portal element={FormCreateContainer} exitModal={setIsModal}/>

            }
        </div>
    );
};


export const FormCreate = (props: AppStateType) => {
    const refName = useRef<HTMLInputElement>()
    const refDescription = useRef<HTMLInputElement>()
    const refDataEnd = useRef<HTMLInputElement>()
    const refFile = useRef<HTMLInputElement>()
    const {id: currentProjectId} = useParams()
    const dispatch = useDispatch()
    const createTodo = (e: any, data: any) => {
        e.preventDefault()
        const newTodo = {
            name: refName.current ? refName.current.value : '',
            text: refDescription.current ? refDescription.current.value : '',
            timeEnd: refDataEnd.current ? refDataEnd.current.value : '',
            refFile: refFile.current ? refFile.current.value : '',
            done: 'false',
            time: '1111',
            id: GeneratorRandomString(),

        }
        currentProjectId && dispatch(addNewTodo(newTodo, currentProjectId))
    }

    const inputFields = [
        {
            name: 'Заголовок',
            ref: refName,
            type: 'text'

        }, {
            name: 'Описание',
            ref: refDescription,
            type: 'text'

        }, {
            name: 'Дата окончания',
            ref: refDataEnd,
            type: 'date'

        }, {
            name: 'Вложенные файлы',
            ref: refFile,
            type: 'file'

        },]
    return (
        <form className={S.body}>
            {inputFields.map(el => {
                return <div key={el.name}>
                    <p onClick={() => {
                        console.log(el.ref.current && el.ref.current.value)
                    }
                    }>{el.name}</p>
                    <MyInput type={el.type} ref={el.ref}/>
                </div>
            })}


            <button onClick={(e) => {
                createTodo(e, 1)
            }}>созадть задание
            </button>
        </form>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {};
};

const FormCreateContainer = connect(mapStateToProps, {
    addNewTodo
})(FormCreate);

export default FormCreateContainer;

