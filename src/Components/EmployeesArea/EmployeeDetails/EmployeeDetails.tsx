import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Service/EmployeesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import Spinner from "../../../Utils/Spinner/Spinner";
import useTitle from "../../../Utils/UseTitle";
import "./EmployeeDetails.css";

function EmployeeDetails(): JSX.Element {

    const [feEmployee, setFeEmployee] = useState<EmployeeModel>();

    const params = useParams();
    const id = +params.employeeId;

    useTitle(`Employee ${id} Details`);


    useEffect(() => {
        employeesService.getOneEmployee(id)
            .then(beEmployee => setFeEmployee(beEmployee))
            .catch(err => notifyService.error(err));
    }, []);

    function handleDelete(): void {
        try {
            employeesService.deleteEmployee(id);
            notifyService.success(`Employee ${id} deleted successfully`);
        } catch (err) {
            notifyService.error(err)
        }
    }

    if (!feEmployee) return <Spinner />

    return (
        <div className="EmployeeDetails">
            <h2>Employee Details</h2>
            <h3>Full Name: {feEmployee?.firstName + " " + feEmployee?.lastName}</h3>
            <h3>Title: {feEmployee?.title}</h3>
            <h3>Lives In: {feEmployee?.city + ", " + feEmployee?.country}</h3>
            <h3>BirthDay: {feEmployee?.birthDate}</h3>
            <br />
            <img src={feEmployee?.imageUrl} />
            <br />
            <NavLink to={appConfig.employeesRoute}>Back</NavLink>
            <span> | </span>
            <NavLink to={appConfig.editEmployeesRoute + id}>Edit</NavLink>
            <span> | </span>
            <NavLink to={appConfig.employeesRoute} onClick={handleDelete}>Delete</NavLink>

        </div>
    );
}

export default EmployeeDetails;
