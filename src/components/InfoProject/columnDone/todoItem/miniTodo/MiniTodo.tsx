import S from './MiniTodo.module.scss'

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {miniTodoType, todoItemType} from "../../../../../types/todoItemType";
import {useDispatch} from "react-redux";
import {
    createNewMiniTodo,
    deleteMiniTodoInTodo,
    setMiniTodoDone,
    setNameMiniTodo
} from "../../../../../store/TodoReducer";
import {useParams} from "react-router-dom";
import {MyInput} from "../../../../../UI/Input/MyInput";
import GeneratorRandomString from "../../../../../utils/generatorRandomString";

interface IMiniTodo {
    item: todoItemType
    board: string
}

export const MiniTodo = (props: IMiniTodo) => {
    const {id: currentProjectId} = useParams()
    const inputRef = useRef<HTMLInputElement>()
    const dispatch = useDispatch()
    const [miniTodo, setMiniTodo] = useState(props.item.miniTodo)
    const setNameTodo = (newName: string, id: string) => {
        dispatch(setNameMiniTodo(newName, props.item.id, currentProjectId, props.board, id))
    }
    const deleteMiniTodo = (id: string) => {
        // @ts-ignore
        setMiniTodo(prev => [...prev?.filter(el => el.id !== id)])
        dispatch(deleteMiniTodoInTodo(props.item.id, currentProjectId, props.board, id))
    }
    const setDoneTodo = (done: boolean, id: string) => {
        // @ts-ignore
        setMiniTodo(prevState => prevState.map((el: any) => {
            if (el.id === id) {
                return {
                    ...el,
                    done: done
                }
            }
            return el
        }))
        miniTodo && dispatch(setMiniTodoDone(done, props.item.id, currentProjectId, props.board, id))
    }
    const createMiniTodo = () => {
        const newMiniTodo = {
            name: inputRef.current && inputRef.current.value, id: GeneratorRandomString(), done: true
        }
        // @ts-ignore
        setMiniTodo(prev => [...prev, newMiniTodo])
        dispatch(createNewMiniTodo(newMiniTodo, props.item.id, currentProjectId, props.board,))

    }
    return (
        <div className={S.body}>
            {miniTodo && miniTodo.map(el => {
                return <MiniTodoItem key={el.id} deleteMiniTodo={deleteMiniTodo} item={el} setNameTodo={setNameTodo}
                                     setDoneTodo={setDoneTodo}/>
            })}
            <button onClick={() => {
                createMiniTodo()
            }}>добавить минизадачу
            </button>
            <MyInput ref={inputRef}/>
        </div>
    );
};

interface IMiniTodoItem {
    item: miniTodoType
    setDoneTodo: (done: boolean, id: string) => void
    setNameTodo: (name: string, id: string) => void
    deleteMiniTodo: (id: string) => void
}

export const MiniTodoItem = ({item, setDoneTodo, setNameTodo, deleteMiniTodo}: IMiniTodoItem) => {
    const dispatch = useDispatch()

    const refNameMiniTodo = useRef<HTMLInputElement>()
    useEffect(() => {
        if (refNameMiniTodo.current && item.name) {
            refNameMiniTodo.current.value = item.name
        }
    }, [])
    return (
        <div className={S.bodys}>
            <div className={S.miniTodoBody}>
                <MyInput onBlur={() => {
                    refNameMiniTodo.current && setNameTodo(refNameMiniTodo.current?.value, item.id)

                }} ref={refNameMiniTodo}/>
                <div onClick={() => {
                    setDoneTodo(!item.done, item.id)
                }} className={`${S.done} ${!item.done ? S.green : S.red}`}></div>
                <div className={S.deleteTodoMini} onClick={() => {
                    deleteMiniTodo(item.id)
                }}>x
                </div>
            </div>
        </div>
    );
};

