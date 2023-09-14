import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./AddCategory.css";

function AddCategory(): JSX.Element {

    // Form functions

    const { register, handleSubmit } = useForm<CategoryModel>();

    const navigate = useNavigate();

    // handle uploaded image preview
    const [imageFile, setImageFile] = useState<File | null>(null);

    const previewSrc = useImagePreview(imageFile);

    function handleImage(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;

        setImageFile(files?.item(0));
    }


    async function send(category: CategoryModel) {
        category.image = (category?.image as unknown as FileList)[0];

        try {

            await categoriesService.addCategory(category);

            notifyService.success(`Category added successfully`);

            // Redirect after success
            navigate(appConfig.categoriesRoute);

        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddCategory">
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} />

                <label>Description</label>
                <input type="text" {...register("description")} required minLength={2} />

                <div className="uploadImage">
                    <label>Image</label>
                    <input type="file" accept="images/*" {...register("image")} onChange={handleImage} />
                    <img src={previewSrc} />
                </div>

                <button>Add</button>
            </form>
        </div>
    );
}

export default AddCategory;
