import { Navigate } from "react-router-dom";

export const About = () => {
    let isLoggedIn: boolean = false;
    if (!isLoggedIn) {
        return <Navigate to='/login' replace />;
    }
    return <>
        <h1>About</h1>
    </>
};