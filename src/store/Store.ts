import {combineReducers, legacy_createStore as createStore,} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import TodoReducer from "./TodoReducer";

const redusers = combineReducers({
    TodoReducer: TodoReducer,
});

type RootReducerType = typeof redusers;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(
    redusers,
    composeWithDevTools()
);

export default store;
