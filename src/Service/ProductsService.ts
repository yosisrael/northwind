import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { ProductAction, ProductsAction } from "../Redux/ProductsState";
import appConfig from "../Utils/AppConfig";
import { rootStore } from "../Redux/rootReducer";


class ProductsService {

    // Get all products from the BE
    public async getAllProducts(): Promise<ProductModel[]> {

        let products = rootStore.getState().productsReducer.products;

        if (products.length === 0) {
            // Get all products into response object:
            const response = await axios.get<ProductModel[]>(appConfig.productsUrl);

            // Extract the products from the response
            products = response.data;

            const action: ProductAction = { type: ProductsAction.SetProducts, payload: products }

            rootStore.dispatch(action);
        }

        // Return products
        return products;
    }

    public async getOneProduct(prodId: number): Promise<ProductModel> {

        const products = rootStore.getState().productsReducer.products;

        let product = products.find(p => p.id === prodId);

        if (!product) {
            // // Get all products into response object:
            const response = await axios.get<ProductModel>(appConfig.productsUrl + prodId);

            // // Extract the products from the response
            product = response.data;
        }

        // Return product
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        // Header is additional data  sent in the request for configuration
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        // Get all products into response object:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, options);

        // Extract the products from the response
        const beProduct = response.data;

        const action: ProductAction = { type: ProductsAction.AddProduct, payload: beProduct }

        rootStore.dispatch(action);
        // Return product
        return beProduct;

    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        // Header is additional data  sent in the request for configuration
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        // Get all products into response object:
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, options);

        // Extract the products from the response
        const updatedProduct = response.data;

        const action: ProductAction = { type: ProductsAction.AddProduct, payload: updatedProduct }

        rootStore.dispatch(action);

        // Return product
        return updatedProduct;

    }

    // Delete the products from Backend
    public async deleteProduct(id: number): Promise<void> {
        // to delete the product in Backend
        await axios.delete(appConfig.productsUrl + id);

        const action: ProductAction = { type: ProductsAction.DeleteProduct, payload: id }

        rootStore.dispatch(action);
    }

    public clearAllProducts(): void {
        const action: ProductAction = { type: ProductsAction.ClearAll };
        rootStore.dispatch(action);
    }
}

const productsService = new ProductsService();



export default productsService;