import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../app/store";
import { logout } from "../../redux/authSlice";

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(selectAuth);
    if (auth && auth.currentUser) {
        dispatch(logout());
        navigate('/login');
    }
    return <></>;
}