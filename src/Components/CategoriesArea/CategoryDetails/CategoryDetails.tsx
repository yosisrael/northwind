import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import Spinner from "../../../Utils/Spinner/Spinner";
import useTitle from "../../../Utils/UseTitle";
import "./CategoryDetails.css";

function CategoryDetails(): JSX.Element {

    const [feCategory, setFeCategory] = useState<CategoryModel>();

    const params = useParams();
    const id = +params.categoryId;

    useTitle(`Category ${id} Details`);

    const navigate = useNavigate();

    useEffect(() => {
        categoriesService.getOneCategory(id)
            .then(beCategory => setFeCategory(beCategory))
            .catch(err => {
                if (err.response.status === 401) navigate(appConfig.loginRoute);
                notifyService.error(err)
            });
    }, []);

    async function handleDelete(): Promise<void> {
        try {
            await categoriesService.deleteCategory(id);
            notifyService.success(`Category ${id} deleted successfully`);
        } catch (err) {
            notifyService.error(err)
        }
    }

    if (!feCategory) return <Spinner />

    return (
        <div className="CategoryDetails">
            <h2>Category Details</h2>
            <h3>Name: {feCategory?.name}</h3>
            <h3>Title: {feCategory?.description}</h3>
            <br />
            <img src={feCategory?.imageUrl} />
            <br />
            <NavLink to={appConfig.categoriesRoute}>Back</NavLink>
            <span> | </span>
            <NavLink to={appConfig.editCategoryRoute + id}>Edit</NavLink>
            <span> | </span>
            <NavLink to={appConfig.categoriesRoute} onClick={handleDelete}>Delete</NavLink>
        </div>
    );
}

export default CategoryDetails;