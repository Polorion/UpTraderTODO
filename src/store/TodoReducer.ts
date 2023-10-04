import {ProjectItemType, ProjectTodo} from "../types/ProjectItemType";
import GeneratorRandomString from "../utils/generatorRandomString";
import {todoItemType} from "../types/todoItemType";

interface IInitialState {
    project: ProjectItemType[]
}

const SET_PROJECT = "SET_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const SET_TODO = "SET_TODO";
const SET_INDEX_TODO = "SET_INDEX_TODO";


export const setProject = (name: string) => {
    return {
        type: SET_PROJECT,
        name,
    };
};

export const setTodo = (data: ProjectTodo[], id: string) => {
    return {
        type: SET_TODO,
        data,
        id
    };
};
export const editProject = (newText: string, id: string) => {
    return {
        type: EDIT_PROJECT,
        newText,
        id
    };
};
export const deleteProject = (id: string) => {
    return {
        type: DELETE_PROJECT,
        id
    };
};
export const setIndexTodo = (data: todoItemType[], id: string) => {
    return {
        type: SET_INDEX_TODO,
        data, id
    };
};


const initialState: IInitialState = {
    project: [
        {
            name: '11',
            id: '1',
            todo: [
                {
                    title: 'todoQueue',
                    id: 1,
                    todo: [{
                        name: 'queue2 5',
                        done: 'queue',
                        time: '123',
                        id: 'queue2',
                        text: '212',
                        timeEnd: '2121'
                    },
                        {
                            name: 'queue1 3',
                            done: 'queue',
                            time: '123',
                            id: 'queue1',
                            text: '212',
                            timeEnd: '2121'
                        }]
                }, {
                    title: 'todoDevelop',
                    id: 2,
                    todo: [{
                        name: 'develop2 0',
                        done: 'develop',
                        time: '123',
                        id: 'develop2',
                        text: '212',
                        timeEnd: '2121'
                    },
                        {
                            name: 'develop1 1',
                            done: 'develop',
                            time: '123',
                            id: 'develop1',
                            text: '212',
                            timeEnd: '2121'
                        }]
                }, {
                    title: 'todoDone',
                    id: 3,
                    todo: [{
                        name: 'done2 4',
                        done: 'done',
                        time: '123',
                        id: 'done2',
                        text: '212',
                        timeEnd: '2121'
                    }]
                }
            ]

        }],


};

const TodoReducer = (
    state = initialState,
    action: { [key: string]: string }
) => {
    switch (action.type) {

        case SET_PROJECT:
            return {
                ...state,
                project: [...state.project, {name: action.name, id: GeneratorRandomString(), todo: []}],
            };

        case SET_TODO:
            return {
                ...state,
                project: state.project.map((el: any) => {

                    if (el.id === action.id) {

                        return {
                            ...el,
                            boards: action.data
                        }
                    } else return el
                })

            };
        case SET_INDEX_TODO:
            return {
                ...state,
                project: state.project.map(project => {
                    if (project.id === action.id) {
                        return {...project, todo: action.data}
                    } else {
                        return project
                    }

                }),
            };
        case DELETE_PROJECT:
            return {
                ...state,
                project: state.project.filter(el => el.id !== action.id),
            };
        case EDIT_PROJECT:
            return {
                ...state,
                project: state.project.map(el => {
                    if (el.id === action.id) {
                        return {...el, name: action.newText}
                    } else {
                        return el
                    }
                }),
            };
        default:
            return state;
    }
};


export default TodoReducer;

