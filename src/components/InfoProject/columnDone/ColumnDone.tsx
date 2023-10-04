import * as React from 'react';
import S from './ColumnDone.module.scss'
import {doneTransfer} from "../../../utils/doneTransfer";

interface IColumnDone {
    board: any
    setCurrentTodoItem: any
    setCurrentBoard: any
    currentBoard: any
    currentTodoItem: any
    currentTodo: any
    setColumns: any
    columns: any

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

    const onDragStartHandler = (e: any, board: any, item: any) => {
        props.setCurrentTodoItem(item)
        props.setCurrentBoard(board)
    }

    const onDragEndHandler = (e: any, id: any) => {
        e.target.style.boxShadow = 'none'
    }

    const onDropHandler = (e: any, board: any, item: any) => {
        e.stopPropagation()
        e.target.style.boxShadow = 'none'
        const currentIndex = props.currentBoard.todo.indexOf(props.currentTodoItem)
        props.currentBoard.todo.splice(currentIndex, 1)
        const dropIndex = board.todo.indexOf(item)
        board.todo.splice(dropIndex + 1, 0, props.currentTodoItem)

        props.setColumns(props.columns.map((d: any) => {
            if (d.id === board.id) {
                return board
            }
            if (d.id === props.currentBoard.id) {
                return props.currentBoard
            }
            return d
        }))


    }

    const onDropHandlerBorder = (e: React.DragEvent<HTMLDivElement>, board: any) => {
        board.todo.push(props.currentTodoItem)
        const currentIndex = props.currentBoard.todo.indexOf(props.currentTodoItem)
        props.currentBoard.todo.splice(currentIndex, 1)
        props.setColumns(props.columns.map((d: any) => {
            if (d.id === board.id) {
                return board
            }
            if (d.id === props.currentBoard.id) {
                return props.currentBoard
            }
            return d
        }))
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
            {props.board.todo.map((item: any, id: any) => {
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
                                onDragEndHandler(e, item)
                            }}
                            onDrop={(e) => {
                                onDropHandler(e, props.board, item)
                            }}>{item.name}
                </div>
            })}
        </div>
    );
};