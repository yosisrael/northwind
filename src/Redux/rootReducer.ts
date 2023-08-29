import { combineReducers, createStore } from "redux";
import { productsReducer } from "./ProductsState";
import { employeesReducer } from "./EmployeesState";

const rootReducer = combineReducers({ productsReducer: productsReducer, employeesProducer: employeesReducer })

export const rootStore = createStore(rootReducer);

