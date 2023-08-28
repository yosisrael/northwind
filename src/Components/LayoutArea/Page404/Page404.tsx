import "./Page404.css";
import pageNotFoundImage from "../../../Assets/images/9-error-404-page.jpg"

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <h2>The page that you are looking for doesn't exist</h2>
            {/* <img src={pageNotFoundImage} /> */}

        </div>
    );
}

export default Page404;
