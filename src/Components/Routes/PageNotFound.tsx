import { Link } from "react-router-dom";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp"

export const PageNotFound = () => {
    let isLoggedIn = false;
    if (!isLoggedIn) {
        window.location.replace('/login');
        return null;
    }
    return <>
        <head>
            <head>
                <meta charSet="UTF-8" />
                <title>404 Page Not Found</title>
                <link rel="stylesheet" href="../src/App.css" />
            </head>
        </head>
        <body>
            <header>
                <Link to="/" className="logo nav-bar"><img src={react_router_demo_logo} alt="" /></Link>
            </header>
            <main>
                <h1 className="not-found-404">404 Page not found</h1>
            </main>

        </body>
    </>
}