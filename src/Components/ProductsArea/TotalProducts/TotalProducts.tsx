import { useEffect, useState } from "react";
import { rootStore } from "../../../Redux/rootReducer";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setCount(rootStore.getState().productsReducer.products?.length);

        // In order to get updated even after the first time
        const unsubscribe = rootStore.subscribe(() => {
            setCount(rootStore.getState().productsReducer.products?.length);
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
