import { NavLink } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import "./Menu.css";
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";
import TotalEmployees from "../../EmployeesArea/TotalEmployees/TotalEmployees";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to={appConfig.homeRoute}>Home</NavLink>
            <NavLink to={appConfig.productsRoute}>Products</NavLink>
            <NavLink to={appConfig.employeesRoute}>Employees</NavLink>
            <NavLink to={appConfig.aboutRoute}>About</NavLink>
            <br />
            <TotalProducts />
            <TotalEmployees />
            {/* <a href={appConfig.homeRoute}>Home</a> */}
            {/* <a href="/products">Products</a> */}
            {/* <a href="/about">About</a> */}
        </div >
    );
}

export default Menu;
