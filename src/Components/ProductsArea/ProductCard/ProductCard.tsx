import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import "./ProductCard.css";
import appConfig from "../../../Utils/AppConfig";

type ProductCardProps = {
    product: ProductModel
}

function ProductCard(props: ProductCardProps): JSX.Element {

    function formatPrice(price: number) {
        return `$${price.toFixed(2)}`;
    }
    return (
        <NavLink to={`/products/details/${props.product.id}`}>
            <div className="ProductCard">

                <div>
                    {props.product.name}
                    <br />
                    Price: {formatPrice(+props.product.price)}
                    <br />
                    Stock: {props.product.stock}
                    <br />
                </div>
                <div>
                    <img src={props.product.imageUrl} />
                </div>

            </div>
        </NavLink>
    );
}

export default ProductCard;
