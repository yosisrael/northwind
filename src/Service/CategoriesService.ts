import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";
import { rootStore } from "../Redux/rootReducer";
import { CategoriesActionTypes, CategoryAction } from "../Redux/CategoriesState";

class CategoriesService {

    public async getAllCategories(): Promise<CategoryModel[]> {

        let categories = rootStore.getState().categoriesReducer.categories;
        if (categories.length === 0) {

            const options = {
                headers: { 'Authorization': `Bearer ${rootStore.getState().authReducer.token}` }
            }
            const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl, options);

            categories = response.data;

            const action: CategoryAction = { type: CategoriesActionTypes.SetCategories, payload: categories }
            rootStore.dispatch(action);
        }

        return categories;
    }

    public async getOneCategory(id: number): Promise<CategoryModel> {

        const options = {
            headers: { 'Authorization': `Bearer ${rootStore.getState().authReducer.token}` }
        }

        const response = await axios.get(appConfig.categoriesUrl + id, options);

        const category = response.data;

        return category;
    }

    public async updateCategory(category: CategoryModel): Promise<void> {

        const options = {
            headers: {
                'Authorization': `Bearer ${rootStore.getState().authReducer.token}`,
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios.put(appConfig.categoriesUrl + category.id, category, options);

        const beCategory = response.data;

        const action: CategoryAction = { type: CategoriesActionTypes.UpdateCategory, payload: beCategory }
        rootStore.dispatch(action);

    }

    public async addCategory(category: CategoryModel): Promise<void> {

        const options = {
            headers: {
                'Authorization': `Bearer ${rootStore.getState().authReducer.token}`,
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios.post(appConfig.categoriesUrl, category, options);

        const beCategory = response.data;

        const action: CategoryAction = { type: CategoriesActionTypes.AddCategory, payload: beCategory }
        rootStore.dispatch(action);

    }

    public async deleteCategory(id: number): Promise<void> {
        const options = {
            headers: {
                'Authorization': `Bearer ${rootStore.getState().authReducer.token}`
            }
        }
        await axios.delete(appConfig.categoriesUrl + id, options);
        const action: CategoryAction = { type: CategoriesActionTypes.DeleteCategory, payload: id }
        rootStore.dispatch(action);
    }

    public clearAll() {
        const action: CategoryAction = { type: CategoriesActionTypes.ClearAll }
        rootStore.dispatch(action);
    }
}

const categoriesService = new CategoriesService();

export default categoriesService;
