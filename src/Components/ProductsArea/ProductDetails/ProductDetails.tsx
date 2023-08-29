import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Service/NotifyService";
import productsService from "../../../Service/ProductsService";
import appConfig from "../../../Utils/AppConfig";
import useTitle from "../../../Utils/UseTitle";
import Spinner from "../../../Utils/Spinner/Spinner";
import "./ProductDetails.css";


function ProductDetails(): JSX.Element {

    const params = useParams();
    const id = +params.prodId;
    const [feProduct, setFeProduct] = useState<ProductModel>();
    const navigate = useNavigate();

    useTitle(`Product ${id} Details`);

    // console.log(prodId);
    useEffect(() => {
        productsService.getOneProduct(id)
            .then(beProduct => setFeProduct(beProduct))
            .catch(err => notifyService.error(err.message));
    }, [id]);

    async function deleteMe() {
        try {
            const ok = window.confirm("Are you sure? ");
            if (!ok) return;

            await productsService.deleteProduct(id);
            notifyService.success(`Product ${id} deleted successfully`);
            navigate(appConfig.productsRoute);

        } catch (err: any) {
            notifyService.error(err);
        }
    }

    if (!feProduct) return <Spinner />

    return (
        <div className="ProductDetails">
            <h2>Product Details</h2>
            <h3>Name: {feProduct?.name}</h3>
            <h3>Price: {feProduct?.price}</h3>
            <h3>Stock: {feProduct?.stock}</h3>
            <br />
            <img src={appConfig.ProductsImagesUrl + feProduct?.imageName} />
            <br />
            <NavLink to={appConfig.productsRoute}>Back</NavLink>
            <span> | </span>
            <NavLink to={appConfig.editProductRoute + id}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>

        </div>
    );
}

export default ProductDetails;
