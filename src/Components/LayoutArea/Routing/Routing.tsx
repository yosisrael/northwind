import { Navigate, Route, Routes } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import About from "../../AboutArea/About/About";
import Employees from "../../EmployeesArea/EmployeesList/EmployeesList";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import Page404 from "../Page404/Page404";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import EmployeeDetails from "../../EmployeesArea/EmployeeDetails/EmployeeDetails";
import AddEmployee from "../../EmployeesArea/AddEmployee/AddEmployee";
import EditEmployee from "../../EmployeesArea/EditEmployee/EditEmployee";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                {/*********** Home ***********/}
                <Route path={appConfig.homeRoute} element={<Home />} />

                {/********** Products **********/}

                {/* Products Route */}
                <Route path={appConfig.productsRoute} element={<ProductsList />} />
                {/* Product Details Route */}
                <Route path={appConfig.productDetailsRoute + ":prodId"} element={<ProductDetails />} />
                {/* Edit Product Route */}
                <Route path={appConfig.editProductRoute + ":prodId"} element={<EditProduct />} />
                {/* Add Product Route */}
                <Route path={appConfig.addNewProductRoute} element={<AddProduct />} />

                {/*********** Employees ***********/}

                {/* Employees Route */}
                <Route path={appConfig.employeesRoute} element={<Employees />} />
                {/* Employee Details Route */}
                <Route path={appConfig.employeeDetailsRoute + ":employeeId"} element={<EmployeeDetails />} />
                {/* Edit Employee Route */}
                <Route path={appConfig.editEmployeesRoute + ":employeeId"} element={<EditEmployee />} />
                {/* New Employee Route */}
                <Route path={appConfig.newEmployeesRoute} element={<AddEmployee />} />


                {/*********** About ***********/}
                <Route path={appConfig.aboutRoute} element={<About />} />

                {/*********** General ***********/}

                {/* Default Rote */}
                <Route path="/" element={<Navigate to={appConfig.homeRoute} />} />

                {/* Page not found Rote */}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
