import { combineReducers, createStore } from "redux";
import { productsReducer } from "./ProductsState";
import { employeesReducer } from "./EmployeesState";
import { authReducer } from "./AuthState";
import { categoriesReducer } from "./CategoriesState";

const rootReducer = combineReducers({
    productsReducer,
    employeesReducer,
    categoriesReducer,
    authReducer
})

export const rootStore = createStore(rootReducer);

