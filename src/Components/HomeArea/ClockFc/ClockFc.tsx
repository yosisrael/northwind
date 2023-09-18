import { useEffect, useState } from "react";
import "./ClockFc.css";

function ClockFc(): JSX.Element {

    const [time, setTime] = useState<string>(getTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function getTime(): string {
        return new Date().toLocaleTimeString();
    }

    return (
        <div className="ClockFc">
            <p>{time}</p>
        </div>
    );
}

export default ClockFc;
