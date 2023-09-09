import { NavLink, useNavigate } from "react-router-dom";
import EmployeeModel from "../../../Models/EmployeeModel";
import appConfig from "../../../Utils/AppConfig";
import "./EmployeeCard.css";

type EmployeeProps = {
    employee: EmployeeModel
}

function EmployeeCard(props: EmployeeProps): JSX.Element {

    const navigate = useNavigate();

    function handleClick() {
        navigate(appConfig.employeeDetailsRoute + props.employee.id);
    }

    return (
        <tr className="EmployeeCard" onClick={handleClick}>
            <td><img src={props.employee.imageUrl} /></td>
            <td>{props.employee.firstName} {props.employee.lastName}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.city},{props.employee.country}</td>
            <td>{props.employee.birthDate}</td>
        </tr >
    );
}

export default EmployeeCard;
