import "./Home.css";
import food_products1 from "../../../Assets/images/food-product-labelling.jpg"
import food_products2 from "../../../Assets/images/food-products-2.webp"
import { useEffect, useState } from "react";
import useTitle from "../../../Utils/UseTitle";


function Home(): JSX.Element {

    useTitle("Home");

    const arr = useState<string>("");
    const saleInfo = arr[0];
    const setSaleInfo = arr[1];

    const [saleInfo2, setSaleInfo2] = useState<string>("");
    const [time, setTime] = useState<string>();
    const [randomNum, setRandomNum] = useState<number>(Math.floor(Math.random() * 2 + 1));
    // let randomNum = Math.floor(Math.random() * 2 + 1);

    useEffect(() => {
        const intervalID = setInterval(() => {
            displayTime();
        }, 1000)
        return () => clearInterval(intervalID);
    }, []);

    function displaySales() {
        ("Sale: 50% discount on all our products");
    }
    function displaySales2() {
        // saleInfo = "Sale: 20% discount on all our products";
        setSaleInfo2("Sale: 20% discount on all our products");
    }

    function displayTime(): void {
        const now = new Date();
        setTime(now.toLocaleTimeString());
    }

    // const randomNumber = Math.floor(Math.random() * 2 + 1);

    const deserts = [
        { id: 1, name: "Apple pie", price: 20 },
        { id: 2, name: "Cheese cake", price: 15 },
        { id: 3, name: "Eclair", price: 10 },
        { id: 4, name: "Pavlova", price: 5 },
    ]
    return (
        <div className="Home">
            <h2>Welcome to Northwind Traders!</h2>
            {/* {randomNumber === 1 ? <img src={food_products1} /> : <img src={food_products2} />} */}

            {randomNum === 1 && <img src={food_products1} />}
            {randomNum === 2 && <img src={food_products2} />}
            {/* <img src={food_products1} /> */}
            {/* <img src={food_products2} /> */}

            <div className="Deserts">
                <p>Our deserts:</p>
                {deserts.map(d => <span key={d.id}>{d.name} - ${d.price}🍦</span>)}
            </div>

            <button onClick={displaySales}>Sale</button>
            {<p>{saleInfo}</p>}
            <button onClick={displaySales2}>Another Sale</button>
            {<p>{saleInfo2}</p>}
            <button onClick={displayTime}>Show Time</button>
            {<p>{time}</p>}
        </div>
    );
}

export default Home;
