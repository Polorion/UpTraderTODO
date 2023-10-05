import moment from "moment/moment";
import S from "./TodoItem.module.scss";
import * as React from "react";
import {useState} from "react";
import 'moment/locale/ru';
import {EditTodo} from "./editTodo/EditTodo";
import {todoItemType} from "../../../../types/todoItemType";
import {MiniTodoContainer} from "./miniTodo/MiniTodoContainer";

interface ITodoItem {
    item: todoItemType
    board: string
}

export const TodoItem = (props: ITodoItem) => {
    const startDate = Number(props.item.time)
    const nowDate = moment().unix()
    const durationTime = moment.duration((nowDate - startDate) * 1000);
    const timeInJob = durationTime.minutes() + ' м ' + durationTime.seconds() + ' с';
    const [isHiddeDate, setIsHiddeDate] = useState(false)

    return (
        <div className={S.body}>
            <div className={S.header}>
                <EditTodo item={props.item}/>
                <div className={S.name}>{props.item.name}</div>

                <div className={S.text}>{props.item.text.length > 1 && <span>описание: </span>}{props.item.text}</div>
            </div>
            <div className={S.miniTodo}><MiniTodoContainer board={props.board} item={props.item}/></div>
            <div className={S.data}>
                <p className={S.showDate} onMouseEnter={() => {
                    setIsHiddeDate(true)
                }} onMouseLeave={() => {
                    setIsHiddeDate(false)
                }}>посмотреть даты</p>
                <div className={`${S.dataHidden} ${isHiddeDate && S.active}`}>
                    <div className={S.createTime}>дата
                        создания: {moment.unix(startDate).format('D MMMM  YYYY, h:mm')}</div>
                    <div className={S.createTime}>задание в работе: {timeInJob}</div>
                    <div className={S.endTime}>дата конца
                        задания:{props.item.timeEnd ? moment.unix(Number(props.item.timeEnd)).format('D MMMM  YYYY') : 'не назвачено'}</div>
                </div>
            </div>
        </div>
    );
};


