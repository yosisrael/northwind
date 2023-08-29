import ProductModel from "../Models/ProductModel";

export class ProductsState {
    public products?: ProductModel[] = [];
}

export enum ProductsAction {
    SetProducts = "SetProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    DeleteProduct = "DeleteProduct",
    ClearAll = "ClearAll"
}


export interface ProductAction {
    type: ProductsAction,
    payload?: any
}


export function productsReducer(currentState = new ProductsState(), action: ProductAction): ProductsState {
    // Clone productsState
    const newState = { ...currentState };

    switch (action.type) {
        case ProductsAction.SetProducts:
            newState.products = action.payload;
            break;
        case ProductsAction.AddProduct:
            newState.products.push(action.payload);
            break;
        case ProductsAction.UpdateProduct:
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.products[indexToUpdate] = action.payload;
            break;
        case ProductsAction.DeleteProduct:
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.products.splice(indexToDelete, 1);
            break;
        case ProductsAction.ClearAll:
            newState.products = [];
    }

    return newState;
}