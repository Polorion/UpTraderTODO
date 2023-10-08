import * as React from 'react';
import {useState} from 'react';
import ReactDOM from "react-dom";

import S from './ProjectEditModal.module.scss'
import {editProject} from "../Project";
import {ProjectItemType} from "../../../../types/ProjectItemType";

interface IProjectEditModal {
    setIsOpenModal: ({}: any) => void
    editProject: editProject
    project: ProjectItemType
    isEdit: string
    deleteTodo: (id: string) => void
}


export const ProjectEditModal = (props: IProjectEditModal) => {
    const node = document.querySelector("#modal");
    const [value, setValue] = useState<string>(props.project.name)
    if (!node) {
        return null;
    }
    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const exitEdit = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        props.setIsOpenModal({type: false, name: ''})
    }
    const saveNewName = () => {
        props.editProject(value, props.project.id)
        props.setIsOpenModal({type: false, name: ''})
    }
    const deleteTodo = () => {
        props.deleteTodo(props.project.id)
    }

    return ReactDOM.createPortal(
        <div onClick={(e: React.MouseEvent<HTMLElement>) => {
            exitEdit(e)
        }} className={S.body}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={S.edit}>
                {props.isEdit === '1' ? <div><p className={S.title}>введиде новое имя проекта</p>
                    <input onInput={updateValue} value={value} type="text"/>
                    <button onClick={saveNewName}>сохранить</button>
                </div> : <div><p className={S.title}>вы точно хотите удалить ({props.project.name})</p>
                    <button onClick={deleteTodo}>ДА</button>
                    <button onClick={exitEdit}>НЕТ</button>
                </div>}

            </div>
        </div>,
        node
    );
};

