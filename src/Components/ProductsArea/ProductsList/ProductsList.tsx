import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import addImage from "../../../Assets/images/More_Icon_C.svg.png";
import clearImage from "../../../Assets/images/clear-cache-icon.png";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Service/NotifyService";
import productsService from "../../../Service/ProductsService";
import appConfig from "../../../Utils/AppConfig";
import useTitle from "../../../Utils/UseTitle";
import Spinner from "../../../Utils/Spinner/Spinner";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

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

    // Clear products and navigate to home.
    function handleClearAll() {
        productsService.clearAllProducts();
        notifyService.success("All products cleared successfully");
    }

    if (feProducts.length === 0) return <Spinner />

    return (
        <div className="ProductsList">
            <div className="addBtn">
                <NavLink to={appConfig.addNewProductRoute}><img src={addImage} /></NavLink>
                <NavLink to={appConfig.homeRoute} onClick={handleClearAll}><img src={clearImage} /></NavLink>
            </div>
            {feProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}

export default ProductsList;