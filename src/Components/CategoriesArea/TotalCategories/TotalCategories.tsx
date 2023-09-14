import { useEffect, useState } from "react";
import { rootStore } from "../../../Redux/rootReducer";

function TotalCategories(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setCount(rootStore.getState().categoriesReducer.categories?.length);

        rootStore.subscribe(() => {
            setCount(rootStore.getState().categoriesReducer.categories?.length);
        })
    }, [])


    return (
        <div className="TotalCategories">
            <p className="TotalCategories">Total Categories: {count}</p>
        </div>
    );
}

export default TotalCategories;
