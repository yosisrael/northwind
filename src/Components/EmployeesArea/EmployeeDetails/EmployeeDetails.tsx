import { NavLink, useParams } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import "./EmployeeDetails.css";
import { useEffect, useState } from "react";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Service/EmployeesService";
import notifyService from "../../../Service/NotifyService";
import useTitle from "../../../Utils/UseTitle";

function EmployeeDetails(): JSX.Element {

    const [feEmployee, setFeEmployee] = useState<EmployeeModel>();

    const params = useParams();
    const id = +params.employeeId;

    useTitle(`Employee ${id} Details`);

    useEffect(() => {
        employeesService.getOneEmployee(id)
            .then(beEmployee => setFeEmployee(beEmployee))
            .catch(err => notifyService.error(err));
    }, [])

    return (
        <div className="EmployeeDetails">
            <h2>Employee Details</h2>
            <h3>Full Name: {feEmployee?.firstName + " " + feEmployee?.lastName}</h3>
            <h3>Title: {feEmployee?.title}</h3>
            <h3>Lives In: {feEmployee?.city + ", " + feEmployee?.country}</h3>
            <h3>BirthDay: {feEmployee?.birthDate}</h3>
            <br />
            <img src={appConfig.employeesUrl + "/images/" + feEmployee?.imageName} />
            <br />
            <NavLink to={appConfig.employeesRoute}>Back</NavLink>
            <span> | </span>
            <NavLink to={appConfig.editEmployeesRoute + id}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" >Delete</NavLink>

        </div>
    );
}

export default EmployeeDetails;
