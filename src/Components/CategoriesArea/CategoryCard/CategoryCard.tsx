import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import appConfig from "../../../Utils/AppConfig";
import "./CategoryCard.css";

type CategoryProps = {
    category: CategoryModel
}


function CategoryCard(props: CategoryProps): JSX.Element {

    const navigate = useNavigate();
    return (
        <tr className="CategoryCard" onClick={() => navigate(appConfig.categoriesRoute + "details/" + props.category.id)}>
            <td>{props.category.name}</td>
            <td>{props.category.description}</td>
            <td><img src={props.category.imageUrl} /></td>
        </tr>
    );
}

export default CategoryCard;
