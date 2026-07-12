import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../../app/store";

export const About = () => {
    const auth = useSelector(selectAuth);
    if (auth && !auth.currentUser) {
        return <Navigate to='/login' replace />;
    }
    return <>
        <h1>About</h1>
    </>
};