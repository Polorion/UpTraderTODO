import * as React from 'react';
import {useState} from 'react';
import S from './ColumnDone.module.scss'
import {todoItemType} from "../../../types/todoItemType";
import {doneTransfer} from "../../../utils/doneTransfer";

interface IColumnDone {
    data: todoItemType[]
    title: string,
    setCurrentTodoId: (id: string) => void
    currentTodoId: any
    currentTodo: any
    setIndexTodoInProject: any
}

export const ColumnDone = (props: IColumnDone) => {
    const [newArray, setNewArray] = useState(props.currentTodo.todo.map((el: any) => el))
    const onDragOverHandler = (e: any) => {
        e.preventDefault()
        if (e.target.className.indexOf('item') > 0) {
            e.target.style.boxShadow = ' 0 2px 3px black'
        }
    }

    const onDragLeaveHandler = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const onDragStartHandler = (e: any, id: any) => {
        props.setCurrentTodoId(id)
    }

    const onDragEndHandler = (e: any, id: any) => {
        e.target.style.boxShadow = 'none'
    }

    const onDropHandler = (e: any, nameBoard: any, id: any) => {
        e.target.style.boxShadow = 'none'


        // const newArray = [...props.currentTodo.todo]
        const indexDropItem = newArray.findIndex((el: any) => el.id === props.currentTodoId)
        const startIndex = newArray.findIndex((el: any) => el.id === id)

        let copy = Object.assign([], newArray);
        let index = indexDropItem;
        const qwer = copy.splice(index, 1)[0];
        console.log(qwer)

        // const elementDrop = newArray.splice(indexDropItem, 1)[0]
        qwer.done = doneTransfer(nameBoard)

        copy.splice(startIndex + 1, 0, qwer)
        props.setIndexTodoInProject(copy)
        console.log(copy)

    }

    function dropCardHandler(e: any, nameBoard: any) {
        // setNewArray((prev: any) => prev.map((el: any) => {
        //         if (el.id === props.currentTodoId) {
        //             el.done = doneTransfer(nameBoard)
        //             return el
        //         } else {
        //             return el
        //         }
        //     })
        // )
        // props.setIndexTodoInProject(newArray)

    }

    return (
        <div className={S.body}
             onDragOver={(e) => {
                 onDragOverHandler(e)
             }}
             onDrop={(e) => {
                 dropCardHandler(e, props.title)
             }}

        >
            <h2>{props.title}</h2>
            {props.data.map((el, id) => {
                return <div draggable={true}
                            onDragOver={(e) => {
                                onDragOverHandler(e)
                            }}
                            onDragLeave={(e) => {
                                onDragLeaveHandler(e)
                            }}
                            onDragStart={(e) => {
                                onDragStartHandler(e, el.id)
                            }}
                            onDragEnd={(e) => {
                                onDragEndHandler(e, el.id)
                            }}
                            onDrop={(e) => {
                                onDropHandler(e, props.title, el.id)
                            }}


                            className={`${id % 2 ? S.gray : S.black} ${S.item} `}
                            key={el.id}>{el.name}</div>
            })}
        </div>
    );
};