import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Service/ProductsService";
import appConfig from "../../../Utils/AppConfig";
import "./EditProduct.css";
import notifyService from "../../../Service/NotifyService";
import Spinner from "../../../Utils/Spinner/Spinner";
import useImagePreview from "../../../Utils/UseImagePreview";

function EditProduct(): JSX.Element {


    const navigate = useNavigate();

    const { register, handleSubmit, setValue, watch } = useForm<ProductModel>();

    const params = useParams();
    const id = +params.prodId;

    const [imageFile, setImageFile] = useState<File | null>(null);

    // Handel preview of existing image
    const [previewSrc, setPreviewSrc] = useState<string>("");

    // Handel preview of selected image
    const imageUrl = useImagePreview(imageFile);

    function handleImage(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;

        setImageFile(files?.item(0));
    }

    useEffect(() => {
        productsService.getOneProduct(id)
            .then(beProduct => {
                setValue("name", beProduct.name);
                setValue("price", beProduct.price);
                setValue("stock", beProduct.stock);
                setValue("imageUrl", beProduct.imageUrl);
                setPreviewSrc(beProduct.imageUrl);
            })
            .catch(err => notifyService.error(err));
    }, [id]);

    async function update(product: ProductModel) {
        try {
            product.id = id;
            product.image = (product?.image as unknown as FileList)[0];

            await productsService.updateProduct(product);
            notifyService.success(`Product ${id} updated successfully`);
            navigate(appConfig.productsRoute);

        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // if (!previewSrc) return <Spinner />

    return (
        // feProduct &&
        <div className="EditProduct">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit(update)}>
                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price")} required min={0} max={1000} />

                <label>Stock</label>
                <input type="number" {...register("stock")} required min={2} max={1000} />

                <div className="image-container">
                    <label>Image</label>
                    <input type="file" accept="image/*" {...register("image")} onChange={handleImage} required />
                    <img src={imageUrl || previewSrc} />
                </div>

                <button>Update</button>
            </form >
        </div >
    );
}

export default EditProduct;
