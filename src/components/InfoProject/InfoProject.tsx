import * as React from 'react';
import {useState} from 'react';
import S from './InfoProject.module.scss'
import {AppStateType} from "../../store/Store";
import {connect, useDispatch} from "react-redux";
import {setIndexTodo, setTodo} from "../../store/TodoReducer";
import {useParams} from "react-router-dom";
import {ProjectItemType} from "../../types/ProjectItemType";
import {ColumnDone} from "./columnDone/ColumnDone";

const InfoProject: React.FC = (props: AppStateType) => {
    const {id: currentProjectId} = useParams()
    const dispatch = useDispatch()
    const currentTodo = props.todos.find((el: ProjectItemType) => String(el.id) === String(currentProjectId))
    console.log(currentTodo, 11111)
    const [currentTodoItem, setCurrentTodoItem] = useState('')
    const [currentBoard, setCurrentBoard] = useState<any>()
    const setNewOrderTodo = (data: any) => {
        dispatch(setTodo(data, currentTodo.id))
    }
    const [columns, setColumns] = useState(currentTodo.boards)


    return (
        <div className={S.body}>
            {currentProjectId && <div className={S.columnsBody}>
                {columns.map((board: any) => <ColumnDone
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
    setTodo, setIndexTodo,
})(InfoProject);

export default InfoProjectContainer;
