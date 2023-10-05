import {ProjectItemType, ProjectTodo} from "../types/ProjectItemType";
import GeneratorRandomString from "../utils/generatorRandomString";
import {miniTodoType, todoItemType} from "../types/todoItemType";

interface IInitialState {
    project: ProjectItemType[]
}

const SET_PROJECT = "SET_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const SET_TODO = "SET_TODO";
const ADD_NEW_TODO = 'ADD_NEW_TODO'
const EDIT_TODO = 'EDIT_TODO'
const SET_DONE_MINI_TODO = 'SET_DONE_MINI_TODO'
const CREATE_MINI_TODO = 'CREATE_MINI_TODO'
const SET_NAME_MINI_TODO = 'SET_NAME_MINI_TODO'
const DELETE_MINI_TODO = 'DELETE_MINI_TODO'


export const setProject = (name: string) => {
    return {
        type: SET_PROJECT,
        name,
    };
};
export const deleteMiniTodoInTodo = (id: string | undefined, projectId: string | undefined, boardName: string, idItem: string) => {
    return {
        type: DELETE_MINI_TODO,
        id,
        boardName,
        idItem,
        projectId
    };
};
export const setNameMiniTodo = (name: string, id: string | undefined, projectId: string | undefined, boardName: string, idItem: string) => {
    return {
        type: SET_NAME_MINI_TODO,
        name,
        id,
        projectId, boardName,
        idItem
    };
};
export const createNewMiniTodo = (data: miniTodoType, id: string | undefined, projectId: string | undefined, boardName: string,) => {
    return {
        type: CREATE_MINI_TODO,
        data,
        id, projectId,
        boardName
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
export const setMiniTodoDone = (done: boolean, id: string | undefined, projectId: string | undefined, boardName: string, idItem: string) => {
    return {
        type: SET_DONE_MINI_TODO,
        done,
        id,
        projectId,
        boardName,
        idItem
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
                        miniTodo: [{name: '1221', done: false, id: '123'}, {name: '1221', done: false, id: '1232'}]
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

        }, {
            name: '222',
            id: '2',
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
                    if (el.id === action.id) {
                        return {
                            ...el,
                            todo: el.todo.map(item => {
                                if (item.title === 'todoQueue') {
                                    return {
                                        ...item,
                                        todo: [...item.todo, action.data]
                                    }
                                }
                                return item
                            })
                        }
                    } else return el


                })]
            };
        case DELETE_MINI_TODO:
            console.log(action)
            return {
                ...state,
                project: state.project.map(projects => {
                    if (projects.id === action.projectId) {
                        return {
                            ...projects,
                            todo: projects.todo.map(board => {
                                if (board.title === action.boardName) {
                                    return {
                                        ...board,
                                        todo: board.todo.map(item => {
                                            if (item.id === action.id) {
                                                return {
                                                    ...item,
                                                    // @ts-ignore
                                                    miniTodo: item.miniTodo.filter(el => el.id !== action.idItem)
                                                }
                                            }
                                            return item
                                        })
                                    }
                                }
                                return board
                            })
                        }
                    }
                    return projects
                })
            };
        case SET_PROJECT:
            return {
                ...state,
                project: [...state.project, {
                    name: action.name, id: GeneratorRandomString(), todo: [
                        {
                            title: 'todoQueue',
                            id: 1,
                            todo: []
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
        case EDIT_TODO:
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
        case SET_DONE_MINI_TODO:

            return {
                ...state,
                project: state.project.map(projects => {
                    if (projects.id === action.projectId) {
                        return {
                            ...projects,
                            todo: projects.todo.map(board => {
                                if (board.title === action.boardName) {
                                    return {
                                        ...board,
                                        todo: board.todo.map(item => {
                                            if (item.id === action.id) {
                                                return {
                                                    ...item,
                                                    // @ts-ignore
                                                    miniTodo: item.miniTodo.map(el => {
                                                        if (el.id === action.idItem) {
                                                            return {
                                                                ...el,
                                                                done: action.done

                                                            }
                                                        }
                                                        return el
                                                    })
                                                }
                                            }
                                            return item
                                        })
                                    }
                                }
                                return board
                            })
                        }
                    }
                    return projects
                })
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
        case SET_NAME_MINI_TODO:
            console.log(action)
            return {
                ...state, project: [...state.project.map(projects => {
                    if (projects.id === action.projectId) {
                        return {
                            ...projects,
                            todo: projects.todo.map(board => {
                                if (board.title === action.boardName) {
                                    return {
                                        ...board,
                                        todo: board.todo.map(item => {
                                            if (item.id === action.id) {
                                                return {
                                                    ...item,
                                                    // @ts-ignore
                                                    miniTodo: [...item.miniTodo.map(el => {
                                                        if (el.id === action.idItem)
                                                            return {
                                                                ...el,
                                                                name: action.name
                                                            }
                                                        return el
                                                    })]
                                                }
                                            }
                                            return item
                                        })
                                    }
                                }
                                return board
                            })
                        }
                    }
                    return projects
                })]

            };
        case CREATE_MINI_TODO:
            return {
                ...state,
                project: [...state.project.map(projects => {
                    if (projects.id === action.projectId) {
                        return {
                            ...projects,
                            todo: projects.todo.map(board => {
                                if (board.title === action.boardName) {
                                    return {
                                        ...board,
                                        todo: board.todo.map(item => {
                                            if (item.id === action.id) {
                                                return {
                                                    ...item,
                                                    // @ts-ignore
                                                    miniTodo: [...item.miniTodo, action.data]
                                                }
                                            }
                                            return item
                                        })
                                    }
                                }
                                return board
                            })
                        }
                    }
                    return projects
                })]
            };
        default:
            return state;
    }
};


export default TodoReducer;

