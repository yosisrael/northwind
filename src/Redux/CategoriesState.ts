import CategoryModel from "../Models/CategoryModel";

export class CategoriesState {
    categories: CategoryModel[] = []
}

export enum CategoriesActionTypes {
    SetCategories = "SetCategories",
    AddCategory = "AddCategory",
    UpdateCategory = "UpdateCategory",
    DeleteCategory = "DeleteCategory",
    ClearAll = "ClearAll"
}

export interface CategoryAction {
    type: CategoriesActionTypes,
    payload?: any
}


export function categoriesReducer(currentState = new CategoriesState(), action: CategoryAction): CategoriesState {
    const newState = { ...currentState };

    switch (action.type) {
        case CategoriesActionTypes.SetCategories:
            newState.categories = action.payload;
            break;
        case CategoriesActionTypes.AddCategory:
            newState.categories.push(action.payload);
            break;
        case CategoriesActionTypes.UpdateCategory:
            const indexToUpdate = newState.categories.findIndex(c => c.id === action.payload.id);
            console.log(indexToUpdate)
            if (indexToUpdate >= 0) newState.categories[indexToUpdate] = action.payload;
            break;
        case CategoriesActionTypes.DeleteCategory:
            const indexToDelete = newState.categories.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.categories.splice(indexToDelete, 1);
            break;
        case CategoriesActionTypes.ClearAll:
            newState.categories = [];
            break;
    }

    return newState;
}
