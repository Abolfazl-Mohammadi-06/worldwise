import PageNav from "../components/PageNav.jsx";
import {Link} from "react-router-dom";

function Homepage() {
    return (
        <div>
            <PageNav/>
            <h1>
                WorldWise
            </h1>

            <Link to="/app">go to the app!</Link>

        </div>
    )
}

export default Homepage;