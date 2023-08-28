import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Service/NotifyService";
import productsService from "../../../Service/ProductsService";
import appConfig from "../../../Utils/AppConfig";
import useTitle from "../../../Utils/UseTitle";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";
import Spinner from "../../Spinner/Spinner";

function ProductsList(): JSX.Element {

    useTitle("Products");

    // Products state
    const [feProducts, setFeProducts] = useState<ProductModel[]>([]);

    // Go to BE once
    useEffect(() => {
        productsService.getAllProducts()
            .then(beProducts => setFeProducts(beProducts))
            .catch(err => notifyService.error(err));

    }, []);

    if (feProducts.length === 0) return <Spinner />

    return (
        <div className="ProductsList">
            <NavLink className="addBtn" to={appConfig.addNewProductRoute}>+</NavLink>
            {feProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}

export default ProductsList;
