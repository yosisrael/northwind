import { combineReducers, createStore } from "redux";
import { productsReducer } from "./ProductsState";
import { employeesReducer } from "./EmployeesState";
import { authReducer } from "./AuthState";

const rootReducer = combineReducers({
    productsReducer,
    employeesReducer,
    authReducer
})

export const rootStore = createStore(rootReducer);

