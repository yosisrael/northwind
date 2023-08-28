import { useEffect } from "react";

function useTitle(title: string, item: any = undefined): void {
    useEffect(() => {
        document.title = `Northwind | ${title}`;
    }, [item])
}

export default useTitle;