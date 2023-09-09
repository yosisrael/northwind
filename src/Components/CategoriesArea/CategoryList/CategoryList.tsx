import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesModel";
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
                if (err.response.status === 401) navigate(appConfig.loginRoute);
                notifyService.error(err);
            })
    }, [])
    console.log(categories)

    if (categories.length === 0) return <Spinner />
    return (
        < div className="CategoryList" >
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
