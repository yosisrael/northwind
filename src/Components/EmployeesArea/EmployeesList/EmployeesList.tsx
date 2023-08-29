import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import addImage from "../../../Assets/images/More_Icon_C.svg.png";
import clearImage from "../../../Assets/images/clear-cache-icon.png";
import EmployeeModel from "../../../Models/EmployeeModel";
import { EmployeesAction, EmployeesActionType } from "../../../Redux/EmployeesState";
import { rootStore } from "../../../Redux/rootReducer";
import employeesService from "../../../Service/EmployeesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import useTitle from "../../../Utils/UseTitle";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import "./EmployeesList.css";
import Spinner from "../../../Utils/Spinner/Spinner";


function EmployeesList(): JSX.Element {

    useTitle("Employees");

    const [feEmployees, setFeEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        employeesService.getAllEmployees()
            .then(employees => setFeEmployees(employees))
            .catch(err => (err.message))
    }, []);

    function handleClearAll() {
        employeesService.clearAllEmployees();
        notifyService.success("All employees cleared successfully");
    }

    if (feEmployees.length === 0) return <Spinner />

    return (
        <div className="EmployeesList">
            <div className="addBtn">
                <NavLink to={appConfig.newEmployeesRoute}><img src={addImage} /></NavLink>
                <NavLink to={appConfig.homeRoute} onClick={handleClearAll}><img src={clearImage} /></NavLink>
            </div>

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
