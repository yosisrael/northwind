import "./Spinner.css";
import spinnerImage from "../../Assets/images/Ellipsis-1s-200px.gif"

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={spinnerImage} />
        </div>
    );
}

export default Spinner;
