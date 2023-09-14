import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./EditCategory.css";

function EditCategory(): JSX.Element {

    // Form functions

    const { register, handleSubmit, setValue } = useForm<CategoryModel>();

    // Redirect after success
    const navigate = useNavigate();

    // get CategoryId from url
    const params = useParams();
    const id = +params.categoryId;


    // In order to show image from Be
    const [imageSrc, setImageSrc] = useState<string>("");

    // handle uploaded image preview
    const [imageFile, setImageFile] = useState<File | null>(null);

    const previewSrc = useImagePreview(imageFile);

    function handleImage(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;

        setImageFile(files?.item(0));
    }

    useEffect(() => {
        categoriesService.getOneCategory(id).then(beCategory => {
            setValue("name", beCategory?.name);
            setValue("description", beCategory?.description);

            setImageSrc(beCategory.imageUrl);
        }).catch(err => {
            notifyService.error(err);
            if (err.response.status === 401) navigate(appConfig.loginRoute);
        })
    }, []);

    async function update(category: CategoryModel) {
        category.image = (category?.image as unknown as FileList)[0];
        category.id = id;

        try {

            await categoriesService.updateCategory(category);

            notifyService.success(`Category ${id} updated successfully`);

            navigate(appConfig.categoriesRoute);

        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditCategory">
            <h2>Edit Category</h2>
            <form onSubmit={handleSubmit(update)}>
                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} />

                <label>Description</label>
                <input type="text" {...register("description")} required minLength={2} />

                <div className="uploadImage">
                    <label>Image</label>
                    <input type="file" accept="images/*" {...register("image")} onChange={handleImage} />
                    <img src={previewSrc || imageSrc} />
                </div>

                <button>Update</button>
            </form>
        </div>
    );
}

export default EditCategory;
