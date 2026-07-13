import { type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp"
import { selectAuth } from "../../app/store";
import { logout } from "../../redux/authSlice";

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(selectAuth);
    function handleLogout(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        if (auth && auth.currentUser) {
            dispatch(logout());
            navigate('/login');
        }
    }

    return <>
        <header>
            <Link to="/" className="logo nav-bar"><img src={react_router_demo_logo} alt="" /></Link>
            <Link to='/' className="nav-bar">Home</Link>
            <Link to='/about' className="nav-bar">About</Link>
            <button onClick={handleLogout} className="nav-bar a-link right">Logout</button>
        </header>
        <main>
            <Outlet />
        </main>
    </>
};