const SET_TOKEN = "SET_TOKEN";


export const setToken = (token: string) => {
    return {
        type: SET_TOKEN,
        token,
    };
};


const initialState = {
    userIsActive: {
        userName: "",
        userImg: "",
    },

};

const TodoReducer = (
    state = initialState,
    action: { [key: string]: string }
) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        default:
            return state;
    }
};

export default TodoReducer;

