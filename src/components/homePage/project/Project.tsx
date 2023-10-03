import * as React from 'react';
import {useState} from 'react';
import S from './Project.module.scss'
import {ReactComponent as Delete} from "../../../access/delete.svg";
import {ReactComponent as Edit} from "../../../access/edit.svg";
import {ProjectItemType} from "../../../types/ProjectItemType";
import {ProjectEditModal} from "./projectEditModal/projectEditModal";
import {Link} from "react-router-dom";

export type editProject = (text: string, id: string) => void
export type deleteTodo = (id: string) => void

interface IProject {
    project: ProjectItemType
    editProject: editProject
    deleteTodo: deleteTodo

}

export const Project = (props: IProject) => {
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<{ name: string, type: boolean }>({
        name: '',
        type: false
    })
    const openEdit = (data: string) => {
        setIsOpenModalEdit({name: data, type: true})
    }
    const deleteTodo = (id: string) => {
        props.deleteTodo(id)
    }
    return (
        <div className={S.body}>
            <Link to={`project/${props.project.id}`}>
                <div className={S.title}>{props.project.name}</div>
            </Link>

            <div className={S.control}>
                <button onClick={() => {
                    openEdit('1')
                }} className={S.edit}><Edit/></button>
                <button onClick={() => {
                    openEdit('2')
                }} className={S.delete}><Delete/></button>
            </div>

            {isOpenModalEdit.type &&
                <ProjectEditModal deleteTodo={deleteTodo} isEdit={isOpenModalEdit.name} project={props.project}
                                  editProject={props.editProject}
                                  setIsOpenModal={setIsOpenModalEdit}/>}

        </div>
    );
};