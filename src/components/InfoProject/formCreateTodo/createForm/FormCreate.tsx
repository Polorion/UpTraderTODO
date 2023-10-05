import {AppStateType} from "../../../../store/Store";
import * as React from "react";
import {useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import GeneratorRandomString from "../../../../utils/generatorRandomString";
import {addNewTodo, setEditTodo} from "../../../../store/TodoReducer";
import {MyInput} from "../../../../UI/Input/MyInput";
import S from './FormCreate.module.scss'
import moment from "moment";
import {todoItemType} from "../../../../types/todoItemType";

interface IFormCreate {
    item?: todoItemType,
    create: boolean
    setEditTodo: (idProject: string, data: todoItemType, idTodo: string, nameBoard: string) => any
    setIsModal: (type: boolean) => void
}

export const FormCreate = (props: IFormCreate) => {
    const refName = useRef<HTMLInputElement>()
    const refDescription = useRef<HTMLInputElement>()
    const refDataEnd = useRef<HTMLInputElement>()
    const refFile = useRef<HTMLInputElement>()
    const {id: currentProjectId} = useParams()
    const dispatch = useDispatch()
    const createTodo = (e: any) => {
        e.preventDefault()
        if (props.create) {

            const newTodo = {
                name: refName.current ? refName.current.value : '',
                text: refDescription.current ? refDescription.current.value : '',
                timeEnd: moment(refDataEnd.current ? refDataEnd.current.value : 0).unix(),
                refFile: refFile.current ? refFile.current.value : '',
                done: 'todoQueue',
                time: moment().unix(),
                id: GeneratorRandomString(),
                miniTodo: []

            }
            refName.current && refName.current.value === '' || currentProjectId && dispatch(addNewTodo(newTodo, currentProjectId))

        } else {
            const editTodo = {
                name: refName.current ? refName.current.value : '',
                text: refDescription.current ? refDescription.current.value : '',
                timeEnd: moment(refDataEnd.current ? refDataEnd.current.value : 0).unix(),
                refFile: refFile.current ? refFile.current.value : '',
            }
            refName.current && refName.current.value === '' || currentProjectId && dispatch(setEditTodo(String(currentProjectId), editTodo, String(props.item?.id), String(props.item?.done)))
        }
        if (refName.current && refName.current.value.length > 1) {

            props.setIsModal(false)
        }
    }
    useEffect(() => {
        if (refName.current && props.item) {
            refName.current.value = props.item?.name
        }
        if (refDescription.current && props.item) {
            refDescription.current.value = props.item?.text
        }
        if (refDataEnd.current && props.item) {
            refDataEnd.current.value = moment.unix(Number(props.item?.timeEnd)).format('YYYY-MM-D')
        }

    }, [])
    const inputFields = [
        {
            name: 'Заголовок',
            ref: refName,
            type: 'text'

        }, {
            name: 'Описание',
            ref: refDescription,
            type: 'text'

        }, {
            name: 'Дата окончания',
            ref: refDataEnd,
            type: 'date'

        }, {
            name: 'Вложенные файлы',
            ref: refFile,
            type: 'file'

        },]

    return (
        <form className={S.body}>
            {inputFields.map(el => {
                return <div key={el.name}>
                    <p>{el.name}</p>
                    <MyInput type={el.type} ref={el.ref}/>
                </div>
            })}


            <button onClick={
                createTodo
            }>{props.create ? 'созадть задание' : 'сохранить'}
            </button>
        </form>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {};
};

const FormCreateContainer = connect(mapStateToProps, {
    addNewTodo, setEditTodo
})(FormCreate);

export default FormCreateContainer;




