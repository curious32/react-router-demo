import { Navigate } from "react-router-dom";

export const Home = () => {
    let isLoggedIn: boolean = false;
    if (!isLoggedIn) {
        return <Navigate to='/login' replace />;
    }
    return <>
        <h1>Home</h1>
    </>
};