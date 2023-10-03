import * as React from 'react';
import {useState} from 'react';
import S from './InfoProject.module.scss'
import {AppStateType} from "../../store/Store";
import {connect, useDispatch} from "react-redux";
import {setIndexTodo, setProgress, setTodo} from "../../store/TodoReducer";
import {useParams} from "react-router-dom";
import {ProjectItemType} from "../../types/ProjectItemType";
import {todoItemType} from "../../types/todoItemType";
import {ColumnDone} from "./columnDone/ColumnDone";

const InfoProject: React.FC = (props: AppStateType) => {
    const {id: currentProjectId} = useParams()
    const dispatch = useDispatch()
    const currentTodo = props.todos.find((el: ProjectItemType) => String(el.id) === String(currentProjectId))
    const todoQueue = currentTodo.todo.filter((el: todoItemType) => el.done === 'queue')
    const todoDevelop = currentTodo.todo.filter((el: todoItemType) => el.done === 'develop')
    const todoDone = currentTodo.todo.filter((el: todoItemType) => el.done === 'done')
    const [currentTodoId, setCurrentTodoId] = useState('')

    const setIndexTodoInProject = (data: any) => {
        dispatch(setIndexTodo(data, currentTodo.id))
    }

    return (
        <div className={S.body}>

            {currentProjectId && <div className={S.columnsBody}>
                <ColumnDone currentTodo={currentTodo}
                            setIndexTodoInProject={setIndexTodoInProject}
                            currentTodoId={currentTodoId}
                            title={'в ожидании'}
                            data={todoQueue}
                            setCurrentTodoId={setCurrentTodoId}/>
                <ColumnDone currentTodo={currentTodo}

                            currentTodoId={currentTodoId}
                            setIndexTodoInProject={setIndexTodoInProject}
                            title={'в разработке'} data={todoDevelop}
                            setCurrentTodoId={setCurrentTodoId}/>
                <ColumnDone currentTodo={currentTodo}
                            setIndexTodoInProject={setIndexTodoInProject}
                            currentTodoId={currentTodoId}
                            title={'готово'}
                            data={todoDone}
                            setCurrentTodoId={setCurrentTodoId}/>
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
    setTodo, setProgress, setIndexTodo,
})(InfoProject);

export default InfoProjectContainer;
