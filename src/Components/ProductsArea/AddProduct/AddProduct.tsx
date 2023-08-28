import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Service/NotifyService";
import productsService from "../../../Service/ProductsService";
import appConfig from "../../../Utils/AppConfig";
import "./AddProduct.css";
import useImagePreview from "../../../Utils/UseImagePreview";

function AddProduct(): JSX.Element {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<ProductModel>();

    const [imageFile, setImageFile] = useState<File | null>(null);

    const previewSrc = useImagePreview(imageFile);

    function handleImage(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;

        setImageFile(files?.item(0));
    }

    async function send(product: ProductModel) {
        try {

            product.image = (product?.image as unknown as FileList)[0];
            const { id } = await productsService.addProduct(product);

            notifyService.success(`Product ${id} added successfully`);

            navigate(appConfig.productsRoute);

        } catch (err: any) {
            notifyService.error(err)
        }
    }

    return (
        <div className="AddProduct">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price")} required min={0} max={1000} />

                <label>Stock</label>
                <input type="number" {...register("stock")} required min={2} max={1000000} />

                <div className="uploadImage">
                    <label>Image</label>
                    <input type="file" accept="image/*" {...register("image")} onChange={handleImage} required />
                    <img src={previewSrc} />
                </div>
                <button>Add</button>
            </form >
        </div >
    );
}

export default AddProduct;
