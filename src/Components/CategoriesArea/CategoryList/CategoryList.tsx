import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import addImage from "../../../Assets/images/More_Icon_C.svg.png";
import clearImage from "../../../Assets/images/clear-cache-icon.png";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import Spinner from "../../../Utils/Spinner/Spinner";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";

function CategoryList(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        categoriesService.getAllCategories()
            .then(categories => setCategories(categories))
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 403) navigate(appConfig.loginRoute);
                notifyService.error(err);
            })
    }, [])

    function handleClearAll() {
        categoriesService.clearAll();
        notifyService.success("Categories list cleared");
    }

    if (categories.length === 0) return <Spinner />
    return (
        < div className="CategoryList" >
            <div className="addBtn">
                <NavLink to={appConfig.newCategoryRoute}><img src={addImage} /></NavLink>
                <NavLink to={appConfig.homeRoute} onClick={handleClearAll}><img src={clearImage} /></NavLink>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c => <CategoryCard key={c.id} category={c} />)}
                </tbody>
            </table>

        </div >
    );
}

export default CategoryList;
