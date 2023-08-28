import axios from "axios";
import EmployeeModel from "../Models/EmployeeModel";
import appConfig from "../Utils/AppConfig";

class EmployeesService {

    // Get all employees from the BE
    public async getAllEmployees(): Promise<EmployeeModel[]> {
        // Get all employees into response object:
        const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);

        // Extract the employees from the response
        const employees = response.data;

        // Return employees
        return employees;
    }

    // Get all employees from the BE
    public async getOneEmployee(employeeId: number): Promise<EmployeeModel> {

        // Get all employees into response object:
        const response = await axios.get<EmployeeModel>(appConfig.employeesUrl + employeeId);

        // Extract the employees from the response
        const employee = response.data;

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

        console.log(beEmployee);

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

        console.log(beEmployee);

        return beEmployee;
    }



}


const employeesService = new EmployeesService();



export default employeesService;