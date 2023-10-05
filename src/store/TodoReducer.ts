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
const ADD_NEW_TODO = 'ADD_NEW_TODO'
const EDIT_TODO = 'EDIT_TODO'


export const setProject = (name: string) => {
    return {
        type: SET_PROJECT,
        name,
    };
};
export const setEditTodo = (idProject: string, data: todoItemType, idTodo: string, nameBoard: string) => {
    return {
        type: EDIT_TODO,
        data,
        idProject,
        idTodo,
        nameBoard
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
export const addNewTodo = (data: todoItemType, id: string) => {
    return {
        type: ADD_NEW_TODO,
        data,
        id
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
                        name: "fds",
                        text: "",
                        timeEnd: '',
                        refFile: "",
                        done: "todoQueue",
                        time: 1696508028,
                        id: "myxulmuvorp",
                    },
                    ]
                }, {
                    title: 'todoDevelop',
                    id: 2,
                    todo: []
                }, {
                    title: 'todoDone',
                    id: 3,
                    todo: []
                }
            ]

        }],


};

const TodoReducer = (
    state = initialState,
    action: { [key: string]: string }
) => {
    switch (action.type) {

        case ADD_NEW_TODO:
            return {
                ...state,
                project: [...state.project.map(el => {
                    return {
                        ...el,
                        todo: el.todo.map(e => {
                            if (String(e.id) === action.id) {

                                return {
                                    ...e,
                                    todo: [...e.todo, action.data]
                                }
                            } else {
                                return e
                            }

                        })
                    }

                })]
            };
        case SET_PROJECT:
            return {
                ...state,
                project: [...state.project, {name: action.name, id: GeneratorRandomString(), todo: []}],
            };
        case EDIT_TODO:
            console.log(action)
            return {
                ...state,
                project: [...state.project.map((proj) => {
                    if (proj.id === action.idProject) {
                        return {
                            ...proj,
                            todo: proj.todo.map(board => {
                                if (board.title === action.nameBoard) {
                                    return {
                                        ...board,
                                        todo: board.todo.map(item => {
                                            if (item.id === action.idTodo) {
                                                return {
                                                    ...item,
                                                    // @ts-ignore
                                                    ...action.data
                                                }
                                            }
                                            return item
                                        })
                                    }
                                }
                                return board
                            })
                        }
                    } else return proj
                })]
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

