import { useEffect, useState } from "react";
import "./TotalProducts.css";
import { productStore } from "../../../Redux/ProductsState";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setCount(productStore.getState().products?.length);

        // In order to get updated even after the first time
        const unsubscribe = productStore.subscribe(() => {
            setCount(productStore.getState().products?.length);
        })

        return unsubscribe;
    }, [])

    return (
        <div className="TotalProducts">
            <p>Total Products: {count}</p>
        </div>
    );
}

export default TotalProducts;
