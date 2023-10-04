import * as React from 'react';
import S from './ColumnDone.module.scss'
import {doneTransfer} from "../../../utils/doneTransfer";
import {todoItemType} from "../../../types/todoItemType";
import {ProjectItemType, ProjectTodo} from "../../../types/ProjectItemType";

interface IColumnDone {
    board: ProjectTodo
    setCurrentTodoItem: (item: todoItemType) => void
    setCurrentBoard: (board: ProjectTodo) => void
    currentBoard: any
    currentTodoItem: any
    currentTodo: ProjectItemType
    setColumns: (board: ProjectTodo) => void
    columns: any
    setNewOrderTodo: any

}


export const ColumnDone = (props: IColumnDone) => {
    const onDragOverHandler = (e: any) => {
        e.preventDefault()
        if (e.target.className.indexOf('item') > 0) {
            e.target.style.boxShadow = ' 0 2px 3px black'
        }
    }

    const onDragLeaveHandler = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const onDragStartHandler = (e: any, board: ProjectTodo, item: todoItemType) => {
        props.setCurrentTodoItem(item)
        props.setCurrentBoard(board)
    }

    const onDragEndHandler = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const onDropHandler = (e: any, board: ProjectTodo, item: todoItemType) => {
        e.stopPropagation()
        e.target.style.boxShadow = 'none'
        const currentIndex = props.currentBoard.todo.indexOf(props.currentTodoItem)
        props.currentBoard.todo.splice(currentIndex, 1)
        const dropIndex = board.todo.indexOf(item)
        board.todo.splice(dropIndex + 1, 0, props.currentTodoItem)

        props.setColumns(props.columns.map((column: any) => {
            if (column.id === board.id) {
                return board
            }
            if (column.id === props.currentBoard.id) {
                return props.currentBoard
            }
            return column
        }))
        props.setNewOrderTodo(props.columns)


    }

    const onDropHandlerBorder = (e: React.DragEvent<HTMLDivElement>, board: ProjectTodo) => {
        board.todo.push(props.currentTodoItem)
        const currentIndex = props.currentBoard.todo.indexOf(props.currentTodoItem)
        props.currentBoard.todo.splice(currentIndex, 1)
        props.setColumns(props.columns.map((column: any) => {
            if (column.id === board.id) {
                return board
            }
            if (column.id === props.currentBoard.id) {
                return props.currentBoard
            }
            return column
        }))
        props.setNewOrderTodo(props.columns)
    }

    return (<div key={props.board.id} className={S.board}
                 draggable={true}
                 onDragOver={(e) => {
                     onDragOverHandler(e)
                 }}
                 onDrop={(e) => {
                     onDropHandlerBorder(e, props.board,)
                 }}

        >
            <h2 className={S.boardTitle}>{doneTransfer(props.board.title)}</h2>
            {props.board.todo.map((item, id) => {
                return <div className={`${id % 2 ? S.gray : S.black} ${S.item} `}
                            key={item.id}
                            draggable={true}
                            onDragOver={(e) => {
                                onDragOverHandler(e)
                            }}
                            onDragLeave={(e) => {
                                onDragLeaveHandler(e)
                            }}
                            onDragStart={(e) => {
                                onDragStartHandler(e, props.board, item)
                            }}
                            onDragEnd={(e) => {
                                onDragEndHandler(e)
                            }}
                            onDrop={(e) => {
                                onDropHandler(e, props.board, item)
                            }}>{item.name}
                </div>
            })}
        </div>
    );
};