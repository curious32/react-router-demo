import { useEffect, type MouseEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp"
import { logout } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { log } from "../../util/common";

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    useEffect(() => {
        if (auth && !auth.auth) {
            navigate('/login', { replace: true });
        }
    }, []);
    function handleLogout(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        dispatch(logout());
        log('LOGOUT: ', auth);
        navigate('/login', { replace: true });
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