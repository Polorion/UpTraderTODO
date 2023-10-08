import * as React from 'react';
import {useEffect, useState} from 'react';
import S from './InfoProject.module.scss'
import {AppStateType} from "../../store/Store";
import {connect, useDispatch} from "react-redux";
import {setTodo} from "../../store/TodoReducer";
import {Link, useParams} from "react-router-dom";
import {ProjectItemType, ProjectTodo} from "../../types/ProjectItemType";
import {ColumnDone} from "./columnDone/ColumnDone";
import {todoItemType} from "../../types/todoItemType";
import {FormCreateTodo} from "./formCreateTodo/FormCreateTodo";

const InfoProject: React.FC = (props: AppStateType) => {
    useEffect(() => {
        localStorage.setItem('project', JSON.stringify(props.projects))

    }, [props.projects])
    const {id: currentProjectId} = useParams()
    const dispatch = useDispatch()
    const currentTodo = props.todos.find((el: ProjectItemType) => String(el.id) === String(currentProjectId))
    const [currentTodoItem, setCurrentTodoItem] = useState<todoItemType>()
    const [currentBoard, setCurrentBoard] = useState<ProjectTodo>()
    const setNewOrderTodo = (data: ProjectTodo[]) => {
        dispatch(setTodo(data, currentTodo.id))
    }
    const [columns, setColumns] = useState(currentTodo.todo)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setColumns(currentTodo.todo)
    }, [currentTodo])


    return (
        <div className={S.body}>
            <div className={S.linkToHome}>

                <Link to={'/'}>вернуться к проектам</Link>
            </div>

            <h2 className={S.nameProject}> Проект: {currentTodo.name}</h2>
            <div className={S.search}>
                <input placeholder={'поиск по задачам'} onInput={(e: any) => {
                    setSearchValue(e.target.value)
                }} type="text"/>
            </div>
            <FormCreateTodo/>
            {currentProjectId && <div className={S.columnsBody}>
                {columns.map((board: ProjectTodo) => <ColumnDone
                    key={board.id}
                    board={board}
                    setCurrentTodoItem={setCurrentTodoItem}
                    setCurrentBoard={setCurrentBoard}
                    currentBoard={currentBoard}
                    currentTodoItem={currentTodoItem}
                    currentTodo={currentTodo}
                    setColumns={setColumns}
                    columns={columns}
                    setNewOrderTodo={setNewOrderTodo}
                    searchValue={searchValue}
                />)}

            </div>}
        </div>
    );
};


const mapStateToProps = (state: AppStateType) => {
    return {
        projects: state.TodoReducer.project,
        todos: state.TodoReducer.project,
    };
};

const InfoProjectContainer = connect(mapStateToProps, {
    setTodo,
})(InfoProject);

export default InfoProjectContainer;
