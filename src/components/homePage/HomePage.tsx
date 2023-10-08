import * as React from 'react';
import {useEffect, useRef} from 'react';
import S from './HomePage.module.scss'
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../store/Store";
import {deleteProject, editProject, setProject} from "../../store/TodoReducer";
import {ProjectItemType} from "../../types/ProjectItemType";
import {Project} from "./project/Project";
import {MyInput} from "../../UI/Input/MyInput";
import {MyButton} from "../../UI/button/MyButton";


const HomePage: React.FC = (props: AppStateType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        localStorage.setItem('project', JSON.stringify(props.projects))

    }, [props.projects])

    const createProject = () => {
        if (inputRef.current && inputRef.current.value.length > 0) {
            dispatch(setProject(inputRef.current.value))
            inputRef.current.value = ''
        }
    }
    const editProjects = (text: string, id: string) => {
        dispatch(editProject(text, id))
    }
    const deleteTodo = (id: string) => {
        dispatch(deleteProject(id))

    }
    const inputRef = useRef<HTMLInputElement>()

    return (
        <div className={S.body}>
            <form className={S.find}>
                <div className={S.input}>
                    <MyInput placeholder={'введите имя проекта'} ref={inputRef}/>
                    <MyButton onClick={(e: any) => {
                        e.preventDefault()
                        createProject()
                    }}>
                        создать проект
                    </MyButton>
                </div>
            </form>

            <div className={S.board}>
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
