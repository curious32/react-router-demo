import { useEffect, useState, type SubmitEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp";
import { getAuth, isLoggedIn, type AuthState, type LoggedInUser } from "../../data/user";
import { selectAuth } from "../../app/store";

interface LoginPageState {
    isValidate: boolean | null;
    isPageStateChanged: boolean;
}

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            const storedAuth: AuthState | null = getAuth();
            if (storedAuth && storedAuth.currentUser) {
                const storedLoggedInUser: LoggedInUser = {
                    username: storedAuth.currentUser.username,
                    password: storedAuth.currentUser.password
                };
                dispatch(login(storedLoggedInUser));
                navigate('/');
            }
        }
    }, []);
    const auth = useSelector(selectAuth);
    const [loginPageState, setLoginPageState] = useState<LoginPageState>({ isValidate: null, isPageStateChanged: false });

    const loggedInUser: LoggedInUser = { username: "", password: "" };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);

        const username =
            formData.get("username") as string;

        const password =
            formData.get("password") as string;

        loggedInUser.username = username;
        loggedInUser.password = password;

        dispatch(login(loggedInUser));
        setLoginPageState(prev => ({ ...prev, isPageStateChanged: true }));
    }

    useEffect(() => {
        if (loginPageState.isPageStateChanged) {
            if (auth && auth.currentUser) {
                console.log('Logged in successfull');
                navigate('/');
            } else {
                setLoginPageState(prev => ({ ...prev, isValidate: false, isPageStateChanged: false }));
            }
        }
    }, [loginPageState.isPageStateChanged]);

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
                            <td><button type="submit">Submit</button></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{loginPageState.isValidate == false ? <span style={{ color: "red" }}>Username or password did not match.</span> : null}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <NavLink to="/register">New User</NavLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </main>
    </>
};
