import { useEffect, useState } from "react";
import { rootStore } from "../../../Redux/rootReducer";

function TotalEmployees(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setCount(rootStore.getState().employeesReducer.employees?.length);

        rootStore.subscribe(() => {
            setCount(rootStore.getState().employeesReducer.employees?.length);
        })
    }, [])


    return (
        <div className="TotalEmployees">
            <p>Total Employees: {count}</p>
        </div>
    );
}

export default TotalEmployees;
