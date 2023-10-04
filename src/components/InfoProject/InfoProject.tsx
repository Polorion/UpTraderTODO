import * as React from 'react';
import {useEffect, useState} from 'react';
import S from './InfoProject.module.scss'
import {AppStateType} from "../../store/Store";
import {connect, useDispatch} from "react-redux";
import {setTodo} from "../../store/TodoReducer";
import {useParams} from "react-router-dom";
import {ProjectItemType, ProjectTodo} from "../../types/ProjectItemType";
import {ColumnDone} from "./columnDone/ColumnDone";
import {todoItemType} from "../../types/todoItemType";
import {FormCreateTodo} from "./formCreateTodo/FormCreateTodo";

const InfoProject: React.FC = (props: AppStateType) => {
    const {id: currentProjectId} = useParams()
    const dispatch = useDispatch()
    const currentTodo = props.todos.find((el: ProjectItemType) => String(el.id) === String(currentProjectId))
    const [currentTodoItem, setCurrentTodoItem] = useState<todoItemType>()
    const [currentBoard, setCurrentBoard] = useState<ProjectTodo>()
    const setNewOrderTodo = (data: ProjectTodo[]) => {
        dispatch(setTodo(data, currentTodo.id))
    }
    const [columns, setColumns] = useState(currentTodo.todo)
    useEffect(() => {
        setColumns(currentTodo.todo)
    }, [currentTodo])


    return (
        <div className={S.body}>

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
                />)}

            </div>}
        </div>
    );
};


const mapStateToProps = (state: AppStateType) => {
    return {
        todos: state.TodoReducer.project,
    };
};

const InfoProjectContainer = connect(mapStateToProps, {
    setTodo,
})(InfoProject);

export default InfoProjectContainer;
