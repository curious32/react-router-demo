import { useEffect, type SubmitEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { login, LoginMessageCode } from "../../redux/authSlice";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp";
import { type LoggedInUser } from "../../data/user";
import { selectAuth } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { log } from "../../util/common";

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector(selectAuth);
    const loggedInUser: LoggedInUser = { username: "", password: "" };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);

        const username =
            formData.get("username") as string;

        const password =
            formData.get("password") as string;

        loggedInUser.username = username;
        loggedInUser.password = password;
        await dispatch(login(loggedInUser));
    }

    useEffect(() => {
        log('Auth: ', auth);
        if (auth && auth.code == LoginMessageCode.LOGIN_SUCCESS.code) {
            alert('Successfully logged-in');
            navigate('/');
        }
    }, [auth]);

    return <>
        <header>
            <Link to="/" className="logo nav-bar"><img src={react_router_demo_logo} alt="" /></Link>
        </header>
        <main>
            <form onSubmit={handleSubmit} method="post">
                <table>
                    <tbody>
                        <tr>
                            <td><h5>Username</h5></td>
                            <td><input name="username" type="text"></input></td>
                        </tr>
                        <tr>
                            <td><h5>Password</h5></td>
                            <td><input name="password" type="password"></input></td>
                        </tr>
                        <tr>
                            <td><button type="reset">Clear</button></td>
                            <td><button type="submit" disabled={auth.loading}>Submit</button></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {auth.code == LoginMessageCode.LOGIN_FAILED.code &&
                                    <span style={{ color: "red" }}>Username or password did not match.</span>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <NavLink to="/register">New User</NavLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {auth.loading && <div className="full-screen">
                <div className="loader"></div>
            </div>}
        </main>
    </>
};
