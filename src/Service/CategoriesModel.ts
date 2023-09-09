import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";
import { rootStore } from "../Redux/rootReducer";

class CategoriesService {

    public async getAllCategories(): Promise<CategoryModel[]> {

        const options = {
            headers: { 'Authorization': `Bearer ${rootStore.getState().authReducer.token}` }
        }
        const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl, options);

        const categories = response.data;

        return categories;
    }
}

const categoriesService = new CategoriesService();

export default categoriesService;
