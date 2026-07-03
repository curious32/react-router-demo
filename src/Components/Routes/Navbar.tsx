import { Link, Outlet } from "react-router-dom";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp"

export const Navbar = () => {
    return <>
        <header>
            <Link to="/" className="logo nav-bar"><img src={react_router_demo_logo} alt="" /></Link>
            <Link to='/' className="nav-bar">Home</Link>
            <Link to='/about' className="nav-bar">About</Link>
        </header>
        <main>
            <Outlet />
        </main>
    </>
};