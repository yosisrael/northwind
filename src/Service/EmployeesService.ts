import axios from "axios";
import EmployeeModel from "../Models/EmployeeModel";
import appConfig from "../Utils/AppConfig";
import { rootStore } from "../Redux/rootReducer";
import { EmployeesAction, EmployeesActionType } from "../Redux/EmployeesState";

class EmployeesService {

    // Get all employees from the BE
    public async getAllEmployees(): Promise<EmployeeModel[]> {

        let employees = rootStore.getState().employeesReducer.employees;

        if (employees.length === 0) {

            // Get all employees into response object:
            const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);

            // Extract the employees from the response
            employees = response.data;

            const action: EmployeesAction = { type: EmployeesActionType.SetEmployees, payload: employees }
            rootStore.dispatch(action);
        }

        // Return employees
        return employees;
    }

    // Get all employees from the BE
    public async getOneEmployee(employeeId: number): Promise<EmployeeModel> {

        const employees = rootStore.getState().employeesReducer.employees;

        let employee = employees.find(e => e.id === employeeId);

        if (!employee) {

            // Get all employees into response object:
            const response = await axios.get<EmployeeModel>(appConfig.employeesUrl + employeeId);

            // Extract the employees from the response
            employee = response.data;
        }

        // Return employees
        return employee;
    }

    public async addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
        const options = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const response = await axios.post(appConfig.employeesUrl, employee, options);

        const beEmployee = response.data;

        const action: EmployeesAction = { type: EmployeesActionType.AddEmployee, payload: beEmployee }

        rootStore.dispatch(action);

        return beEmployee;
    }

    public async updateEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
        const options = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const response = await axios.put(appConfig.employeesUrl + employee.id, employee, options);

        const beEmployee = response.data;

        const action: EmployeesAction = { type: EmployeesActionType.UpdateEmployee, payload: beEmployee }

        rootStore.dispatch(action);

        return beEmployee;
    }

    public async deleteEmployee(employeeId: number): Promise<void> {
        await axios.delete(appConfig.employeesUrl + employeeId);

        const action: EmployeesAction = { type: EmployeesActionType.DeleteEmployee, payload: employeeId }
        rootStore.dispatch(action);
    }

    public clearAllEmployees(): void {
        const action: EmployeesAction = { type: EmployeesActionType.ClearAll }
        rootStore.dispatch(action);
    }



}


const employeesService = new EmployeesService();



export default employeesService;