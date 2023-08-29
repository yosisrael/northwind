import EmployeeModel from "../Models/EmployeeModel";

// state class  
class EmployeesState {
    public employees: EmployeeModel[] = [];
}

// actionsType enum

export enum EmployeesActionType {
    SetEmployees = "SetEmployees",
    AddEmployee = "AddEmployee",
    UpdateEmployee = "UpdateEmployee",
    DeleteEmployee = "DeleteEmployee",
    ClearAll = "ClearAll"
}

// actions interface

export interface EmployeesAction {
    type: EmployeesActionType,
    payload?: any
}

// reducer

export function employeesReducer(currentState: EmployeesState = new EmployeesState(), action: EmployeesAction): EmployeesState {
    const newState = { ...currentState };

    switch (action.type) {
        case EmployeesActionType.SetEmployees:
            newState.employees = action.payload;
            break;
        case EmployeesActionType.AddEmployee:
            newState.employees.push(action.payload);
            break;
        case EmployeesActionType.UpdateEmployee:
            const indexToUpdate = newState.employees.findIndex(e => e.id === action.payload.id);
            newState.employees[indexToUpdate] = action.payload;
            break;
        case EmployeesActionType.DeleteEmployee:
            const indexToDelete = newState.employees.findIndex(e => e.id === action.payload);
            newState.employees.splice(indexToDelete, 1);
            break;
        case EmployeesActionType.ClearAll:
            newState.employees = [];
            break;
    }


    return newState;
}