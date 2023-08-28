import { useEffect, useState } from "react";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Service/EmployeesService";
import appConfig from "../../../Utils/AppConfig";
import "./EmployeesList.css";
import useTitle from "../../../Utils/UseTitle";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { NavLink } from "react-router-dom";


function EmployeesList(): JSX.Element {

    useTitle("Employees");

    const [feEmployees, setFeEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        employeesService.getAllEmployees()
            .then(employees => setFeEmployees(employees))
            .catch(err => (err.message))
    }, []);

    return (
        <div className="EmployeesList">
            <NavLink className="addBtn" to={appConfig.newEmployeesRoute}>+</NavLink>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Full Name</th>
                        <th>Title</th>
                        <th>Lives In</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {feEmployees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeesList;
