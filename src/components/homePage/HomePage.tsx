import * as React from 'react';
import {useState} from 'react';
import S from './HomePage.module.scss'
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../store/Store";
import {deleteProject, editProject, setProject} from "../../store/TodoReducer";
import {ProjectItemType} from "../../types/ProjectItemType";
import {Project} from "./project/Project";


const HomePage: React.FC = (props: AppStateType) => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const createProject = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setInputValue('')
        dispatch(setProject(inputValue))
    }
    const editProjects = (text: string, id: string) => {
        dispatch(editProject(text, id))
    }
    const deleteTodo = (id: string) => {
        dispatch(deleteProject(id))
    }

    return (
        <div className={S.body}>
            <form className={S.find}>
                <input type="text" value={inputValue} onChange={updateValue}/>
                <button onClick={createProject}>создать задачу
                </button>
            </form>

            <div>
                {props.projects.map((el: ProjectItemType) => {
                    return <Project key={el.id} project={el} deleteTodo={deleteTodo}
                                    editProject={editProjects}/>
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        projects: state.TodoReducer.project,
    };
};

const HomePageContainer = connect(mapStateToProps, {
    setProject, editProject, deleteProject
})(HomePage);

export default HomePageContainer;
